const express = require('express')
const app = express()
const port = 3000

// Dom parser
const bodyParser = require('body-parser');

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))
// application/json
app.use(bodyParser.json())

// DB config
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://guest:I9NOvuzHiCMVFGAi@ec-config-cluster01.lntsd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser : true, 
    useUnifiedTopology : true,
    useCreateIndex : true,
    useFindAndModify : true
})
 .then(()=> console.log('MongoDB Connected...'))
 .catch(err => console.log(err))

 // DB model
 const { User } = require("./models/User")


// REST Api
app.get('/', (req,res) => res.send('Hello World!'))
app.post('/register',(req,res) => {
    // 회원 가입시 필요한 정보를 client에서 가져와서 DB에 넣는다.

    const user = new User(req.body)
    // user.save()  // user model object binding
    user.save((err, userInfo) => {
        if(err) return res.json({success: false, err })
        return res.status(200).json({
            success: true
        })
    })
})



app.listen(port, ()=> console.log(`Example app listening on port ${port}!`))