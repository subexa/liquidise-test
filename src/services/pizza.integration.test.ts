import { IngredientName, OrderPhase, PizzaStatus } from "../types";
import { ContractService } from "./contract";
import { IngredientsService } from "./ingredients";
import { OrdersService } from "./orders";
import { PizzaService } from "./pizza";

let ordersService: OrdersService;
let ingredientsService: IngredientsService;
let contractSerive: ContractService;
let pizzaService: PizzaService;

describe("PizzaService", () => {
  beforeEach(() => {
    const mockIngredientsStock = [
      { name: IngredientName.flour, quantity: 100 },
      { name: IngredientName.tomato, quantity: 100 },
    ];

    const mockOrders = [
      {
        orderId: "Order1",
        orderPhase: OrderPhase.Ready,
        status: PizzaStatus.Pending,
        requiredIngredients: [],
      },
      {
        orderId: "Order2",
        orderPhase: OrderPhase.Completed,
        status: PizzaStatus.Failed,
        requiredIngredients: [],
      },
      {
        orderId: "Order3",
        orderPhase: OrderPhase.Ready,
        status: PizzaStatus.Available,
        requiredIngredients: [
          { name: IngredientName.mozzarella, quantity: 10 },
        ],
      },
      {
        orderId: "Order4",
        orderPhase: OrderPhase.Ready,
        status: PizzaStatus.Available,
        requiredIngredients: [{ name: IngredientName.flour, quantity: 10 }],
      },
    ];

    ordersService = new OrdersService(mockOrders);
    ingredientsService = new IngredientsService(mockIngredientsStock);
    contractSerive = new ContractService();

    pizzaService = new PizzaService(
      contractSerive,
      ingredientsService,
      ordersService
    );
  });
  it("should throw if order doesn't exist", async () => {
    const pizzaPromise = pizzaService.processPizzaOrder("Order5");
    expect(pizzaPromise).rejects.toThrow(
      "Pizza order Order5 is not ready to be cooked"
    );
  });

  it("should throw if order is not ready", async () => {
    const pizzaPromise = pizzaService.processPizzaOrder("Order2");
    expect(pizzaPromise).rejects.toThrow(
      "Pizza order Order2 is not ready to be cooked"
    );
  });

  it("should throw if piszza status is not available", () => {
    const pizzaPromise = pizzaService.processPizzaOrder("Order1");
    expect(pizzaPromise).rejects.toThrow(
      "Pizza for Order1 is not available to be cooked"
    );
  });

  it("should throw if order is missing ingridents", () => {
    const pizzaPromise = pizzaService.processPizzaOrder("Order3");
    expect(pizzaPromise).rejects.toThrow(
      "Missing ingredients for order Order3"
    );
  });

  it("should mark pizza status as prepared and order phase as completed if succesful", async () => {
    await pizzaService.processPizzaOrder("Order4");
    const order = await ordersService.getOrderById("Order4");
    expect(order?.orderPhase).toBe(OrderPhase.Completed);
    expect(order?.status).toBe(PizzaStatus.Prepared);
  });
});
