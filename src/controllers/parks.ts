import express, { Request, Response, Router } from 'express';
import Park from '../models/park';

const router: Router = express.Router();

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
export const createPark = async (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(400).json({ 'err': 'Invalid Request Body' }); // 400: Bad Request
    }

    await Park.create(req.body); // add new park to db from request body via Park model

    return res.status(201).json(); // 201: resource created
};

/**
 * @swagger
 * /api/v1/parks:
 *   get:
 *     summary: Retrieve all parks
 *     responses:
 *       200:
 *         description: A list of parks
 */
export const getPark = async (req: Request, res: Response) => {
    const parks = await Park.find();

    if (!parks || parks.length === 0) {
        return res.status(404).json({ message: 'No parks found' });
    }

    return res.status(200).json(parks);
};

/**
 * @swagger
 * /api/v1/parks/{id}:
 *   get:
 *     summary: Retrieve one parks
 *     responses:
 *       200:
 *         description: A single resource from Parks
 */
export const getParkById = async (req: Request, res: Response) => {
    const park = await Park.findById(req.params.id);

    if (!park) {
        return res.status(404).json({ message: 'Park not found' });
    }

    return res.status(200).json(park);
};

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
export const updatePark = async (req: Request, res: Response) => {
    if (!req.params.id) {
        return res.status(400).json({ 'error': 'Bad Request - Id parameter missing' }); // validate we have an id value
    }

    await Park.findByIdAndUpdate(req.params.id, req.body);
    return res.status(204).json({ 'msg': 'Park Updated' }); // 204: No Content
};

/**
 * @swagger
 * /api/v1/parks/{id}:
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
export const deletePark = async (req: Request, res: Response) => {
    if (!req.params.id) {
        return res.status(400).json({ 'error': 'Bad Request - Id parameter missing' }); // validate we have an id value
    }

    await Park.findByIdAndDelete(req.params.id);
     return res.status(204).json({ 'msg': 'Park Deleted' }); // 204: No Content
};


// make controller public
export default router;