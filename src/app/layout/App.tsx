import "../styles/App.css";
import { observer } from "mobx-react-lite";
import Layout from "./Layout";
import { ToastContainer } from "react-toastify";
import { useStore } from "../stores/store";
import { useEffect } from "react";
import LoadingComponent from "./LoadingComponent";
import ModalContainer from "../common/modals/ModalContainer";
import { ScrollRestoration } from "react-router-dom";
function App() {
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  if (!commonStore.appLoaded)
    return <LoadingComponent content="Loadingggg..." />;

  return (
    <div className="App">
      <ScrollRestoration />
      <ToastContainer hideProgressBar position="top-right" />
      <ModalContainer />
      <Layout />
    </div>
  );
}

export default observer(App);
