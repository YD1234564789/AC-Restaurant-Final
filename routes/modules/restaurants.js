const express = require('express')
const router = express.Router()
const restaurantList = require('../../models/restaurants')

// 新增
router.get('/new', (req, res) => {
  res.render('new')
})
// 接收新增的表單
router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  restaurantList.create({ name, name_en, category, image, location, phone, google_map, rating, description, userId })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// 瀏覽詳細資料
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return restaurantList.findOne({ _id, userId})
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// 修改資料
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  restaurantList.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})
// 更新資料
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  return restaurantList.findOneAndUpdate(
    { _id, userId },
     {
      $set: { 
      name,
      name_en,
      category,
      image,
      location,
      phone,
      google_map,
      rating,
      description 
      }
    },
    { new: true}
  )
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(err => console.log(err))
})
// 刪除資料
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  restaurantList.findByIdAndDelete(_id)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})


module.exports = router