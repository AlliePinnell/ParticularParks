import express, { Request, Response, Router } from 'express';
import Park from '../models/park';

const router: Router = express.Router();


/**
 * @swagger
 * /api/v1/games:
 *   get:
 *     summary: Retrieve all games
 *     responses:
 *       200:
 *         description: A list of games
 */
router.get('/', async (req: Request, res: Response) => {
    const parks = await Park.find();

    if (!parks || parks.length === 0) {
        return res.status(404).json({ message: 'No parks found' });
    }

    return res.status(200).json(parks);
});

// make controller public
export default router;