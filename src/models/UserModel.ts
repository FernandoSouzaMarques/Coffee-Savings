import { TablesEnum } from "@/enum/Tables";
import database from "@/lib/connect";

class User {
  private tableName = TablesEnum.USER;

  public async query() {
    return (
      await database.query(
        `SELECT id, name, nickname, avatar FROM ${this.tableName}`
      )
    ).rows;
  }
}

export default new User();
