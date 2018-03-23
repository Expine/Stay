/**
 * State of noraml stationary
 * @implements {UnderPlayerState}
 * @classdesc State of normal stationary
 */
class NormalStationaryState extends UnderPlayerState { // eslint-disable-line  no-unused-vars
    /**
     * Normal stationary state constructor
     * @constructor
     * @param {number} maxVelocityX Maximum speed
     * @param {number} walkPower The power to walk
     */
    constructor(maxVelocityX, walkPower) {
        super();

        /**
         * Maximum speed vector
         * @protected
         * @type {number}
         */
        this.maxVelocityX = maxVelocityX;
        /**
         * Force applied when moving
         * @protected
         * @type {number}
         */
        this.walkPower = walkPower;
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt - delta time
     * @return {bool} Whether decided on action
     */
    apply(dt) {
        let vx = 0;
        // walk
        if (Input.it.isLeftPressed()) {
            vx += -1;
        }
        if (Input.it.isRightPressed()) {
            vx += 1;
        }
        if (vx != 0) {
            this.entity.directionX = vx;
            if (this.entity.body.preVelocityX * vx < 0 || Math.abs(this.entity.body.preVelocityX) < this.maxVelocityX) {
                this.entity.body.enforce(vx * this.walkPower / dt, 0);
            }
            this.ai.changeState(`walk`);
        }
        if (Input.it.isDownPress()) {
            this.ai.changeState(`grab`);
        }
        if (Input.it.isUpPressed() && Util.onGround(this.entity)) {
            this.ai.changeState(`jump`);
        }
        if (Input.it.isYesPress()) {
            this.ai.changeState(`attack`);
        }
        return true;
    }
}