import FormInput from '../components/form-input';
import CommonFormInput from '@/components/form-input';

function HomeworkSignUpForm() {
  return (
    <section>
      <h3 className="sr-only">회원가입 폼</h3>
      <form>
        {/* 과제용 */}
        <FormInput label="이름" name="username" placeholder="2글자 이상" />
        <FormInput
          type="email"
          label="이메일"
          name="usermail"
          placeholder="user@company.io"
        />

        {/* 공용 */}
        {/* <CommonFormInput
          label="패스워드"
          name="userpass"
          placeholder="영어, 숫자 조합 6자리 이상 입력"
        /> */}
      </form>
    </section>
  );
}

export default HomeworkSignUpForm;
