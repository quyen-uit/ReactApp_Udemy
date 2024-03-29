import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";
import { Formik, Form } from "formik";
import { ActivityFormvalues } from "../../../app/models/Activity";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/forms/MyTextInput";
import MyTextAreaInput from "../../../app/common/forms/MyTextAreaInput";
import MySelectInput from "../../../app/common/forms/MySelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOption";
import MyDateInput from "../../../app/common/forms/MyDateInput";
function ActivityForm() {
  const [activity, setActivity] = useState<ActivityFormvalues>(
    new ActivityFormvalues()
  );
  const { activityStore } = useStore();
  const { createActivity, editActivity, loadActivity } = activityStore;

  const validationSchema = Yup.object({
    title: Yup.string().required("Title required"),
    description: Yup.string().required("description required"),
    category: Yup.string().required("category required"),
    date: Yup.string().required("date required"),
    city: Yup.string().required("city required"),
    venue: Yup.string().required("venue required"),
  });

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  useEffect(() => {
    if (id)
      loadActivity(id).then((act) => setActivity(new ActivityFormvalues(act)));
  }, [id, loadActivity]);

  function handleFormSubmit(activity: ActivityFormvalues) {
    if (!activity.id) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity).then((act) =>
        navigate(`/activity/${act.id}`)
      );
    } else
      editActivity(activity).then((act) => navigate(`/activity/${act.id}`));
  }

  return (
    <Segment clearing>
      <Header content="Activity Details" sub color="teal" />
      <Formik
        initialValues={activity}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          handleFormSubmit(values);
        }}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit}>
            <MyTextInput name="title" placeholder="title" />
            <MyTextAreaInput
              rows={3}
              placeholder="Description"
              name="description"
            />
            <MySelectInput
              options={categoryOptions}
              placeholder="Category"
              name="category"
            />
            <MyDateInput
              showTimeSelect
              timeCaption="time"
              dateFormat={"MMMM d, yyyy h:mm aa"}
              name="date"
            />
            <Header content="Location Details" sub color="teal" />
            <MyTextInput placeholder="City " name="city" />
            <MyTextInput placeholder="Venue" name="venue" />
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
              loading={isSubmitting}
              as={Link}
              to="/activities"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
}
export default observer(ActivityForm);
