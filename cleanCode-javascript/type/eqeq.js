/**
 * Equality (==)을 사용하지 않는다.
 * strict equality (===)을 사용한다.
 * ==는 형변환이 일어나기 때문에 ===를 사용하는 것이 좋다.
 */

// == 말고 === 를 사용하라
// 예시 1
0 == false; // true
0 === false; // false

// 예시 2
"" == false; // true
"" === false; // false

// 명시적 형변환을 사용하라
// 예시 1
const x = 10;
const str = x.toString();

typeof str; // "string"
