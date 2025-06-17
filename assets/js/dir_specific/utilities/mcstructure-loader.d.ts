/**
 * @type {{[fileIndex: number]: File}}
 */
declare const importedFiles: {
    [fileIndex: number]: File;
};
/**
 * @type {{[fileIndex: number]: boolean}}
 */
declare const importedFilesWithValidNames: {
    [fileIndex: number]: boolean;
};
declare let fileIndex: number;
/**
 * Imports a list of files.
 *
 * @param {File[] | FileList} files The files to import.
 */
declare function importFiles(files: File[] | FileList): void;
declare function updateFileCountAndSizeDisplay(): void;
declare function checkIfStructureNamesAreValid(): boolean;
declare class Zip {
    name: string;
    zip: any[] & {
        [fileURL: string]: number[] & {
            name?: string;
            modTime?: Date | string | null;
            fileUrl?: string;
        };
    };
    file: BlobPart[];
    constructor(name: string);
    dec2bin: (dec: number, size: number) => string;
    str2dec: (str: string | undefined) => number[];
    str2hex: (str: string | undefined) => string[];
    hex2buf: (hex: string) => Uint8Array<ArrayBuffer>;
    bin2hex: (bin: string) => string;
    reverse: (hex: string | any[]) => string;
    crc32: (r: string | any[] | undefined) => string;
    fetch2zip(filesArray: string[], folder?: string): Promise<void>;
    str2zip(name: string, str: string, folder?: string): void;
    files2zip(files: string | any[], folder?: string): Promise<void>;
    fileObjects2zip(files: string | any[], folder?: string): Promise<void>;
    makeZip(): void;
    getZip(): File;
}
/**
 * @param {string} text
 * @param {string} name
 * @param {string} type
 * @returns {File}
 */
declare function createTextFile(text: string, name: string, type: string): File;
declare function download(file: File, name: string): void;
declare function randomUUID(): string;
declare function generateStructureImporterPack(): Promise<boolean>;
