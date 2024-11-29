import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerChangeAddressEvent from "../customer-change-address.event";

export default class SendConsoleWhenUserChangeAddress
  implements EventHandlerInterface<CustomerChangeAddressEvent>
{
  handle(event: CustomerChangeAddressEvent): void {
    console.log(
      `The customer ${event.eventData.id}, ${event.eventData.name} changed address to ${event.eventData.street}`
    );
  }
}
