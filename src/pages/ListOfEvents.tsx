import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { AppEvent } from "../types/event";
import EventCard from "../components/EventCard";
import { eventsCollection } from "../services/firebase";
import { useCollection } from "react-firebase-hooks/firestore";

function ListOfEvents() {
  const [value, loading, error] = useCollection(eventsCollection());

  return (
    <>
      <Link to="/add-new-event">
        <Button variant="contained" color="secondary">
          Add a new event
        </Button>
      </Link>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      {value &&
        value.docs
          .sort(sortByIncreasingTimeRemaining)
          .map(doc => (
            <EventCard key={getAppEventId(doc)} event={snapshotToAppEvent(doc)} eventId={getAppEventId(doc)} />
          ))}
    </>
  );
}

const snapshotToAppEvent = (qs: firebase.firestore.QueryDocumentSnapshot) => new AppEvent(qs.data().name, qs.data().datetime.toDate());

const getAppEventId = (qs: firebase.firestore.QueryDocumentSnapshot) => qs.id;

const sortByIncreasingTimeRemaining = (
  a: firebase.firestore.QueryDocumentSnapshot,
  b: firebase.firestore.QueryDocumentSnapshot
) =>
  a.data().datetime.toDate().getTime() - b.data().datetime.toDate().getTime();

export default ListOfEvents;
