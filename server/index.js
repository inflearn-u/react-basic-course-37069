const config = require('./config/key');
const express = require('express');
const app = express()
const port = 3001

// Dom parser
const bodyParser = require('body-parser');

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))
// application/json
app.use(bodyParser.json())

const cookieParser = require('cookie-parser');
app.use(cookieParser());

// DB config
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
    useNewUrlParser : true, 
    useUnifiedTopology : true,
    useCreateIndex : true,
    useFindAndModify : true
})
 .then(()=> console.log('MongoDB Connected...'))
 .catch(err => console.log(err))

 // DB model
 const { User } = require("./models/User")

 // middleware
const { auth } = require('./middleware/auth');

// REST Api
app.get('/', (req,res) => res.send('Hello World!'))

app.get('/api/hello', (req,res) => {

    res.send('안녕하세요ㅎ')
})

app.post('/api/user/register', (req, res) => {

    // 회원 가입시 필요한 정보를 client에서 가져와서 DB에 넣는다.
    const user = new User(req.body)

    // pre가 실행됨.
    user.save((err, userInfo) => {
        if (err) return res.json({success: false, err })
        return res.status(200).json({
            success: true,
            data: userInfo
        })
    })
})

app.post('/api/user/login', (req, res) => {

    // 1. 데이터 베이스 안에서 요청된 user 찾기
    User.findOne({email : req.body.email }, (err, user) => {
        if (err) return res.json({success: false, err })
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다.",
            })
        }

        // 2. 요청된 이메일이 데이터 베이스에 있다면, 비밀번호가 맞는 비밀번호 인지 확인.
        user.comparePassword(req.body.password, ( err, isMatch) => {
            if(!isMatch)
                return res.json({
                    loginSuccess: false,
                    message: "비밀번호가 틀렸습니다.",
                });
                

                // 3. 비밀번호까지 같다면, token 생성
                user.generateToken((err, user) => {
                    if (err) return res.status(400).send(err);
                    // 토큰을 저장한다. (쿠키, 로컬스토리지, )
                    res.cookie ("x_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true,
                        userId: user._id,             
                    })
                })
        })

    })

})

// 2nd middleware
app.get('/api/user/auth', auth, (req, res) => {

    // middleware 을 통과 했다면, Authentication 이 true 라는 것!
    // 정보를 전달 해도 괜찮다!
    res.status(200).json({
        _id : req.user._id,
        isAdmin : req.user.role === 0? false : true, 
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    });
})

app.get('/api/user/logout', auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, {token : ""}, (err, user) => {
        if (err) return res.json({success: false, err});
        return res.status(200).send({
            success: true
        });
    })
})

app.listen(port, ()=> console.log(`Example app listening on port ${port}!`))