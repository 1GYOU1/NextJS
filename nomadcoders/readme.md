## NextJS 시작하기

2023-09-15 ~ 2023-09-30

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

<br>

### #2.2 Redirect and Rewrite

개발자도구 Network에서 안보이게 API 숨기기
- 돈 내고 사야하는 경우도 있고, API key의 사용량이 제한되어있을 수 있기 떄문.

<br>

request에 mask를 씌우는 것 같은 효과
- redirect
  - 한 페이지에서 다른 페이지로 이동하게 할 수 있음.
  - 새로운 URL 뒤에도 이것저것 그대로 붙여서 넘겨줄 수 있음.
  - source, destination, permanent 모두 적어주기.
- rewrite
  - 유저를 redirect 시키지만 url은 변하지 않음.

<br>

nextjs-intro/next.config.js
- 파일 수정 후 서버 재시작 필요
>$ npm run dev
```js
/** @type {import('next').NextConfig} */

const API_KEY = process.env.API_KEY;

module.exports = {
  reactStrictMode: true,
  async redirects() {//다른 어딘가로 redirect
    return [
      {
        source: "/old-blog/:path*",//유저가 이동할 곳
        destination: "/new-sexy-blog/:path*",//유저를 보낸 곳, 해당 부분이 영구적(permanent)인지 아닌지에 따라서 브라우저나 검색엔진이 이 정보를 기억하는지 여부가 결정됌.
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/movies",
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
      },
    ];
  },
};
```

<br>

#### redirects 사용 예시
- 주소에 http://localhost:3000/contact 넣고 엔터 치면
- http://localhost:3000/form 으로 이동.
```js
async redirects() {//다른 어딘가로 redirect
    return [
      {
        source: "/contact",//유저가 이동할 곳
        destination: "/form",//유저를 보낸 곳
        permanent: false,//브라우저나 검색엔진이 정보를 기억해야하는지 여부
      },
    ];
  },
```

- 주소에 http://localhost:3000/contact 넣고 엔터 치면
- https://github.com/1gyou1 으로 이동.
```js
async redirects() {//다른 어딘가로 redirect
    return [
      {
        source: "/contact",//유저가 이동할 곳
        destination: "https://github.com/1gyou1",//유저를 보낸 곳
        permanent: false,//브라우저나 검색엔진이 정보를 기억해야하는지 여부
      },
    ];
  },
```

- 주소에 http://localhost:3000/old-blog/1212 :path 부분에 아무거나 넣고 엔터 치면
- http://localhost:3000/new-sexy-blog/1212 으로 이동.
```js
async redirects() {//다른 어딘가로 redirect
    return [
      {
        source: "/old-blog/:path",//유저가 이동할 곳
        destination: "/new-sexy-blog/:path",//유저를 보낸 곳
        permanent: false,//브라우저나 검색엔진이 정보를 기억해야하는지 여부
      },
    ];
  },
```

- 주소 뒤에 별표를 붙여주면 모든 걸 catch
- 주소에 http://localhost:3000/old-blog/1212/comments/1212 :path 부분에 아무거나 넣고 엔터 치면
- http://localhost:3000/new-sexy-blog/1212/comments/1212 으로 이동.
```js
async redirects() {//다른 어딘가로 redirect
    return [
      {
        source: "/old-blog/:path*",//유저가 이동할 곳
        destination: "/new-sexy-blog/:path*",//유저를 보낸 곳
        permanent: false,//브라우저나 검색엔진이 정보를 기억해야하는지 여부
      },
    ];
  },
```

<br>

#### rewrite 사용 예시

- 주소에 http://localhost:3000/api/movies 로 이동하면 서버 뒤에 mask되어 가려지게 되고, API response 데이터 페이지로 이동
- fetch 해오는 부분 주소도 까먹지 말고 같이 변경해줘야 됌.

nextjs-intro/next.config.js
```js
const API_KEY = "0ea6b492115dc4e31470d1a8624bc0c6";
...
async rewrites() {
    return [
      {
        source: "/api/movies",
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
      },
    ];
  },
```
nextjs-intro/src/pages/index.js
```js
...
useEffect(() => {
  (async () => {
    const { results } = await (await fetch(`/api/movies`)).json();
    setMovies(results);
  })();
}, []);
...
```

<br>

#### .env 형식의 environment 파일 이용해서 API 정보 가리기

nextjs-intro/.env
```
API_KEY=0ea6b492115dc4e31470d1a8624bc0c6
```
nextjs-intro/.gitignore
```
# API_KEY 숨기기 추가
.env
```
nextjs-intro/next.config.js
```js
const API_KEY = process.env.API_KEY;

module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/old-blog/:path*",
        destination: "/new-sexy-blog/:path*",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/movies",
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
      },
    ];
  },
};
```

<br>

### #2.3 Server Side Rendering

#### getServerSideProps - SSR

- request time에 반드시 데이터를 fetch해와야 하는 페이지를 pre-render해야 하는 경우에만 getServerSideProps를 사용

- page에서 서버 측 랜더링 함수인 getServerSideProps함수를 export하는 경우 Next.js는 getServerSideProps에서 반환된 데이터를 사용하여 각 request에서 이 페이지를 pre-render합니다. getServerSideProps는 서버 측에서만 실행되며 브라우저에서는 실행되지 않습니다.

- 데이터를 pre-render할 필요가 없다면 client side에서 데이터를 가져오는 것을 고려해야한다.

- SSR방식은 해당 페이지의 데이터가 들어오기 전 까진 아무것도 볼 수 없다가 해당 페이지의 데이터만 들어오면 전체를 다 볼 수 있고(다른 페이지 갈 때도 이 과정이 필요)

- CSR방식은 모든 JS파일들이 들어와야('loading...') 보여지는데 그대신 다른 페이지 갈 때는 이미 모든 JS파일을 받았으니 SSR 방식보다는 빠르게 화면을 볼 수 있다.

- index.js -> SSR(서버 사이드 랜더링)방식

- About-us.js -> CSR(클라이언트 사이드 랜더링)방식

<br>

nextjs-intro/src/pages/index.js - SSR 방식
```js
import { useEffect, useState } from "react";
import Seo from "../components/Seo";

export default function Home({ results }) {
  return (
    <div className="container">
      <Seo title="Home" />
        {results?.map((movie) => (
        <div className="movie" key={movie.id}>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
          <h4>{movie.original_title}</h4>
        </div>
      ))}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
// 매 request마다 실행
export async function getServerSideProps() {
    const { results } = await (
      await fetch(`http://localhost:3000/api/movies`)
    ).json();
    return {// props를 통해 page에 data전달
      props: {
        results,
      },
    };
  }
```

<br>

### #2.5 Dynamic Routes

URL에 변수 넣는 방법 !

파일명 대괄호 안에 마음대로 변수명 적기. ex - [potato].js

nextjs-intro/src/pages/movies/[id].js

접근 URL 예시 - http://localhost:3000/movies/123123(id)

```js
import { useRouter } from "next/router";

export default function Detail() {
  const router = useRouter();
  console.log(router);//query: {id : '123123'}
  return "detail";
}
```

<br>

접근 URL 예시 - http://localhost:3000/movies/all

nextjs-intro/src/pages/movies/all.js 파일 생성
```js
export default function All(){
  return "all";
}
```

<br>

접근 URL 예시 - http://localhost:3000/movies

상단 movies/all이랑 movies url 모두 사용할 수 있음.

nextjs-intro/src/pages/movies/index.js 파일 생성
```js
export default function MovieIndex(){
  return "MovieIndex";
}
```

<br>

접근 URL 예시 - http://localhost:3000/movies

nextjs-intro/src/pages/movies.js 파일 생성

```js
export default function Movies(){
  return "Movies";
}
```

<br>

### #2.6 Movie Detail

- 다른 페이지로 navigate할 때, 필요한 정보는 url query로 전달하되 router의 masking으로 사용자에게 노출되지 않도록 만드는게 효과적
- 홈페이지(index.js)에서 정보를 받아서 넘겨주는 형태라서 유저가 홈페이지에서 클릭을 통해 상세페이지로 이동했을때만 작동. 무조건 홈페이지 -> 상세페이지로 넘어올때에만 존재.
- 바로 id로 들어가면 loading...만 뜨고 로드 안됌.
- 크롬 시크릿 창으로 홈페이지를 거치지 않고 상세페이지로 바로 접속해도 로드 안됌.
- 페이지가 넘어갈 때 모든 소스가 로드되어있어서 로딩이 보이는 빈도를 줄일 수 있음.

<br>

#### router.push(url, as, options)
- 클라이언트 측 전환을 처리
- url: UrlObject | String: 탐색할 URL
- as: UrlObject | String: 브라우저 URL 표시줄에 표시될 경로에 대한 선택적 데코레이터
```js
router.push({
  pathname: '/post/[pid]',
  query: { pid: post.id },
})
```

<br>

nextjs-intro/src/pages/index.js
```js
import Link from "next/link";
import { useRouter } from "next/router";
import Seo from "../components/Seo";

export default function Home({ results }) {
    const router = useRouter();
    const onClick = (id, title) => {
    router.push(
        {//URL을 설정하고 정보를 얹어주는 부분
            pathname: `/movies/${id}`,
            query: {
                title,
            },
        },
        `/movies/${id}`//브라우저에 보이는 URL 마스킹
    );
  };
  return (
    <div className="container">
      <Seo title="Home" />
        {results?.map((movie) => (
        <div
        onClick={() => onClick(movie.id, movie.original_title)}
        className="movie"
        key={movie.id}
        >
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
          <h4>
            <Link legacyBehavior
              href={{
                pathname: `/movies/${movie.id}`,
                query: {
                  title: movie.original_title,
                },
              }}
              as={`/movies/${movie.id}`}//[id].js로 연결
            >
            {/* <Link href={`/movies/${movie.id}`}> 상단과 동일한 작성 방법 */}
              <a>{movie.original_title}</a>
            </Link>
          </h4>
        </div>
      ))}
      <style jsx>{`
       ...
      `}</style>
    </div>
  );
}

export async function getServerSideProps() {
    const { results } = await (
      await fetch(`http://localhost:3000/api/movies`)
    ).json();
    return {
      props: {
        results,
      },
    };
}
```

nextjs-intro/src/pages/movies/[id].js
```js
import { useRouter } from "next/router";

export default function Detail() {
  const router = useRouter();
  console.log(router)//넘겨받은 API 정보 확인
  return (
    <div>
      <h4>{router.query.title || "Loading..."}</h4>
      {/* html 먼저 렌더링되고 js가 모두 로드되기 전에 Loading 노출 */}
    </div>
  );
}
```

nextjs-intro/next.config.js
```js
...
  async rewrites() {
    return [
      {
        source: "/api/movies",
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
      },
      {//추가한 부분
        source: "/api/movies/:id",
        destination: `https://api.themoviedb.org/3/movie/:id?api_key=${API_KEY}`,
      },
    ];
  },
};

```

<br>

### #2.7 Catch All

- 유저가 홈페이지에서 클릭을 통해 상세페이지로 이동했을때만 작동했었는데, URl Catch All을 하면 페이지 내용을 볼 수 있음.
- SEO에도 좋음.

<br>

nextjs-intro/src/pages/movies/[...params].js

```js
import Seo from "../../components/Seo";
import { useRouter } from "next/router";

export default function Detail({ params }) {
  const router = useRouter();
  console.log(router)//예시 - query: {title: 'Retribution', id: '762430'}
  const [title, id] = params || [];
  //const [title, id] = router.query.params
  return (
    <div>
      <Seo title={title} />
      <h4>{title}</h4>
    </div>
  );
}

export function getServerSideProps({ params: { params } }) {
  return {
    props: {
      params,
    },
  };
}
```
상단 코드 설명

**pages 폴더 밑에, movies 폴더 밑에, […params].js 라는 파일을 만드는 순간**

- nextjs 서버는, **{ params: { params: [    ,    ] } }** 객체를 만든다.  (물론 프로그램이 실행되었을 경우)

- 그래서, localhost:3000/movies/#####/****/??   형식의 url 주소로 이동하게 되면 서버에 **{ params: { params: [  ####  , *** , ??   ] } }**   객체가 생성된다.

 - http://localhost:3000/movies/762430/1212/1212/12/1212로 접속하면 

  - console에 query: params: (5) ['762430', '1212', '1212', '12', '1212'] 이런식으로 모두 catch해서 가져옴.

이 객체값을 받아오려면, 두 가지 방식이 있다.

1. **router를 이용하는 방법(router.query.params)**
```js
/*
router를 생성하려면 js스크립트를 통해 라우터를 형성하는 시간이 필요함.

그래서 만약 router를 생성해서, router를 통해 params 값을 받아오려면
*/
const [title, id] = router.query.params
/* 
처음에는 에러가 난다.

에러가 나는 이유는, router가 없으니, router.query.params 값도 얻을 수 없는데,

const [title, id]=router.query.params; 식으로  title이나 id 변수에, 없는 값을 할당하려 하니 에러가 난다.

그래서 에러를 방지하기 위해 빈 배열을 이용한 것이다.
 */
const [title, id] = router.query.params || [];
/*
조금 시간이 지나 router가 생성되면, 서버에서 간직하고 있는 params객체 값을 router.query.params를 통해 얻어올 수 있다.
*/
```
2. **getServerSideProps()를 이용하는 방법**

```js
/*
이것은 {params: {params} 객체를 서버로부터 받아오고, 지금 페이지(현재의 컴포넌트함수)에게 props로 {params}객체를 리턴하는 것이다.
*/
export function getServerSideProps({params: {params} }) {
  return { props: {params} };
}
/*
이런 식으로 params값을 쏙 빼내서 사용할 수 있게 되고, 리턴은  {params} 를 props로 해서 리턴한다.

그러면 해당 url 주소가 되면 활성화되는 함수인 Detail 함수가, {params} 객체를 인자로 받아들여서,

그 안의 내용을 원하는 변수에 넣어서 사용할 수 있다.
*/
```

```js
export default function Detail( {params} ){
  const [title, id] = params || [];;
  return (
    <div>
      <h4>{title}</h4>
    </div>
  );
}
```

<br>

#### **만약 홈페이지를 거쳐서 해당 url로 왔을 경우

최초에 해당 url(상세페이지)로 접속하게 되면,  서버가 생성하는 params내용은 params: [  ‘spider…’,  ‘634…’ ]  형태로  title, id 라는 변수가 없음.

그치만, 홈페이지에서, 라우터를 만들고, 라우터를 통해서 params 내용을 수정할 수 있다.

```js
export default function Home({ results }) {
    const router = useRouter();
    const onClick = (id, title) => {
    router.push(`/movies/${title}/${id}`);
  };
  return (
  ...
```

이렇게 하면  params는  params: { title: ‘spider…’, id: ‘634…’}   식으로  객체형태로 바뀌게 됌.

nextjs-intro/src/pages/movies/[...params].js
```js
export default function Detail({ params }) {
  const router = useRouter();
  console.log(router)//query: {title: 'Retribution', id: '762430'}
```

이렇게 홈페이지에서 위와 같이 router를 통해 params 모양을 객체로 바꾼 상태에서,

홈페이지에서 다른 url(예를 들어, movies/####/***로 이동하게 되면, 

그 url과 관련된 컴포넌트에서, router나 서버를 통해서, params 를 얻게 되면, 변형된 params를 얻게 되니,

당연히 **id와 title 변수가 들어간 객체 형태의 params**를 얻게 됌.

그래서 **#### 값을 얻으려면, router.query.title**로 얻어야 되고, ***값을 얻으려면, **router.query.id** 로 얻어야 됩니다. (객체의 값을 얻는 방식)

이것과 비교해서, 홈페이지를 거치지 않아서 **params가 수정되지 않은 경우** params 는  **[**  ####, ***  **]** **배열 안에  title, id라는 변수 없이 저장**되어 있기 때문에, 그 값을 얻으려면, const **[** title, id **]** = params;  식으로 얻어내야 된다. ← [배열] 사용한 것에 주목해야함.

즉 이런 식으로 title, id값을 가져오는 것. const [title, id ] = [ ####, *** ];


### router

1. 라우터는 push를 통해 해당 주소로 이동하게 도와주고,
2. push를 하면서, 서버에 있는 params객체에 접근해서, 
    - params 객체 내에 있는 **(프로퍼티인) params**의 파라미터 값을 수정할 수 있고(수정할 경우 객체형태의 params가 됨, 수정전에는 기본적으로 어레이형태이다. ),

3. router.query.params를 통해 params 프로퍼티 값을 가져올 수도 있다.

<br>

[설명 참조](https://imported-sturgeon-51f.notion.site/nextjs-params-router-d7e6c04fdd094adc90418c269af107fd)

<br>

### #2.8 404 Pages

- /src/pages/404.js 해당 위치에 404.js 파일을 만들면 404페이지 커스텀을 할 수 있음.
- 예시 - http://localhost:3000/12313asdasdas 임의로 아무 페이지 접속시 커스텀 404페이지가 나타남.

```js
export default function NotFound() {
    return "what are u doing here?";
}
```

<img width="768" alt="스크린샷 2023-09-30 오후 10 35 50" src="https://github.com/1GYOU1/NextJS/assets/90018379/ef267db6-13ce-4ce4-af74-eaa977bb714f">

<br>

### 완성된 페이지

![ezgif com-gif-maker](https://github.com/1GYOU1/NextJS/assets/90018379/73b1e9ef-a6f7-4f91-995f-4de9608a3d75)

<br>

### Next.js gh-pages 배포하기

https://1gyou1.github.io/NextJs-intro/

### package.json 수정

- homepage 에 url 추가 http://1GYOU1.github.io/ + [나의 레포지토리 주소] => homepage(http://[사용자아이디].github.io/[Repositories이름]) 추가
- build script 에 next export 를 추가
- script 에 deploy 라는 명령어를 만들어 배포까지 한번에 가능한 명령어를 추가
- 깃허브 배포 브랜치명은 무조건 'gh-pages'여야 함 !

명령어 설명
- touch out/.nojekyll : Github page의 jekyll 처리과정에서 _next 이러한 파일을 특수 리소스로 간주하고 최종 사이트에 복사하지 않는데 .nojekyll 파일을 만들면 이를 막을 수 있다.
- git add -f out/ : git add, out폴더가 gitignore에 포함되어 있어서 강제로 add
- git commit -m : 'deploy to gh-pages'라는 커밋 메세지를 작성
- git subtree push —prefix out origin gh-pages : github 저장소 gh-pages브랜치에 push

nextjs-intro/package.json
```js
{
  "name": "nextjs-intro",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build && next export",// export 추가
    "start": "next start",
    "lint": "next lint",
    "predeploy": "npm run build",
    // deploy 추가
    "deploy": "touch out/.nojekyll && gh-pages -d out --dotfiles"
  },
  "dependencies": {
    "autoprefixer": "10.4.15",
    "eslint": "8.49.0",
    "eslint-config-next": "13.4.19",
    "next": "13.4.19",
    "postcss": "8.4.29",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "tailwindcss": "3.3.3"
  },
  "homepage": "https://1gyou1.github.io/NextJs-intro",// homepage 추가
  "devDependencies": {
    "gh-pages": "^6.0.0"
  }
}
```

Next.js로 만든 프로젝트를 깃허브에 배포하면 css랑 img가 적용이 안돼서 나오는데, 약간의 세팅이 필요

### next.config.js 수정

repository는 package.json의 homepage에 있는 url을 넣어주면 된다.

nextjs-intro/next.config.js
```js
/** @type {import('next').NextConfig} */
const debug = process.env.NODE_ENV !== "production";
const repository = "NextJs-intro";

const nextConfig = {
  reactStrictMode: true,
  assetPrefix: !debug ? `/${repository}/` : "", // production 일때 prefix 경로
  trailingSlash: true, // 빌드 시 폴더 구조 그대로 생성하도록
};

// module.exports = nextConfig;
```

### config/config 추가

prefix를 추가

nextjs-intro/src/config
```js
export const prefix =
  process.env.NODE_ENV === "production"
    ? "https://1GYOU1.github.io/NextJs-intro"
    : "";
```

### context/context.js

context api(recoil같이 전역관리)를 이용하여 config.js에서 preix를 가져와 추가해 주어야 한다.

🙋🏻‍♂️ context api가 싫다면, 최상위 컴포넌트에서 props로 prefix를 보내도 상관없음!!
```js
import React from "react";

const PortfolioContext = React.createContext();

export const PortfolioProvider = PortfolioContext.Provider;
export const PortfolioConsumer = PortfolioContext.Consumer;

export default PortfolioContext;
```

### app.js 최상위 컴포넌트를 provider로 감싸기

nextjs-intro/src/pages/_app.js

```js
import Layout from "../components/Layout";
import "../styles/globals.css";

import { PortfolioProvider } from "../components/commons/context/context";
import { prefix } from "../config/config";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
    <PortfolioProvider value={{ prefix }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </PortfolioProvider>
    </>
  );
}
```

### img 사용 예제
프로젝트를 완성하고 배포하려고 한다면, img의 src부분을 수정해 주지 않는다면, 깃허브 배포시 제대로 나오지 않는다. prefix를 붙여서 사용을 하면된다.

#### url 예제

```js
<Box1
  style={{
    backgroundImage: `url(${prefix}/images/rending/rending1.jpg)`,
  }}
>
```

#### src 예제

이미지가 아닌 file도 똑같이 하면 정상 출력된다.

```js
<img src={`${prefix}/vercel.svg`} />
```

그 후 마지막으로 명령어 실행으로 gh-pages에 배포
>$ npm run deploy

<br>

** 오류

gh-pages는 라우팅 문제 때문에 index가 아닌 곳에서 새로고침하거나 랜딩되면 404 페이지로 뜨는 오류 ㅠ (로컬에서는 정상적으로 보임,,)
<span style=text-decoration:line-through>그치만 api로 파라미터값 넘겨받는 url 보이는 거에 만족,,,ㅠ</span>

gh-pages는 정적페이지라서 getServerSideProps 사용하면 에러가 남,, 그래서 getStaticProps로 바꿔줌,, 

global css를 적용해놨는데, 왜 때문인지 안먹음.. 임시방편으로 다른 방법으로 스타일 적용해놨으나 추후 보완해야할듯

<br>

[참고사이트](https://velog.io/@aimzero9303/Next.js-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-GitHubPages-%EB%A1%9C-%EB%B0%B0%ED%8F%AC%ED%95%98%EA%B8%B0)