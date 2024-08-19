import * as SQLite from "expo-sqlite";
import { Platform } from "react-native";
import { SQLiteDatabase } from "expo-sqlite";

interface User {
  userId: string;
  firstName: string;
  lastName: string;
  createdAt: string | undefined;
  photoUrl: string | null;
}

export const openDatabase = async () => {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return { executeSql: () => {} };
      },
    };
  }

  const db = await SQLite.openDatabaseAsync("driverHub");
  return db;
};

export const AddRecordToDB = async (tableName: string, record: any) => {
  try {
    const database: any = await openDatabase();
    const recordString = JSON.stringify(record);

    if (await findDBrecord(tableName)) {
      await database.runAsync(
        `UPDATE ${tableName} SET record =? WHERE id=1`,
        recordString
      );
      return true;
    } else {
      await database.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS ${tableName} (id INTEGER PRIMARY KEY NOT NULL, record TEXT NULL);
      `);

      await database.runAsync(
        `INSERT INTO ${tableName} (record) VALUES (?);`,
        recordString
      );

      return true;
    }
  } catch (error) {
    return false;
  }
};

export const findDBrecord = async (tableName: string) => {
  try {
    const database: any = await openDatabase();
    const firstRow = await database.getFirstAsync(`SELECT * FROM ${tableName}`);

    return JSON.parse(firstRow.record);
  } catch (error) {
    return null;
  }
};
export const findLocalUser = async () => await findDBrecord("user");

export const AddUserToDB = async (userObj: User) =>
  await AddRecordToDB("user", userObj);

export const deleteTable = async (tableName: string) => {
  try {
    const database: any = await openDatabase();
    await database.getFirstAsync(`DROP TABLE ${tableName}`);
    return true;
  } catch (error) {
    return false;
  }
};
