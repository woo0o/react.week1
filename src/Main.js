import { round } from "lodash";
import React, { useState } from "react";

import { useHistory } from "react-router-dom";

const MyWeek = (props) => {
  const history = useHistory();
// 페이지를 이동하기 위해서 react-router-dom이 제공해주는 useHistory 훅 사용
  
  const day_text_dict = {
    0: "일",
    1: "월",
    2: "화",
    3: "수",
    4: "목",
    5: "금",
    6: "토",
  };
// 요일지정 

  console.log(
    "요일이 한글로 바뀌었나 확인해봐야지! : ",
    Object.keys(day_text_dict).map((_d, idx) => day_text_dict[_d])
  );

  const week_days = Object.keys(day_text_dict).map((_d, idx) => {
    // 오늘 날짜를 구해요
    let today = new Date().getDay();

    let d =
      today + parseInt(_d) > 6
        ? today + parseInt(_d) - 7
        : today + parseInt(_d);

    // 헷갈려요? 그럴 땐 콘솔로 원하는 키값이 맞는 지 확인해보기! (주석풀고 확인해보세요!)
    // console.log(d);
    return day_text_dict[d];
  });

  console.log("오늘이 제일 위로 오는 지 확인해봐야지! : ", week_days);

  /**
   * Q4. 요일 배열은 다 만들었어요! 이제 요일 별로 평점을 매겨주고 싶어요.
   * 지금 배열은 요일만 가지고 있으니까 평점과 요일(한글로 된 요일 텍스트!)을 모두 가지고 있도록 바꿔주려면 어떻게 해야할까?
   *  -> 배열 요소 하나하나를 String이 아니라 딕셔너리가 되도록 해주면 되겠네요!
   *
   * Q5. 평점을 랜덤으로 보여주고 싶어요! 어떻게 해야할까?
   *  -> 랜덤하게 1~5 중 한 숫자를 가져오는 방법을 찾아야죠!
   *  -> 평점을 랜덤으로 생성해보자! 참고: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Math/random
   *
   * Q6. 전체 평균 평점을 구하려면 어떻게 해야할까?
   *  -> 랜덤으로 생성된 각 요일별 평점을 더해주고 일주일은 7일이니, 요일 정보를 담고 있는 배열의 길이로 나눠주면 되겠죠!
   */

  // 평점 합계를 담아둘 변수입니다!
  let rate_sum = 0;

  // 요일별 점수를 랜덤으로 추가하기 위한 과정입니다!
  const week_rates = week_days.map((w, idx) => {
    const random =
      Math.floor(Math.random() * (Math.floor(5) - Math.ceil(1) + 1)) +
      Math.ceil(1);
    rate_sum += random;

    // day는 요일 텍스트가, rate는 랜덤 평점이 들어가요!
    return {
      day: w,
      rate: random,
    };
  });

  console.log(
    "평점이 랜덤하게 들어간 배열이 잘 나왔는 지 확인해봐야지! : ",
    week_rates,
    week_rates.length
  );

  const rate_avg = (rate_sum / week_rates.length).toFixed(1);
  const [avg, setAvg] = useState(rate_avg);

  // 이제 화면에 뿌려줘볼 차례예요!
  // 화면을 만들어봅시다.
  return (
    <>
      <div
        style={{
          maxWidth: "350px",
          width: "80vw",
          height: "90vh",
          margin: "5vh auto",
          padding: "5vh 0",
          border: "1px solid #ddd",
          boxSizing: "border-box",
          borderRadius: "5px",
        }}
      >
        <h3 style={{ textAlign: "center" }}>내 일주일은?</h3>

        {week_rates.map((w, idx) => {
          return (
            <div
              key={`week_day_${idx}`}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "1rem 0",
                width: "100%",
              }}
            >
              <p style={{ margin: "0 0.5rem 0 0", fontWeight: "bold" }}>
                {w.day}
              </p>

              {Array.from({ length: 5 }, (item, idx) => {
                return (
                  <div
                    key={idx}
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "30px",
                      margin: "5px",
                      backgroundColor: w.rate < idx ? "#ddd" : "#ffeb3b",
                    }}
                  ></div>
                );
              })}

              <div
                style={{
                  appearance: "none",
                  backgroundColor: "transparent",
                  borderColor: "purple",
                  width: "0",
                  height: "0",
                  borderTop: "1rem solid transparent",
                  borderBottom: "1rem solid transparent",
                  borderLeft: "1.6rem solid purple",
                  color: "#fff",
                  cursor: "pointer",
                }}
                onClick={() => {
                  history.push(`/review/${w.day}`);
                }}
              ></div>
            </div>
          );
        })}
        <div
          style={{
            width: "8rem",
            margin: "1rem auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            textAlign: "center",
            color: "blue",
            padding: "9px",
            fontSize: "25px",
            fontWeight: "bold",
          }}
        >
          평균 평점 {avg}
          <div
            style={{
              width: "inherit",
              height: "fit-content",
              backgroundColor: "dodgerblue",
              borderRadius: "6px",
              textAlign: "center",
              margin: "10px 0 0 0",
            }}
            onClick={() => {
              setAvg(parseInt(0).toFixed(1));
            }}
          >
            <p style={{ color: "white", fontSize: "18px" }}>Reset</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyWeek;
