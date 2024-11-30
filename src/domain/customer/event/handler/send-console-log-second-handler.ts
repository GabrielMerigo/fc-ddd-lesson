import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import SendConsoleLog from "../customer-created.event";

export default class SendConsoleLogOneHandler
  implements EventHandlerInterface<SendConsoleLog>
{
  handle(event: SendConsoleLog): void {
    console.log(`This is the second console log of the event CustomerCreated`);
  }
}
