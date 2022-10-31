const router = require('express').Router()

const { User, Blog } = require('../models')

router.get('/', async (req, res) => {
    const users = await User.findAll({
        include: {
            model: Blog,
            attributes: { exclude: ['userId'] }
        }
    })
    res.json(users)
})

router.post('/', async (req, res) => {
    const user = await User.create(req.body)
    res.json(user)
   
})

router.get('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id,{
        attributes: { exclude: [''] },
        include: [
        {
            model: Blog,
             as: 'readings',
            attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] },
            through: {
                as: 'readinglists',
                attributes: ['unread', 'id']
            }
        }
        ]
    })
    if (user) {
        res.json(user)
    } else {
        res.status(404).end()
    }
})

router.put('/:username', async (req, res) => {
    const user = await User.findOne({
        where: {
            username: req.params.username
        }
    })
    if (user) {
        user.username = req.body.username
        await user.save()
        res.json(user)
    } else {
        res.status(404).json({error: "user does not exist"})
    }
})

module.exports = router