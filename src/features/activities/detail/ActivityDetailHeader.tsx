import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Header, Item, Segment, Image, Label } from "semantic-ui-react";
import { Activity } from "../../../app/models/Activity";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useStore } from "../../../app/stores/store";

const activityImageStyle = {
  filter: "brightness(30%)",
};

const activityImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};

interface Props {
  activity: Activity;
}

export default observer(function ActivityDetailedHeader({ activity }: Props) {
  const {
    activityStore: { updateAttendace, loadingInitial, cancelActivityToggle, deleteActivity },
  } = useStore();
  return (
    <Segment.Group>
      <Segment basc attached="top" style={{ padding: "0" }}>
        {activity.isCancelled && (
          <Label
            style={{ position: "absolute", zIndex: 1000, left: -14, top: 20 }}
            ribbon
            color="red"
            content="Cancelled"
          />
        )}
        <Image
          src={require("../../../app/assets/categoryImages/music.jpg")}
          fluid
          style={activityImageStyle}
        />
        <Segment style={activityImageTextStyle} basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={activity.title}
                  style={{ color: "white" }}
                />
                <p>{format(activity.date!, "dd MMM yyyy")}</p>
                <p>
                  {activity.isHost && (
                    <Item.Description>
                      <Label basic color="orange">
                        You are hosting this activity
                      </Label>
                    </Item.Description>
                  )}
                  {activity.isGoing && !activity.isHost && (
                    <Item.Description>
                      <Label basic color="green">
                        You are going to this activity
                      </Label>
                    </Item.Description>
                  )}
                </p>
                <p>
                  <Link to={`/profiles/${activity.host?.userName}`}>
                    Hosted by {activity.host?.displayName}
                  </Link>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        {activity.isHost ? (
          <>
            <Button
              floated="left"
              basic
              color={activity.isCancelled ? "green" : "red"}
              content={activity.isCancelled ? "Re-activate" : "Cancel"}
              onClick={cancelActivityToggle}
              loading={loadingInitial}
            />
            <Button
              disabled={activity.isCancelled}
              as={Link}
              to={`/manage/${activity.id}`}
              color="orange"
              floated="right"
            >
              Manage Event
            </Button>
            <Button
              onClick={() => deleteActivity(activity.id)}
              color="red"
              floated="right"
              content="Delete"
            />
          </>
        ) : activity.isGoing ? (
          <Button
            loading={loadingInitial}
            onClick={updateAttendace}
            color="orange"
            floated="right"
          >
            Cancel
          </Button>
        ) : (
          <Button
            disabled={activity.isCancelled}
            loading={loadingInitial}
            onClick={updateAttendace}
            color="orange"
            floated="right"
          >
            Join activity
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
});
