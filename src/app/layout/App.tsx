import "../styles/App.css";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { Container } from "semantic-ui-react";
import { useEffect } from "react";
import LoadingComponent from "./LoadingComponent";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetail from "../../features/activities/detail/ActivityDetail";
function App() {
  const { activityStore } = useStore();
  const { activitiesByDate: activities, loadingInitial } = activityStore;
  const location = useLocation();
  // const [activities, setActivities] = useState<Activity[]>([]);
  // const [selectedActivity, setSelectedActivity] = useState<
  //   Activity | undefined
  // >(undefined);
  // const [editMode, setEditMode] = useState(false);
  // const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  // function handleSelectActivity(id: string) {
  //   setSelectedActivity(activities.find((x) => x.id === id));
  //   handleFormClose();
  // }

  // function handleCancelSelectActivity() {
  //   setSelectedActivity(undefined);
  // }

  // function handleFormOpen(id?: string) {
  //   id ? handleSelectActivity(id) : handleCancelSelectActivity();
  //   setEditMode(true);
  // }

  // function handleFormClose() {
  //   setEditMode(false);
  // }

  // function handleCreateOrEdit(activity: Activity) {
  //   setSubmitting(true);
  //   if (activity.id) {
  //     agent.Activities.update(activity).then(() => {
  //       setActivities([
  //         ...activities.filter((item) => item.id !== activity.id),
  //         activity,
  //       ]);
  //     });
  //   } else {
  //     activity.id = uuid();
  //     agent.Activities.create(activity).then(() => {
  //       setActivities([...activities, activity]);
  //     });
  //   }
  //   handleFormClose();
  //   setSelectedActivity(activity);
  //   setSubmitting(false);
  // }

  // function handleDeleteActivity(id: string) {
  //   setSubmitting(true);
  //   agent.Activities.delete(id).then(() => {
  //     setActivities([...activities.filter((item) => item.id !== id)]);
  //     setSelectedActivity(undefined);
  //     setSubmitting(false);
  //   });
  // }
  if (loadingInitial) return <LoadingComponent content="Loading..." />;
  else
    return (
      <div className="App">
        <NavBar />
        <Container style={{ marginTop: "80px" }}>
          <Routes key={location.key}>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/activities"
              element={<ActivityDashboard activities={activities} />}
            />
            <Route  path="/createActivity" element={<ActivityForm />} />
            <Route   path="/manage/:id" element={<ActivityForm />} />
            <Route path="/activity/:id" element={<ActivityDetail />} />
          </Routes>
        </Container>
      </div>
    );
}

export default observer(App);
