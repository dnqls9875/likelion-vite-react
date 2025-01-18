# 커스텀 환경 구성 과제

**목차**

- [커스텀 환경 구성 과제](#커스텀-환경-구성-과제)
  - [💬 과제 시작](#-과제-시작)
  - [💬 과제 설명](#-과제-설명)
    - [1. `.editorconfig` 파일](#1-editorconfig-파일)
    - [2. `.CSS 스타일 모듈` 파일](#2-css-스타일-모듈-파일)
    - [3. `ESLint 플러그인 추가 구성` `eslint.config.js`](#3-eslint-플러그인-추가-구성-eslintconfigjs)
    - [4. Husky](#4-husky)
  - [💬 이슈 상황](#-이슈-상황)
  - [💬 결론 및 마무리](#-결론-및-마무리)

---

## 💬 과제 시작

`Vite` 빌드 도구를 사용해서 React 프로젝트(학습)을 시작 할 수 있는 커스텀 템플릿을 구성하는 것이 이번 과제다. 사실 어느 인터넷 강의에서를 들었을 때 `Vite`를 이용해 커스텀 템플릿을 구성하는 것이 너무 어렵고, 설명할 시간이 길어져 내용에 담지 않고, `Vite` 기본 템플릿을 활용해서 손쉽게 앱 개발 환경을 구성했던 기억이 있었다. 사실 금요일에 환경구성 수업을 들었을 때 많은 이해를 하지 못해서 최대한 나만의 커스텀 템플릿을 작업하는데는 조금 무리가 있다고 판단했다. 그래도 최대한 노션 페이지를 활용하여 과제를 통해 **커스텀 템플릿 구성하는걸 혼자 한번이라도 경험해보고**, 매번 수정할 필요 없이 언제든 사용 할 수 있는 이번 **커스텀 템플릿을 만드는 것을 경험하는 것이** 나의 이번 과제의 목표다.

---

## 💬 과제 설명

프로젝트는 대부분 노션페이지를 참고하여 복사 붙혀넣기한 부분도 있고, 천천히 단계별로 진행하면서 이해하는 부분이 주요 목표이기 때문에 여기서는 어떻게 했고, 저렇게 했고, 이건 왜 이렇게 했고 이런 구구절절 내용을 작성하는 것보다. 처음 접해본 파일 중에 검색을 해본 파일이 이런거구나 라는 내용과, 이슈가 생겼는데 이 이슈에 대해서 해결한 과정에 대해서 설명을 해보도록 하겠다.

### 1. `.editorconfig` 파일

> 이 설정 파일은 코드 스타일을 일관되게 유지하는데 도움이 된다.

```jsx
root = true

[*]
  indent_style = space
  indent_size = 2
  end_of_line = lf
  charset = utf-8
  trim_trailing_whitespace = false
  insert_final_newline = false
```

1️⃣ `root = true`: 이 설정은 `.editorconfig` 파일이 프로젝트의 루트에 위치한다고 명시. 이를 통해 상위 디렉토리에 있는 `.editorconfig` 파일을 무시하고 현재 디렉토리의 설정을 우선 적용할 수 있다.

2️⃣ `[*]`: 모든 파일 형식에 대해 설정을 적용하는 규칙. 특정 파일 유형에 대한 규칙을 설정하려면 `[*.js]`와 같이 지정할 수 있다. (경험해봄)

3️⃣ `indent_style = space`: 탭 대신 공백을 사용하여 들여쓰기를 할 것을 지정. 코드 스타일에 일관성을 주고, 탭과 공백 혼용을 방지한다.

4️⃣ `indent_size = 2`: 들여쓰기를 2칸으로 설정. 이는 코드를 더 간결하고 읽기 쉽게 만들어 주며, 협업 시 각자의 코드 스타일 차이를 줄이는 데 도움이 된다.

5️⃣ `end_of_line = lf`: 라인의 끝을 LF(Line Feed, \n)로 설정. 이는 특히 여러 운영체제에서 협업할 때 라인 끝 처리에 대한 충돌을 방지한다.

6️⃣ `charset = utf-8`: 파일의 문자 인코딩을 UTF-8로 설정한다. UTF-8은 전 세계에서 가장 널리 사용되는 문자 인코딩이며, 다양한 언어와 문자를 지원한다. (경험해봄)

7️⃣ `trim_trailing_whitespace = false`: 줄 끝의 공백을 자동으로 제거하지 않도록 설정한다. 가끔 코드나 데이터에 의도적으로 공백을 남겨두는 경우가 있을 수 있으므로, 이를 제거하지 않도록 설정한다.

8️⃣ `insert_final_newline = false`: 파일 끝에 새 줄을 추가하지 않도록 설정한다. 이는 일부 프로젝트에서 마지막 줄이 비어 있는 것을 원하지 않을 때 사용된다.

---

### 2. `.CSS 스타일 모듈` 파일

```css
@layer base;
@import './common/normalize.css' layer(base);
@import './common/base.css' layer(base);
```

사실 `layer`는 최신 스펙이기도 해서 한번 다뤄본 적이 있다. 우선순위를 정의하는데 유용한 스펙이라고 알고 있다. 그런데 난 `import`로 불러와서 `layer`를 다룬게 아니라 한 파일 안에서 `@layer Compoents {}` , `@layer Reset {}` 이런식으로 사용했던 기억이 있다. 그래서 main.css에서 불러오면서 `layer` 을 사용할 수도 있구나 라고 생각해서 다른 방법을 알게 되어 좋았던 거 같다.

---

### 3. `ESLint 플러그인 추가 구성` `eslint.config.js`

```jsx
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default tseslint.config(
  {
    ignores: ['dist'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    ...jsxA11y.flatConfigs.recommended,
    settings: {
      react: {
        version: '19.0.0',
      },
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: { jsx: true },
      },
    },
  },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...react.configs.flat.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  }
);
```

여러 린팅 플러그인을 설정을 했는데 이렇게 린팅을 많이 하는 이유는 도대체 뭘까라고 생각을 해봤다.

1️⃣ **일관성 있는 코드 스타일 유지** : ESLint는 코드의 스타일을 일관되게 유지하는데 도움을 준다.

2️⃣ **코드 품질 향상** : ESLint는 코드에서 발생할 수 있는 잠재적인 버그나 문제를 미리 감지하고, 경고를 제공한다. 예로 사용하지 않는 변수 및 함수, 의도하지 않은 타입 오류(null, undefined 등) 등을 확인 할 수 있다. 이러한 문제를 사전에 하면 에러를 줄이고, 코드의 품질 향상에 도움이 된다.

3️⃣ **팀의 코드 스타일 규칙 적용** : 여러 명의 개발자가 함께 협업하는 경우, 각 개인의 코드 스타일 차이가 문제를 유발 할 수 있다. ESLint는 설정된 규칙에 따라 코드가 자동으로 검사되어 팀내에서 정의한 규칙에 맞춰 코드를 작성할 수 있게 한다. 이를 통해 코드의 일관성을 높여줄 수 있다.

4️⃣ **React 및 TypeScript 규칙 적용** : ESLint 플러그인`(예: eslint-plugin-react, typescript-eslint, eslint-plugin-jsx-a11y 등)`은 `React` 및 `TypeScript`의 모범 사례를 따르도록 돕습니다.

5️⃣ **자동화된 린팅과 코드 리뷰 개선** : ESLint를 프로젝트에 설정하면, 커밋하기 전에 린팅을 자동으로 실행할 수 있다. 코드 리뷰를 할 때도 코드가 자동으로 린트되어, 리뷰를 해주는 사람은 코드 스타일이나 사소한 문법 오류등으로 시간을 소모하지 않고, 실제 비즈니스 로직에 집중할 수 있게 되어 시간적 절약을 해준다.

6️⃣ **접근성 개선** : `eslint-plugin-jsx-a11y` 와 같은 플러그인은 웹 접근성 문제를 감지하고, 개발자가 더욱 접근성 친화적 UI를 만들 수 있도록 도와준다. 예를 들어 AIRA 속성 누락의 접근성 문제를 미리 알 수 있다.

요약하자면 결과적으로 ESLint를 사용하면 코드 품질을 높이고, 에러를 줄이고, 코드 리뷰에 관련된 불필요한 시간을 줄이고, 일관성있는 코드를 작성할 수 있게 해주어 팀 협업을 원할하게 해주는 긍정적인 플러그인이라고 생각하면 될 거 같다.

---

### 4. Husky

`Husky`를 사용하는 이유?

- `Husky`를 사용하면 Git 훅을 활용해 코드 품질을 자동으로 검사하고, 코드 스타일 규칙을 강제하며, 팀 간 협업을 원활하게 만드는 데 도움을 준다. 구체적으로 `Husky`는 Git 훅을 설정하여 특정 Git 명령이 실행될 때 자동으로 린팅, 테스트 등을 수행할 수 있게 한다. 이를 통해 코드를 커밋하거나 푸시하기 전에 품질을 보장할 수 있다.

`Husky` 사용 예시:

- `pre-commit` 훅을 사용하여 ESLint, Prettier 등을 실행하고 코드 스타일이 맞는지 확인
- `pre-push` 훅을 사용하여 테스트가 통과하는지 확인
- `commit-msg` 훅을 사용하여 커밋 메시지가 규칙을 따르는지 확인

`Husky`는 결국 코드 품질을 자동으로 관리하고, 팀 내 협업에서 발생할 수 있는 실수를 줄이고, 프로젝트 관리에 도움이 되는 도구다.

---

## 💬 이슈 상황

어디서 부터인지는 잘 모르겠지만 환경 구성을 진행하면서 port번호에서부터 조금씩 자잘한 것들이 적용이 안되고 있다는 느낌을 받았다. 바로 바로 해결을 하면 좋았겠지만 내 기준에서는 분명히 잘 작성한거 같다. 폴더의 구조가 잘못되었는지 눈이 빠져라 확인했다. 하지만 큰 에러는 없어 진행을 했고, 마지막 `jsx` 파일을 삭제 후 `tsx` 파일을 생성하고 나서 (마지막쯤)에 에러가 발생해 렌더링이 정상적으로 나오지 않았다. 에러는 아래와 같다.

```bash
Parsing error: ESLint was configured to run on <tsconfigRootDir>/vite.confg.ts using parserOptions.project:
- <tsconfigRootDir>/tsconfig.node.json
- <tsconfigRootDir>/tsconfig.app.json
However, none of those TSConfigs include this file. Either:
- Change ESLint's list of included files to not include this file
- Change one of those TSConfigs to include this file
- Create a new TSConfig that includes this file and include it in your parserOptions.project
See the typescript-eslint docs for more info: https://typescript-eslint.io/troubleshooting/typed-linting#i-get-errors-telling-me-eslint-was-configured-to-run--however-that-tsconfig-does-not--none-of-those-tsconfigs-include-this-file
```

이 오류는 ESLint가 `vite.config.ts` 파일을 올바르게 처리하지 못해서 발생한 오류다. 주 원인은 `parserOptions.project`에 정의된 `tsconfig.node.json` 파일과 `tsconfig.app.json`이 `vite.config.ts`를 포함하지 않아서 생긴 오류였다.

그런데 아무리 봐도 봐도 또 봐도 정말 아무런 문제가 없었다. 오죽하면 단계에 맞춰 잘 진행했다고 느꼈는데 내가 놓친 부분이 있었나 싶어 처음부터 환경 구성을 다시해야 되나 싶었다.
검색을 해보니 공식적인 해결방법이 거의 없다고 나왔다. 절망적이였다. 몇십분을 고전하다가 마음이 편안해지는 노래를 들으며 다시 한번 정신을 다잡고 확인을 했다. 근데 원인은 정말 단순했다.. 오히려 머리가 멍해지는 느낌이였다. `vite.config.ts`는 원래 `vscode` 아이콘이 번개모양인데 다시 제대로 보니 왜 `TypeScript` 아이콘이지...? 이 부분을 제대로 확인해야겠다 싶었다.

![오류원인](./assets/image.png)

그렇다 역시나 원인은 파일명 오타이다. 처음부터 오류가 났던게 아니라 마지막 환경셋팅을 하고나서 오류가 떴기 때문에 난 당연히 아무런 이슈가 없는줄 알았다. 정말 허탈했지만 좀 더 세심하게 확인을 해야겠다고 다시 한번 리마인드 되어 값진 시간이였던 거 같다.

---

## 💬 결론 및 마무리

이번 환경구성을 사실 일일히 타이핑 하지도 않았을 뿐더러 완벽하게 이해했다고 자부할 수 없는 거 같다. 하지만 최소한의 노력으로 선생님께서 이 환경 구성을 과제로 주신 이유 혹은 궁극적인 목적에 대해서 생각을 해봤던 것 같다. 그래서 내가 내린 결론은 물론 틀리수도 있겠지만 대부분의 환경 구성된 파일들은 **일관된 코드와 규칙** , **코드 품질 향상**, 이 환경을 구성함으로써 얻게 되는 **프로젝트 협업에 장점** 등과 같은 부분인 거 같다. 커스텀 템플릿 구성을 제대로 하게 된다면 언제든지 프로젝트를 진행 할 때 빠르고, 관리도 용이하고, 효율적으로 시간을 절약할 수 있을 거 같다고 느끼게 된 시간이였던 것 같다.
