# REACT ( react-basic-course-37069 )

Github : [https://github.com/inflearn-u/react-basic-course-37069.git](https://github.com/inflearn-u/react-basic-course-37069.git)

doc : [https://ko.reactjs.org/docs/getting-started.html](https://ko.reactjs.org/docs/getting-started.html)

## PORT

| server | client |
| --- | --- |
| 3001   | 3000   | 

1. 서버 ( node.js )

    ```bash
    choco upgrade nodejs
    $ node -v
    v16.0.0
    $ npm -v
    npm notice
    npm notice New minor version of npm available! 7.10.0 -> 7.11.1
    npm notice Changelog: <https://github.com/npm/cli/releases/tag/v7.11.1>
    npm notice Run `npm install -g npm@7.11.1` to update!
    npm notice
    7.10.0
    ```

2. 디렉토리 생성

3. npm init 

4 npm install express --save

## DB ( mongodb )

1. [https://cloud.mongodb.com/v2#/org/5ea83e538dea4c22b050cd10/projects](https://cloud.mongodb.com/v2#/org/5ea83e538dea4c22b050cd10/projects)

    [https://cloud.mongodb.com/v2/6087f92e89a3a505492461dc#metrics/replicaSet/6115b6b58a7258502df11f00/explorer/myFirstDatabase/users/find](https://cloud.mongodb.com/v2/6087f92e89a3a505492461dc#metrics/replicaSet/6115b6b58a7258502df11f00/explorer/myFirstDatabase/users/find)

    - create cluster >> connect >> connect application
2. npm install mongoose --save 

**Code**

```diff
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req,res) => res.send('Hello World!'))

app.listen(port, ()=> console.log(`Example app listening on port ${port}!`))
```

**설정 ( package.json )**

```diff
"scripts": {
 +   "start":"node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
```

npm run start ( [http://localhost:3000/](http://localhost:3000/) )

1. **Connect DB Object**
    - DB Concept
        - `Schema` :
            - Users

                ```diff
                name : String  | 50
                email : String | unique
                password : String | 5
                lastname : String | 50
                role : Number | 0
                image : String 
                token : String 
                tokenExp : Number
                ```

2. Dom Parser
    - BodyParser
        - npm install body-parser --save
        - application/json ,  application/x-www-form-urlencoded 지원

3.  CI/CD
    - reload server
        - npm install nodemon --save-dev

            ```diff
            "scripts": {
                "start": "node index.js",
              + "watch": "nodemon index.js",
                "test": "echo \"Error: no test specified\" && exit 1"
              }
            ```

---

## Content

### 가)  소스안의 비밀 값을 Git에서 ignore

1. DB connection string 
2. "qa"/ "prod" config 분리
    1. dev 파일 ignore 처리 / proeuction 은 환경변수 처리

### 나 ) 암호화

- npm install bcrypt --save
- 순서 :  pre → save

```diff
userSchema.pre('save', function(next) {
```

- salt 로 패스워드 암호화하여 저장

```diff
bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
         user.password = hash
```

### 다) 로그인 기능 ( ROUTER )

1. 데이터 베이스 안에서 요청된 user 찾기

2. 요청된 이메일이 데이터 베이스에 있다면, 비밀번호가 맞는 비밀번호 인지 확인

3. 비밀번호까지 같다면, token 생성

npm install jsonwebtoken --save

1. 쿠키

    npm install cookie-parser --save

2. Auth

    ![Untitled](REACT%20(%20react-basic-course-37069%20)%20255bea4b40df4844b728d68f126cea84/Untitled.png)

### 라) Babel / Webpack

`Babel` : 구형 브라우저 호환 해주는것 (  javascript version + brower 호환 ) 

`WebPack` : javascript library + framework ⇒ bundle ( module 화 )

**React Start!** 

```diff
$ npx create-react-app .
$ npm run start
```

`npm vs npx` : 

- npm install : registry 역할
- npm run build : build 파일 만듦
- npm 이 전역에다가 다운 해둔걸, npx는 virtual 형태로 받아서 디스크 줆이면서 업글버전임.

1. app.js <시작 페이지>



```
... React 내용 넣을예정 ...
```


### 인증
인증이 있어야만 들어갈 수 있는 페이지 

Higher Order Component : function 임. <br>
    ㄴ 다른 컴포넌트를 받은 다음에 새로운 컴포넌트를 리턴하는 function
    

    ------------------------------------------------------------------------
    | Auth (HOC) ---> Server에서 유저 상태정보 get -> 자격 x --> 다른 페이지  |
    |    -------------------------------------       자격 O                 | 
    |    |                                   |          |                   |
    |    |    LOGGED IN COMPONENT            |  <--------                   |
    |    |      (Admin, Landing)             |                              |
    |    -------------------------------------                              |
    -------------------------------------------------------------------------
        
        1. Auth 컴포넌트가 백앤드에 request 를 날려서
        Landing page에 들어와 있는 유저의 상태정보를 가져온다.
        ex ) 로그인 유저인가, 어드민 유저인가 등 
        2. 자격이 안되면 다른페이지로 보냄

    - HOC 를 작성하고 그 안에 컴포넌트를 넣어주는 방법 
        1. App.js
        2. 안에넣을 컴포넌트를 Auth( ) 로 감싸준다.
            ```
            <Route exact path="/" component={Auth(LandingPage)}></Route>
            ```
        