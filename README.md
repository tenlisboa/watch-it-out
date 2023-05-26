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
const wallet = new Wallet();
const walletWatchable = WatchIt.init(wallet);

// ... somewhere else
walletWatchable.transfer(100, "0x02dj91ndn218d10dn82837db");

// Log
{ kind: "function", name: "transfer", args: [100, "0x02dj91ndn218d10dn82837db"] }

```

## Improvements - (OBS: Feel free to contribute and create issues)

- [x] Log a more fancy log as object and timestamp.
- [ ] Be able to track the public properties of the observed target if its a class
- [ ] Be able to configure what to log with a config object.
- [ ] Be able to log fancy as a string and verbose with a lot of info.
- [ ] Be able to choose what events watch ex: set, get, call.
- [ ] Be able to pass additional context and set what to log of that context, Ex:
`{context: {..., userId: 123}, expose: ["userId"]}`
