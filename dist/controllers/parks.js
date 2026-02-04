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
 * /api/v1/parks:
 *   post:
 *     summary: Create a new park
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               title:
 *                 type: string
 *     responses:
 *       201:
 *         description: park created
 *       400:
 *         description: Bad request
 */
router.post('/', async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ 'err': 'Invalid Request Body' }); // 400: Bad Request
    }
    await park_1.default.create(req.body); // add new park to db from request body via Park model
    return res.status(201).json(); // 201: resource created
});
/**
 * @swagger
 * /api/v1/parks:
 *   get:
 *     summary: Retrieve all parks
 *     responses:
 *       200:
 *         description: A list of parks
 */
router.get('/', async (req, res) => {
    const parks = await park_1.default.find();
    if (!parks || parks.length === 0) {
        return res.status(404).json({ message: 'No parks found' });
    }
    return res.status(200).json(parks);
});
/**
 * @swagger
 * /api/v1/parks/{id}:
 *   get:
 *     summary: Retrieve one parks
 *     responses:
 *       200:
 *         description: A single resource from Parks
 */
router.get('/:id', async (req, res) => {
    const park = await park_1.default.findById(req.params.id);
    if (!park) {
        return res.status(404).json({ message: 'Park not found' });
    }
    return res.status(200).json(park);
});
/**
 * @swagger
 * /api/v1/parks/{id}:
 *  put:
 *    summary: Update a park by id
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Numeric id of the park to update
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: integer
 *              title:
 *                type: string
 *    responses:
 *      204:
 *        description: Park updated successfully
 *      400:
 *        description: Bad Request - Id parameter missing
 */
router.put('/:id', async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({ 'error': 'Bad Request - Id parameter missing' }); // validate we have an id value
    }
    await park_1.default.findByIdAndUpdate(req.params.id, req.body);
    return res.status(204).json({ 'msg': 'Park Updated' }); // 204: No Content
});
/**
 * @swagger
 * /api/v1/games/{id}:
 *  delete:
 *    summary: Remove a park by id
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: Numeric id of the park to delete
 *    responses:
 *      204:
 *        description: Park deleted successfully
 *      400:
 *        description: Bad Request - Id parameter missing
 */
router.delete('/:id', async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({ 'error': 'Bad Request - Id parameter missing' }); // validate we have an id value
    }
    await park_1.default.findByIdAndDelete(req.params.id);
    return res.status(204).json({ 'msg': 'Park Deleted' }); // 204: No Content
});
// make controller public
exports.default = router;
