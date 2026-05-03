// Mock meal plan data — mirrors the exact shape of a Spoonacular API response.
// Used as a fallback when the API is unavailable or the key is missing.

export const mockMealPlan = {
  week: {
    monday: {
      meals: [
        { id: 1, title: "Greek Yogurt Parfait with Berries", readyInMinutes: 10, servings: 2 },
        { id: 2, title: "Grilled Chicken Caesar Salad", readyInMinutes: 20, servings: 2 },
        { id: 3, title: "Spaghetti Aglio e Olio", readyInMinutes: 25, servings: 2 },
      ],
      nutrients: { calories: 1950, protein: 98, carbohydrates: 210, fat: 65 },
    },
    tuesday: {
      meals: [
        { id: 4, title: "Avocado Toast with Poached Eggs", readyInMinutes: 15, servings: 2 },
        { id: 5, title: "Tomato Basil Soup with Crusty Bread", readyInMinutes: 30, servings: 2 },
        { id: 6, title: "Baked Lemon Herb Salmon", readyInMinutes: 35, servings: 2 },
      ],
      nutrients: { calories: 2020, protein: 105, carbohydrates: 195, fat: 72 },
    },
    wednesday: {
      meals: [
        { id: 7, title: "Banana Oat Smoothie Bowl", readyInMinutes: 10, servings: 2 },
        { id: 8, title: "Turkey and Avocado Wrap", readyInMinutes: 15, servings: 2 },
        { id: 9, title: "Beef and Broccoli Stir Fry", readyInMinutes: 30, servings: 2 },
      ],
      nutrients: { calories: 1980, protein: 112, carbohydrates: 200, fat: 68 },
    },
    thursday: {
      meals: [
        { id: 10, title: "Scrambled Eggs with Spinach and Feta", readyInMinutes: 12, servings: 2 },
        { id: 11, title: "Quinoa Buddha Bowl", readyInMinutes: 25, servings: 2 },
        { id: 12, title: "Chicken Tikka Masala", readyInMinutes: 45, servings: 2 },
      ],
      nutrients: { calories: 2050, protein: 118, carbohydrates: 205, fat: 70 },
    },
    friday: {
      meals: [
        { id: 13, title: "Overnight Oats with Chia Seeds", readyInMinutes: 5, servings: 2 },
        { id: 14, title: "Caprese Sandwich with Pesto", readyInMinutes: 10, servings: 2 },
        { id: 15, title: "Shrimp Tacos with Mango Salsa", readyInMinutes: 30, servings: 2 },
      ],
      nutrients: { calories: 1920, protein: 95, carbohydrates: 215, fat: 62 },
    },
    saturday: {
      meals: [
        { id: 16, title: "Blueberry Buttermilk Pancakes", readyInMinutes: 20, servings: 2 },
        { id: 17, title: "Greek Salad with Grilled Halloumi", readyInMinutes: 20, servings: 2 },
        { id: 18, title: "Homemade Margherita Pizza", readyInMinutes: 40, servings: 2 },
      ],
      nutrients: { calories: 2100, protein: 88, carbohydrates: 240, fat: 75 },
    },
    sunday: {
      meals: [
        { id: 19, title: "Veggie Omelette with Toast", readyInMinutes: 15, servings: 2 },
        { id: 20, title: "Lentil and Vegetable Soup", readyInMinutes: 35, servings: 2 },
        { id: 21, title: "Roast Chicken with Root Vegetables", readyInMinutes: 90, servings: 2 },
      ],
      nutrients: { calories: 2000, protein: 102, carbohydrates: 198, fat: 69 },
    },
  },
}

// Mock grocery list — mirrors the shape of parseIngredients() output.
export const mockGroceryList = [
  { id: "chicken-breast-lb", name: "Chicken Breast", amount: 2, unit: "lb", checked: false, aisle: "Meat & Seafood" },
  { id: "salmon-lb", name: "Salmon Fillet", amount: 1, unit: "lb", checked: false, aisle: "Meat & Seafood" },
  { id: "shrimp-lb", name: "Shrimp", amount: 0.5, unit: "lb", checked: false, aisle: "Meat & Seafood" },
  { id: "eggs-piece", name: "Eggs", amount: 12, unit: "", checked: false, aisle: "Dairy & Eggs" },
  { id: "greek-yogurt-cup", name: "Greek Yogurt", amount: 2, unit: "cup", checked: false, aisle: "Dairy & Eggs" },
  { id: "feta-oz", name: "Feta Cheese", amount: 4, unit: "oz", checked: false, aisle: "Dairy & Eggs" },
  { id: "halloumi-oz", name: "Halloumi", amount: 6, unit: "oz", checked: false, aisle: "Dairy & Eggs" },
  { id: "butter-tbsp", name: "Butter", amount: 4, unit: "tbsp", checked: false, aisle: "Dairy & Eggs" },
  { id: "avocado-piece", name: "Avocado", amount: 4, unit: "", checked: false, aisle: "Produce" },
  { id: "spinach-cup", name: "Spinach", amount: 3, unit: "cup", checked: false, aisle: "Produce" },
  { id: "broccoli-cup", name: "Broccoli", amount: 2, unit: "cup", checked: false, aisle: "Produce" },
  { id: "blueberries-cup", name: "Blueberries", amount: 1.5, unit: "cup", checked: false, aisle: "Produce" },
  { id: "banana-piece", name: "Banana", amount: 3, unit: "", checked: false, aisle: "Produce" },
  { id: "mango-piece", name: "Mango", amount: 2, unit: "", checked: false, aisle: "Produce" },
  { id: "tomatoes-piece", name: "Tomatoes", amount: 4, unit: "", checked: false, aisle: "Produce" },
  { id: "lemon-piece", name: "Lemon", amount: 3, unit: "", checked: false, aisle: "Produce" },
  { id: "garlic-clove", name: "Garlic Cloves", amount: 8, unit: "clove", checked: false, aisle: "Produce" },
  { id: "spaghetti-oz", name: "Spaghetti", amount: 8, unit: "oz", checked: false, aisle: "Pasta & Rice" },
  { id: "quinoa-cup", name: "Quinoa", amount: 1.5, unit: "cup", checked: false, aisle: "Pasta & Rice" },
  { id: "lentils-cup", name: "Red Lentils", amount: 1, unit: "cup", checked: false, aisle: "Pasta & Rice" },
  { id: "oats-cup", name: "Rolled Oats", amount: 2, unit: "cup", checked: false, aisle: "Breakfast & Cereal" },
  { id: "chia-seeds-tbsp", name: "Chia Seeds", amount: 3, unit: "tbsp", checked: false, aisle: "Breakfast & Cereal" },
  { id: "olive-oil-tbsp", name: "Olive Oil", amount: 6, unit: "tbsp", checked: false, aisle: "Oils & Condiments" },
  { id: "pesto-tbsp", name: "Pesto", amount: 3, unit: "tbsp", checked: false, aisle: "Oils & Condiments" },
  { id: "tortillas-piece", name: "Flour Tortillas", amount: 6, unit: "", checked: false, aisle: "Bread & Bakery" },
  { id: "bread-slice", name: "Sourdough Bread", amount: 6, unit: "slice", checked: false, aisle: "Bread & Bakery" },
  { id: "pizza-dough-piece", name: "Pizza Dough", amount: 1, unit: "", checked: false, aisle: "Bread & Bakery" },
]