const express = require('express')
const exphbs = require('express-handlebars')
const restaurantList = require('./models/restaurants')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const port = 3000
const app = express()

// 僅非正式環境使用dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// 建立連線
mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})


// express template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))


// routes setting...
app.get('/', (req, res) => {
  restaurantList.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

// 新增
app.get('/restaurants/new', (req, res) => {
  res.render('new')
})
// 接收新增的表單
app.post('/restaurants', (req, res) => {
  restaurantList.create(req.body) 
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// 瀏覽詳細資料
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return restaurantList.findById(id)
    .lean()
    .then(restaurant => res.render('show', {restaurant}))
    .catch(error => console.log(error))
})

// 修改資料
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  restaurantList.findById(id)
    .lean()
    .then(restaurant => res.render('edit', {restaurant}))
    .catch(error => console.log(error))
})
// 更新資料
app.put('/restaurants/:id', (req, res) => {
  const id = req.params.id
  restaurantList.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(err => console.log(err))
})
// 刪除資料
app.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id
  restaurantList.findByIdAndDelete(id)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})


app.get('/search', (req, res) => {
  const keywords = req.query.keywords
  const keyword = keywords.trim().toLowerCase()

  if (!keywords) {
    return res.redirect('/')
  }

  restaurantList.find({})
    .lean()
    .then(restaurantList =>  {
      const filterRestaurantsList = restaurantList.filter(
        data =>
          data.name.toLowerCase().includes(keyword) ||
          data.category.includes(keyword)
      )
      res.render('index', { restaurants: filterRestaurantsList, keywords })
    })
    .catch(err => console.log(err))
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})