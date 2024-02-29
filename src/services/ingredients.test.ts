import { IngredientName } from "../types";
import { IngredientsService } from "./ingredients";

let ingredientsService: IngredientsService;

describe("IngredientsService", () => {
  beforeEach(() => {
    const mockIngredientsStock = [
      { name: IngredientName.flour, quantity: 100 },
      { name: IngredientName.tomato, quantity: 100 },
    ];
    ingredientsService = new IngredientsService(mockIngredientsStock);
  });

  it("should assign default stock", () => {
    const service = new IngredientsService();
    expect(service.getStock().length).toBeGreaterThan(0);
  });

  describe("isAvailable", () => {
    it("should check stock is available", () => {
      const stock = ingredientsService.getStock();
      expect(
        ingredientsService.isAvailable(stock[0].name, stock[0].quantity)
      ).toBe(true);
    });

    it("should check quantity is not available", () => {
      expect(ingredientsService.isAvailable(IngredientName.flour, 101)).toBe(
        false
      );
    });

    it("should check ingredient is not available", () => {
      expect(ingredientsService.isAvailable(IngredientName.mushrooms, 1)).toBe(
        false
      );
    });
  });

  describe("updateStock", () => {
    it("should update stock if ingredient exists", () => {
      const stock = ingredientsService.getStock();
      const initialQuantity = stock[0].quantity;
      ingredientsService.updateStock(IngredientName.flour, 1);

      expect(stock[0].quantity).toBe(initialQuantity - 1);
    });

    it("should not update stock if ingredient does not exist", () => {
      const stock = ingredientsService.getStock();
      ingredientsService.updateStock(IngredientName.mozzarella, 1);
      const updatedStock = ingredientsService.getStock();

      expect(stock).toEqual(updatedStock);
    });
  });

  describe("getStock", () => {
    it("should return stock", () => {
      const stock = ingredientsService.getStock();
      expect(stock.length).toBe(2);
    });
  });

  describe("updateStockAll", () => {
    it("should update all ingredients present in the stock", () => {
      const ingredients = [
        { name: IngredientName.flour, quantity: 1 },
        { name: IngredientName.tomato, quantity: 2 },
      ];
      const initialStock = ingredientsService.getStock();
      const initialQuantity = initialStock[0].quantity;
      ingredientsService.updateStockAll(ingredients);
      const finalStock = ingredientsService.getStock();
      expect(finalStock[0].quantity).toBe(
        initialQuantity - ingredients[0].quantity
      );
    });
  });

  describe("isAvailableAll", () => {
    it("should check stock has all the ingredients available", () => {
      const existingIngredients = [
        { name: IngredientName.flour, quantity: 1 },
        { name: IngredientName.tomato, quantity: 2 },
      ];
      expect(ingredientsService.isAvailableAll(existingIngredients)).toBe(true);
    });
    it("should check stock does not have all the ingredients available", () => {
      const nonExistingIngredients = [
        { name: IngredientName.mozzarella, quantity: 1 },
        { name: IngredientName.pepperoni, quantity: 2 },
      ];
      expect(ingredientsService.isAvailableAll(nonExistingIngredients)).toBe(
        false
      );
    });
  });
});
