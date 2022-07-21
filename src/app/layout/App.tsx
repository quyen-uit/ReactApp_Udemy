import "../styles/App.css";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import LoadingComponent from "./LoadingComponent";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetail from "../../features/activities/detail/ActivityDetail";
import Layout from "./Layout";
function App() {
  const location = useLocation();
  const { activityStore } = useStore();
  const { loadingInitial } = activityStore;
  if (loadingInitial) return <LoadingComponent content="Loading..." />;
  else
    return (
      <div className="App">
        <Routes key={location.key}>
          <Route path="/" element={<HomePage />} />
          <Route path="/" element={<Layout />}>
            <Route path="/activities" element={<ActivityDashboard />} />
            <Route path="/createActivity" element={<ActivityForm />} />
            <Route path="/manage/:id" element={<ActivityForm />} />
            <Route path="/activity/:id" element={<ActivityDetail />} />
          </Route>
        </Routes>
      </div>
    );
}

export default observer(App);
