import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import bcrypt from 'bcrypt';

const FILE_PATH = fileURLToPath(new URL('../data/users.json', import.meta.url));
const OPTIONS = { encoding: 'utf-8' };
const saltRounds = 10;

export async function getUsers() {
  const usersString = await readFile(FILE_PATH, OPTIONS);
  return JSON.parse(usersString);
}

export async function findUserByEmail(userEmail) {
  const users = await getUsers();
  return users.find((user) => user.email === userEmail);
}

export async function createUser(newUser) {
  // 이미 가입한 사용자 인가요?
  const user = await findUserByEmail(newUser.email);
  // 이미 가입한 사용자라면 null을 반환하고, 함수 종료.
  // 백엔드(서버)에서 클라이언트에 이미 회원가입한 사용자 임을 응답합니다.
  if (user) return null;

  // 새 가입자라면 사용자 정보를 data/user.json에 저장합니다.
  // [!중요한점] 요청받은 사용자의 민감한 정보인 패스워드는 암호화합니다.

  const users = await getUsers();
  const hasedPassword = await bcrypt.hash(newUser.password, saltRounds);

  const createdUser = {
    id: crypto.randomUUID(),
    name: newUser.name,
    email: newUser.email,
    // password: 'bcrypt.hash(패스워드, saltRounds`) => 암호화된 패스워드',
    password: hasedPassword,
  };

  users.push(createdUser);

  await writeFile(FILE_PATH, JSON.stringify(users, null, 2), OPTIONS);

  return createUser;
}

export async function isRegisteredUser(email, password) {
  const user = await findUserByEmail(email);
  if (!user) return false;
  return bcrypt.compare(password, user.password);
}
