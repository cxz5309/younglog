## 최종 페이지
![blog_page](./public/image/blog_page.png)  

#### 주소: http://youngwoo.shop/

</br>

## 와이어프레임
1. 회원가입
   - 닉네임 : 3자이상, 대소문자, 숫자 ✔️
   - 비밀번호 : 4자이상, 닉네임과 같은 값 x ✔️
   - 비밀번호 확인 : 비밀번호와 일치 ✔️
   - db데이터 조회 후 닉네임값이 존재하면 '중복된 닉네임입니다. ✔️
   - 회원가입 이후 로그인 페이지로 이동 ✔️
   - 로그인 버튼 -> 로그인 후 전체 게시글 목록 조회 페이지 ✔️
2. 로그인
   - 닉네임, 비밀번호 입력 후 **두개 중 하나라도 맞지 않을 때** "닉네임 또는 패스워드를 확인해주세요"라는 메세지 ✔️
   - 로그인 이후 전체 게시글 목록 조회 페이지 ✔️
   - 로그인 상태 -> 전체 게시글 목록 조회 페이지 ✔️
3. 게시글 목록 조회 페이지
   - 로그인 미필요 ✔️
4. 게시글 조회 페이지
   - 로그인 미필요 ✔️
   - 댓글 목록 조회 ✔️
   - 유튜브 댓글처럼 만들기 ✔️
5. 게시글 추가 페이지
   - 로그인 필요 ➡️ (현재 프론트엔드 단에서 로그인시 게시글 추가 페이지가 안보이는 방식으로 되어 있음) ✔️
   - 비 로그인 상태에선 "로그인이 필요합니다." 라는 메세지를 프론트엔드에서 띄워주고 로그인 페이지로 이동 ➡️ (정상적이지 않은 경로로 들어왔을 시에도 '로그인이 필요합니다. 메인 페이지로 이동합니다.' 에러 처리) ✔️
6. 게시글 삭제 및 수정 페이지
   - 로그인 필요 ➡️ (현재 프론트엔드 단에서 로그인시 게시글 추가 페이지가 안보이는 방식으로 되어 있음) ✔️
   - 비 로그인 상태에선 "로그인이 필요합니다." 라는 메세지를 프론트엔드에서 띄워주고 로그인 페이지로 이동 ➡️ (정상적이지 않은 경로로 들어왔을 시에도 '로그인이 필요합니다. 메인 페이지로 이동합니다.' 에러 처리) ✔️
7. 댓글 목록 조회
   - 로그인 미필요 ✔️
   - 현재 조회중인 게시글에 작성된 모든 댓글을 목록 형식으로 볼 수 있도록 하기 ✔️
   - 댓글 목록 위에 댓글 작성란 만들기 ➡️ 유튜브 댓글 기능을 참고 ✔️
   - 댓글 목록 중, 댓글 작성자가 로그인되어있는 사람일 경우에만 댓글 수정, 댓글 삭제 버튼 만들기 ✔️
8. 댓글 작성
   - 로그인 한 사용자만 댓글 작성이 가능하도록 하기 ✔️
   - 게시글 조회 페이지 하단에 댓글 내용을 입력할 수 있는 댓글 작성 버튼 만들기 ✔️
   - 로그인 하지 않은 사용자가 댓글 작성란을 누르면 "로그인이 필요한 기능입니다." 라는 메세지를 띄우고 로그인 페이지로 이동시키기 ✔️
   - 댓글 내용란을 비워둔 채 댓글 작성 버튼을 누르면 "댓글 내용을 입력해주세요" 라는 메세지를 띄우기 ✔️
9. 댓글 수정
   - 내가 작성한 댓글만 수정 가능하도록 하기 ✔️
   - 댓글 본문이 사라지고, 댓글 내용, 저장 버튼 생성하기 ✔️
   - 댓글 내용에는 이전에 입력했던 댓글 내용을 기본 값으로 채우기 ✔️
   - 수정할 댓글 내용은 비어 있지 않도록 하기 ✔️
   - 저장 버튼을 누른 경우 기존 댓글의 내용을 새로 입력한 댓글 내용으로 바꾸기 ✔️
10. 댓글 삭제
    - 내가 작성한 댓글만 삭제 가능하도록 하기 ✔️
    - "정말로 삭제하시겠습니까?" 메세지를 띄우고, 확인/취소 버튼 중 "확인" 버튼을 누른 경우 목록에서 해당 댓글을 삭제하기 ➡️ 메세지는 안 띄우고 수정/삭제 버튼이 삭제 확인/삭제 취소 버튼으로 대체되게 된다. ✔️
    - 취소를 누른 경우 삭제되지 않고 그대로 유지하기 ➡️ 삭제 취소를 누른 경우 다시 원래의 수정/삭제 버튼으로 대체되게 된다. ✔️
11. 회원가입 테스트 코드 작성 ➡️ 노드쪽 바벨, 클라이언트쪽 바벨의 jest와의 연동을 해결하지 못해서 실패했다. ❌ 
    - 닉네임은 최소 3자 이상, 알파벳 대소문자(a~z, A~Z), 숫자(0~9)로 이루어져 있어야 합니다.
    - 비밀번호는 최소 4자 이상이며, 닉네임과 같은 값이 포함된 경우 회원가입에 실패합니다.
    - 비밀번호 확인은 비밀번호와 정확하게 일치해야 합니다.
    - 데이터베이스에 존재하는 닉네임을 입력한 채 회원가입 버튼을 누른 경우 "중복된 닉네임입니다." 라는 에러메세지가 발생합니다.
    - 테스트 코드 실행 시 실제로는 데이터베이스에 연결되지 않도록 하기
    - 각 조건 별로 2개 이상의 테스트 케이스가 존재하도록 하기

- eslint, babel, prettier 설정 완벽하지 않은 상태로 완료 ➖ 
- 리액트 사용해보기 ✔️
- 파일 업로드(multer) ✔️
- 로컬 스토리지에 jsonwebtoken 넣어서 자동 로그인 ✔️
- bcrypt 암호화 ✔️
- socket.io, sequelize(mysql) 사용은 실패했다.. ❌
   
## 구현

### 클라이언트 사이드
```
"dependencies": {
    "@fortawesome/fontawesome-svg-core": "^1.2.36",
    "@fortawesome/free-brands-svg-icons": "^5.15.4",
    "@fortawesome/free-solid-svg-icons": "^5.15.4",
    "@fortawesome/react-fontawesome": "^0.1.15",
    "@testing-library/jest-dom": "^5.11.4",
    "@testing-library/react": "^11.1.0",
    "@testing-library/user-event": "^12.1.10",
    "axios": "^0.22.0",
    "http-proxy-middleware": "^2.0.1",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-native": "^0.66.0",
    "react-router-dom": "^5.3.0",
    "react-scripts": "4.0.3",
},
```
- 리액트를 사용하여 클라이언트를 분리하여 제작하였다.
> 리액트 빡세게 하면 될 줄 알고 함부로 시도했다가 또 호되게 당했다.  
> 리액트 함수형 쓰려다가 지식과 시간이 없어서 못쓰고 클래스형으로 매우 더럽게 작성되어 있다.  
- 나름 csr을 위해 기술 부족으로 몇개정도 window.location.reload 쓴 것 빼곤 리액트 라우팅을 이용하여 최대한 싱글 페이지 효과를 주었다.
- 클라이언트 분리를 위해 프록시 서버를 설정해서 작업하였고 최종 빌드를 서버 사이드 public에 넣어 사용하였다.


### 서버 사이드
```
"scripts": {
    "test": "jest",
    "server": "nodemon --exec babel-node server/index.js",
    "client": "cd client && npm run start",
    "start": "concurrently --kill-others-on-fail \"npm run server\" \"npm run client\"",
    "process": "babel-node server/index.js"
},
```

```
"dependencies": {
    "@babel/cli": "^7.15.7",
    "@babel/core": "^7.15.5",
    "@babel/eslint-parser": "^7.15.7",
    "@babel/node": "^7.15.4",
    "@babel/preset-env": "^7.15.6",
    "bcrypt": "^5.0.1",
    "concurrently": "^6.2.2",
    "dotenv": "^10.0.0",
    "express": "^4.17.1",
    "joi": "^17.4.2",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^6.0.8",
    "morgan": "^1.10.0",
    "multer": "^1.4.3",
    "nodemon": "^2.0.13",
    "path": "^0.12.7",
    "query-string": "^7.0.1"
  },
  "devDependencies": {
    "eslint": "^7.32.0",
    "eslint-config-airbnb-base": "^14.2.1",
    "eslint-plugin-airbnb-base": "0.0.1-security",
    "eslint-plugin-import": "^2.24.2"
  }
```

- mongoose를 사용하여 몽고 db를 이용하였다.
- 조회수 기능을 추가하여 popular post로 정렬, recent post로 정렬 두가지를 이용하여 메인 페이지 포스트를 꾸몄다.
- 몇가지 기능에서 auth 미들웨어로 로그인한 유저만 이용할 수 있도록 메세지 처리 또는 클라이언트에서 보이지 않도록 처리하였다.
- joi를 이용하여 검증 단계를 만들었으나 joi의 에러 메세지와 send로 보내는 예측 가능한 에러 메세지, try, catch문에서 나오는 예측 불가능한 에러 메세지를 하나로 처리하는데 매우 고생했다. 
<details>
    <summary>코드</summary>

joi 에러 메세지 커스텀
```
export const userPostSchema = joi.object({
  userName: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .error((errors) => {
      errors.forEach((err) => {
        err.message = '아이디 형식이 일치하지 않습니다.';
      });
      return errors;
    }),
  password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{4,30}$'))
    .error((errors) => {
      errors.forEach((err) => {
        err.message = '패스워드 형식이 일치하지 않습니다.';
      });
      return errors;
    }),
  confirmPassword: joi.ref('password'),
});
```
클라이언트 사이드 에러 메세지 처리
```
.catch((error) => {
  if (error.response) {
    alert(error.response.data.message);
    this.props.history.push("/")
  }
  else {
    console.log(error);
    alert('페이지 로딩 실패!');
    this.props.history.push("/")
  }
});
```
서버 사이드 에러 처리
```
export const join = async (req, res) => {
  try {
    // joi를 통한 validation, message처리
    const { userName, password, confirmPassword } =
      await userPostSchema.validateAsync(req.body)
        .catch((error) => {
          throw error.details[0].message;
        });
    const date = new Date();
    // bcrypt를 통한 패스워드 단방향 암호화
    const encryptedPassowrd = bcrypt.hashSync(password, 10);

    const existId = await User.findOne({ userName });
    if (existId) {
      return res.status(400).send({ message: '중복된 닉네임입니다.' });
    }

    const sameNamePwd = userName === password;
    if (sameNamePwd) {
      return res.status(400).send({ message: '아이디와 비밀번호가 달라야 합니다. ' });
    }

    const user = new User({ userName, password: encryptedPassowrd, date });
    await user.save();

    return res.status(201).send({ message: '정상적으로 회원가입하였습니다!' });
  } catch (error) {
    return res.status(400).send({ message: error });
  }
};
```

</details>

- bcrypt를 통해 패스워드를 db에 암호화하여 보냈고 로그인 단계에서 검증 처리도 하였다.
- multer와 axios를 이용하여 파일 업로드 시스템은 완료했으나 클라이언트 빌드 객체를 서버로 가져와서 사용하고 있어 클라이언트에서는 파일 경로를 얻을 수가 없었고 aws s3를 사용한 클라우드 파일 업로드 외의 우회 방법을 찾지 못하여 이미지 업로드 대신 이미지 파일 경로만 텍스트로 출력하였다.

<details>
    <summary>코드</summary>

```
const storage = multer.diskStorage({
  destination: path.join(path.resolve(), '/public/image/'),
  filename(req, file, cb) {
    console.log(file);
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({ storage });

const postCreatePost = async (req, res, next) => {
  const { title, description, userName, userPwd } = req.body;
  const thumbnailUrl = req.file ? '/image/' + req.file.filename : '/image/zero-w-logo_mini.png';
  const views = 0;
  const date = new Date();
  // db create
  try {
    await Post.create({
      title, description, userName, userPwd, date, views, thumbnail: thumbnailUrl,
    });
    return res.send({ message: '게시글을 생성하였습니다' });
  } catch (error) {
    return res.status(400).send({ message: error });
  }
};
```

</details>

#### 2021.10.04
- 아직도 리액트 하는중.....리액트 후크를 이용하는 방법으로 바꾸려고 시도했다가 시간도 없고 어떻게 돌아가는지 이해도 부족하여 기본 Component를 상속받는 방식으로 변경하였다..
- 그래도 드디어 ajax를 통해 정보 주고받는거를 완료했다. 이게 문제였는데 마무리하니 작업 속도가 좀 붙어서 Popular Post와 Recent Post, Create Post를 완료했다. 
#### 2021.10.05
- post를 전부 완료했으나 오류메세지 설정하는것에서 조금 문제가 생겨서 알아보게 되었다..
#### 2021.10.06
- 댓글 기능도 완료했다. 리액트쪽에서 자잘한 문제가 끊이질 않았고 axios remove랑 patch 함수에 헤더 설정하는 방법 자체가 다르다는 것을 아주 오래 지나서 알게 되어서 오래 걸렸다;;
#### 2021.10.07
- css 제작 및 버그 잡기
#### 2021.10.08
- 파일 업로드 시스템, bcrypt로 비밀번호 해시값 변환
- 파일 업로드 시스템은 클라이언트가 분리되어 있는 이상 aws s3를 이용하지 않는 한 도저히 임시로 처리를 할 수가 없었다. 파일 업로드 자체도 multer를 사용하게 되면 객체와 이미지를 한번에 보내는 게 엄청나게 번거롭게 되어 있어서 간편한 방법을 찾다가 엄청 시간을 낭비했다.

