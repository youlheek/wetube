const express = require('express'); 
// express를 호출해서 node_modules에서 import를 함
// require가 하는 일 : some modules를 가져오는 역할을 함. 
// 이 경우에는 express 라는 이름의 폴더를 내 파일들 속에서 찾으려고 함. 
// 없으면 node_modules에서 찾음
const app = express();
// express 실행

const PORT = 4000;

function handleListening(){
    console.log('Listening on :http://localhost:4000');
}

// // respond with "hello world" when a GET request is made to the homepage
// app.get('/', function(req, res) {
//   res.send('hello world');
// });

function handleHome(req, res){
    console.log(req);
    res.send("Hello from home");
}

function handleProfile(req, res){
    res.send("You are on my profile");
}

app.get("/", handleHome);
// GET request로 서버에 요청하면 get method가 받으면서 handleHome 함수를 실행하게됨
// 그러나 request만 존재하고 response는 없기 때문에 영원히 로딩 상태임.
// 보통 서버가 하는 일은 HTML로 응답하는 일

app.get("/profile", handleProfile);

app.listen(PORT, handleListening);
// listening 시작하면서 handleListening 함수 호출