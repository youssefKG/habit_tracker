import { Component, createContext, PropsWithChildren, ReactNode } from "react";
import { DataSource } from "typeorm";
import { Habit, Log, Reminder, Icon, Category, Day } from "@/Modals";
interface DbContextInterface {}
const DbContext = createContext<DbContextInterface>({} as DbContextInterface);

const dbConnection = new DataSource({
  type: "expo",
  database: "habits_Tracker.db",
  driver: require("expo-sqlite"),
  entities: [Habit, Reminder, Category, Day, Log, Icon],
  synchronize: true,
});

interface DbProviderState {
  dataSource: DataSource;
}
class DbProvider extends Component<PropsWithChildren, DbProviderState> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.initialize();
  }

  async initialize() {
    try {
      const dataSource = await dbConnection.initialize();
      this.setState({ dataSource });
      return dataSource;
      console.log("the db is inistialazed successfully");
    } catch (err) {
      console.log("errro to initialize the db ", err);
    }
  }

  render(): ReactNode {
    return (
      <DbContext.Provider value={{}}>{this.props.children}</DbContext.Provider>
    );
  }
}

// const migrateDbIfNeeded = async (db: SQLiteDatabase) => {
//   const DATABASE_VERSION = 1;
//   let current_version = await db
//     .getFirstAsync<{
//       user_version: number;
//     }>("PRAGMA user_version")
//     .then((data) => data?.user_version);
//   if (current_version === undefined) return;
//   if (current_version >= DATABASE_VERSION) return;
//   if (current_version == 0) {
//     await db.execAsync(habitsMigrationQuery);
//     await db.execAsync(habitLogsMigrationQuery);
//     await db.execAsync(remindersMigrationQuery);
//     await db.execAsync(categoriesMigrationQuery);
//     await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
//   }
// };
//

export default DbProvider;
