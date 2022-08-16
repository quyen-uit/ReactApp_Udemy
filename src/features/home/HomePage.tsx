import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Container } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";

function HomePage() {
  const { userStore, modalStore } = useStore();
  return (
    <Container>
      <h1>home page</h1>
      {userStore.isLoggedIn ? (
        <h3>
          go to <Link to="/activities">Activities</Link>
        </h3>
      ) : (
        <>
          <Button onClick={() => modalStore.openModal(<LoginForm />)}>
            Login
          </Button>
          <Button onClick={() => modalStore.openModal(<RegisterForm />)}>
            Register
          </Button>
        </>
      )}
    </Container>
  );
}
export default observer(HomePage);
