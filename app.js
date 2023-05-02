const express = require('express')
const exphbs = require('express-handlebars')
const restaurantList = require('./models/restaurants')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
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

const port = 3000
const app = express()

// express template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

// routes setting...
app.get('/', (req, res) => {
  restaurantList.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

//新增
app.get('/restaurants/new', (req, res) => {
  res.render('new')
})
//接收新增的表單
app.post('/restaurants', (req, res) => {
  restaurantList.create(req.body) 
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

//瀏覽詳細資料
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return restaurantList.findById(id)
    .lean()
    .then(restaurant => res.render('show', {restaurant}))
    .catch(error => console.log(error))
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter((restaurant) => {
    return restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase()) ||
      restaurant.category.includes(keyword)
  })
  res.render('index', { keyword: keyword, restaurants: restaurants })
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})