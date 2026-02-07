//npm import
import express, {Router} from 'express';
import {createPark, getPark, getParkById, updatePark, deletePark} from '../controllers/parks';

const router: Router = express.Router();

// urls for crud functions
router.post('/', createPark);
router.get('/', getPark);
router.get('/:id', getParkById);
router.put('/:id', updatePark);
router.delete('/:id', deletePark);

export default router;