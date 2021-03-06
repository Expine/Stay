/**
 * Screen manager that can generate a canvas automatically
 * If the canvas does not exist, it is generated
 * @implements {Screen}
 * @classdesc Screen manager to generate  a canvas automatically
 */
class GeneratableScreen extends Screen { // eslint-disable-line  no-unused-vars
    /**
     * Generatable screen constructor
     * @constructor
     * @param {number} [width = 800]  screen width
     * @param {number} [height = 600]  screen height
     */
    constructor(width = 800, height = 600) {
        super(width, height);

        /**
         * Game canvas
         * @private
         * @type {Canvas}
         */
        this.canvas;
        if (document.querySelector(`canvas`) == null) {
            // generate canvas
            this.canvas = document.createElement(`canvas`);
            // set canvas
            let div = document.createElement(`div`);
            div.setAttribute(`tabindex`, `1`);
            div.setAttribute(`id`, `UnderCanvasDiv`);
            div.appendChild(this.canvas);
            document.body.appendChild(div);
        } else {
            this.canvas = document.querySelector(`canvas`);
        }

        // generate style
        let style = document.createElement(`style`);
        style.append(`canvas {display:block;width: ` + this.width + `px;height: ` + this.height + `px;margin: 0px auto;}`);
        document.head.appendChild(style);

        // set canvas default size
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.canvas.setAttribute(`style`, `canvas`);
    }

    /**
     * Get input target element
     * @return {Element} input target element
     */
    getTarget() {
        return this.canvas;
    }

    /**
     * Get canvas for rendering
     * @return {Canvas} Canvas
     */
    getCanvas() {
        return this.canvas;
    }
}
