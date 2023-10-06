import EventModel from "../model/EventModel";

class EventController {

    eventModel = new EventModel();

    addEvent = async (event) => {
        this.eventModel.addEvent(event)
    }

    deleteProfessionalEvent = async () => {
        this.eventModel.deleteProfessionalEvent;
    }

}

export default EventController;