export class Controller {
    constructor($canvas) {
        this.$canvas = $canvas;
        this.pressed_keys = new Set();
        this.start();
    }

    start() {
        let s = this.pressed_keys;
        this.$canvas.keydown((e) => {
            s.add(e.key);
        });

        this.$canvas.keyup((e) => {
            s.delete(e.key);
        });
    }
}