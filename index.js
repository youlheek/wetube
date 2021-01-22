import express from "express";

//const express = require('express'); 
// express를 호출해서 node_modules에서 import를 함
// require가 하는 일 : some modules를 가져오는 역할을 함. 
// 이 경우에는 express 라는 이름의 폴더를 내 파일들 속에서 찾으려고 함. 
// 없으면 node_modules에서 찾음
const app = express();
// express 실행

const PORT = 4000;

const handleListening = () => console.log(`Listening on :http://localhost:${PORT}`);

// // respond with "hello world" when a GET request is made to the homepage
// app.get('/', function(req, res) {
//   res.send('hello world');
// });

const handleHome = (req, res) => res.send("Hello from home");

const handleProfile = (req, res) => res.send("You are on my profile");

const betweenHome = (req, res, next) => {
    console.log("You got the Between of me");
    next();
}

/* -- MIDDLEWARE-- */
app.use(betweenHome);
// middleware를 get 함수에 놓지 않고 use에 놓음으로서 
// path : / or /profile 에 접속하는 모든 상황에 middleware를 호출할 수 있음


/* ROUTE */
app.get("/", handleHome);
// 1. GET request로 서버에 요청하면 get method가 받으면서 handleHome 함수를 실행하게됨
// 그러나 request만 존재하고 response는 없기 때문에 영원히 로딩 상태임.
// 보통 서버가 하는 일은 HTML로 응답하는 일

// 2. betweenHome 이라는 함수가 추가됨으로써 middleware가 생겼음
// 서버는 path "/"의 요청을 처리하기 전에 betweenHome 함수를 먼저 호출하게 됨
// 그런데 betweenHome 함수에 req, res 파라미터밖에 존재하지 않으므로 계속 요청 상태에 머물러있게 됨. (handleHome함수로 넘어가지 않고)
// 이 때 next 파라미터를 추가하고 함수 내부에서 호출함으로써 handleHome 함수로 넘어감.

// 3. middleware는 원하는 만큼 가질 수 있음.
// middleware함수로 로그인 여부를 확인할 수도 있음.
// 파일을 전송할 때 중간에 가로채서 upload 할 수 있음
// 웹사이트에 접속한 로그를 쌓을 수 있음.

app.get("/profile", handleProfile);


app.listen(PORT, handleListening);
// listening 시작하면서 handleListening 함수 호출