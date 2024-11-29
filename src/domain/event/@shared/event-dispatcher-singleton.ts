import EventDispatcher from "./event-dispatcher";

export class EventDispatcherSingleton {
  private static instance: EventDispatcher;

  private constructor() {}

  public static getInstance(): EventDispatcher {
    if (!EventDispatcherSingleton.instance) {
      EventDispatcherSingleton.instance = new EventDispatcher();
    }
    return EventDispatcherSingleton.instance;
  }
}
