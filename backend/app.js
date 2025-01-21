import express from 'express';
import { createUser, isRegisteredUser } from './lib/user.js';
import { request } from 'node:http';

// Express {}
const app = express();

app.use(express.urlencoded({ extended: false }));

app.post('/api/signin', async (request, response) => {
  const { useremail, userpassword } = request.body;
  console.log(useremail, userpassword);

  if (!useremail || !userpassword) {
    return response
      .status(400)
      .send('로그인을 시도하려면 이베일, 패스워드 입력이 필요합니다.');
  }

  const result = await isRegisteredUser(useremail, userpassword); // null or true or false

  // null인 경우, 가입한 적이 없는 사용자 싶패!
  if (result === null) {
    return response.status(400).send(`
      <p>${useremail} 이메일 계정으로 가입된 적이 없습니다.</p>
      `);
  }
  if (result) {
    // true인 경우, 패스워드가 유요한 사용자 (인증) 성공!
    return response.status(200).send(`
      <p>${useremail} 계정으로 로그인 되었습니다.</p>
      `);
  } else {
    // false인 경우, 패스워드가 유효하지 않은 사용자 실패!
    return response.status(400).send(`
      <p>${useremail} 계정 패스워드가 잘못되었습니다.</p>
      `);
  }
});

app.post('/api/signup', async (request, response) => {
  // 회원가입 요청된 사용자 입력 정보
  const { username, useremail, userpassword } = request.body;

  if (!username || !useremail || !userpassword) {
    return response.status(400).send(`
      <p>회원 가입 정보인 "이름", "이메일", "패스워드"를 모두 입력해야 합니다.</p>  
    `);
  }

  // 새 사용자 생성 (백엔드 스토리지)

  try {
    const newUser = await createUser({
      name: username,
      email: useremail,
      password: userpassword,
    });

    if (newUser) {
      response.status(201).send(`${username}님! 회원가입에 성공했습니다. 😁`);
    } else {
      response.status(400).send(`${username}님은 회원가입을 이미 하셨습니다.`);
    }
  } catch (error) {
    response.status(500).send('새 사용자 생성에 문제가 발생했습니다.');
  }

  console.log(username, useremail, userpassword);

  // ...
});

// 라우팅(Routing)
app.get('/api/hello', (request, response) => {
  const { username, useremail } = request.query;
  if (username && useremail) {
    response.status(200).send(`
      <h1>hello ${username}!</h1>
      <p>your email address is ${useremail}</p>
    `);
  } else {
    response
      .status(400)
      .send('<p>사용자 이름과 이메일이 전송되지 않았습니다. 😥</p>');
  }
});

app.listen(4000, () => {
  console.log('백엔드 프로그램 서버 구동 http://localhost:4000/api/hello');
});
