
const mongoose = require('mongoose')
const Restaurant = require('../restaurants') //模型
const restaurantList = require('../../restaurant.json').results
const db = require('../../config/mongoose')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// 連線成功 用once因為連線成功只會一次 之後就會拿掉
db.once('open', () => {
  console.log('mongodb connected!')
  Restaurant.create(restaurantList)
    .then(console.log('restaurantSeeder success!'))
    .catch((error) => console.log(error))
})

