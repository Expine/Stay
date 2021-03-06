/**
 * Selection interface
 * Selects something and set selected
 * @implements {Layer}
 * @classdesc Selection to select something and set selected
 */
class Selection extends Interface { // eslint-disable-line  no-unused-vars
    /**
     * Selection constructor
     * @constructor
     */
    constructor() {
        super();
        this.addMethod(this.getSelected);
        this.addMethod(this.setSelected);
    }

    /**
     * Get selected ID
     * @interface
     * @return {number} Selected ID (return -1 if not selected)
     */
    getSelected() {}

    /**
     * Set selected by ID
     * @interface
     * @param {number} id Selected ID
     */
    setSelected(id) {}
}
