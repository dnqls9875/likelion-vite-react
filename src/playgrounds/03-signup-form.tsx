import { useState } from 'react';

interface ResponseDataType {
  id: string;
  name: string;
  email: string;
  profileImage: string;
}

function SignUpForm() {
  const [responseData, setResponseData] = useState<null | ResponseDataType>(
    null
  );

  const handleSubmitPromise = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    fetch('http://localhost:4000/api/signup', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((responseData) => setResponseData(responseData as ResponseDataType))
      .catch((error) => console.error(error));
  };

  // 조건부 렌더링
  // 회원가입 이후 가입 사용자 정보 (UI 화면)
  if (responseData) {
    return (
      <article className="UserProfile" id={responseData.id}>
        <h2 className="UserProfile--name">{responseData.name}</h2>
        <img
          src={`http://localhost:4000${responseData.profileImage}`}
          alt=""
          width={64}
          height={64}
        />
        <p>{responseData.email}</p>
      </article>
    );
  }

  // 회원가입 폼 (UI 화면)
  return (
    <section style={{ marginInline: 48 }}>
      <h2>회원가입 폼 (POST 메서드)</h2>
      <form onSubmit={handleSubmitPromise}>
        <div style={{ marginBlockEnd: 8 }}>
          <label htmlFor="usernameSignUp">이름</label>
          <input type="text" name="username" id="usernameSignUp" />
        </div>
        <div style={{ marginBlockEnd: 8 }}>
          <label htmlFor="userEmailSignUp">이메일</label>
          <input type="email" name="useremail" id="userEmailSignUp" />
        </div>
        <div style={{ marginBlockEnd: 8 }}>
          <label htmlFor="userPasswordSignUp">패스워드</label>
          <input type="password" name="userpassword" id="userPasswordSignUp" />
        </div>
        <div style={{ marginBlockEnd: 8 }}>
          <label htmlFor="userProfileSignUp">프로필 이미지</label>
          <input
            type="file"
            name="userprofile"
            id="userProfileSignUp"
            accept=".jpg,.jpeg,.png,.svg,.webp"
          />
        </div>
        <button type="submit">회원가입</button>
      </form>
    </section>
  );
}

export default SignUpForm;
