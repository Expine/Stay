/**
 * Default stage sample
 * Dividingly manages entities according to type
 * Do not update immutable objects
 * @implements {Stage}
 * @classdesc Stage sample
 */
class SplitManagementStage extends Stage {
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

        /**
         * Processing list for next method
         * @type {Array}
         */
        this.proccessingList_ = null;
        /**
         * Iterator for loop
         * @type {Iterator}
         */
        this.iterator_ = null;
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
     * Get entity iterator
     * @override
     * @return {Iterator} entity iterator
     */
    next() {
        if (this.proccessingList_ == null) {
            this.proccessingList_ = this.immutables_;
            this.iterator_ = this.proccessingList_[Symbol.iterator]();
        }
        let it;
        while (true) {
            it = this.iterator_.next();
            if (it.done) {
                if (this.proccessingList_ == this.immutables_)
                    this.proccessingList_ = this.mutables_;
                else if (this.proccessingList_ == this.mutables_)
                    this.proccessingList_ = this.characters_;
                else {
                    this.proccessingList_ = null;
                    break;
                }
                this.iterator_ = this.proccessingList_[Symbol.iterator]();
                continue;
            }
            break;
        }
        return it;
    }

    /**
     * Update stage
     * @param {number} dt delta time
     */
    update(dt) {
        // update mutables and characters
        for (let it of this.mutables_)
            it.update(dt);
        for (let it of this.characters_)
            it.update(dt);
        this.camera.setCameraPosition(this.mutables_[0].x + this.mutables_[0].width / 2, this.mutables_[0].y + this.mutables_[0].height / 2, this.map.width, this.map.height);
    }

    /**
     * Render stage
     * @param {Context} ctx - canvas context
     * @param {number} [shiftX = 0] shift x position
     * @param {number} [shiftY = 0] shift y position
     */
    render(ctx, shiftX = 0, shiftY = 0) {
        // render map
        this.map.render(ctx, shiftX, shiftY);
        // render entity
        let start_x = -this.camera.cameraX;
        let start_y = -this.camera.cameraY;
        let end_x = start_x + this.camera.screenWidth;
        let end_y = start_y + this.camera.screenHeight;
        for (let arr of [this.immutables_, this.mutables_, this.characters_])
            for (let it of arr)
                if (it.x + it.width >= start_x && it.x <= end_x && it.y + it.height >= start_y && it.y <= end_y)
                    it.render(ctx, -start_x, -start_y);
    }
}