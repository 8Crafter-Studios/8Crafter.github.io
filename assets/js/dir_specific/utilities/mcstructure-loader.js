$().ready(function ready() {
    $('#list-wrapper').on('dragenter', function (event) {
      event.preventDefault();
    })
  
    $('#list-wrapper').on('dragleave', function (event) {
      event.preventDefault();
    })
  
    $('#list-wrapper').on('dragover', function (event) {
      event.preventDefault();
    })
    $("#list-wrapper").on("drop", function (event) {
        event.preventDefault();
        importFiles(event.originalEvent.dataTransfer.files);
    });
    $('#file-import-input').on('change', function () {
        const files = $(this).prop('files');
        importFiles(files);
        $(this).val('');
    });
});

/**
 * Format file size in metric prefix
 * @param {number|string} fileSize
 * @returns {string}
 */
const formatFileSizeMetric = (fileSize) => {
    let size = Math.abs(fileSize);

    if (Number.isNaN(size)) {
        return 'Invalid file size';
    }

    if (size === 0) {
        return '0 bytes';
    }

    const units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB', 'RB', 'QB'];
    let quotient = Math.floor(Math.log10(size) / 3);
    quotient = quotient < units.length ? quotient : units.length - 1;
    size /= (1000 ** quotient);

    return `${+size.toFixed(2)} ${units[quotient]}`;
};

/**
 * @type {{[fileIndex: number]: File}}
 */
const importedFiles = {};

/**
 * @type {{[fileIndex: number]: boolean}}
 */
const importedFilesWithValidNames = {};
let fileIndex = 0;

/**
 * 
 * @param {File[]} files 
 */
function importFiles(files) {
    $("#blankslate").remove();
    $("#file-list").parent().removeClass("d-none");

    const temp = $("#structure-item-template").prop("content");
    for (let i = 0; i < files.length; i++) {
        if (files[i].name.endsWith(".mcstructure")) {
            const fileItem = $(temp).clone();
            importedFiles[fileIndex] = files[i];
            importedFilesWithValidNames[fileIndex] = true;
            const thisIndex = fileIndex;
            fileIndex++;

            $(fileItem).find("[data-temp='filename']").text(`${files[i].name} (${formatFileSizeMetric(files[i].size)})`);
            $(fileItem).find("[data-value='structurename']").val("andexsi:" + files[i].name.split(".").slice(0, -1).join("."));
            $(fileItem).find("[data-temp]").removeAttr("data-temp");
            $(fileItem).find("[data-value]").removeAttr("data-value");
            // let a = $(fileItem).find("[data-file]");
            $(fileItem).find("button[name=delete]").attr("thisIndex", thisIndex);
            // console.log($(fileItem).find("button[name=delete]"));
            const resizeObserverForTextboxContainer = new ResizeObserver(event => {
                $(event[0].target).parent().find("button[name=delete]")[0].style.margin=`${($(event[0].target).height()-29)/2}px 0px`;
            });
            resizeObserverForTextboxContainer.observe($(fileItem).find("[name=structure_name_and_delete_column]").get(0));
            $(fileItem).find("textarea").on("input", event=>{
                $(event.target).val($(event.target).val().replaceAll("//", "/_"))
                if(!/^([^:\/]+:)?[^:]+$/.test($(event.target).val())){
                    event.target.style.color="red";
                }else{
                    event.target.style.color="";
                }
            });
            $(fileItem).find("textarea").on("change", event=>{
                if(/^[^:]+$/.test($(event.target).val())){
                    $(event.target).val("mystructure:"+$(event.target).val())
                }
            });

            $("#file-list").append(fileItem);
        } else {
            const message = "Invalid file extension. Skipped";
            // toast(message, TOAST_WARNING);
            console.error(message);
        }
    }
    updateFileCountAndSizeDisplay();
    checkIfStructureNamesAreValid();
}

function updateFileCountAndSizeDisplay(){
    let totalSize = 0;
    Object.values(importedFiles).forEach(f=>totalSize+=f.size);
    $("#totalSize").text(`Total Size: ${formatFileSizeMetric(totalSize)}`);
    $("#fileCount").text(`${Object.keys(importedFiles).length} Files`);
}

function checkIfStructureNamesAreValid(){
    Object.keys(importedFiles).forEach(i=>{
        if(/^[^:\/]+:[^:]+$/.test($(`button[name=delete][thisindex=${i}]`).parent().find("textarea").val())){
            importedFilesWithValidNames[i]=true
        }else{
            importedFilesWithValidNames[i]=false
        }
    })
    if(Object.values(importedFilesWithValidNames).every(v=>v)){
        $("#generateButton").attr("disabled", "");
        return true;
    }else{
        $("#generateButton").attr("disabled", null);
        return false;
    }
}

class Zip {

    constructor(name) {
        this.name = name;
        this.zip = new Array();
        this.file = new Array();
    }

    dec2bin=(dec,size)=>dec.toString(2).padStart(size,'0');
    str2dec=str=>Array.from(new TextEncoder().encode(str));
    str2hex=str=>[...new TextEncoder().encode(str)].map(x=>x.toString(16).padStart(2,'0'));
    hex2buf=hex=>new Uint8Array(hex.split(' ').map(x=>parseInt(x,16)));
    bin2hex=bin=>(parseInt(bin.slice(8),2).toString(16).padStart(2,'0')+' '+parseInt(bin.slice(0,8),2).toString(16).padStart(2,'0'));

    reverse=hex=>{
        let hexArray=new Array();
        for(let i=0;i<hex.length;i=i+2)hexArray[i]=hex[i]+''+hex[i+1];
        return hexArray.filter((a)=>a).reverse().join(' '); 
    }

    crc32=r=>{
        for(var a,o=[],c=0;c<256;c++){
            a=c;
            for(var f=0;f<8;f++)a=1&a?3988292384^a>>>1:a>>>1;
            o[c]=a;
        }
        for(var n=-1,t=0;t<r.length;t++)n=n>>>8^o[255&(n^r[t])];
        return this.reverse(((-1^n)>>>0).toString(16).padStart(8,'0'));
    }

    fetch2zip(filesArray,folder=''){
        return new Promise((resolve, reject) => {
            filesArray.forEach(fileUrl=>{
                let resp;               
                fetch(fileUrl).then(response=>{
                    resp=response;
                    return response.arrayBuffer();
                }).then(blob=>{
                    new Response(blob).arrayBuffer().then(buffer=>{
                        console.log(`File: ${fileUrl} load`);
                        let uint=[...new Uint8Array(buffer)];
                        uint.modTime=resp.headers.get('Last-Modified');
                        uint.fileUrl=`${folder}${fileUrl.split("/").slice(-1)[0]}`;                            
                        this.zip[fileUrl]=uint;
                        resolve();
                    });
                });             
            });  
        });
    }

    str2zip(name,str,folder=''){
        let uint=[...new Uint8Array(this.str2dec(str))];
        uint.name=name;
        uint.modTime=new Date();
        uint.fileUrl=`${folder}${name}`;
        this.zip[uint.fileUrl]=uint;
    }

    async files2zip(files,folder=''){
        for(let i=0;i<files.length;i++){
            await files[i].arrayBuffer().then(data=>{
                let uint=[...new Uint8Array(data)];
                uint.name=files[i].name;
                uint.modTime=files[i].lastModifiedDate;
                uint.fileUrl=`${folder}${files[i].name}`; // `${this.name}/${folder}${files[i].name}`;
                this.zip[uint.fileUrl]=uint;                            
            });
        }
    }

    async fileObjects2zip(files,folder=''){
        for(let i=0;i<files.length;i++){
            this.str2zip(files[i].name, await files[i].text(),folder); 
        }
    }

    makeZip(){
        let count=0;
        let fileHeader='';
        let centralDirectoryFileHeader='';
        let directoryInit=0;
        let offSetLocalHeader='00 00 00 00';
        let zip=this.zip;
        for(const name in zip){
            let modTime=(()=>{
                const lastMod=new Date(zip[name].modTime);
                const hour=this.dec2bin(lastMod.getHours(),5);
                const minutes=this.dec2bin(lastMod.getMinutes(),6);
                const seconds=this.dec2bin(Math.round(lastMod.getSeconds()/2),5);
                const year=this.dec2bin(lastMod.getFullYear()-1980,7);
                const month=this.dec2bin(lastMod.getMonth()+1,4);
                const day=this.dec2bin(lastMod.getDate(),5);                        
                return this.bin2hex(`${hour}${minutes}${seconds}`)+' '+this.bin2hex(`${year}${month}${day}`);
            })();                   
            let crc=this.crc32(zip[name]);
            let size=this.reverse(parseInt(zip[name].length).toString(16).padStart(8,'0'));
            let nameFile=this.str2hex(zip[name].fileUrl).join(' ');
            let nameSize=this.reverse(zip[name].fileUrl.length.toString(16).padStart(4,'0'));
            let fileHeader=`50 4B 03 04 14 00 00 00 00 00 ${modTime} ${crc} ${size} ${size} ${nameSize} 00 00 ${nameFile}`;
            let fileHeaderBuffer=this.hex2buf(fileHeader);
            directoryInit=directoryInit+fileHeaderBuffer.length+zip[name].length;
            centralDirectoryFileHeader=`${centralDirectoryFileHeader}50 4B 01 02 14 00 14 00 00 00 00 00 ${modTime} ${crc} ${size} ${size} ${nameSize} 00 00 00 00 00 00 01 00 20 00 00 00 ${offSetLocalHeader} ${nameFile} `;
            offSetLocalHeader=this.reverse(directoryInit.toString(16).padStart(8,'0'));
            this.file.push(fileHeaderBuffer,new Uint8Array(zip[name]));
            count++;
        }
        centralDirectoryFileHeader=centralDirectoryFileHeader.trim();
        let entries=this.reverse(count.toString(16).padStart(4,'0'));
        let dirSize=this.reverse(centralDirectoryFileHeader.split(' ').length.toString(16).padStart(8,'0'));
        let dirInit=this.reverse(directoryInit.toString(16).padStart(8,'0'));
        let centralDirectory=`50 4b 05 06 00 00 00 00 ${entries} ${entries} ${dirSize} ${dirInit} 00 00`;
        this.file.push(this.hex2buf(centralDirectoryFileHeader),this.hex2buf(centralDirectory));                
        let a = document.createElement('a');
        a.href = URL.createObjectURL(new Blob([...this.file],{type:'application/octet-stream'}));
        a.download = `${this.name}.zip`;
        a.click();              
    }

    getZip(){
        let count=0;
        let fileHeader='';
        let centralDirectoryFileHeader='';
        let directoryInit=0;
        let offSetLocalHeader='00 00 00 00';
        let zip=this.zip;
        for(const name in zip){
            let modTime=(()=>{
                const lastMod=new Date(zip[name].modTime);
                const hour=this.dec2bin(lastMod.getHours(),5);
                const minutes=this.dec2bin(lastMod.getMinutes(),6);
                const seconds=this.dec2bin(Math.round(lastMod.getSeconds()/2),5);
                const year=this.dec2bin(lastMod.getFullYear()-1980,7);
                const month=this.dec2bin(lastMod.getMonth()+1,4);
                const day=this.dec2bin(lastMod.getDate(),5);                        
                return this.bin2hex(`${hour}${minutes}${seconds}`)+' '+this.bin2hex(`${year}${month}${day}`);
            })();                   
            let crc=this.crc32(zip[name]);
            let size=this.reverse(parseInt(zip[name].length).toString(16).padStart(8,'0'));
            let nameFile=this.str2hex(zip[name].fileUrl).join(' ');
            let nameSize=this.reverse(zip[name].fileUrl.length.toString(16).padStart(4,'0'));
            let fileHeader=`50 4B 03 04 14 00 00 00 00 00 ${modTime} ${crc} ${size} ${size} ${nameSize} 00 00 ${nameFile}`;
            let fileHeaderBuffer=this.hex2buf(fileHeader);
            directoryInit=directoryInit+fileHeaderBuffer.length+zip[name].length;
            centralDirectoryFileHeader=`${centralDirectoryFileHeader}50 4B 01 02 14 00 14 00 00 00 00 00 ${modTime} ${crc} ${size} ${size} ${nameSize} 00 00 00 00 00 00 01 00 20 00 00 00 ${offSetLocalHeader} ${nameFile} `;
            offSetLocalHeader=this.reverse(directoryInit.toString(16).padStart(8,'0'));
            this.file.push(fileHeaderBuffer,new Uint8Array(zip[name]));
            count++;
        }
        centralDirectoryFileHeader=centralDirectoryFileHeader.trim();
        let entries=this.reverse(count.toString(16).padStart(4,'0'));
        let dirSize=this.reverse(centralDirectoryFileHeader.split(' ').length.toString(16).padStart(8,'0'));
        let dirInit=this.reverse(directoryInit.toString(16).padStart(8,'0'));
        let centralDirectory=`50 4b 05 06 00 00 00 00 ${entries} ${entries} ${dirSize} ${dirInit} 00 00`;
        this.file.push(this.hex2buf(centralDirectoryFileHeader),this.hex2buf(centralDirectory));                
        return new File([new Blob([...this.file],{type:'application/octet-stream'})], `${this.name}.zip`);
    }
}

/**
 * @param {string} text
 * @param {string} name
 * @param {string} type
 * @returns {File}
 */
function createTextFile(text, name, type) {
    return new File([new Blob([text], {type: type})], name);
}
function download(file, name) {
    var a = document.createElement("a");
    a.href = window.URL.createObjectURL(file);
    a.download = name;
    a.click();
}
async function generateStructureImporterPack(){
    if(!checkIfStructureNamesAreValid()){
        return false;
    }
    let z = new Zip(Date.now() + "-8CraftersMobileStructureImporter");

    Object.entries(importedFiles).forEach(([i, f])=>{
        const a = $(`button[name=delete][thisindex=${i}]`).parent().find("textarea").val().split(":");
        a[1] = a[1].replaceAll("//", "/_");
        f = new File([f], a.join("/")+".mcstructure", {type: f.type, lastModified: f.lastModified});
        importedFiles[i]=f;
        // console.log(f.name, a.join("/")+".mcstructure");
    });
    // console.log(importedFiles);
    z.str2zip("manifest.json", JSON.stringify({
        "format_version": 2,
        "header": {
            "description": `Structure list: ${JSON.stringify(Object.values(importedFiles).map(f=>f.name.includes("/")?f.name.slice(0, -12).replace("/", ":"):"mystructure:"+f.name.slice(0, -12)))}; Created at: ${Date.now()}; Generated using version 1.0.0; This pack was generated at at §bhttps://www.8crafter.com/utilities/mcstructure-loader`,
            "name": `${Date.now()} - 8Crafter's Mobile Structure Importer`,
            "uuid": "3e47c876-79e9-423d-b0ef-7b33876796e5",
            "version": [Number(Date.now().toString().slice(-13, -8))%65536, Number(Date.now().toString().slice(-8, -4)), Number(Date.now().toString().slice(-4))],
            "min_engine_version": [ 1, 21, 50 ]
        },
        "modules": [
            {
                "description": `Structure list: ${JSON.stringify(Object.values(importedFiles).map(f=>f.name.includes("/")?f.name.slice(0, -12).replace("/", ":"):"mystructure:"+f.name.slice(0, -12)))}; Created at: ${Date.now()}; Generated using version 1.0.0; This pack was generated at at §bhttps://www.8crafter.com/utilities/mcstructure-loader`,
                "type": "data",
                "uuid": "728dc5e8-d79b-4a06-b4da-8076e3db54e4",
                "version": [Number(Date.now().toString().slice(-13, -8))%65536, Number(Date.now().toString().slice(-8, -4)), Number(Date.now().toString().slice(-4))]
            }
        ],
        "metadata": {
            "authors": ["Andexter8", "Andersen Zahn", "8Crafter"],
            "url": "https://www.8crafter.com",
            "product_type": "addon",
            "generated_with": {
                "8CraftersMobileStructureImporter": ["1.0.0"]
            }
        }
    }, undefined, 4));
    await z.files2zip(Object.values(importedFiles), "structures/")

    await z.fetch2zip(["/assets/images/pages/utilities/mcstructure-loader/pack_icon.png"], "");

    let file = z.getZip();
    download(file, file.name.slice(0, -4) + ".mcpack");
    return true;
}
