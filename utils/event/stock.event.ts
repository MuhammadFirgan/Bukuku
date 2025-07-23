import EventEmitter from "react-native/Libraries/vendor/emitter/EventEmitter";

// export const stockEvents = new EventEmitter();

type Callback = () => void;

const listeners = new Set<Callback>();

export const stockEvents = {
  on(callback: Callback) {
    listeners.add(callback);
  },
  off(callback: Callback) {
    listeners.delete(callback);
  },
  emit() {
    for (const callback of listeners) {
      callback();
    }
  },
};