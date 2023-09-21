## NextJS 시작하기

<!--2023-09-15 ~ -->

#### 배우는 이론
- Tour of Next
- Pages
- Styles
- Fetching
- Redirects
- Rewrites
- Dynamic URLs

#### 패키지
- "ReactJS"
- "NextJS"

<br>

## Chapter 0 - INTRODUCTION

### 작업환경 세팅, 프로젝트 생성

① @latest는 최신버전이라는 설정
>$ npx create-next-app@latest

typescript를 사용하고 싶다면 뒤에 --typescript 추가
>$ npx create-next-app@latest --typescript

해당 프로젝트 진행시는 

Would you like to use TypeScript? … No 

Would you like to use App Router? (recommended) … No

나머지 Yes 선택했음.

② what is your project named? 프로젝트명 입력
>$ nextjs-intro

>$ cd nextjs-intro

>$ npm run dev

<br>

## Chapter 1 - FRAMEWORK OVERVIEW

### #1.0 Library vs Framework

라이브러리 
- react
- 사용자가 파일 이름이나 구조 등을 정하고, 모든 결정을 내림
- 개발자가 어떤 프로그램을 가져다 쓰는것 (Ex React: 렌더링할때 ReactDOM.render()를 불러와서 사용한다.)

프레임워크 
- next.js
- 파일 이름이나 구조 등을 정해진 규칙에 따라 만들고 따름. 코드를 적절한 곳에 넣어야함. (정해진 틀 안에서 커스터마이징)
- 개발자의 코드를 프로그램이 불러오는 것 (Ex NextJS: 정해진 규칙에 따라 코드를 작성하면 렌더링된다.)

<br>

### #1.1 Pages

프로젝트 폴더<br>
nextjs-intro/src/pages 경로 안에<br>
index.js를 넣으면 그 파일이 기본 home 페이지가 됌.<br>
nextjs-intro/src/pages/index.js<br>
http://localhost:3000/

다른 파일을 생성하면<br>
ex) about-us.js<br>
nextjs-intro/src/pages/about-us.js<br>
http://localhost:3000/about-us<br>
뒤에 /파일명을 적으면 해당 페이지로 랜더링 되는 시스템.

index.js
```js
export default function Home(){
	return (
		<div>
			<h1>Hi</h1>
		</div>
	)
}
```

<br>

### #1.2 Static Pre Rendering

react 렌더링 순서 (client-side-render)
- root html (빈 화면) → react.js 로딩 → 초기 화면 출력 및 스크립트 동작
- 자바스크립트가 비활성화 되어있거나, 데이터가 느리다면 빈 화면이 노출될 시간이 길다는 단점.

next 렌더링 순서 (pre-render, hydration)
- pre-render 된 정적 페이지 초기 화면 html (스크립트 동작x) → react.js 로딩 → 동적 초기 화면 렌더링 완료 (스크립트 동작o)
- 자바스크립트가 비활성화 되어있거나, 데이터가 느려도 최소 html은 노출이 됌.

pre-render 
- 컴포넌트의 초기상태를 기반으로 미리 렌더링된 html을 클라이언트로 넘김 => 페이지의 초기 로딩 지연을 줄일 수 있음!
- 이 방식은 SEO, 구글 같은 검색 엔진에도 좋음.

hydration 
- pre-render된 페이지에 react의 반응성을 입히는 것

자바스크립트 비활성화하기
- 보안 및 개인정보 보호-사이트 및 방패 설정-자바스크립트-자바스크립트 비활성화

<br>

### #1.3 Routing

페이지 간 클라이언트 측 경로 전환을 활성화하고 single-page app 경험을 제공하려면 Link컴포넌트가 필요

```js
import Link from "next/link";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();
  return (
    <nav>
      <Link href="/" style={{ color: router.pathname === "/" ? "red" : "blue" }}>
        Home
      </Link>
      <Link href="/about-us" style={{ color: router.pathname === "/about-us" ? "red" : "blue" }}>
        About
      </Link>
    </nav>
  );
```

<br>

### #1.4 CSS Modules

- module.css를 사용할때는 className = {style.nav} 이런식으로 적용.
- 페이지 내에서는 무작위 class로 들어와서 충돌을 일으키지 않는 형식.
- 다른 컴포넌트에서도 같은 클래스명을 사용할 수 있음. 모듈 css는 무작위로 만들어져서 다른 거랑 안겹침 ~

<br>

nextjs-intro/src/components/NavBar.js

두 가지 클래스 적용 작성법
```js
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./NavBar.module.css";

export default function NavBar() {
  const router = useRouter();
  return (
    <nav>
      <Link href="/" className={`${styles.link} ${
            router.pathname === "/" ? styles.active : ""
          }`}>
        Home
      </Link>
      <Link href="/about-us" className={[
            styles.link,
            router.pathname === "/about-us" ? styles.active : "",
          ].join(" ")}>
        About
      </Link>
    </nav>
  );
}
```
nextjs-intro/src/components/NavBar.module.css
```css
.link {
    text-decoration: none;
}
.active {
    color: tomato;
}
```

<br>

### #1.5 Styles JSX

- next.js 고유의 방식으로 스타일 적용
- index.js에서 import해오는 NavBar.js 요소 선택자로 잡아도 jsx style을 적용 안됌. 
- NavBar.js에 직접 적용해야함.
- 무작위 클래스 네임 적용됌.

nextjs-intro/src/components/NavBar.js
```js
import Link from "next/link";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();
  return (
    <nav>
      <Link legacyBehavior href="/">
        <a className={router.pathname === "/" ? "active" : ""}>
        Home
        </a>
      </Link>
      <Link legacyBehavior href="/about-us">
        <a className={router.pathname === "/about-us" ? "active" : ""}>
        About
        </a>
      </Link>
      <style jsx>{`
        nav {
          background-color: tomato;
        }
        a {
          text-decoration: none;
        }
        .active {
          color: yellow;
        }
      `}</style>
    </nav>
  );
}
```

<br>

### #1.6 Custom App 

- grobal 전역 스타일 적용
- header, footer 처럼 모든 페이지에 적용 가능. 태그, 스타일 등
- /src/pages/_app.js 경로에 _app.js 파일 생성. 이름 무조건 _app.js 여야 함.
- _app.js -> index.js -> 그 외 페이지 순서로 랜더링 됌.
- import "../styles/globals.css";는 여기서만 불러오기 가능. 나머지 일반 페이지들은 module.css만 import 가능.

nextjs-intro/src/pages/_app.js

```js
import NavBar from "../components/NavBar";
import "../styles/globals.css";//전역으로 스타일 적용

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <NavBar />{/* 모든 페이지에 NavBar 페이지 import, return */}
      <Component {...pageProps} />
    </>
  );
}
```

<br>

### #1.7 Recap

정리
- Nextjs는 틀이 정해져있는 프레임워크이다.(ex - 라우팅)
- Nextjs에서는 하나의 react 앱이 아니라 별개의 페이지 단위로 생각해야 함.
- html로 먼저 불러와져서 로드될 때 빈 화면을 보지 않아도 됌.
- _app.js(custom app component)는 페이지 template을 만드는데 활용할 수 있다!
- jsx, module.css, global로 css를 적용할 수 있다.

<br>

---

<br>

## Chapter 2 - PRACTICE PROJECT

### #2.0 Patterns

- children : 하나의 component를 또 다른 component 안에 넣을 때 사용.

nextjs-intro/src/components/Layout.js
```js
import NavBar from "./NavBar";

export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      <div>{children}</div>
    </>
  );
}
```

nextjs-intro/src/pages/_app.js
```js
import Layout from "../components/Layout";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
```

<br>

### #2.1 Fetching Data

- next.js를 이용하면 public 파일들을 쉽게 다룰 수 있음.
  - /public/vercel.svg 이미지 경로 사용 예시
  - < img src="/vercel.svg" />
- themoviedb.org 페이지에서 영화 관련된 무료 API 가져오기
  - API key를 감추지 않고 사용하면 개발자 도구에서 보일 수 있는 문제점이 있음.(다음 챕터에서 감출 예정)
  
#### API 가져오기
```js
import { useEffect, useState } from "react";
import Seo from "../components/Seo";

const API_KEY = "0ea6b492115dc4e31470d1a8624bc0c6";

export default function Home() {
  const [movies, setMovies] = useState();
  
  useEffect(() => {
    (async () => {
      const { results } = await (
        await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
        )
      ).json();
      setMovies(results);
    })();
  }, []);

  return (
    <div>
      <Seo title="Home" />
      {!movies && <h4>Loading...</h4>}
      {movies?.map((movie) => (
        <div key={movie.id}>
          <h4>{movie.original_title}</h4>
        </div>
      ))}
    </div>
  );
}
```

