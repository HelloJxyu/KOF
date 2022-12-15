import { Player } from "./base.js";
import { GIF } from '../utils/gif.js';

export class Kyo extends Player {
    constructor(root, info) {
        super(root, info);
        this.init_animations();
    }

    init_animations() {
        let outer = this;
        let off_set = [0, -22, -22, -140, 0, 0, 0];
        for (let i = 0; i < 7; i++) {
            let gif = GIF();
            gif.load(`../../../static/images/player/kyo/${i}.gif`);
            this.animations.set(i, {
                gif,
                frame_cnt: 0,
                frame_rate: 5,
                off_set_y: off_set[i],
                loaded: false,
                scale: 2,
            });
            gif.onload = () => {
                let obj = outer.animations.get(i);
                obj.frame_cnt = gif.frames.length;
                obj.loaded = true;
                if (i === 3) {
                    obj.frame_rate = 4;
                }
            };
        }
    }
}