import { AcGameObject } from '../ac_game_object/base.js';
import { Controller } from '/static/js/controller/base.js';

export class GameMap extends AcGameObject {
    constructor(root) {
        super();
        this.root = root;
        this.$canvas = $('<canvas tabindex=0 style="width: 100%;height: 100%;"></canvas>');
        this.ctx = this.$canvas[0].getContext('2d');
        this.root.$kof.append(this.$canvas);
        this.$canvas.focus();
        this.controller = new Controller(this.$canvas);
    }

    start() {

    }

    update() {
        this.render();
    }

    render() {
        // this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
}