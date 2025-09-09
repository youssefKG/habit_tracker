import { Day } from "@/Modals";
import { DataSource, DeepPartial, Repository } from "typeorm";

class DayRepository {
  private ormRepository: Repository<Day>;

  constructor(dataSource: DataSource) {
    this.ormRepository = dataSource.getRepository(Day);
  }

  public async create(day: DeepPartial<Day>) {
    const createdDay = this.ormRepository.create(day);
    this.ormRepository.save(createdDay);
    return createdDay;
  }
}

export default DayRepository;
