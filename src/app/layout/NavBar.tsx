import { observer } from "mobx-react-lite";
import { Link, NavLink } from "react-router-dom";
import { Button, Menu, Image, Dropdown } from "semantic-ui-react";
import { useStore } from "../stores/store";
import "../styles/NavBar.css";

function NavBar() {
  const {
    userStore: { user, logout },
  } = useStore();
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
      <Menu.Item name="reactivities" as={NavLink} to="/">
        Reactivities
      </Menu.Item>
      <Menu.Item name="activities" as={NavLink} to="/activities">
        Activities
      </Menu.Item>
      <Menu.Item name="erros" as={NavLink} to="/errors">
        Test Errors
      </Menu.Item>
      <Menu.Item name="createActivity" as={Link} to="/createActivity">
        <Button content="Create Activity"></Button>
      </Menu.Item>
      <Menu.Item position="right">
        <Image src={user?.image || "/assets/user.png"} avatar spaced="right" />
        <Dropdown pointing="top right" text={user?.displayName}>
          <Dropdown.Menu>
            <Dropdown.Item
              as={Link}
              to={`/profile/${user?.userName}`}
              text="My profile"
              icon="user"
            />
            <Dropdown.Item onClick={logout} text="Logout" icon="power" />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    </Menu>
  );
}
export default observer(NavBar);
