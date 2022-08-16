import { format } from "date-fns";
import React, { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/Activity";
import { useStore } from "../../../app/stores/store";
interface Props {
  activity: Activity;
}
export default function ActivityListItem({ activity }: Props) {
  const { activityStore } = useStore();
  const { deleteActivity, submitting, loadActivity } = activityStore;
  const [target, setTarget] = useState("");

  function handleActivityDelete(
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) {
    setTarget(e.currentTarget.name);
    deleteActivity(id);
  }
  return (
    <Segment.Group>
      <Segment>
        <Item.Group style={{ display: "flex" }}>
          <Item.Image
            size="tiny"
            circular
            src={require("../../../app/assets/user.png")}
          />
          <Item.Content style={{ marginLeft: "10px" }}>
            <Item.Header as={Link} to={`/activities/${activity.id}`}>
              {activity.title}
            </Item.Header>
            <Item.Description>{activity.description}</Item.Description>
          </Item.Content>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" /> {format(activity.date!, "dd MMM yyyy h:mm aa")}
          <Icon name="marker" /> {activity.venue}
        </span>
      </Segment>
      <Segment secondary>Attendees</Segment>
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
