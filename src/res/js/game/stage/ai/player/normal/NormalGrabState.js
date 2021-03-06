/**
 * State of normal grab action
 * @implements {UnderPlayerState}
 * @classdesc State for normal grab action
 */
class NormalGrabState extends UnderPlayerState { // eslint-disable-line  no-unused-vars
    /**
     * Normal Grab state constructor
     * @constructor
     */
    constructor() {
        super();

        /**
         * Count for action
         * @private
         * @type {number}
         */
        this.underCount_ = 0;
    }

    /**
     * Initialize state
     * @override
     */
    init() {
        this.underCount_ = 0;
        this.entity.collider.fixBoundDirectly(0, 32, 64, 64);
    }

    /**
     * Set entity for targeting
     * @override
     * @param {AutonomyObject} entity Entity for tageting
     */
    setEntity(entity) {
        if (BaseUtil.implementsOf(entity, UnderPlayable)) {
            super.setEntity(entity);
        }
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt - delta time
     * @return {bool} Whether decided on action
     */
    apply(dt) {
        // judge
        if (!Util.onGround(this.entity) || !Input.it.isKeyPressed(Input.it.down)) {
            if (++this.underCount_ > 5) {
                if (this.entity.body.isFix) {
                    this.ai.changeState(`stationary`);
                } else {
                    this.ai.changeState(`walk`);
                }
                this.stateAnimation.init();
            }
        } else {
            this.entity.body.setNextAddVelocity(-this.entity.body.preVelocityX / 101, 0);
            this.underCount_ = 0;
        }
        if (this.stateAnimation.isEnded() && this.underCount_ == 0) {
            // change
            let ground = Util.getUnderEntity(this.entity);
            if (BaseUtil.implementsOf(ground, Terrainable)) {
                this.entity.changeType(ground.getTerrainID());
            }
        }
        return true;
    }
}
