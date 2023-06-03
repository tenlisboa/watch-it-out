# Introduction

Are you tired of spreading `console.log` across your app to debug a `cannot read property of undefined: reading foo` or something like that?

WatchItOut came to help you with that, and I'll show you how.

#### Most simplest usage
```js
class Wallet {
    transfer(amount, address) {
        // ... do transfer
    }
}

// ... somewhere

const walletWatchable = WatchItOut.new(new Wallet());

// ... somewhere else
walletWatchable.transfer(100, "0x02dj91ndn218d10dn82837db");

// Log --> { action: "calling a method", method: "transfer", on: { transfer: [Function tranfer],with: [100, "0x02dj91ndn218d10dn82837db"] },
```

# Limitations
This module does not work with typescript or esmodules for a while, it's in development stage, and it's usage is not recommended for other purposes out o tracking changes of Objects in your NodeJS app.

We know that most of the modern NodeJS apps today are written with typescript, and this is being implemented, if you are reading this section, probably it's not ready yet.
