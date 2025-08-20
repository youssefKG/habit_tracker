import { FC, PropsWithChildren } from "react";
import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";
import {
  habitsMigrationQuery,
  habitLogsMigrationQuery,
  categoriesMigrationQuery,
  remindersMigrationQuery,
} from "@/db/querys";

const DbContextProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SQLiteProvider databaseName="habits_tracker" onInit={migrateDbIfNeeded}>
      {children}
    </SQLiteProvider>
  );
};

const migrateDbIfNeeded = async (db: SQLiteDatabase) => {
  const DATABASE_VERSION = 1;
  let current_version = await db
    .getFirstAsync<{
      user_version: number;
    }>("PRAGMA user_version")
    .then((data) => data?.user_version);
  if (current_version === undefined) return;
  if (current_version >= DATABASE_VERSION) return;
  if (current_version == 0) {
    await db.execAsync(habitsMigrationQuery);
    await db.execAsync(habitLogsMigrationQuery);
    await db.execAsync(remindersMigrationQuery);
    await db.execAsync(categoriesMigrationQuery);
    await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
  }
};

export default DbContextProvider;
