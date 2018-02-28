/**
 * Screen manager that can generate a canvas automatically
 * If the canvas does not exist, it is generated
 * @implements {Screen}
 * @classdesc Screen manager to generate  a canvas automatically
 * @example
 * let engine = new UnderEngine("relative/path");
 * engine.setScreen(new GeneratableScreen());
 */
class GeneratableScreen extends Screen {
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
        this.canvas_;
        if (document.querySelector("canvas") == null) {
            // generate canvas
            this.canvas_ = document.createElement("canvas");
            // set canvas
            let div = document.createElement("div");
            div.setAttribute("tabindex", "1");
            div.setAttribute("id", "UnderCanvasDiv");
            div.appendChild(this.canvas_);
            document.body.appendChild(div);
        } else {
            this.canvas_ = document.querySelector("canvas");
        }

        // generate style
        let style = document.createElement("style");
        style.append("canvas {display:block;width: " + this.width + "px;height: " + this.height + "px;margin: 0px auto;}");
        document.head.appendChild(style);

        // set canvas default size
        this.canvas_.width = this.width;
        this.canvas_.height = this.height;
        this.canvas_.setAttribute("style", "canvas");

        // resize
        (window.onresize = () => {
            this.gameSize = Math.min((innerWidth - 16) / this.width, (innerHeight - 16) / this.height);
            this.canvas_.width = this.gameSize * this.width;
            this.canvas_.style.width = this.canvas_.width + "px";
            this.canvas_.height = this.gameSize * this.height;
            this.canvas_.style.height = this.canvas_.height + "px";
        })();

        /**
         * Canvas context
         * @private
         * @type {Context}
         */
        this.ctx_ = new JSContext(this.canvas_.getContext("2d"));
        this.ctx_.setScreen(this);
        //        this.ctx_ = this.canvas_.getContext("2d");
    }

    /**
     * Get input target element
     * @return {Element} input target element
     */
    getTarget() {
        return this.canvas_;
    }

    /**
     * Get canvas element
     * @return {Canvas} canvas element
     */
    getCanvas() {
        return this.canvas_;
    }

    /**
     * Canvas context for rendering
     * @return {Context} canvas context for rendering
     */
    getContext() {
        return this.ctx_;
    }
}