const express = require('express');
const router = express.Router();
const {DishCtrl} = require('../controllers/dish')
const {auth} = require('../middlewares/auth')

router.post('/dish', auth.requireLogin, DishCtrl.CreateDish);
router.get('/', auth.requireLogin, DishCtrl.Getall);
router.delete('/:id', auth.requireLogin, DishCtrl.Delete)




module.exports = router;