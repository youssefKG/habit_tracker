import { Habit } from "./habit";
import { Day } from "./day";
import { Reminder } from "./reminder";
import { Log } from "./log";
import { Category } from "./category";

export { Habit, Day, Reminder, Category, Log };

type Car = "car";
type Plane = "plane";
class Name {
  hello(vhecule: Car): number;
  hello(plane: Plane): void;

  hello(vhecule: Car) {
    console.log("hell");
  }
  hello(plane: Plane) {
    console.log("hell", plane);
  }
}
