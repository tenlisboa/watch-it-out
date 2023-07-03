export class Subscriber {
  constructor() {
    this.subscribers = [];
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber);
  }

  notify(data) {
    this.subscribers.forEach(subscriber => subscriber(data));
  }
}
