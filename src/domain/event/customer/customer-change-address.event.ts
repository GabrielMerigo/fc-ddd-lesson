import EventInterface from "../@shared/event.interface";

interface CustomerChangeAddressEventData {
  id: string;
  name: string;
  street: string;
}

export default class CustomerChangeAddressEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: any;

  constructor(eventData: CustomerChangeAddressEventData) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }
}
