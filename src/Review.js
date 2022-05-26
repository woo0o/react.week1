import React from "react";
import { useHistory, useParams } from "react-router-dom";

/**
 * 이 페이지에서는 해당 요일의 평점을 남길 수 있도록 해줄거예요.
 * n번째 회색 동그라미를 누르면 평점이 n점으로 기록되도록 해줍시다!
 * 그리고 평점이 n점이 되면 1~n번째 동그라미는 노랑색으로 바뀌게 해줄거예요.
 * 
 * +) 키보드로 1~5까지 숫자를 눌렀을 때에도 평점이 바뀌도록 해줄거예요.
 */
const Review = (props) => {
  // 페이지를 이동하기 위해서 저는 history 객체를 사용할거예요.
  // 어떻게? react-router-dom이 제공해주는 useHistory 훅을 사용해서요!
  const history = useHistory();
  // 파라미터를 가져오기 위해 react-router-dom의 useParams 훅을 사용할거예요!
  const params = useParams();

  // 평점은 state에 넣고 관리할거예요.
  const [rate, setRate] = React.useState(0);

  // 키보드를 누르는 이벤트를 등록하기 위해, useEffect 훅을 사용해요!
  // useEffect(1번째 인자, 2번째 인자)에서 1번째 인자는 함수가 들어가고, 2번째 인자는 디펜던시 어레이가 들어가요.
  // 디펜던시 어레이에 넣은 값이 변하면? 1번째 인자로 넘긴 함수가 다시 한 번 실행됩니다.
  // 지금처럼 디펜던시 어레이를 비워두면요? 컴포넌트가 생길 때 1번만 1번째 인자의 함수를 실행하고 더는 아무 것도 하지 않아요!
  // useEffect 훅의 자세한 내용은 강의나 리액트 공식문서를 찾아보기!
  React.useEffect(() => {

    /**
     * Q7. 키보드의 1~5까지 숫자를 누르면 평점이 입력되도록 하고 싶어요! 
     *  -> 키보드를 누를 때 발생할 이벤트를 관리해야겠다! 
     *  -> 자바스크립트에서 키보드 누를 때 발생하는 이벤트가 뭐가 있을까 검색해보기!
     * 
     * Q8. keydown 이벤트를 등록해주면 된다는데, 어디에 등록을 해야할까?
     *  -> 어디에 포커스 되어 있던 나는 평점을 매겨주고 싶으니까 window 객체에 등록해야겠어요. :)
     *  -> 어떻게 등록해줄까? 1. addEventListener로 등록을 해야해! 필요한 게 뭐가 있지? 2. 앗 이벤트 발생할 때 실행할 함수가 필요해! 함수를 만들자. 3. 함수에서는 뭘 해야할까? 4. 1~5를 누를 때를 알아야 해! 그 때만 setRate해주자!
     * 
     * Q9. 등록을 했으면 해제를 해야해요! 언제 이벤트를 해애해야할까?
     *  -> 이 페이지에서 벗어나면 이 이벤트는 필요하지 않으니 해제하고 싶어요.
     *  -> 이 페이지에서 벗어난다? Review 컴포넌트가 화면에 보이지 않을 때구나!
     *  -> useEffect에서 컴포넌트가 사라지는 타이밍을 어떻게 찾는 지 검색해보기!
     *  -> useEffect 훅 내에서 return에 넣어주면 된대요! :)
     */
    

    // keydown 이벤트가 발생하면 실행할 함수를 만들어요.
    const press = (e) => {
      console.log("키보드를 누르면 어떤 이벤트가 발생하는 지 확인해야지! : ", e);

      // e.key로 받아온(누른 키) 값이 1~5까지 숫자가 맞아?
      // 저는 배열에 넣고 indexOf로 확인했어요. :)
      if ([1, 2, 3, 4, 5].indexOf(parseInt(e.key)) !== -1) {
        // 1~5까지 숫자가 맞으면 state에 넣어주자!
        setRate(parseInt(e.key));
      }
    };
    window.addEventListener("keydown", press);

    // 컴포넌트가 언마운트 되면(화면에서 사라지면) 이벤트도 지워줘요!
    return () => window.removeEventListener("keydown", press);
  }, []);

  // 화면을 만들어봅시다!
  return (
    <>
      {/* Quiz : style을 styled-components를 사용하도록 변경해주세요! :) (스타일을 그대로 옮겨도 좋고, 좀 더 예쁘게 바꿔도 좋아요!) */}
      <div
        style={{
          maxWidth: "350px",
          width: "80vw",
          height: "90vh",
          margin: "5vh auto",
          padding: "5vh 5vw",
          border: "1px solid #ddd",
          boxSizing: "border-box",
          borderRadius: "5px",
        }}
      >
        <h3 style={{ textAlign: "center" }}>
          <span
            style={{
              color: "#fff",
              fontWeight: "900",
              background: "orange",
              padding: "0.2rem",
              borderRadius: "5px",
            }}
          >
            {/* 파라미터를 받아서 화면에 넘겨줬어요. */}
            {params.week_day}요일
          </span>{" "}
          평점 남기기
        </h3>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "1rem 0",
            width: "100%",
          }}
        >
          {/* 동그라미 5개를 만들어볼까요! */}
          {Array.from({ length: 5 }, (item, idx) => {
            return (
              <div
                key={idx}
                onClick={() => {
                  // 동그라미 하나를 누르면 평점을 남길거예요.
                  // idx는 0부터 시작하니까 +1을 해줘요.
                  // setRate는 state를 바꿔주는 칭구입니다. (위에서 useState 훅을 사용해서 만들어줬죠!)
                  setRate(idx + 1);
                }}
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "30px",
                  margin: "5px",
                  backgroundColor: rate < idx + 1 ? "#ddd" : "#ffeb3b",
                }}
              ></div>
            );
          })}
        </div>

          {/* 평점을 남기면 뒤로 가도록 뒤로가는 버튼을 만들었어요. */}
        <button
          style={{
            width: "100%",
            backgroundColor: "purple",
            border: "none",
            borderRadius: "5px",
            padding: "1rem",
            color: "#fff",
          }}
          onClick={() => {
            // 뒤로가기!
            history.goBack();
          }}
        >
          평점 남기기
        </button>
      </div>
    </>
  );
};

export default Review;
