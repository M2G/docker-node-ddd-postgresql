"use strict";
const path = require('path');
module.exports = function createControllerRoutes(controllerUri) {
    const controllerPath = path.resolve('src/interfaces/http/modules', controllerUri);
    const Controller = require(controllerPath);
    return Controller();
};
//# sourceMappingURL=create_controller.js.map