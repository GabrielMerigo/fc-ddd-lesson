import Address from "./domain/entity/address";
import Customer from "./domain/entity/customer";
import Order from "./domain/entity/order";
import OrderItem from "./domain/entity/orderItem";
import { EventDispatcherSingleton } from "./domain/event/@shared/event-dispatcher-singleton";
import SendConsoleLogOneHandler from "./domain/event/customer/handler/send-console-log-one-handler";
import SendConsoleLogSecondHandler from "./domain/event/customer/handler/send-console-log-second-handler";
import SendConsoleWhenUserChangeAddress from "./domain/event/customer/handler/send-console-when-user-change-address";

const eventDispatcher = EventDispatcherSingleton.getInstance();

eventDispatcher.register(
  "CustomerCreatedEvent",
  new SendConsoleLogOneHandler()
);

eventDispatcher.register(
  "CustomerCreatedEvent",
  new SendConsoleLogSecondHandler()
);

eventDispatcher.register(
  "CustomerChangeAddressEvent",
  new SendConsoleWhenUserChangeAddress()
);

const address = new Address("Rua Dois", 123, "91060-530", "Lasar Segall");
let customer = new Customer("123", "Gabriel", address, false);

const newAddress = new Address("Rua Três", 423, "34234-940", "Lages");

customer.changeAddress(newAddress);

const item1 = new OrderItem("1", "item 2", 10, "productId", 2);
const item2 = new OrderItem("1", "item 2", 15, "productId", 2);

const order = new Order("1", customer.id, [item1, item2]);
