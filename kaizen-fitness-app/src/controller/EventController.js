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

    getSearch = async ( search ) => {
        return await this.eventModel.getSearch(search);
    }

    getCategory = async (category) => {
        return await this.eventModel.getCategory(category);
    }

    getUpcomingEvents = async () => {
        return await this.eventModel.getUpcomingEvents();
    }

    getNearbyEvents = async () => {
        return await this.eventModel.getNearbyEvents();
    }

}

export default EventController;