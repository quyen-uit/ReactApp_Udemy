import { observer } from "mobx-react-lite";
import { Button, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";
import "../styles/NavBar.css";

 

function NavBar() {
  const { activityStore } = useStore();
   return (
    <Menu inverted fixed="top">
      <Menu.Item>
        <img
          src={require("../assets/logo.jpg")}
          alt="logo"
          width={40}
          height={40}
        />
      </Menu.Item>
      <Menu.Item name="reactivities">Reactivities</Menu.Item>
      <Menu.Item name="activities">Activities</Menu.Item>
      <Menu.Item name="createActivity">
        <Button onClick={() => activityStore.openForm()} content="Create Activity"></Button>
      </Menu.Item>
    </Menu>
  );
}
export default observer(NavBar);
