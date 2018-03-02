/**
 * Default map sample
 * @implements {Map}
 * @classdesc Map sample
 */
class InvariantBackMap extends Map { // eslint-disable-line  no-unused-vars
    /**
     * Set background image
     * @param {number} backID background image id
     */
    setBackground(backID) {
        /**
         * Background image id
         * @private
         * @type {number}
         */
        this.backID_ = backID;
    }

    /**
     * Render map
     * @override
     * @param {Context} ctx - canvas context
     * @param {number} [shiftX = 0] shift x position
     * @param {number} [shiftY = 0] shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        ctx.drawImage(this.backID_, 0, 0, this.width, this.height);
    }
}
