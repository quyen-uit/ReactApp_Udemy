import React, {  useState } from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import axios from "axios";
import ValidationErrors from "./ValidationErrors";

export default function TestErrors() {
  const baseUrl = process.env.REACT_APP_API_URL;
  const [errors, setErrors] = useState(null);
  function handleNotFound() {
    axios
      .get(baseUrl + "bug/not-found")
      .catch((err) => console.log(err.response));
  }

  function handleBadRequest() {
    axios
      .get(baseUrl + "bug/bad-request")
      .catch((err) => console.log(err.response));
  }

  function handleServerError() {
    axios
      .get(baseUrl + "bug/server-error")
      .catch((err) => console.log(err.response));
  }

  function handleUnauthorised() {
    axios
      .get(baseUrl + "bug/unauthorised")
      .catch((err) => console.log(err.response));
  }

  function handleBadGuid() {
    axios
      .get(baseUrl + "activity/notaguid")
      .catch((err) => console.log(err));
  }

  function handleValidationError() {
    axios
      .post(baseUrl + "activity", {})
      .catch((err) => console.log(setErrors(err)));
  }

  return (
    <>
      <Header as="h1" content="Test Error component" />
      <Segment>
        <Button.Group widths="7">
          <Button onClick={handleNotFound} content="Not Found" basic primary />
          <Button
            onClick={handleBadRequest}
            content="Bad Request"
            basic
            primary
          />
          <Button
            onClick={handleValidationError}
            content="Validation Error"
            basic
            primary
          />
          <Button
            onClick={handleServerError}
            content="Server Error"
            basic
            primary
          />
          <Button
            onClick={handleUnauthorised}
            content="Unauthorised"
            basic
            primary
          />
          <Button onClick={handleBadGuid} content="Bad Guid" basic primary />
        </Button.Group>
        {errors && <ValidationErrors errors={errors} />}
      </Segment>
    </>
  );
}
