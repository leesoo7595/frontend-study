// typeof 연산자를 사용하면 피연산자의 타입을 문자열로 알려준다.

typeof "문자열"; // "string"
typeof true; // "boolean"
typeof undefined; // "undefined"
typeof 123; // "number"
typeof Symbol(); // "symbol"

// typeof null 은 object 이다.

// Primitive type vs Reference type

// Primitive type
// boolean, null, undefined, number, string, symbol

// Reference type
// object, array, function

// Reference type은 typeof 연산자로 알 수 없다.
typeof {}; // "object"
typeof []; // "object"
typeof function () {}; // "function"
const str = new String("문자열");
typeof str; // "object"

// instanceof 연산자
// 객체가 특정 생성자의 인스턴스인지 확인한다.

function Person(name, age) {
  this.name = name;
  this.age = age;
}

const p = {
  name: "홍길동",
  age: 20,
};

const person = new Person("홍길동", 20);

person instanceof Person; // true

p instanceof Person; // false

const arr = [1, 2, 3];
const func = function () {};
const date = new Date();

arr instanceof Array; // true
func instanceof Function; // true
date instanceof Date; // true

arr instanceof Object; // true
func instanceof Object; // true
date instanceof Object; // true

Object.prototype.toString.call(arr); // "[object Array]"
Object.prototype.toString.call(func); // "[object Function]"
Object.prototype.toString.call(date); // "[object Date]"
