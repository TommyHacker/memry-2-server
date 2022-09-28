const express = require('express');
const { gateKeeper } = require('../helpers/gateKeeper');
const router = express.Router();
const {
	getAll,
	getOne,
	postOne,
	patchOne,
	deleteOne,
} = require('../controllers/memryControllers');

router.use(gateKeeper);

// get all memrys
router.get('/', getAll);
// get one memry
router.get('/:id', getOne);
// post one memry
router.post('/', postOne);
// edit one memry
router.patch('/:id', patchOne);
// delete one memry
router.delete('/:id', deleteOne);

module.exports = router;
