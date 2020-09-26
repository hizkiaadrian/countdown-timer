import { Button, TextField, makeStyles } from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { eventsCollection } from "../services/firebase";

function AddEventForm() {
  const styles = useStyles();
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm<FormInput>();

  const onSubmit = async (data: FormInput) => {
    await eventsCollection().add({name:data.name, datetime: new Date(data.datetime)});
    history.goBack();
  }
      
  return (
    <>
      <h2>Add a new event</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <span>
          <TextField
            name="name"
            label="Name"
            inputRef={register({ required: true })}
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
              Submit
            </Button>
          </div>
        </span>
      </form>
    </>
  );
}

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

export default AddEventForm;
