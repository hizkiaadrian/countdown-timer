import { Card, CardContent, CardHeader, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppEvent } from "../types/event";

function EventCard({ event, eventId }: EventCardProps) {
  const styles = useStyles();
  const [timeRemaining, setTimeRemaining] = useState(
    event.parseTimeRemaining()
  );

  useEffect(() => {
    const interval = setInterval(
      () => setTimeRemaining(event.parseTimeRemaining()),
      1000
    );

    return () => {
      clearInterval(interval);
    };
  }, [event]);

  return (
    <Link to={`/event/${eventId}`}>
      <Card className={styles.root}>
        <CardHeader title={event.name} />
        <CardContent className={styles.eventTimer}>{timeRemaining}</CardContent>
      </Card>
    </Link>
  );
}

type EventCardProps = {
  event: AppEvent;
  eventId: string;
};

const useStyles = makeStyles({
  root: {
    width: 500,
    marginTop: "1.5rem",
    display: "flex",
    justifyContent: "space-between",
  },
  eventTimer: {
    padding: "1rem !important",
    display: "flex",
    alignItems: "center",
  },
});

export default EventCard;
