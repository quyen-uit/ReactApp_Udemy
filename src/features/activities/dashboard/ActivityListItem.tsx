import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/Activity";
import { useStore } from "../../../app/stores/store";
import ActivityAttendeeItemList from "./ActivityAttendeeItemList";
interface Props {
  activity: Activity;
}
function ActivityListItem({ activity }: Props) {
  const { activityStore } = useStore();
  const { deleteActivity, submitting, loadActivity } = activityStore;
  const [target, setTarget] = useState("");
  return (
    <Segment.Group>
      <Segment>
        {activity.isCancelled && (
          <Label
            attached="top"
            color="red"
            content="Cancelled"
            style={{ textAlign: "center" }}
          />
        )}
        <Item.Group style={{ display: "flex" }}>
          <Item.Image
            size="tiny"
            circular
            src={activity.host?.image}
            as={Link}
            to={`/profile/${activity.hostUserName}`}
          />
          <Item.Content style={{ marginLeft: "10px" }}>
            <Item.Header as={Link} to={`/activity/${activity.id}`}>
              {activity.title}
            </Item.Header>
            <Item.Description>
              Hosted by {activity.host?.displayName}
            </Item.Description>
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
          </Item.Content>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" /> {format(activity.date!, "dd MMM yyyy h:mm aa")}
          <Icon name="marker" /> {activity.venue}
        </span>
      </Segment>
      <Segment secondary>
        <ActivityAttendeeItemList attendees={activity.attendees!} />
      </Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button
          as={Link}
          to={`/activity/${activity.id}`}
          color="teal"
          floated="right"
          content="View"
        />
      </Segment>
    </Segment.Group>
  );
}
export default observer(ActivityListItem);
