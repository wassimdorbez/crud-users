const express = require('express');
const { AddUser, FindAllUsers, FindSingleUser, PutUser, DeleteUser } = require('../controllers/users.controller');
const router = express.Router()

/*ADD USER*/
router.post('/users', AddUser)

/*FIND ALL USERS*/
router.get('/users', FindAllUsers)

/*FIND SINGLE USER*/
router.get('/users/:id', FindSingleUser)
/*PUT USER*/
router.put('/users/:id', PutUser)
/*DELETE USER*/
router.delete('/users/:id', DeleteUser)


module.exports = router;