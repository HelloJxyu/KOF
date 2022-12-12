let AC_GAME_OBJECT = [];

class AcGameObject {
    constructor() {
        AC_GAME_OBJECT.push(this);
        this.timedelate = 0;
        this.has_call_start = false;
    }

    start() {

    }

    update() {

    }

    destory() {
        for (let i in AC_GAME_OBJECT) {
            if (AC_GAME_OBJECT[i] === this) {
                AC_GAME_OBJECT.splice(i, 1);
                break;
            }
        }
    }
}

let last_timestamp;

let AC_GAME_OBJECT_fRAME = (timestamp) => {
    for (let obj of AC_GAME_OBJECT) {
        if (!obj.has_call_start) {
            obj.start();
            obj.has_call_start = true;
        } else {
            obj.update();
            obj.timedelate = timestamp - last_timestamp;
        }
    }
    last_timestamp = timestamp;
    requestAnimationFrame(AC_GAME_OBJECT_fRAME);
}

requestAnimationFrame(AC_GAME_OBJECT_fRAME);

export {
    AcGameObject,
}