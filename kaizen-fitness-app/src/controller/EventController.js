import { eventModelCreate, eventModelDelete, eventModelGetCalendarConsumerUser, eventModelGetCalendarProfessionalUser, eventModelGetShowcaseUpcomingEvents, eventModelSearch, eventModelSearchByCategory, eventModelUpdate } from "../model/EventModel"


const timestampToDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    date.setMilliseconds(timestamp.nanoseconds / 1000000);
    return date;
}

export const eventControllerCreate = async (event, professional) => {
    return await eventModelCreate(event, professional);
}

export const eventControllerGetCalendarConsumerUser = async () => {
    let response = [];
    const events = await eventModelGetCalendarConsumerUser();

    if(!events.empty){
        events.forEach((doc) => {
            let event = doc.data();
            let date = timestampToDate(event.datetime)
            event.datetime = new Date(date);
            event.idDoc = doc.id;
            response.push(event);
        });
    } else response = null;

    return response;
}

export const eventControllerGetCalendarProfessionalUser = async () => {
    let response = [];
    const events = await eventModelGetCalendarProfessionalUser();

    if(!events.empty){
        events.forEach((doc) => {
            let event = doc.data();
            let date = timestampToDate(event.datetime);
            event.datetime = new Date(date);
            event.idDoc = doc.id;
            response.push(event);
        });
    } else response = null;

    return response;
}

export const eventControllerGetShowcase = async () => {

    let response = {};

    var currentDate = new Date(Date.now());
    currentDate.setHours(0);
    currentDate.setMinutes(0);
    currentDate.setMilliseconds(0);
  
    var futureDate = new Date();
    futureDate.setDate(currentDate.getDate() + 14);
    futureDate.setHours(23);
    futureDate.setMinutes(59);
    futureDate.setMilliseconds(0);

    const upcomingEvents = await eventModelGetShowcaseUpcomingEvents(currentDate, futureDate);

    response.upcomingEvents = upcomingEvents;
    return response;

}

export const eventControllerUpdate = async (event, doc) => {
    return await eventModelUpdate(event, doc);
}

export const eventControllerDelete = async (doc) => {
    return await eventModelDelete(doc);
}

export const eventControllerDeleteProfessionalUserEvents = async (doc) => {
    return await eventModelDelete(doc);
}

export const eventControllerSearch = async (search) => {
    let response = [];
    const events = await eventModelSearch(search);

    if(!events.empty){
        events.forEach((doc) => {
            let event = doc.data();
            let date = timestampToDate(event.datetime);
            event.datetime = new Date(date);
            event.idDoc = doc.id;
            response.push(event);
        });
    } else response = [];

    return response;
}

export const eventControllerSearchByCategory = async (category) => {
    let response = [];
    const events = await eventModelSearchByCategory(category);

    if(!events.empty){
        events.forEach((doc) => {
            let event = doc.data();
            let date = timestampToDate(event.datetime);
            event.datetime = new Date(date);
            event.idDoc = doc.id;
            response.push(event);
        });
    } else response = [];

    return response;
}