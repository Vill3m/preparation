/**
 * возвращаемый тип синхронные или асинхронный
 * упоковать в Promise<string | null>
 * async лучше чем Promise.resolve(), тк выше декларативность
 * kv-storage
 * exports отстортировать в порядке важности
 * разделять публичные и приватные reexport
 */
type SerializablePrimitiveValue = string | number | boolean | null;

type SerializableValue =
  | SerializablePrimitiveValue
  | SerializablePrimitiveValue[]
  | Record<string, SerializablePrimitiveValue>
  | { toJson(): SerializableValue };

class LSFactory {
  constructor(readonly namespace: string) {}

  get(name: string): string | null {
    return localStorage.getItem(this.#getKey(name));
  }
  set(name: string, value: string): void {
    return localStorage.setItem(this.#getKey(name), value);
  }
  remove(name: string): void {
    return localStorage.removeItem(this.#getKey(name));
  }

  #getKey(key: string): string {
    return `[[${this.namespace}]]-${key}`;
  }
}

export default function (name: string): LSFactory {
  return new LSFactory(name);
}

/**
 * solid
 */
class LocalStorage {
  load() {}
}
class Server {
  load() {}
}
class Widget {
  locaStorage = new LocalStorage();
  server = new Server();

  // быть не может
  loadFromStorage() {}
  // быть не может
  getDataFromServer() {}
  render() {}
  mount() {}
}

/**
 * lcp
 */
class Button extends Widget {
  render(): void {}
}
function showWidgetIfno(widget: Widget) {
  console.log(widget);
}
showWidgetIfno(new Button());
