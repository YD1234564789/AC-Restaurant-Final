const express = require('express')
const router = express.Router()
const restaurantList = require('../../models/restaurants')

// 首頁
router.get('/', (req, res) => {
  restaurantList.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

// 搜尋功能
router.get('/search', (req, res) => {
  const keywords = req.query.keywords
  const keyword = keywords.trim().toLowerCase()

  if (!keywords) {
    return res.redirect('/')
  }
  restaurantList.find({})
    .lean()
    .then(restaurantList => {
      const filterRestaurantsList = restaurantList.filter(
        data =>
          data.name.toLowerCase().includes(keyword) ||
          data.category.includes(keyword)
      )
      res.render('index', { restaurants: filterRestaurantsList, keywords })
    })
    .catch(err => console.log(err))
})



module.exports = router