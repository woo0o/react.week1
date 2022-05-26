// import React from "react"; > 2020년 10월이후 버전부터 생략해도 됨

import { Route,Switch } from "react-router-dom";
// 라우팅 설치할때 6말고 5.2.1버전 사용 여기에 BrowserRouter같이설치안되서 index.js에넣음

import Main from "./Main";
import Review from "./Review";
// Main,Review 가져온다

function App() {
  
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <Main />
        </Route>
        <Route path="/review/:week_day" exact>
          <Review />
        </Route>
      </Switch>
    </div>
  );
}
// exact는 왜 써줬을까요? 헷갈린다면 아래의 exact를 지우고 상세페이지(~~~/review/월)로 이동해서 확인해보기! 
// exact 없으면 클릭해도 페이지이동이 안됨
// <Switch>로 감싸진 <Route>들은, 여러개가 매칭이 되어도 가장 먼저 매칭된 맨 위의 <Route>하나만 보여줌
// 6버전부터 Switch의 이름이 Routes로 변경됨, exact옵션도 삭제됨


export default App;
