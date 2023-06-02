# Introduction

The purpose of this package is help those who work with some kind of architeture that is tricky to observe, such as serverless or even several microservices and also if you have some object, class, variable, function that you want to track its changes.

#### Most simplest usage
```js
class Wallet {
    transfer(amount, address) {
        // ... do transfer
    }
}

// ... somewhere

WatchItOut.config.setEvents(['call']); // setLogger, setContext, setPrintable

const walletWatchable = WatchItOut.new(new Wallet());

// ... somewhere else
walletWatchable.transfer(100, "0x02dj91ndn218d10dn82837db");

// Log --> { action: "calling a method", method: "transfer", on: { transfer: [Function tranfer],with: [100, "0x02dj91ndn218d10dn82837db"] },
```
