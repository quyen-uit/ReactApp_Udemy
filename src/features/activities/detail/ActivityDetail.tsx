import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

function ActivityDetail() {
  const { activityStore } = useStore();
  const {
    openForm,
    cancelActivity,
    selectedActivity: activity,
  } = activityStore;
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
            onClick={() => openForm(activity.id)}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={() => cancelActivity()}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}
export default observer(ActivityDetail);
