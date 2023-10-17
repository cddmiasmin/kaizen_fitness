import EventModel from "../model/EventModel";

class EventController {

    eventModel = new EventModel();

    addEvent = async (event, professional) => {
        return await this.eventModel.addEvent(event, professional);
    }

    updateEvent = async (event, doc) => {
        return await this.eventModal.updateEvent(event, doc);
    }

    deleteEvent = async (doc) => {
        return await this.eventModal.deleteEvent(doc);
    }

    deleteProfessionalEvents = async () => {
        return await this.eventModel.deleteProfessionalEvents;
    }

}

export default EventController;