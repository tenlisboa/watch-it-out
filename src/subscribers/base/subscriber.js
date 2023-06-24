export class Subscriber {
  constructor() {
    this.subscribers = [];
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber);
  }

  unsubscribe(subscriber) {
    this.subscribers = this.subscribers.filter(s => s !== subscriber);
  }

  notify(data) {
    this.subscribers.forEach(subscriber => subscriber(data));
  }
}
