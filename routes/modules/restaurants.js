const express = require('express')
const router = express.Router()
const restaurantList = require('../../models/restaurants')

// 新增
router.get('/new', (req, res) => {
  res.render('new')
})
// 接收新增的表單
router.post('/', (req, res) => {
  restaurantList.create(req.body)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// 瀏覽詳細資料
router.get('/:id', (req, res) => {
  const id = req.params.id
  return restaurantList.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// 修改資料
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  restaurantList.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})
// 更新資料
router.put('/:id', (req, res) => {
  const id = req.params.id
  restaurantList.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(err => console.log(err))
})
// 刪除資料
router.delete('/:id', (req, res) => {
  const id = req.params.id
  restaurantList.findByIdAndDelete(id)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})


module.exports = router