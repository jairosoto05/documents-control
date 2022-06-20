const Router = require('express');
const router = Router();

const { create, getAll, getById } = require('../controllers/record.controller');

router.route('/')
    .get(getAll)
    .post(create);
    
router.route('/:id')
    .get(getById);


module.exports = router;