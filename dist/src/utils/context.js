"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValidated = getValidated;
function getValidated(c, key) {
    const data = c.get(key);
    if (!data) {
        throw new Error(`Validated data not found for key: ${key}`);
    }
    return data;
}
//# sourceMappingURL=context.js.map