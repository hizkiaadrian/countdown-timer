import { AppBar, makeStyles } from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";
import AddEventForm from "./pages/AddEventForm";
import ListOfEvents from "./pages/ListOfEvents";
import EventDetails from './pages/EventDetails';

function App() {
  const styles = useStyles();

  return (
    <div className={styles.app}>
      <AppBar position="sticky" className={styles.appTitle}>
        <h1>Countdown Timer</h1>
      </AppBar>
      <section className={styles.appBody}>
        <Router>
          <Switch>
            <Route path="/" exact component={ListOfEvents} />
            <Route path="/add-new-event" component={AddEventForm} />
            <Route path="/event/:id" component={EventDetails} />
          </Switch>
        </Router>
      </section>
    </div>
  );
}


const useStyles = makeStyles({
  app: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  appTitle: {
    textAlign: "center",
  },
  appBody: {
    padding: "3rem",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    alignItems: "center",
  },
  "@global": {
    aside: {
      color: "#d90820",
      textAlign: "left",
      marginTop: "5px",
    },
    a : {
      textDecoration: "none"
    }
  },
});

export default App;
