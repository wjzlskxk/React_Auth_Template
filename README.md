### Template Structure

1. 이 Template는 React를 FLUX 아키텍쳐를 활용해 개발 할 때 필요한 파일 구조를 가지고있습니다.
2. 서버주소는 env파일에 있습니다.
3. config 폴더가 필요한경우 만들어서 사용하시면 됩니다.

### User Modifications

1. `.env`파일에 있는 `REACT_APP_BASE_URL`은 사용자의 API BASEURL 주소로 변경하셔야 합니다.
2. 이 템플릿으로 개발을 진행 하실 경우 `.gitignore`파일에 env를 추가하셔야 합니다.
3. `/src/libs/axios/requestHandler.ts`의 12번째 줄 `window.location.href = "/login";`의 href를 사용자의 로그인 url로 변경 하셔야 합니다.
4. `/src/libs/axios/responseHandler.ts`의 50번째 줄 `window.location.href = "/login";`의 href를 사용자의 로그인 url로 변경 하셔야 합니다.
5. `/src/libs/axios/responseHandler.ts`의 34, 35, 38번째 줄을 서버 response값에 따라 변경 하셔야 합니다.

### How to Use
레포지토리 starts 옆에 Use this template라는 버튼을 클릭한 후 원래의 레포지토리 처럼 생성하면 된다.

### ETC

1. `accessToken`과`refreshToken`은 각각 `accessToken`, `refreshToken`이라는 key로 cookie에 저장됩니다.
2. customAxios를 사용하지 않고 기본 axios를 사용하실 경우 headers 값의 `Authorization`속성은 `[REQUEST_TOKEN_KEY]`로 대체 가능합니다.
   `ex) headers: { [REQUEST_TOKEN_KEY]: ${token.getTokekn(ACCESSTOKEN)}}}`
3. react-query를 사용하시면 보다 편리하게 사용 가능합니다. [참고자료](https://velog.io/@wjzlskxk/React-Query%EB%A1%9C-axios%ED%86%B5%EC%8B%A0%ED%95%98%EA%B8%B0)
