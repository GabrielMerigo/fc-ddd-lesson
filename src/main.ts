import Order from "./domain/checkout/entity/order";
import OrderItem from "./domain/checkout/entity/orderItem";
import SendConsoleWhenUserChangeAddress from "./domain/customer/event/handler/send-console-when-user-change-address";
import SendConsoleLogOneHandler from "./domain/customer/event/handler/send-console-log-one-handler";
import SendConsoleLogSecondHandler from "./domain/customer/event/handler/send-console-log-second-handler";
import { EventDispatcherSingleton } from "./domain/@shared/event/event-dispatcher-singleton";
import Customer from "./domain/customer/entity/customer";
import Address from "./domain/customer/value-object/address";

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
