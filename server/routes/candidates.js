const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidateController');

router.get('/', candidateController.getAll);
router.get('/:id', candidateController.getById);
router.post('/', candidateController.create);
router.put('/:id', candidateController.update);
router.delete('/:id', candidateController.remove);

module.exports = router;
