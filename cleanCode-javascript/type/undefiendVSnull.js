/**
 * undefined vs null
 * undefined는 변수를 선언하고 값을 할당하지 않았을 때, 또는 객체에서 존재하지 않는 프로퍼티를 읽을 때 반환되는 값이다.
 * null은 변수를 선언하고 명시적으로 값 null을 할당했을 때 반환되는 값이다.
 */

!null; // true
!!null; // false

null === false; // false

null + 123; // 123

// undefined는 아무것도 지정안했을 때의 기본값
let varb;

typeof varb; // "undefined"

undefined + 123; // NaN
!undefined; // true

// 이처럼 undefined와 null은 다르다.
// 그러나 많은 혼란을 주기 때문에, 빈 값이 필요한 경우 둘 중 하나를 선택해서 사용하는 것이 좋다.
