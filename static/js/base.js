import { GameMap } from './game_map/base.js';
import { Player } from '/static/js/player/base.js';
class KOF {
    constructor(id) {
        this.$kof = $('#' + id);
        this.game_map = new GameMap(this);

        this.players = [
            new Player(this, {
                id: 0,
                x: 50,
                y: 0,
                width: 30,
                height: 50,
                color: 'blue'
            }),
            new Player(this, {
                id: 1,
                x: 220,
                y: 0,
                width: 30,
                height: 50,
                color: 'red'
            }),
        ];
    }
}

export {
    KOF,
}