/**
 * JSON parser to generate stage
 * It can also be used as a builder pattern
 * @implements {StageParser}
 * @classdesc JSON parser to generate stage
 */
class JSONStageParser extends StageParser { // eslint-disable-line  no-unused-vars
    /**
     * Make base stage for parsing stage
     * @protected
     * @return {Stage} stage instance for base of parsing
     */
    makeBaseStage() {
        return new SplitManagementStage();
    }

    /**
     * Make base map for parsing stage
     * @protected
     * @param {json} map Map json data
     * @return {Map} map instance for base of parsing
     */
    makeBaseMap(map) {
        let ret = new SequentialMap(map.width, map.height);
        for (let back of map.backs) {
            if (back.type == `Invariant`) {
                let id = ContextImage.it.loadImage(`res/image/back/${back.file}`);
                ret.addMap(new InvariantBackMap(id, map.width, map.height));
            } else {
                console.log(`Not Map: ${map}`);
            }
        }
        return ret;
    }

    /**
     * Make base camera for parsing stage
     * @protected
     * @param {json} camera Camera json data
     * @param {number} width Camera width
     * @param {number} height Camera height
     * @return {Camera} camera instance for base of parsing
     */
    makeBaseCamera(camera, width, height) {
        return new CenterCamera(width, height);
    }

    /**
     * Make base phisical world for parsing stage
     * @protected
     * @return {PhysicalWorld} Physical world instance for base of parsing
     */
    makeBaseWorld() {
        let world = new SequentialWorld();
        world.setResponse(new RepulsionResponse());
        return world;
    }

    /**
     * Make tile object
     * @protected
     * @param {json} tile Tile information json data
     * @param {json} chip Chip actually placed json data
     * @return {TileObject} tile object
     */
    makeTileObject(tile, chip) {
        let ret = new TileObject(tile.x, tile.y, tile.width, tile.height, chip.x, chip.y, chip.width, chip.height, tile.file);
        // set collider
        let collider = tile.collider;
        if (collider.type == `Rectangle`) {
            ret.setCollider(new RectangleCollider(collider.startX, collider.startY, collider.width, collider.height));
        } else if (collider.type == `Circle`) {
            ret.setCollider(new CircleCollider(ret.radius, ret.shiftX, ret.shiftY));
        } else if (collider.type == `RoundRectangle`) {
            ret.setCollider(new RoundRectangleCollider(collider.startX, collider.startY, collider.width, collider.height, ret.cut));
        }
        // set material
        let material = tile.material;
        ret.setMaterial(new DefaultMaterial(material.mass, material.elasticity, material.mu));
        return ret;
    }

    /**
     * Parset file to stage
     * @override
     * @param {string} filePath stage file path
     * @param {number} width stage width for rendering area
     * @param {number} height stage height for rendering area
     * @return {Stage} stage instance
     */
    parse(filePath, width, height) {
        // Load stage file
        let req = new XMLHttpRequest();
        req.open(`GET`, filePath, false);
        req.send(null);
        // get stage file data
        let json = JSON.parse(req.responseText);
        let stage = this.makeBaseStage();
        stage.setMap(this.makeBaseMap(json.map));
        stage.setCamera(this.makeBaseCamera(json.camera, width, height));
        stage.setPhysicalWorld(this.makeBaseWorld());
        let tiles = {};
        for (let tile of json.tiles) {
            let fileID = ContextImage.it.loadImage(`res/image/tile/${tile.file}`);
            for (let chip of tile.chips) {
                tiles[chip.id] = chip;
                tiles[chip.id].file = fileID;
            }
        }
        for (let layer of json.layers) {
            for (let chip of layer) {
                stage.addEntity(this.makeTileObject(tiles[chip.id], chip));
            }
        }
        return stage;
    }
}