declare global {
  interface Local {
    setItem(key: string, value: string): any;
    getItem(key: string): Promise<string>;
    removeItem(key: string): void;
    clear(): void;
  }
}

declare let localStorage: Local;
export class ClassController {
  constructor() {}

  async set(KEY: string, VALUE: string) {
    await localStorage.setItem(KEY, VALUE);
    return;
  }

  async get(KEY: string) {
    let res: string = await localStorage.getItem(KEY);
    return new Promise((resolve, reject) => {
      resolve(res);
    });
  }

  async remove(KEY: string) {
    await localStorage.removeItem(KEY);
    return;
  }

  async clear() {
    await localStorage.clear();
    return;
  }
}

let LocalStorage: ClassController = new ClassController();
export default LocalStorage;
