import { Button, makeStyles, TextField } from "@material-ui/core";
import React, { useEffect } from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { eventsCollection } from "../services/firebase";
import { useForm } from "react-hook-form";
import { AppEvent } from "../types/event";

function EventDetails() {
  const id = (useRouteMatch().params as any).id;
  const [doc] = useDocumentData<AppEvent>(eventsCollection().doc(id));

  const styles = useStyles();
  const history = useHistory();

  const { register, handleSubmit, errors, setValue } = useForm<FormInput>();

  useEffect(() => {
    if (doc) {
      setValue("name", doc?.name);
      setValue("datetime", parseDateToFieldInput(doc?.datetime));
    }
  }, [doc, setValue]);

  const onSubmit = async (data: FormInput) => {
    await eventsCollection()
      .doc(id)
      .set({ name: data.name, datetime: new Date(data.datetime) });
    history.goBack();
  };

  async function deleteDoc() {
    await eventsCollection().doc(id).delete();
    history.goBack();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <span>
        <TextField
          name="name"
          label="Name"
          inputRef={register({ required: true })}
          InputLabelProps={{ shrink: true }}
        />
        {errors.name && <aside>This field is required</aside>}
      </span>
      <span>
        <TextField
          name="datetime"
          type="datetime-local"
          label="Date & time of event"
          inputRef={register({ required: true })}
          InputLabelProps={{ shrink: true }}
        />
        {errors.datetime && <aside>This field is required</aside>}
      </span>
      <span>
        <div className={styles.buttons}>
          <Link to="/">
            <Button variant="outlined" color="secondary">
              Back
            </Button>
          </Link>
          <Button variant="contained" color="primary" type="submit">
            Edit
          </Button>
          <Button variant="contained" color="secondary" onClick={deleteDoc}>
            Delete
          </Button>
        </div>
      </span>
    </form>
  );
}

const parseDateToFieldInput = (date: any) => {
  date = date.toDate();
  return `${date.getFullYear()}-${makeTwoDigits(date.getMonth() + 1)}-${makeTwoDigits(date.getDate())}T${
    makeTwoDigits(date.getHours())}:${makeTwoDigits(date.getMinutes())}`;
};

const makeTwoDigits = (str: number) => str < 10 ? `0${str}` : str;

type FormInput = {
  name: string;
  datetime: string;
};

const useStyles = makeStyles({
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    "& input": { minWidth: "250px" },
    "& span": {
      margin: "20px 0",
    },
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "space-between",
    "& span": {
      margin: "0 !important",
    },
    "& button": {
      margin: "0 7px",
    },
  },
});

export default EventDetails;
