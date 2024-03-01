import { OrderPhase, PizzaStatus } from "../types";
import { OrdersService } from "./orders";

let ordersService: OrdersService;

describe("Orders tests", () => {
  beforeEach(() => {
    const mockOrders = [
      {
        orderId: "Order1",
        orderPhase: OrderPhase.Ready,
        status: PizzaStatus.Available,
        requiredIngredients: [],
      },
      {
        orderId: "Order2",
        orderPhase: OrderPhase.Completed,
        status: PizzaStatus.Failed,
        requiredIngredients: [],
      },
    ];
    ordersService = new OrdersService(mockOrders);
  });

  it("should initialise order queue with empty array", async () => {
    const service = new OrdersService();
    const queue = await service.getOrdersQueue();
    expect(queue).toHaveLength(0);
  });

  describe("getOrdersQueue", () => {
    it("should return orders queue", async () => {
      expect(await ordersService.getOrdersQueue()).toHaveLength(2);
    });
  });

  describe("add Order", () => {
    it("should add order to the queue", async () => {
      const newOrder = {
        orderId: "Order3",
        orderPhase: OrderPhase.Ready,
        status: PizzaStatus.Available,
        requiredIngredients: [],
      };

      ordersService.addOrder(newOrder);
      const addedOrder = await ordersService.getOrderById("Order3");
      expect(addedOrder?.orderId).toBe("Order3");
    });
  });

  describe("add Orders", () => {
    it("should add orders to the queue", async () => {
      const newOrder = [
        {
          orderId: "Order3",
          orderPhase: OrderPhase.Ready,
          status: PizzaStatus.Available,
          requiredIngredients: [],
        },
        {
          orderId: "Order4",
          orderPhase: OrderPhase.Ready,
          status: PizzaStatus.Available,
          requiredIngredients: [],
        },
      ];

      ordersService.addOrders(newOrder);
      const addedOrder3 = await ordersService.getOrderById("Order3");
      const addedOrder4 = await ordersService.getOrderById("Order4");
      expect(addedOrder3?.orderId).toBe("Order3");
      expect(addedOrder4?.orderId).toBe("Order4");
    });
  });

  describe("getOrderById", () => {
    it("should get order by id", async () => {
      const order1 = await ordersService.getOrderById("Order1");
      expect(order1?.orderId).toBe("Order1");
    });
  });

  describe("updateOrder", () => {
    it("should update order if exists", async () => {
      await ordersService.updateOrder("Order1", {
        orderPhase: OrderPhase.Cooking,
      });
      const updatedOrder = await ordersService.getOrderById("Order1");
      expect(updatedOrder?.orderPhase).toBe(OrderPhase.Cooking);
    });

    it("should not update order if does not exists", async () => {
      const order = await ordersService.updateOrder("Order5", {
        orderPhase: OrderPhase.Cooking,
      });
      expect(order).not.toBeDefined();
    });
  });
});
