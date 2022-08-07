import "../styles/App.css";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { observer } from "mobx-react-lite";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetail from "../../features/activities/detail/ActivityDetail";
import Layout from "./Layout";
import TestErrors from "../../features/errors/TestError";
import { ToastContainer } from "react-toastify";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
function App() {
  const location = useLocation();

  return (
    <div className="App">
      <ToastContainer hideProgressBar position="top-right" />
      <Routes key={location.key}>
        <Route path="/" element={<HomePage />} />
        <Route path="/" element={<Layout />}>
          <Route path="/activities" element={<ActivityDashboard />} />
          <Route path="/createActivity" element={<ActivityForm />} />
          <Route path="/manage/:id" element={<ActivityForm />} />
          <Route path="/activity/:id" element={<ActivityDetail />} />
          <Route path="/errors" element={<TestErrors />} />{" "}
          <Route path="/notfound" element={<NotFound />} />
          <Route path="/server-error" element={<ServerError />} />
        </Route>
      </Routes>
    </div>
  );
}

export default observer(App);
