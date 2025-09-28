import {
  createContext,
  PropsWithChildren,
  FC,
  useEffect,
  useState,
  useContext,
} from "react";
import { DataSource } from "typeorm";
import { Habit, Log, Reminder, Category, Day } from "@/Modals";
import {
  DayRepository,
  ReminderRepository,
  HabitRepository,
  CategoryRepository,
} from "@/repositories";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface DbContextInterface {
  dataSource: DataSource | null;
  habitRebository: HabitRepository;
  categoryRepositroy: CategoryRepository;
  reminderRepository: ReminderRepository;
  dayRepository: DayRepository;
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
        if (!dbConnection?.isInitialized) {
          const dbSource = await dbConnection.initialize();
          setDataSource(dbSource);
        }
      } catch (err) {
        console.log("errro to initialize the db ", err);
      }
    };

    initializeDb();
  }, []);

  useEffect(() => {
    const seedDatabaseIfNeeded = async () => {
      try {
        const hasSeeded = await AsyncStorage.getItem("hasSeeded");

        if (!hasSeeded && dataSource) {
          const categoryRepository = new CategoryRepository(dataSource);
          await categoryRepository.insertMany(initialCategories);
          await AsyncStorage.setItem("hasSeeded", JSON.stringify(true));
          console.log("the database has successfully");
        }
      } catch (error) {
        console.log(error);
      }
    };
    seedDatabaseIfNeeded();
  }, []);

  return (
    dataSource && (
      <DbContext.Provider
        value={{
          dataSource,
          habitRebository: new HabitRepository(dataSource),
          reminderRepository: new ReminderRepository(dataSource),
          categoryRepositroy: new CategoryRepository(dataSource),
          dayRepository: new DayRepository(dataSource),
        }}
      >
        {children}
      </DbContext.Provider>
    )
  );
};

const useDataSource = () => {
  return useContext(DbContext);
};
const initialCategories: Partial<Category>[] = [
  {
    name: "Work",
    icon: "briefcase-outline",
    library: "MaterialCommunityIcons",
  },
  { name: "Fitness", icon: "dumbbell", library: "FontAwesome5" },
  { name: "Health", icon: "heart-outline", library: "MaterialCommunityIcons" },
  { name: "Study", icon: "book-outline", library: "Ionicons" },
  {
    name: "Finance",
    icon: "wallet-outline",
    library: "MaterialCommunityIcons",
  },
];

export default DbProvider;

export { useDataSource };
