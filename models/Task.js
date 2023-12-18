import Model from './Model.js';

export default class Task extends Model {

  static table = "course.listedescourses"; //shema.tables
  static primary = ["id"];
}
