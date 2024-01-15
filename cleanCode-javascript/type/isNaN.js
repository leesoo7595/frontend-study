/**
 * 2진수 vs 10진수 에 가장 큰 차이점은 소수점 표현입니다.
 * javsscript에서는 부동소수점을 사용합니다.
 */

Number.MAX_SAFE_INTEGER; // 9007199254740991

// isNaN() 함수는 주어진 값이 NaN인지 여부를 판별합니다.
// 예시
isNaN(NaN); // true
isNaN(undefined); // true
isNaN({}); // true

isNaN(true); // false
isNaN(null); // false
isNaN(37); // false

// ES2015 이후부터는 Number.isNaN() 함수를 사용하면 됩니다.
Number.isNaN(NaN); // true
Number.isNaN(undefined); // false
Number.isNaN({}); // false
