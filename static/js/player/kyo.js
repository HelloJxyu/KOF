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
            if (i == 0) {
                gif.load(`https://s2.loli.net/2022/12/15/f17bnRVKXlsJvUQ.gif`);
            } else if (i === 1) {
                gif.load(`https://s2.loli.net/2022/12/15/yGja1lIW3DzwVTx.gif`);
            } else if (i === 2) {
                gif.load(`https://s2.loli.net/2022/12/15/XxMQBqdKvY2Pr8T.gif`);
            } else if (i === 3) {
                gif.load(`https://s2.loli.net/2022/12/15/nhKIyLoPY6uSO29.gif`);
            } else if (i === 4) {
                gif.load(`https://s2.loli.net/2022/12/15/TcWMkjVx4tR8FC5.gif`);
            } else if (i === 5) {
                gif.load(`https://s2.loli.net/2022/12/15/IBFLsQoPTZWOR9v.gif`);
            } else {
                gif.load(`https://s2.loli.net/2022/12/15/x7Rf3lQ6kmnciC5.gif`);
            }
            // gif.load(`../../images/player/kyo/${i}.gif`);
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