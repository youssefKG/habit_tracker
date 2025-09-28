import { Category } from "@/Modals";
import { DataSource, Repository } from "typeorm";
import categoriesData from "@/assets/categoriesData";

class CategoryRepository {
  private ormRepository: Repository<Category>;

  constructor(dataSource: DataSource) {
    this.ormRepository = dataSource.getRepository(Category);
  }

  async initCategorys(newCat: Omit<Category, "id">) {
    categoriesData.forEach((cat) => {});
  }

  async create(newCat: Omit<Category, "id">): Promise<Category> {
    const category = this.ormRepository.create(newCat);
    await this.ormRepository.save(category);
    return category;
  }

  async insertMany(categories: Partial<Category>[]) {
    await this.ormRepository.insert(categories);
  }

  async getAll() {
    const categories = await this.ormRepository.find();
    return categories;
  }

  async update(cat: Category) {
    const categoryToUpdate = await this.ormRepository.findOneBy({ id: cat.id });
    if (categoryToUpdate) {
      categoryToUpdate.name = cat.name;
      categoryToUpdate.icon = cat.icon;
      categoryToUpdate.library = cat.library;
      await this.ormRepository.save(categoryToUpdate);
    } else {
      console.log("user not found");
    }
  }
}

export default CategoryRepository;
