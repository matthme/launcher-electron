import { EventEmitter } from 'events';

import { EventMap } from '../types';

export class TypedEventEmitter extends EventEmitter {
  // Override 'on' method for type safety
  public on<K extends keyof EventMap>(event: K, listener: (arg: EventMap[K]) => void): this {
    return super.on(event, listener);
  }

  // Override 'emit' method for type safety
  public emit<K extends keyof EventMap>(event: K, arg: EventMap[K]): boolean {
    return super.emit(event, arg);
  }

  // Add other methods like 'once', 'off', etc., if needed
}
