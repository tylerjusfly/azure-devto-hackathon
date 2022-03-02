const express = require('express');
const router = express.Router();
const {DishCtrl} = require('../controllers/dish')
const auth = require('../middlewares/auth')

router.post('/dish', auth.validateToken, DishCtrl.CreateDish);
router.get('/', DishCtrl.Getall);
router.delete('/:id', auth.validateToken, DishCtrl.Delete)




module.exports = router;