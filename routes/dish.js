const express = require('express');
const router = express.Router();
const {DishCtrl} = require('../controllers/dish')
const {auth} = require('../middlewares/auth')

router.post('/dish', auth.requireLogin, DishCtrl.CreateDish);
router.get('/', DishCtrl.Getall);

// Not accepting delete for now
// router.delete('/:id', auth.requireLogin, DishCtrl.Delete)

router.get('/dish', (req, res)=> { res.render('createdish')})




module.exports = router;