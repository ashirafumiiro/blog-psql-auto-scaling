const router = require('express').Router()
const { Op } = require('sequelize')

const { ReadingList } = require('../models')
const { sequelize } = require('../util/db')

router.post('/', async (req, res) => {
    const item = await ReadingList.create({ ...req.body})
    return res.json(item)
})

module.exports = router