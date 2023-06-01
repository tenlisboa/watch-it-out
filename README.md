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

WatchItOut.setup({
    events: ['call'],
    context: {
        loggedUser: {
            name: "John Doe"
        }
    },
    printable: ['loggedUser']
});

const walletWatchable = WatchItOut.init(wallet);

// ... somewhere else
walletWatchable.transfer(100, "0x02dj91ndn218d10dn82837db");

// Log
{ kind: "function", name: "transfer", args: [100, "0x02dj91ndn218d10dn82837db"], loggedUser: {name: "John Doe"} }

```

## Improvements - (OBS: Feel free to contribute and create issues)

- [x] Log a more fancy log as object and timestamp.
- [x] Be able to track the public properties of the observed target if its a class
- [ ] Dynamicaly populate the log object with the received parameters on eventHandlers.
- [ ] Be able to log fancy as a string and verbose with a lot of info.
- [x] Be able to choose what events watch ex: set, get, apply.
- [x] Be able to pass additional context and set what to log of that context, Ex:
`{context: {..., userId: 123}, printable: ["userId"]}`
