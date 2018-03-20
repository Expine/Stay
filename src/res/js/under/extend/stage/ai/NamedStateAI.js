/**
 * Named state AI
 * AI with state
 * Manage the state with a name
 * @implements {StateAI}
 * @classdesc AI with state for determining action
 */
class NamedStateAI extends StateAI { // eslint-disable-line  no-unused-vars
    /**
     * Base State AI Constructor
     * @param {string} state Initial state name
     */
    constructor(state) {
        super();

        /**
         * AI State
         * @private
         * @type {State}
         */
        this.state_ = null;

        /**
         * AI State name
         * @private
         * @type {string}
         */
        this.stateName_ = state;

        /**
         * List of named states
         * Associates a name with a state
         * @protected
         * @type {Array<Constructor>}
         */
        this.namedStates = {};
    }

    /**
     * Initialize AI
     * @override
     */
    init() {
        let state = this.stateName_;
        this.stateName_ = ``;
        this.changeState(state);
    }

    /**
     * Apply AI and decide action
     * @override
     * @param {number} dt - delta time
     * @return {bool} Whether decided on action
     */
    apply(dt) {
        return this.state_.apply(dt);
    }

    /**
     * Get state
     * @override
     * @return {State} state of ai
     */
    getState() {
        return this.state_;
    }

    /**
     * Change state
     * @override
     * @param {string} state State to change
     */
    changeState(state) {
        // Do not process if it is in the same state
        if (state == this.stateName_) {
            return;
        }
        this.stateName_ = state;
        this.state_ = new this.namedStates[state]();
        this.state_.setEntity(this.entity);
        this.state_.setAI(this);
        this.state_.init();
    }
}
