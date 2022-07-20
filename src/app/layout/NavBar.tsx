 import { Link, NavLink } from "react-router-dom";
import { Button, Menu } from "semantic-ui-react";
 import "../styles/NavBar.css";

 

function NavBar() {
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
      <Menu.Item name="reactivities" as={NavLink} to='/'>Reactivities</Menu.Item>
      <Menu.Item name="activities" as={NavLink} to='/activities'>Activities</Menu.Item>
      <Menu.Item name="createActivity" as={Link} to='/createActivity'>
        <Button  content="Create Activity"></Button>
      </Menu.Item>
    </Menu>
  );
}
export default NavBar;
