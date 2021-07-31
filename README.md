## React Redux Login, Logout, Registration example using Hooks

For more detail, please visit:
> [React Redux Login, Logout, Registration example with Hooks](https://bezkoder.com/react-hooks-redux-login-registration-example/)

> [React Hooks: JWT Authentication & Authorization (without Redux) example](https://bezkoder.com/react-hooks-jwt-auth/)

> [React Redux Login, Logout, Registration example (using React Components)](https://bezkoder.com/react-redux-jwt-auth/)

Fullstack (JWT Authentication & Authorization example):
> [React + Spring Boot](https://bezkoder.com/spring-boot-react-jwt-auth/)

> [React + Node.js Express](https://bezkoder.com/react-express-authentication-jwt/)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Set port
.env
```
PORT=8081
```

### Note:
Open `src/services/auth-header.js` and modify `return` statement for appropriate back-end (found in the tutorial).

```js
export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.accessToken) {
    // return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
    return { 'x-access-token': user.accessToken };             // for Node.js Express back-end
  } else {
    return {};
  }
}
```

### Project setup

In the project directory, you can run:

```
npm install
# or
yarn install
```

or

### Compiles and hot-reloads for development

```
npm start
# or
yarn start
```
Note: Make sure your app is running on 127.0.0.1:8003

url is on 127.0.0.1:8003 which is where your django application should be running

The page will reload if you make edits.
