/**
 * Gameover layer
 * Display gameover
 * @classdesc Gameover layer to display gamover
 */
class GameoverLayer extends Layer { // eslint-disable-line  no-unused-vars
    /**
     * Gamover layer constructor
     */
    constructor() {
        super();
    }
    /**
     * Update layer
     * @interface
     * @param {number} dt - delta time
     */
    update(dt) {}

    /**
     * Render layer
     * @interface
     * @param {Context} ctx
     */
    render(ctx) {
        ctx.fillText(`Gameover`, 400, 300, 0.5, 0.5, 100, `red`);
    }
}
