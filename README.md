# AC-Restaurant-Final
我的餐廳清單
---

![seeder](https://github.com/YD1234564789/AC-Restaurant-Final/assets/67455167/e7957dc5-8f9a-40fa-b1a3-c57da46f3a33)



介紹
---
紀錄屬於自己的餐廳清單，可以瀏覽餐廳、查看詳細資訊、甚至連結到地圖。

功能
---
* 使用者可以Email或Facebook註冊
* 登入以查看使用者餐廳列表
* 瀏覽單筆餐廳的詳細資訊
* 編輯單筆餐廳的詳細資訊
* 刪除餐廳
* 搜尋符合名稱或類型的餐廳
* 可供使用者於搜尋中自訂排序規則

開始使用
---
請先確認有安裝 Node.js 與 npm

透過終端機輸入以下指令將專案 Clone 到本地
```
$ git clone https://github.com/YD1234564789/AC-Restaurant-Final.git
```
進入此專案資料夾
```
$ cd AC-Restaurant-Final
```
輸入以下指令以安裝 npm 套件
```
$ npm install
```
參考 .env.example 設置你的環境變數文件 .env
```
MONGODB_URI=SKIP
FACEBOOK_ID=SKIP
FACEBOOK_SECRET=SKIP
FACEBOOK_CALLBACK=http://localhost:3000/auth/facebook/callback
SESSION_SECRET=SKIP
PORT=3000
```
可自行依需求建立種子資料
```
$ npm run seed
```
輸入以下指令以啟動本專案
```
$ npm run start
```
若看見此行訊息則代表順利運行，打開瀏覽器進入到以下網址
**Express is listening on localhost:3000**  
```
http://localhost:3000
```
若欲暫停使用
```
ctrl + c
```
開發工具
---
* Node.js: 18.14.0
* Express: 4.16.4
* Bootstrap: 5.1.3
* Bcrypt.js: 2.4.3
* Body-parser: 1.20.2
* Connect-flash: 0.1.1
* Express-handlebars: 4.0.2
* Express-session: 1.17.1
* Method-override: 3.0.0
* Mongoose: 6.0.5
* Passport: 0.4.1
* Passport-facebook: 3.0.0
* Passport-local: 1.0.0
