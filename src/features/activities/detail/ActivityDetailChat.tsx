import { Field, FieldProps, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from 'date-fns';

import {
  Segment,
  Header,
  Comment,
  Form,
  Loader,
} from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import * as Yup from "yup";
interface Props {
  activityId: string;
}

export default observer(function ActivityDetailedChat({ activityId }: Props) {
  const { commentStore } = useStore();

  useEffect(() => {
    if (activityId) {
      commentStore.createHubConnection(activityId);
    }

    return () => {
      commentStore.clearComments();
    };
  }, [commentStore, activityId]);

  return (
    <>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{ border: "none" }}
      >
        <Header>Chat about this event</Header>
      </Segment>
      <Segment attached clearing>
        <Comment.Group>
          {commentStore.comments.map((comment) => (
            <Comment key={comment.id}>
              <Comment.Avatar src={comment.image || "/assets/user.png"} />
              <Comment.Content>
                <Comment.Author as={Link} to={`/profiles/${comment.userName}`}>
                  {comment.displayName}
                </Comment.Author>
                <Comment.Metadata>
                  <div>{formatDistanceToNow(comment.createdAt)}</div>
                </Comment.Metadata>
                <Comment.Text style={{ whiteSpace: "pre-wrap" }}>
                  {comment.body}
                </Comment.Text>
                {/* <Comment.Actions>
                  <Comment.Action>Reply</Comment.Action>
                </Comment.Actions> */}
              </Comment.Content>
            </Comment>
          ))}
          <Formik
            onSubmit={(values, { resetForm }) =>
              commentStore.addComment(values).then(() => resetForm())
            }
            initialValues={{ body: "" }}
            validationSchema={Yup.object({
              body: Yup.string().required(),
            })}
          >
            {({ isSubmitting, isValid, handleSubmit }) => (
              <Form className="ui form">
                {/* <MyTextAreaInput
                  placeholder="add comment"
                  name="body"
                  rows={2}
                />
                <Button
                  loading={isSubmitting}
                  disabled={isSubmitting || !isValid}
                  content="Add Reply"
                  labelPosition="left"
                  icon="edit"
                  primary
                  type="submit"
                  floated="right"
                /> */}
                <Field name="body">
                  {(props: FieldProps) => (
                    <div style={{ position: "relative" }}>
                      <Loader active={isSubmitting} />
                      <textarea
                        placeholder="enter comment (enter to submit)"
                        rows={2}
                        {...props.field}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && e.shiftKey) return;
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            isValid && handleSubmit();
                          }
                        }}
                      />
                    </div>
                  )}
                </Field>
              </Form>
            )}
          </Formik>
        </Comment.Group>
      </Segment>
    </>
  );
});
