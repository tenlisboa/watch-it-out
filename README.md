# Introduction

Are you tired of spreading `console.log` across your app to debug a `cannot read property of undefined: reading foo` or something like that?

WatchItOut came to help you with that, and I'll show you how.

---

# Warning

This package does not work without a node environment, it's not meant to be used in the browser.

It uses a `events` package that is only available in node.

---

# Installation

```bash
    npm i watch-it-out
    yarn add watch-it-out
```

---

#### Example of usage

Imagine that you have a object that is a request body from a http request, and you want to know what is happening with it.

```js
    const Watch = require('watch-it-out');

    app.use('/login', (req, res) => {
        const bodyWithTracker = Watch.new(req.body);

        const usecase = new LoginUser();

        usecase.execute(bodyWithTracker);
    });
```

And inside your usecase you have something like this:

```js
    class LoginUser {
        execute(userInfo) {
            const { email, password } = userInfo; // assessing two properties from the request body

            const user = await User.findOne({ email });

            if (!user) {
                throw new Error('User not found');
            }

            if (user.password !== password) {
                throw new Error('Invalid password');
            }

            return user;
        }
    }
```

You should see in your console the following logs.
So, be careful, because this package will log everything that you do with the object. It means that if you do something like `user.password = 'newpassword'` it will log it too.

*Note: We are working to provide a way to set sensible data to not be logged.*

```js
// { action: "acessing property" , property: "email", value: "useremail@gmail" }
// { action: "acessing property" , property: "password", value: "somepassword" }
```

If you want to config what events log or even provide a context to be logged, you can do it like this:

```js
    const Watch = require('watch-it-out');

    app.use('/login', (req, res) => {
        Watch.config
          .setEvents(['get']) // apply, call
          .setContext({ when: Date.now() });
          .setPrintable(['when']); // Refers to context only
  
        const bodyWithTracker = Watch.new(req.body);

        const usecase = new LoginUser();

        usecase.execute(bodyWithTracker);
    });
```

And now you should see in your console the following logs:

```js
// { action: "acessing property" , property: "email", value: "useremail@gmail", when: 1590000000000 }
// { action: "acessing property" , property: "password", value: "somepassword", when: 1590000000001 }
```
