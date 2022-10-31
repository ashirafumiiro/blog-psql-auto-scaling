const router = require('express').Router()
const { Op } = require('sequelize')

const { Blog } = require('../models')
const {sequelize} = require('../util/db')

router.get('/', async (req, res) => {

    const blogs = await Blog.findAll({
        attributes: [
            'author',
            [sequelize.fn('sum', sequelize.col('likes')), "likes"],
            [sequelize.fn('COUNT', sequelize.col('id')), "articles"],
        ],
        group: ['author'],
        order: [[sequelize.fn('sum', sequelize.col('likes')), "DESC"]]
    })
    res.json(blogs)
})

module.exports = router