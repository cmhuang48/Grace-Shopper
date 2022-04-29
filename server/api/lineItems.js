const router = require('express').Router()
const { models: { LineItem, User, Order }} = require('../db')
module.exports = router

// get all lineItems
router.get('/', async (req, res, next) => {
  try {
    const lineItems = await LineItem.findAll()
    res.json(lineItems)
  } catch (err) {
    next(err)
  }
})

// get lineItem details
router.get('/:id', async (req, res, next) => {
  try {
    res.json(await LineItem.findByPk(req.params.id))
  } catch (err) {
    next(err)
  }
})

// create a new lineItem
router.post('/', async (req, res, next) => {
  try {
   res.status(201).json(await LineItem.create(req.body))
  } catch (err) {
    next(err)
  }
})

// update a lineItem
router.put('/:id', async (req, res, next) => {
  try {
    const { localStorage } = req.body
    if (localStorage) {
      const user = await User.findByToken(req.headers.authorization)
      const order = await Order.findOne({
        where: {
          status: 'cart',
          userId: user.id
        }
      })
      const lineItems = await LineItem.findAll({
        where: {
          orderId: order.id
        }
      })

      for (let i = 0; i < localStorage.length; i++) {
        let change = false
        for (let j = 0; j < lineItems.length; j++) {
          if (localStorage[i].productId*1 === lineItems[j].productId) {
            await lineItems[j].update({quantity: lineItems[j].quantity*1 + localStorage[i].quantity*1})
            change = true
          }
        }
        if (!change) {
          const newItem = await LineItem.create({ quantity: localStorage[i].quantity, productId: localStorage[i].productId, orderId: order.id })
          lineItems.push(newItem)
        }
      }

      res.json(lineItems)
    } 
    
    else {
      const lineItem = await LineItem.findByPk(req.body.id)
      res.json(await lineItem.update({ quantity: req.body.quantity*1 }))
    }
  }
  catch (err) {
    next(err)
  }
})

// delete a lineItem
router.delete('/:id', async (req, res, next) => {
  try {
    const lineItem = await LineItem.findByPk(req.params.id)
    await lineItem.destroy()
    res.sendStatus(204)
  }
  catch (err) {
    next(err)
  }
})