/**
 * Default stage sample
 * @implements {Stage}
 * @classdesc Stage sample
 */
class DefaultStage extends Stage {
    /**
     * Cnstructor for default stage
     * @constructor
     */
    constructor() {
        super();
        /**
         * Immutable entity list
         * @private
         * @type {Array}
         */
        this.immutables_ = new Array();
        /**
         * Mutable entity list
         * @private
         * @type {Array}
         */
        this.mutables_ = new Array();
        /**
         * Charactr list
         * @private
         * @type {Array}
         */
        this.characters_ = new Array();
    }

    /**
     * Add entity to stage
     * @override
     * @param {Entity} entity - entity object
     */
    addEntity(entity) {
        if (entity instanceof ImmutableObject)
            this.immutables_.push(entity);
        else if (entity instanceof MutableObject)
            this.mutables_.push(entity);
        else if (entity instanceof Character)
            this.characters_.push(entity);
    }

    /**
     * Update stage
     * @param {number} dt delta time
     */
    update(dt) {
        // update entity
        for (let it of this.immutables_)
            it.update(dt);
        for (let it of this.mutables_)
            it.update(dt);
        for (let it of this.characters_)
            it.update(dt);
        this.camera.setCameraPosition(this.mutables_[0].x + this.mutables_[0].width / 2, this.mutables_[0].y + this.mutables_[0].height / 2, this.map.width, this.map.height);
    }

    /**
     * Render stage
     * @param {CanvasRenderingContext2D} ctx - canvas context
     * @param {number} [shiftX = 0] shift x position
     * @param {number} [shiftY = 0] shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        let start_x = -this.camera.cameraX;
        let start_y = -this.camera.cameraY;
        let end_x = start_x + this.camera.screenWidth;
        let end_y = start_y + this.camera.screenHeight;
        // render entity
        for (let arr of [this.immutables_, this.mutables_, this.characters_])
            for (let it of arr)
                if (it.x + it.width >= start_x && it.x <= end_x && it.y + it.height >= start_y && it.y <= end_y)
                    it.render(ctx, -start_x, -start_y);
    }
}