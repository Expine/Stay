/**
 * Single entity layer
 * Selects a entity
 * @implements {SelectionLayer}
 * @classdesc Entity layer to select a entity
 */
class SingleEntityLayer extends SelectionLayer { // eslint-disable-line  no-unused-vars
    /**
     * Single entity layer constructor
     * @constructor
     * @param {json} info Entity inforamtion json data
     */
    constructor(info) {
        super(-1);

        /**
         * Entity information json data
         * @protected
         * @type {json}
         */
        this.entity = info;

        /**
         * Entity animation
         * @type {Animation}
         */
        this.animation = new SingleAnimation();
        if (info.animation === undefined) {
            let file = info.file;
            this.animation.addAnimation(new AnimationElement(file, 0, 0, 32, 32, 200));
        } else {
            for (let it in info.animation) {
                if (info.animation.hasOwnProperty(it) && info.animation[it].animation !== undefined) {
                    let file = info.file;
                    for (let anime of info.animation[it].animation[0].list) {
                        this.animation.addAnimation(new AnimationElement(file, anime.srcX, anime.srcY, anime.srcW, anime.srcH, anime.delta));
                    }
                    break;
                }
            }
        }

        /**
         * Selection entity
         * @protected
         * @type {json}
         */
        this.selectEntity = null;

        /**
         * Selected entity
         * @protected
         * @type {json}
         */
        this.selectedEntity = null;
    }

    /**
     * Get selected entity ID
     * @override
     * @return {number} Selected entity ID (return -1 if not selected)
     */
    getSelected() {
        return this.selectedEntity == null ? -1 : this.selectedEntity.id;
    }

    /**
     * Set selected entity by ID
     * @override
     * @param {number} id Entity ID (if not selected, -1)
     */
    setSelected(id) {
        this.selectedEntity = id < 0 ? null : this.entity;
    }

    /**
     * Set Selection layer position
     * @override
     * @param {number} x Chip layer x position
     * @param {number} y Chip layer y position
     * @param {number} width Chip layer width
     * @param {number} height Chip layer height
     */
    setPosition(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = this.entity.width;
        this.height = this.entity.height;
    }

    /**
     * Update layer
     * @override
     * @param {number} dt - delta time
     */
    update(dt) {
        this.animation.update(dt);
        this.selectEntity = null;
        let x = Input.it.getMouseX() - this.x;
        let y = Input.it.getMouseY() - this.y;
        // check layer
        if (0 <= x && x < this.width && 0 <= y && y < this.height) {
            this.selectEntity = this.entity;
        }
        if (Input.it.isMousePress(Input.it.M.LEFT)) {
            this.selectedEntity = this.selectEntity;
        }
    }

    /**
     * Render layer
     * @override
     * @param {Context} ctx
     */
    render(ctx) {
        this.animation.render(ctx, this.x, this.y, this.width, this.height);
        if (this.selectEntity != null) {
            ctx.strokeRect(this.x, this.y, this.width, this.height, `red`);
        }
        if (this.selectedEntity != null) {
            ctx.strokeRect(this.x, this.y, this.width, this.height, `white`);
        }
    }
}
