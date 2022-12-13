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

        this.speedx = 400; // 水平速度
        this.speedy = 1000; // 跳起的初始速度

        this.grivaty = 50;
        this.ctx = this.root.game_map.ctx;

        this.animations = new Map();
        this.frame_current_cnt = 0;
    }

    start() {

    }

    update() {
        this.update_control();
        this.update_move();
        this.updata_direction();
        this.render();
    }

    updata_direction() {
        let players = this.root.players;
        if (players[0] && players[1]) {
            let me = this, you = players[1 - this.id];
            if (me.x < you.x) {
                this.direction = 1;
            } else {
                this.direction = -1;
            }
        }
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
            if (f) {
                this.status = 4;
                this.vx = 0;
                this.frame_current_cnt = 0;
            } else if (u) {
                this.vy = -this.speedy;
                if (l) {
                    this.vx = -this.speedx;
                } else if (r) {
                    this.vx = this.speedx;
                } else {
                    this.vx = 0;
                }
                this.status = 3;
                this.frame_current_cnt = 0;
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
        if (this.status === 3) {
            this.vy += this.grivaty;
        }
        this.x += this.vx * this.timedelate / 1000;
        this.y += this.vy * this.timedelate / 1000;
        if (this.y > 450) {
            this.y = 450;
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
        let status = this.status;
        if (this.status === 1 && this.direction * this.vx < 0) {
            status = 2;
        }
        let obj = this.animations.get(status);
        if (obj && obj.loaded) {
            if (this.direction > 0) {
                let k = parseInt(this.frame_current_cnt / obj.frame_rate) % obj.frame_cnt;
                let image = obj.gif.frames[k].image;
                this.ctx.drawImage(image, this.x, this.y + obj.off_set_y, image.width * obj.scale, image.height * obj.scale);
            } else {
                this.ctx.save();
                this.ctx.scale(-1, 1);
                this.ctx.translate(-this.ctx.canvas.width, 0);
                let k = parseInt(this.frame_current_cnt / obj.frame_rate) % obj.frame_cnt;
                let image = obj.gif.frames[k].image;
                this.ctx.drawImage(image, this.ctx.canvas.width - this.width - this.x, this.y + obj.off_set_y, image.width * obj.scale, image.height * obj.scale);
                this.ctx.restore();
            }
            this.frame_current_cnt++;
            if (status === 4) {
                if (this.frame_current_cnt === obj.frame_cnt * obj.frame_rate) {
                    this.status = 0;
                }
            }
        }
    }
}