"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const park_1 = __importDefault(require("../models/park"));
const router = express_1.default.Router();
/**
 * @swagger
 * /api/v1/games:
 *   get:
 *     summary: Retrieve all games
 *     responses:
 *       200:
 *         description: A list of games
 */
router.get('/', async (req, res) => {
    const parks = await park_1.default.find();
    if (!parks || parks.length === 0) {
        return res.status(404).json({ message: 'No parks found' });
    }
    return res.status(200).json(parks);
});
// make controller public
exports.default = router;
