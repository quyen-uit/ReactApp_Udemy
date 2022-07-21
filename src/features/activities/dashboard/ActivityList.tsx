import { observer } from "mobx-react-lite";
import { Fragment, useEffect } from "react";
import { Header, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import ActivityListItem from "./ActivityListItem";

function ActivityList() {
  const { activityStore } = useStore();
  const {
     activityMap,
    groupedActivities,
  } = activityStore;

  useEffect(() => {
    if (activityMap.size === 0) activityStore.loadActivities();
  }, [activityMap.size, activityStore]);

  return (
    <>
      {groupedActivities.map(([group, activities]) => (
        <Fragment key={group}>
          <Header sub color="teal">
            {group}
          </Header>
          <Segment>
            <Item.Group divided>
              {activities.map((activity) => (
                <ActivityListItem key={activity.id} activity={activity} />
              ))}
            </Item.Group>
          </Segment>
        </Fragment>
      ))}
    </>
  );
}

export default observer(ActivityList);
