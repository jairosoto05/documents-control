const Router = require('express');
const router = Router();

const { create, getAll, getById, update, delete: deleteUser, login } = require('../controllers/user.controller');

router.route('/register')
    .post(create);

router.route('/login')
    .post(login);

router.route('/:id')
    .get(getById)
    .put(update)
    .delete(deleteUser);


module.exports = router;