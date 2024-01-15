/**  var는 함수 스코프를 가지고 있다, let, const는 블록 스코프를 가지고 있다. (핵심)
 * var 사용을 지양하라
 * var는 선언하기 전에 사용해도 에러가 나지 않는다. (호이스팅)
 * let, const는 선언하기 전에 사용하면 에러가 난다.(호이스팅 but TDZ)
 * var는 재선언이 가능하다. let, const는 재선언이 불가능하다.
 * var는 선언과 동시에 초기화가 가능하다. let, const는 선언과 동시에 초기화가 불가능하다.
 */

// var는 함수 스코프를 가지고 있다.
function FN_foo_var() {
  var var_x = 1;
  if (true) {
    var var_x = 10;
    console.log("var_x", var_x); // 10
  }
  console.log("var_x2", var_x); // 10
}

// let, const는 블록 스코프를 가지고 있다.
function FN_foo_let() {
  let let_x = 1;
  if (true) {
    let let_x = 10;
    console.log("let_x", let_x); // 10
  }
  console.log("let_x2", let_x); // 1
}

FN_foo_var();
FN_foo_let();

// var는 선언하기 전에 사용해도 에러가 나지 않는다. (호이스팅)
console.log("var_foo", var_foo); // undefined
var var_foo;

// let, const는 선언하기 전에 사용하면 에러가 난다. (호이스팅 but TDZ)
console.log("let_foo", let_foo); // ReferenceError: Cannot access 'foo' before initialization
let let_foo;

// let 보다 const를 사용하자.
// const는 재할당이 불가능하다. but const로 선언한 객체(배열)의 값은 변경이 가능하다.
