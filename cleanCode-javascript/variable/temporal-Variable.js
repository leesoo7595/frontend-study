/**
 * 임시 변수 제거하기
 * 임시 변수란, 함수 안에서 값이 단 한 번만 할당되고 그 후로는 읽히기만 하는 변수를 말한다.
 * 임시 변수를 잘 못 사용하면 코드를 이해하기 어려워지고, 버그를 발생시키기 쉬워진다.
 * 이는 전역 변수를 사용하는 것과 비슷한 문제이다.
 */

// 임시 변수를 사용한 코드
function getObject() {
  const result = {};

  result.name = document.getElementById("name").value;
  result.location = document.getElementById("location").value;

  return result;
}

// 임시 변수를 제거한 코드
function getObject() {
  return {
    name: document.getElementById("name").value,
    location: document.getElementById("location").value,
  };
}

// 예시 2 - 임시 변수를 사용한 코드
function getDateTime(targetDate) {
  let month = targetDate.getMonth() + 1;
  let day = targetDate.getDate();
  let hour = targetDate.getHours();

  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;
  hour = hour < 10 ? "0" + hour : hour;

  return { month, day, hour };
}
