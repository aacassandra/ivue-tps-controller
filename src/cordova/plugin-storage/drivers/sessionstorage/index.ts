declare global {
  interface Session {
    setItem(key: string, value: string): any;
    getItem(key: string): Promise<string>;
    removeItem(key: string): void;
    clear(): void;
  }
}

declare let sessionStorage: Session;
export class ClassController {
  constructor() {}

  async set(KEY: string, VALUE: string) {
    await sessionStorage.setItem(KEY, VALUE);
    return;
  }

  async get(KEY: string) {
    let res: string = await sessionStorage.getItem(KEY);
    return new Promise((resolve, reject) => {
      resolve(res);
    });
  }

  async remove(KEY: string) {
    await sessionStorage.removeItem(KEY);
    return;
  }

  async clear() {
    await sessionStorage.clear();
    return;
  }
}

let SessionStorage: ClassController = new ClassController();
export default SessionStorage;
