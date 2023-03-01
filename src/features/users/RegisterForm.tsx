import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Header } from "semantic-ui-react";
import MyTextInput from "../../app/common/forms/MyTextInput";
import { useStore } from "../../app/stores/store";
import * as Yup from "yup";
import ValidationErrors from "../errors/ValidationErrors";

const validationSchema = Yup.object({
  displayName: Yup.string().required("displayName required"),
  username: Yup.string().required("username required"),
  email: Yup.string().required("email required"),
  password: Yup.string().required("password required"),
});

function RegisterForm() {
  const { userStore } = useStore();
  return (
    <Formik
      initialValues={{
        displayName: "",
        username: "",
        email: "",
        password: "",
        error: null,
      }}
      onSubmit={(values, { setErrors }) =>
        userStore.register(values).catch((err) => setErrors({ error: err }))
      }
      validationSchema={validationSchema}
    >
      {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
        <Form className="ui form error" onSubmit={handleSubmit} autoComplete="off">
          <Header content="Register" />
          <MyTextInput name="username" placeholder="Username" />
          <MyTextInput name="displayName" placeholder="Display Name" />
          <MyTextInput name="email" placeholder="Email" />
          <MyTextInput name="password" placeholder="Password" type="password" />
          <ErrorMessage
            name="error"
            render={() => <ValidationErrors errors={errors.error} />}
          />
          <Button
            disabled={!isValid || !dirty || isSubmitting}
            loading={isSubmitting}
            positive
            content="Register"
            type="submit"
            fluid
          />
        </Form>
      )}
    </Formik>
  );
}

export default observer(RegisterForm);
