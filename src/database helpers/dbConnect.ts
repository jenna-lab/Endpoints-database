import * as mssql from "mssql";
import {sqlConfig} from "../config/sqlConfig";;

class Connection {
  pool: mssql.ConnectionPool | undefined;
  constructor() {
    this.connectToDb();
  }
  connectToDb = async () => {
    try {
      this.pool = await mssql.connect(sqlConfig);
    } catch (error) {
    }
  };
  createrequestObj = (requestObj: mssql.Request, data: any) => {
    let keyNames = Object.keys(data);
    keyNames.map((name) => {
      let value = data[name];
      requestObj.input(name, value);
    });
    return requestObj;
  };
  executeRequest = async (storedProcedure: string, data: any = {}) => {
    if (!this.pool) {
      throw new Error("Connection pool not initialized");
    }
    const requestObj = await this.pool.request();
    const results = await this.createrequestObj(requestObj, data);
    return await results.execute(storedProcedure);
  };
}

export const exec = new Connection().executeRequest;
