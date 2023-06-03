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
