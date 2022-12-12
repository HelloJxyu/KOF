import { AcGameObject } from "../ac_game_object/base.js";

export class Player extends AcGameObject {
    constructor(root, info) {
        super();
        this.root = root;
        this.id = info.id;
        this.x = info.x;
        this.y = info.y;
        this.width = info.width;
        this.height = info.height;
        this.color = info.color;
        this.direction = 1;
        this.status = 3; // 0 idle, 1 向右， 2 向左，3 跳跃，4 攻击，5 被打，6死亡
        this.pressed_keys = root.game_map.controller.pressed_keys;

        this.vx = 0;
        this.vy = 0;

        this.speedx = 80; // 水平速度
        this.speedy = 380; // 跳起的初始速度

        this.grivaty = 900;
        this.ctx = this.root.game_map.ctx;
    }

    start() {

    }

    update() {
        this.update_control();
        this.update_move();
        this.render();
    }

    update_control() {
        let l, r, u, f;
        if (this.id === 0) {
            l = this.pressed_keys.has('a');
            r = this.pressed_keys.has('d');
            u = this.pressed_keys.has('w');
            f = this.pressed_keys.has(' ');
        } else {
            l = this.pressed_keys.has('ArrowLeft');
            r = this.pressed_keys.has('ArrowRight');
            u = this.pressed_keys.has('ArrowUp');
            f = this.pressed_keys.has('Enter');
        }
        if (this.status === 0 || this.status === 1) {
            if (u) {
                this.vy = -this.speedy;
                if (l) {
                    this.vx = -this.speedx;
                } else if (r) {
                    this.vx = this.speedx;
                } else {
                    this.vx = 0;
                }
                this.status = 3;
            } else if (l) {
                this.vx = -this.speedx;
                this.status = 1;
            } else if (r) {
                this.vx = this.speedx;
                this.status = 1;
            } else {
                this.vx = 0;
                this.status = 0;
            }
        }
    }

    update_move() {
        this.vy += this.grivaty * this.timedelate / 1000;
        this.x += this.vx * this.timedelate / 1000;
        this.y += this.vy * this.timedelate / 1000;
        if (this.y > 90) {
            this.y = 90;
            this.vy = 0;
            this.vx = 0;
            this.status = 0;
        }
        if (this.x < 0) {
            this.x = 0;
        } else if (this.x + this.width > this.ctx.canvas.width) {
            this.x = this.ctx.canvas.width - this.width;
        }
    }

    render() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}