/**
 * Scene base class
 * @classdesc Scene base class for extend
 */
class Scene {
    /**
     * Render scene
     * @param {CanvasRenderingContext2D} ctx
     */
    render(ctx) {}
    /**
     * Update scene
     * @param {number} dt - delta time
     */
    update(dt) {}
}