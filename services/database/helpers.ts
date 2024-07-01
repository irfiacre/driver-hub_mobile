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

export const findLocalUser = async () => {
  try {
    const database: any = await openDatabase();
    const firstRow = await database.getFirstAsync("SELECT * FROM user");
    return firstRow;
  } catch (error) {
    return null;
  }
};

export const AddUserToDB = async (userObj: User) => {
  try {
    const database: any = await openDatabase();
    if (await findLocalUser()) {
      return;
    }
    await database.execAsync(`
PRAGMA journal_mode = WAL;
CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY NOT NULL, userId TEXT NOT NULL, firstName TEXT NOT NULL, lastName TEXT NOT NULL, createdAt TEXT NOT NULL, photoUrl TEXT NOT NULL);
`);
    await database.runAsync(
      "INSERT INTO user (userId,firstName,lastName,createdAt,photoUrl) VALUES (?, ?, ?, ?, ?)",
      userObj.userId,
      userObj.firstName,
      userObj.lastName,
      userObj.createdAt,
      userObj.photoUrl
    );
    return true;
  } catch (error) {
    return false;
  }
};
