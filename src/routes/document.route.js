const Router = require('express');
const router = Router();

const { create, getAll, getById, update, delete: deleteDocument } = require('../controllers/document.controller');

router.route('/')
    .get(getAll)
    .post(create);

router.route('/:id')
    .get(getById)
    .put(update)
    .delete(deleteDocument);
    
module.exports = router;