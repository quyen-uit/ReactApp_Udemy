import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Segment } from "semantic-ui-react";
import "../../app/styles/NotFound.css";
export default function NotFound() {
  return (
    <Segment className="box">
      <div className="box__item">404</div>
      <div className="box__item">Page Not Found</div>
      <Button as={NavLink} to="/activities" className="box__item" content='Back to activities page' primary />
    </Segment>
  );
}
