// Selectors/attendeeSelectors.js
import { createSelector } from 'reselect';

const selectAttendeesState = state => state.Attendees;

export const attendeeSelector = createSelector(
    selectAttendeesState,
    (attendeesState) => ({
        // Attendee Selectors
        attendees: attendeesState.attendees,
        attendee: attendeesState.attendee,
        isAttendeeSuccess: attendeesState.isAttendeeSuccess,
        error: attendeesState.error,
        currentAttendee: attendeesState.currentAttendee,
        attendees: attendeesState.attendees,
    })
);
