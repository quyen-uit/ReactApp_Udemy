import "../styles/App.css";
import NavBar from "./NavBar";
import { Activity } from "../models/Activity";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { Container } from "semantic-ui-react";
import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
export default function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Activities.list().then((res) => {
      let activities: Activity[] = [];
      res.forEach((item) => {
        item.date = item.date.split("T")[0];
        activities.push(item);
      });
      setActivities(activities);
      setLoading(false);
    });
  }, []);

  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find((x) => x.id === id));
    handleFormClose();
  }

  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEdit(activity: Activity) {
    setSubmitting(true);
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([
          ...activities.filter((item) => item.id !== activity.id),
          activity,
        ]);
      });
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
      });
    }
    handleFormClose();
    setSelectedActivity(activity);
    setSubmitting(false);
  }

  function handleDeleteActivity(id: string) {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter((item) => item.id !== id)]);
      setSelectedActivity(undefined);
      setSubmitting(false);
    });
  }
  if (loading) return <LoadingComponent content="Loading..." />;
  else
    return (
      <div className="App">
        <NavBar openForm={handleFormOpen} />
        <Container style={{ marginTop: "80px" }}>
          <ActivityDashboard
            activities={activities}
            selectedActivity={selectedActivity}
            selectActivity={handleSelectActivity}
            cancelSelectActivity={handleCancelSelectActivity}
            editMode={editMode}
            openForm={handleFormOpen}
            closeForm={handleFormClose}
            createOrEdit={handleCreateOrEdit}
            deleteActivity={handleDeleteActivity}
            submitting={submitting}
          />
        </Container>
      </div>
    );
}
