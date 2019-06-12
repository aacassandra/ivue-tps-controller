import { SetCookie, GetCookie, DeleteCookie } from "./cookies";
declare global {
  interface Window {
    sqlitePlugin: any;
    openDatabase(r1: any, r2: any, r3: any, r4: any): any;
    cordova: any;
  }

  interface Db {
    transaction(r1: any): any;
  }

  export interface OPT {
    DB_NAME?: string;
    TB_NAME?: string;
    DRIVER?: string;
  }
}

let db: Db;

export class ClassController {
  DB_NAME: any;
  TB_NAME: any;
  DB_NAME_BACKUP: any;
  constructor() {}

  async init(data: OPT) {
    this.DB_NAME = data.DB_NAME;
    this.TB_NAME = data.TB_NAME;
    this.DB_NAME_BACKUP = GetCookie("SQLite");
    if (this.DB_NAME_BACKUP == undefined) {
      let baks = {
        db_name: data.DB_NAME,
        tb_name: data.TB_NAME
      };
      let bak = JSON.stringify(baks);
      SetCookie("SQLite", bak);
      this.DB_NAME_BACKUP = GetCookie("SQLite");
      this.open();
    } else {
      let getBak = JSON.parse(this.DB_NAME_BACKUP);
      if (getBak.db_name != data.DB_NAME) {
        console.log("Database renaming is detected !!!");
        await this.destroy(getBak);
        this.DB_NAME = data.DB_NAME;
        this.TB_NAME = data.TB_NAME;
        let baks = {
          db_name: data.DB_NAME,
          tb_name: data.TB_NAME
        };
        let bak = JSON.stringify(baks);
        SetCookie("SQLite", bak);
        this.DB_NAME_BACKUP = GetCookie("SQLite");
        this.open();
      } else {
        this.open();
      }
    }
  }

  async open() {
    let self = this;
    let platform = window.cordova.platformId;
    if (platform == "browser") {
      db = window.openDatabase(this.DB_NAME, "1.0", "Data", 2 * 1024 * 1024);
    } else if (platform == "android") {
      db = window.sqlitePlugin.openDatabase({
        name: "my.db",
        location: "default",
        androidDatabaseProvider: "system"
      });
    } else if (platform == "ios") {
      db = window.sqlitePlugin.openDatabase({
        name: "my.db",
        iosDatabaseLocation: "Documents"
      });
    }

    db.transaction(function(tx: any) {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS " + self.TB_NAME + " (key text, value)",
        [],
        function(tx: any, result: any) {
          //Table created successfully
        },
        function(error: any) {
          console.log(error);
        }
      );
    });
  }

  async set(KEY: string, VALUEX: string) {
    var VALUE = JSON.stringify(VALUEX);
    let self = this;

    //check key if available on storage
    let check = await this.get(KEY);
    if (check != undefined) {
      await this.remove(KEY);
    }

    //create key
    await db.transaction(function(transaction: any) {
      var executeQuery =
        "INSERT INTO " + self.TB_NAME + " (key, value) VALUES (?,?)";
      transaction.executeSql(
        executeQuery,
        [KEY, VALUE],
        function(tx: any, result: any) {
          //Inserted
        },
        function(error: any) {
          console.log(error);
        }
      );
    });
    return;
  }

  async get(KEY: string) {
    let self = this;
    return new Promise((resolve, reject) => {
      db.transaction(function(transaction: any) {
        var executeQuery =
          "SELECT * FROM " + self.TB_NAME + " WHERE key='" + KEY + "'";
        transaction.executeSql(
          executeQuery,
          [],
          function(tx: any, result: any) {
            if (result.rows.length != 0) {
              var obj = JSON.parse(result.rows[0].value);
              resolve(obj);
            } else {
              resolve();
            }
          },
          function(error: any) {
            console.log(error);
            reject(error);
          }
        );
      });
    });
  }

  async remove(KEY: string) {
    let self = this;
    await db.transaction(function(transaction: any) {
      var executeQuery = "DELETE FROM " + self.TB_NAME + " where key=?";
      transaction.executeSql(
        executeQuery,
        [KEY],
        function(tx: any, result: any) {
          //Delete successfully
        },
        function(error: any) {
          console.log(error);
        }
      );
    });

    return;
  }

  async clear() {
    let self = this;
    await db.transaction(function(transaction: any) {
      var executeQuery = "DELETE FROM " + self.TB_NAME;
      transaction.executeSql(
        executeQuery,
        [],
        function(tx: any, result: any) {
          //Delete successfully
        },
        function(error: any) {
          console.log(error);
        }
      );
    });

    return;
  }

  async destroy(getBak: any) {
    this.DB_NAME = getBak.db_name;
    this.TB_NAME = getBak.tb_name;
    await this.open();
    await this.clear();
    let self = this;
    await db.transaction(function(transaction: any) {
      var executeQuery = "DROP TABLE IF EXISTS " + self.TB_NAME;
      transaction.executeSql(
        executeQuery,
        [],
        function(tx: any, result: any) {
          //Table deleted successfully
        },
        function(error: any) {
          console.log(error);
        }
      );
    });
    return;
  }
}

let SQLite: ClassController = new ClassController();
export default SQLite;
