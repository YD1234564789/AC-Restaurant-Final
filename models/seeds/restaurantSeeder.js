const Restaurant = require('../restaurants') //模型
const restaurantList = require('../../restaurant.json').results
const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs')
const User = require('../user')
const SEED_USER = [
  {
  name: 'admin1',
  email: 'user1@example.com',
  password: '12345678',
  startIndex: 0,
  endIndex: 3
  },
  {
  name: 'admin',
  email: 'user2@example.com',
  password: '12345678',
  startIndex: 3,
  endIndex: 6
  }
]

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

db.once('open', () => {
  Promise.all(
    SEED_USER.map(seedUser => {
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(seedUser.password, salt))
        .then(hash => User.create({
          name: seedUser.name,
          email: seedUser.email,
          password: hash
      }))
      .then(user => {
        const userId = user._id
        // 切出用戶分配到的餐廳資料
        const userRestaurants = restaurantList.slice(seedUser.startIndex, seedUser.endIndex)
        // 再用切好的部分去create餐廳
        return Promise.all(userRestaurants.map(restaurant => Restaurant.create({
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
  )
})


// db.once('open', () => {
//   Promise.all(
//     SEED_USERS.map(seedUser => {
//       return bcrypt
//         .genSalt(10)
//         .then(salt => bcrypt.hash(seedUser.password, salt))
//         .then(hash => User.create({
//           name: seedUser.name,
//           email: seedUser.email,
//           password: hash
//         }))
//         .then(user => {
//           console.log(`Created user: ${user.name}`);
//           const userId = user._id;

//           const userRestaurants = restaurantList.results.slice(seedUser.startIndex, seedUser.endIndex);

//           return Promise.all(
//             userRestaurants.map(restaurant => {
//               const {
//                 name,
//                 name_en,
//                 category,
//                 image,
//                 location,
//                 phone,
//                 google_map,
//                 rating,
//                 description
//               } = restaurant;

//               return Restaurant.create({
//                 name,
//                 name_en,
//                 category,
//                 image,
//                 location,
//                 phone,
//                 google_map,
//                 rating,
//                 description,
//                 userId
//               });
//             })
//           );
//         })
//         .then(() => {
//           console.log(`Added restaurants for user: ${seedUser.name}`);
//         });
//     })
//   )
// });