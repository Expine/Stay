/**
 * Obstacle
 * Obstacle on the stage
 * @implements {MmutableObject}
 * @classdesc Obstacle on the stage
 */
class Obstacle extends MutableObject { // eslint-disable-line  no-unused-vars
    /**
     * Render entity
     * @override
     * @param {Context} ctx - canvas context
     * @param {number} [shiftX = 0] shift x position
     * @param {number} [shiftY = 0] shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        ctx.drawImage(this.imageID, this.x + shiftX, this.y + shiftY, this.width, this.height);

        // for debug
        if (Engine.debug && this.collider !== undefined) {
            this.collider.render(ctx, shiftX, shiftY);
        }
    }
}
