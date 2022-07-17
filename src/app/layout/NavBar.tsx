import { Button, Menu } from "semantic-ui-react";
import "../styles/NavBar.css";

interface Props {
  openForm: ()=> void;
}

export default function NavBar({openForm}:Props) {
  return (
    <Menu inverted fixed="top" >
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
        <Button onClick={openForm} content="Create Activity"></Button>
      </Menu.Item>
    </Menu>
  );
}
