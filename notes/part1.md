# part1 Introduction to React
## Intro
### JSX
The layout of React components is mostly written using **JSX**.

In practice, JSX is much like HTML with the distinction that with JSX you can easily embed dynamic content by writing appropriate JavaScript within curly braces. The idea of JSX is quite similar to many templating languages, such as Thymeleaf used along with Java Spring, which are used on servers.

JSX is "XML-like", which means that every tag needs to be *closed*. 

### Props
props are used to pass data and event handlers to child components.

```jsx
const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}</p>
    </div>
  )
}
```

### Notes

React component names must be capitalized. In the following code, footer is not a component, but a HTML tag.

``` jsx {6}
const App = () => {
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <footer />
    </div>
  )
}
```

The content of a React component (usually) needs to contain one root element. 

``` jsx
const App = () => {
  return (
    <h1>Greetings</h1>
    <Hello name='Maya' age={26 + 10} />
    <Footer />
  )
}
```
without an div element, the code above will throw an error.

Using a root element is not the only working option. An array of components is also a valid solution:
``` jsx
const App = () => {
  return [
    <h1>Greetings</h1>,
    <Hello name='Maya' age={26 + 10} />,
    <Footer />
  ]
}
```

Because the root element is stipulated, we have "extra" div elements in the DOM tree. This can be avoided by using fragments, i.e. by wrapping the elements to be returned by the component with an empty element:

``` jsx
const App = () => {
  return (
    <>
      <h1>Greetings</h1>
      <Hello name='Maya' age={26 + 10} />
      <Footer />
    </>
  )
}
```

## JavaScript

Browsers do not yet support all of JavaScript's newest features. Due to this fact, a lot of code run in browsers has been *transpiled* from a newer version of JavaScript to an older, more compatible version. Today, the most popular way to do transpiling is by using ***Babel***.

Node.js is a *JavaScript runtime environment* based on *Google's Chrome V8* JavaScript engine and works practically anywhere - from servers to mobile phones. 

### Variables
`Const` does not define a variable but a constant for which the value can no longer be changed. On the other hand, `let` defines a normal variable.

``` js
console.log(x, y)   // 1, 5 are printed
y += 10
console.log(x, y)   // 1, 15 are printed
y = 'sometext'
console.log(x, y)   // 1, sometext are printed
x = 4               // causes an error
```

It is also possible to define variables in JavaScript using the keyword `var`. `var` was, for a long time, the only way to define variables. const and let were only recently added in version *ES6*. 

The difference between ***var*** & ***let***:
- The scope of a variable defined with var is function scope or declared outside any function, global.
- The scope of a variable defined with let is block scope.

## Array

``` js
const t = [1, -1, 3]

t.push(5)

console.log(t.length) // 4 is printed
console.log(t[1])     // -1 is printed

t.forEach(value => {
  console.log(value)  // numbers 1, -1, 3, 5 are printed, each to own line
})
```
The contents of the array can be modified even though it is defined as a `const`. Because the array is an **object**, the variable always *points to* the same object. However, the content of the array changes as new items are added to it.

The `forEach` method is used to go through the items in an array. The method receives a function as a parameter, and that function is invoked for each of the items in the array.

`push` adds an item to the end of an array.

One characteristic of the functional programming paradigm is the use of immutable data structures. In React code, it is preferable to use the method `concat`, which creates a new array with the added item. This ensures the original array remains unchanged.

``` js
const t = [1, -1, 3]
const t2 = t.concat(5)

console.log(t)  // [1, -1, 3] is printed
console.log(t2) // [1, -1, 3, 5] is printed
```

The `map` method creates a new array by calling its callback function for each item.

``` js
const t = [1, 2, 3]
const m1 = t.map(value => value * 2)
console.log(m1)   // [2, 4, 6] is printed

const m2 = t.map(value => '<li>' + value + '</li>')
console.log(m2)
// [ '<li>1</li>', '<li>2</li>', '<li>3</li>' ] is printed
```

Individual items of an array are easy to assign to variables with the help of the ***destructuring assignment***.

``` js
const t = [1, 2, 3, 4, 5]

const [first, second, ...rest] = t

console.log(first, second)  // 1, 2 is printed
console.log(rest)           // [3, 4 ,5] is printed
```

## Objects
The values of the properties can be of any type, like integers, strings, arrays, objects...

1. Object literals
``` js
const object1 = {
  name: {
    first: 'Dan',
    last: 'Abramov',
  },
  grades: [2, 3, 5, 3],
  department: 'Stanford University',
}
```

2. Object constructor
``` js
const object2 = new Object()
object2.name = {
  first: 'Dan',
  last: 'Abramov',
}
object2.grades = [2, 3, 5, 3]
object2.department = 'Stanford University'
```

3. Object.create
``` js
const object3 = Object.create(Object.prototype, {
  name: {
    first: 'Dan',
    last: 'Abramov',
  },
  grades: [2, 3, 5, 3],
  department: 'Stanford University',
})
```

4. Class
``` js
class Person {
  constructor(first, last) {
    this.name = {
      first,
      last,
    }
  }
  grades = [2, 3, 5, 3]
  department = 'Stanford University'
}
const object4 = new Person('Dan', 'Abramov')
```

You can also add properties to an object on the fly by either using dot notation or brackets:
``` js
object1.address = 'Helsinki'
object1['secret number'] = 12341
```

## Functions
If there is just a single parameter, we can exclude the parentheses from the definition. If the function only contains a single expression then the braces are not needed. This form is particularly handy when manipulating arrays - e.g. when using the map method:

```js
const t = [1, 2, 3]
const tSquared = t.map(p => p * p)
// tSquared is now [1, 4, 9]
```
