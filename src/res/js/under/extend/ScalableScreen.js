/**
 * Screen manager that can generate a canvas automatically
 * If the canvas does not exist, it is generated
 * It also Automatically scales
 * @implements {GeneratableScreen}
 * @classdesc Screen manager to scale automatically
 */
class ScalableScreen extends GeneratableScreen { // eslint-disable-line     no-unused-vars
    /**
     * Scalable screen constructor
     * @constructor
     * @param {number} [width = 800]  screen width
     * @param {number} [height = 600]  screen height
     */
    constructor(width = 800, height = 600) {
        super(width, height);

        // resize
        (window.onresize = () => {
            this.gameSize = Math.min((innerWidth - 16) / this.width, (innerHeight - 16) / this.height);
            this.canvas_.width = this.gameSize * this.width;
            this.canvas_.style.width = this.canvas_.width + `px`;
            this.canvas_.height = this.gameSize * this.height;
            this.canvas_.style.height = this.canvas_.height + `px`;
            let ctx = this.canvas_.getContext(`2d`);
            ctx.mozImageSmoothingEnabled = false;
            ctx.webkitImageSmoothingEnabled = false;
            ctx.msImageSmoothingEnabled = false;
            ctx.imageSmoothingEnabled = false;
        })();
    }
}
