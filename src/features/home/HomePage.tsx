import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";
import "../../app/styles/home/HomePage.css";
function HomePage() {
  const { userStore, modalStore } = useStore();
  return (
    <div className="box">
      <h1 style={{ color: "white" }}>Welcome to your Activities</h1>
      {userStore.isLoggedIn ? (
        <Button as={Link} to="/activities">
          Get started
        </Button>
      ) : (
        <div>
          <Button onClick={() => modalStore.openModal(<LoginForm />)}>
            Login
          </Button>
          <Button onClick={() => modalStore.openModal(<RegisterForm />)}>
            Register
          </Button>
        </div>
      )}
    </div>
  );
}
export default observer(HomePage);
