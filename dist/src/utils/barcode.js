"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateBarcode = void 0;
const nanoid_1 = require("nanoid");
const env_1 = require("../config/env");
const nanoidGenerator = (0, nanoid_1.customAlphabet)("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 8);
const generateBarcode = () => env_1.env.BARCODE_PREFIX + nanoidGenerator();
exports.generateBarcode = generateBarcode;
//# sourceMappingURL=barcode.js.map