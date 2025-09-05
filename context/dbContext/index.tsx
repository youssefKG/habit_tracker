import {
  createContext,
  PropsWithChildren,
  FC,
  useEffect,
  useState,
} from "react";
import { DataSource } from "typeorm";
import { Habit, Log, Reminder, Category, Day } from "@/Modals";
import HabitRepository from "@/repositories/HabitRepositories";
import CategoryRepository from "@/repositories/category";
import ReminderRepository from "@/repositories/reminderRepository";

interface DbContextInterface {
  dataSource: DataSource | null;
  habitRebository: HabitRepository;
  categoryRepositroy: CategoryRepository;
  reminderRepository: ReminderRepository;
}

const DbContext = createContext<DbContextInterface>({} as DbContextInterface);

const dbConnection = new DataSource({
  type: "expo",
  database: "habits_Tracker.db",
  driver: require("expo-sqlite"),
  entities: [Habit, Reminder, Category, Day, Log],
  synchronize: true,
});

const DbProvider: FC<PropsWithChildren> = ({ children }) => {
  const [dataSource, setDataSource] = useState<DataSource | null>(null);
  useEffect(() => {
    const initializeDb = async () => {
      try {
        const dbSource = await dbConnection.initialize();
        setDataSource(dbSource);
      } catch (err) {
        console.log("errro to initialize the db ", err);
      }
    };

    initializeDb();
  }, []);

  return (
    dataSource && (
      <DbContext.Provider
        value={{
          dataSource,
          habitRebository: new HabitRepository(dataSource),
          reminderRepository: new ReminderRepository(dataSource),
          categoryRepositroy: new CategoryRepository(dataSource),
        }}
      >
        {children}
      </DbContext.Provider>
    )
  );
};

export default DbProvider;
