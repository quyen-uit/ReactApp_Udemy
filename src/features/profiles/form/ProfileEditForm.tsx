import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Header, Segment } from "semantic-ui-react";
import MyTextAreaInput from "../../../app/common/forms/MyTextAreaInput";
import MyTextInput from "../../../app/common/forms/MyTextInput";
import { ProfileUpdateFormValues } from "../../../app/models/ProfileUpdateFormValues";
import { useStore } from "../../../app/stores/store";
import * as Yup from "yup";

function ProfileEditForm() {
  const validationSchema = Yup.object({
    displayName: Yup.string().required("Display Name required"),
  });

  const navigate = useNavigate();
  const { profileStore, userStore } = useStore();
  const [profileForm, setProfileForm] = useState<ProfileUpdateFormValues>(
    new ProfileUpdateFormValues()
  );

  useEffect(() => {
    if (profileStore.profile) setProfileForm(profileStore.profile);
  }, [profileStore.profile]);

  function handleFormSubmit(profileForm: ProfileUpdateFormValues) {
    profileStore.updateProfile(profileForm).then(() => {
      userStore.setDisplayName(profileForm.displayName);
      navigate(`/profile/${profileStore.profile?.userName}`);
    });
  }
  return (
    <Segment clearing>
      <Header content="Profile Edit" sub color="teal" />
      <Formik
        initialValues={profileForm}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          handleFormSubmit(values);
        }}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit}>
            <MyTextInput name="displayName" placeholder="Display Name" />
            <MyTextAreaInput rows={10} placeholder="Bio" name="bio" />
            <Button
              disabled={isSubmitting || !dirty || !isValid}
              floated="right"
              positive
              type="submit"
              content="Submit"
              loading={isSubmitting}
            />
            <Button
              floated="right"
              positive
              type="button"
              content="Cancel"
              disabled={isSubmitting}
              as={Link}
              to={`/profile/${profileStore.profile?.userName}`}
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
}

export default observer(ProfileEditForm);
