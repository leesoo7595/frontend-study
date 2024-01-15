/**
 * 호이스팅에 대해 알아보자
 * 호이스팅이란?
 * 런타임 이전에 자바스크립트 엔진에 의해 선언문이 먼저 실행되고 할당문은 나중에 실행되는 것을 말한다.
 * 즉, 변수의 선언이나 함수의 선언을 해당 스코프의 선두로 옮기는 것을 말한다.
 * 변수의 선언은 런타임 이전에 실행되지만 할당은 런타임에 실행된다.
 * 함수 선언도 마찬가지이다.
 */

var globalVar = 0;

function outer() {
  console.log(globalVar);
  var globalVar = 1;

  function inner() {
    var globalVar = 2;
    console.log(globalVar);
  }

  inner();

  globalVar = 3;

  console.log(globalVar);
}

outer();

// 위 코드의 결과
// undefined
// 2
// 3

// 위 코드의 결과를 해석해보자
// undefined 는 왜 나왔을까?
// var globalVar = 1; 이 코드가 호이스팅 되었기 때문이다.

// 예제 2
function duplicatedVar() {
  var x;
  console.log("1", x);
  var x = 2;
  console.log("2", x);
}

console.log(duplicatedVar());

// 위 코드의 결과
// 1 undefined
// 2 2
// undefined
