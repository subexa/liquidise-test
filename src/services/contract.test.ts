import { OrderPhase, PizzaStatus } from "../types";
import { ContractService } from "./contract";

const mockOrder = {
  orderId: "testOrder",
  orderPhase: OrderPhase.Ready,
  status: PizzaStatus.Available,
  requiredIngredients: [],
};
const contractService = new ContractService();

describe("ContractService", () => {
  it("should deploy pizza contract", async () => {
    const pizzaContract = await contractService.deployPizzaContract(mockOrder);
    expect(pizzaContract).toBe(`0x${mockOrder.orderId}`);
  });

  it("should throw an error when there is no order", async () => {
    const contractPromise = contractService.deployPizzaContract(null as any);
    expect(contractPromise).rejects.toThrow("Order not found");
  });
});
