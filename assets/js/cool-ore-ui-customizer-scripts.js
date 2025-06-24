// RGB Ore UI
(async function cycleHueRotate(
    stopOnCondition = function () {
        return globalThis.stopRGB;
    },
    interval = 1,
    step = 20
) {
    let val = 0;
    return new Promise(function resolveA(resolve) {
        let id = setInterval(function () {
            if (stopOnCondition()) {
                clearInterval(id);
                resolve(true);
                return;
            }

            val += step;
            val %= 360;

            document.body.style.filter = `hue-rotate(${val}deg)`;
        }, interval);
    });
})();

// RGB Ore UI Super Fast With 1000x Saturation
(async function cycleHueRotate(
    stopOnCondition = function () {
        return false;
    },
    interval = 1,
    step = 5
) {
    let val = 0;
    return new Promise(function resolve() {
        let id = setInterval(function () {
            if (stopOnCondition() == true) {
                clearInterval(id);
                resolve(true);
                return;
            }

            val += step;
            val %= 360;

            document.body.style.filter = `hue-rotate(${val}deg) saturate(1000)`;
        }, interval);
    });
})();

// Spinning Ore UI
(async function spinBody(
    stopOnCondition = function () {
        return false;
    },
    interval = 20,
    step = 1
) {
    let val = 0;
    return new Promise(function resolve() {
        let id = setInterval(function () {
            if (stopOnCondition() == true) {
                clearInterval(id);
                resolve(true);
                return;
            }

            val += step;
            val %= 360;

            document.body.style.transform = `rotateZ(${val}deg)`;
        }, interval);
    });
})();

// Cursed Fast Spinning Ore UI
(async function spinBodyFastCursed(
    stopOnCondition = function () {
        return false;
    },
    interval = 1,
    step = 1
) {
    let val = 0;
    return new Promise(function resolve() {
        let id = setInterval(function () {
            if (stopOnCondition() == true) {
                clearInterval(id);
                resolve(true);
                return;
            }

            val += step;
            val %= 360;

            document.getElementsByTagName("html")[0].style.transform = `rotateZ(${val}deg)`;
        }, interval);
    });
})();

// Broken Ore UI
(async function spinBodyFastCursed(
    stopOnCondition = function () {
        return false;
    },
    interval = 1
) {
    let val = 0;
    return new Promise(function resolve() {
        let id = setInterval(function () {
            if (stopOnCondition() == true) {
                clearInterval(id);
                resolve(true);
                return;
            }

            val += Math.floor(Math.random() * 360);

            document.body.style.transform = `rotateZ(${val}deg)`;
        }, interval);
    });
})();

// Broken Ore UI (Stays on screen after rotating)
(async function spinBodyFastCursed(
    stopOnCondition = function () {
        return false;
    },
    interval = 50
) {
    let val = 0;
    return new Promise(function resolve() {
        let id = setInterval(function () {
            if (stopOnCondition() == true) {
                clearInterval(id);
                resolve(true);
                return;
            }

            val += Math.floor(Math.random() * 360);

            document.getElementsByTagName("html")[0].style.transform = `rotateZ(${val}deg)`;
        }, interval);
    });
})();

// Make everything have a random font size.
document.body.querySelectorAll("*").forEach((/** @type {HTMLElement} */ element) => {
    element.style.fontSize = (Math.floor(Math.random() * 30) + 10) + "px";
});

// Make everything have a random font size ten times every second.
setInterval(function randomizeAllFontSizes(){
    document.body.querySelectorAll("*").forEach(function randomizeElementFontSize(/** @type {HTMLElement} */ element){
        element.style.fontSize = (Math.floor(Math.random() * 30) + 10) + "px";
    });
}, 100);

// Make everything have a random font size every second, but the variation increases over time.
let fontSizeVariation = 30;
setInterval(() => {
    fontSizeVariation += 1;
    fontSizeVariation %= 300;
    document.body.querySelectorAll("*").forEach((/** @type {HTMLElement} */ element) => {
        element.style.fontSize = (Math.floor(Math.random() * fontSizeVariation) + 10) + "px";
    });
}, 100);

// Test for force enable achievements (Doesn't work.).
setInterval(()=>{
    try {
        __EditWorldAllData__.worldData.get().achievementsPermanentlyDisabled = false;
        __EditWorldAllData__.worldData.get().achievementsDisabled = false;
    } catch {}
}, 1);

// Make every div element shake.
setInterval(function shakeDivElements(){
    try {
        document.body.querySelectorAll("div").forEach(function shakeDivElement(/** @type {HTMLElement} */ element){
            let x = Math.floor(Math.random() * 3) - 1;
            let y = Math.floor(Math.random() * 3) - 1;
            element.style.transform = `translate(${x}px, ${y}px)`;
        });
    } catch {}
}, 1);

// Make every div element shift a small amount every millisecond.
setInterval(function shiftDivElementsRandomly_small(){
    try {
        document.body.querySelectorAll("div").forEach(function shiftDivElement(/** @type {HTMLElement} */ element){
            let x = Math.floor(Math.random() * 3) - 1;
            let y = Math.floor(Math.random() * 3) - 1;
            x += Number(element.style.transform?.match(/translateX\(([0-9\-\.]+)px\)/)?.[1] ?? 0);
            y += Number(element.style.transform?.match(/translateY\(([0-9\-\.]+)px\)/)?.[1] ?? 0);
            element.style.transform = `translate(${x}px, ${y}px)`;
        });
    } catch {}
}, 1);

// Make every div element shift a medium amount every millisecond.
setInterval(function shiftDivElementsRandomly_medium(){
    try {
        document.body.querySelectorAll("div").forEach(function shiftDivElement(/** @type {HTMLElement} */ element){
            let x = Math.floor(Math.random() * 33) - 16;
            let y = Math.floor(Math.random() * 33) - 16;
            x += Number(element.style.transform?.match(/translateX\(([0-9\-\.]+)px\)/)?.[1] ?? 0);
            y += Number(element.style.transform?.match(/translateY\(([0-9\-\.]+)px\)/)?.[1] ?? 0);
            element.style.transform = `translate(${x}px, ${y}px)`;
        });
    } catch {}
}, 1);



// Print Emoji File (MOVE THIS TO `a2.txt`!)
${se}let str = ""; for(let i = 0; i <= 0xff; i++){str += String.fromCharCode(0xE200 + i)}; send(str)



// Rotate body 3d diagonal.
(async function spinBody(
    stopOnCondition = function () {
        return false;
    },
    interval = 20,
    step = 1
) {
    let val = 0;
    return new Promise(function resolve() {
        let id = setInterval(function () {
            if (stopOnCondition() == true) {
                clearInterval(id);
                resolve(true);
                return;
            }

            val += step;
            // val %= 360;

            document.body.style.transform = `rotate3d(1, 1, 0.1, ${val}deg)`;
        }, interval);
    });
})();