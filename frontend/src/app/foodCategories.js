// public class Category
// {
//     public Category()
//     {
//         this.ChildCategories = new List<Category>();
//     }

//     public string Name { get; set; }

//     public IList<Category> ChildCategories { get; private set; }
// }



class Food {
    constructor() {

      this.childFoods = {};

    }
    // Getter
    get area() {
      return this.calcArea();
    }
    // Method
    calcArea() {
      return this.height * this.width;
    }
  }
  
  const square = new Food(10, 10);
  
  console.log(square.area); // 100


