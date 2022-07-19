import { observer } from "mobx-react-lite";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/Activity";
import { useStore } from "../../../app/stores/store";
import ActivityList from "../dashboard/ActivityList";
import ActivityDetail from "../detail/ActivityDetail";
import ActivityForm from "../form/ActivityForm";
interface Props {
  activities: Activity[];
}
 function ActivityDashboard({
  activities
}: Props) {

  const {activityStore}=useStore();
  const {selectedActivity,editMode} = activityStore;
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList
          activities={activities}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedActivity !== undefined && !editMode ? (
          <ActivityDetail
           />
        ) : null}
        {editMode ? (
          <ActivityForm
            activity={selectedActivity}
          />
        ) : null}
      </Grid.Column>
    </Grid>
  );
}
export default observer(ActivityDashboard);