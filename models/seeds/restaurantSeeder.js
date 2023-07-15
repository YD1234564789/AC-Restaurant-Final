const Restaurant = require('../restaurants') //模型
const restaurantList = require('../../restaurant.json').results
const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs')
const User = require('../user')
const SEED_USER = {
  name: 'admin',
  email: 'admin@admin.com',
  password: 'admin'
}

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      return Promise.all(restaurantList.map(restaurant => Restaurant.create({ 
        name: restaurant.name,
        name_en: restaurant.name_en,
        category: restaurant.category,
        image: restaurant.image,
        location: restaurant.location,
        phone: restaurant.phone,
        google_map: restaurant.google_map,
        rating: restaurant.rating,
        description: restaurant.description,
        userId
      })))
    })
    .then(() => {
      console.log('done!')
      process.exit()
    })
})



// 連線成功 用once因為連線成功只會一次 之後就會拿掉
// db.once('open', () => {
//   console.log('mongodb connected!')
//   Restaurant.create(restaurantList)
//     .then(console.log('restaurantSeeder success!'))
//     .catch((error) => console.log(error))
// })

