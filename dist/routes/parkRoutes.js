"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//npm import
const express_1 = __importDefault(require("express"));
const parks_1 = require("../controllers/parks");
const router = express_1.default.Router();
// urls for crud functions
router.post('/', parks_1.createPark);
router.get('/', parks_1.getPark);
router.get('/:id', parks_1.getParkById);
router.put('/:id', parks_1.updatePark);
router.delete('/:id', parks_1.deletePark);
exports.default = router;
