const express = require('express')
const recievers = require('../recievers/todo')
const router = express.Router()


router.post('/createToDo',recievers.createToDo)
router.post('/changeToDo',recievers.changeToDo)
router.post('/deleteToDo',recievers.deleteToDo)
router.post('/getToDo',recievers.getToDo)
router.post('/copyToDo',recievers.copyToDo)

module.exports = router