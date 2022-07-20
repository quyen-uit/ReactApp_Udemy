import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

function ActivityDetail() {
  const { activityStore } = useStore();
  const { selectedActivity: activity, loadActivity } = activityStore;
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) loadActivity(id);
  }, [id, loadActivity]);
  if (activity === undefined) return <div></div>;
  return (
    <Card fluid>
      <Image
        src={require(`../../../app/assets/categoryImages/${activity.category}.jpg`)}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span className="date">{activity.date}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            basic
            color="blue"
            content="Edit"
            as={Link}
            to={`/manage/${activity.id}`}
          />
          <Button
            basic
            color="grey"
            content="Cancel"
            as={Link}
            to="/activities"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}
export default observer(ActivityDetail);
