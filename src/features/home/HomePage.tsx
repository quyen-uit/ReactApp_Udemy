import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Divider } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";
import "../../app/styles/home/HomePage.css";
import FacebookLogin from "@greatsumini/react-facebook-login";
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
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <Button onClick={() => modalStore.openModal(<LoginForm />)}>
              Login
            </Button>
            <Button onClick={() => modalStore.openModal(<RegisterForm />)}>
              Register
            </Button>
          </div>
          <Divider horizontal inverted>
            Or
          </Divider>
          <Button
            as={FacebookLogin}
            appId="1181465762498599"
            size="huge"
            inverted
            color="facebook"
            content="Login with facebook"
            loading={userStore.fbLoading}
            onSuccess={(response: any) => {
              userStore.loginFacebook(response.accessToken);
            }}
            onFail={(error: any) => {
              console.log("Login Failed!", error);
            }}
          />
        </div>
      )}
    </div>
  );
}
export default observer(HomePage);
