/**
 * State of noraml stationary
 * @implements {UnderMovableState}
 * @classdesc State of normal stationary
 */
class NormalStationaryState extends UnderMovableState { // eslint-disable-line  no-unused-vars
    /**
     * Normal stationary state constructor
     * @constructor
     * @param {number} maxVelocityX Maximum speed
     * @param {number} walkPower The power to walk
     */
    constructor(maxVelocityX, walkPower) {
        super();


        this.maxVelocityX = maxVelocityX;
        this.movePowerX = walkPower;
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
        if (Input.it.isKeyPressed(Input.it.left)) {
            vx += -1;
        }
        if (Input.it.isKeyPressed(Input.it.right)) {
            vx += 1;
        }
        if (vx != 0) {
            this.entity.directionX = vx;
            if (this.entity.body.preVelocityX * vx < 0 || Math.abs(this.entity.body.preVelocityX) < this.maxVelocityX) {
                this.entity.body.enforce(vx * this.movePowerX * this.entity.material.mass / dt, 0);
            }
            this.ai.changeState(`walk`);
        }
        if (Util.onGround(this.entity)) {
            if (Input.it.isKeyPressed(Input.it.down)) {
                this.ai.changeState(`grab`);
            }
            if (Input.it.isKeyPressed(Input.it.up)) {
                if (vx != 0) {
                    this.ai.changeState(`walkjump`);
                } else {
                    this.ai.changeState(`jump`);
                }
            }
            if (Input.it.isKeyPress(Input.it.yes)) {
                this.ai.changeState(`attack`);
            }
            if (Input.it.isKeyPress(Input.it.sub)) {
                this.ai.changeState(`special`);
            }
        } else {
            this.ai.changeState(`fall`);
        }
        return true;
    }
}
