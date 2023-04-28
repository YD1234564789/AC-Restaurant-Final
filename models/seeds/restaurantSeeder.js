
const mongoose = require('mongoose')
const Restaurant = require('../restaurants') //模型
const restaurantList = require('../../restaurant.json').results

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}


//後面use那串用於取消warning
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功 用once因為連線成功只會一次 之後就會拿掉
db.once('open', () => {
  console.log('mongodb connected!')
  Restaurant.create(restaurantList)
    .then(console.log('restaurantSeeder success!'))
    .catch((error) => console.log(error))
})

