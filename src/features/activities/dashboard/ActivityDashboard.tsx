import { observer } from "mobx-react-lite";
import { Grid } from "semantic-ui-react";
// import { useStore } from "../../../app/stores/store";
import ActivityList from "../dashboard/ActivityList";
// import ActivityDetail from "../detail/ActivityDetail";
// import ActivityForm from "../form/ActivityForm";

function ActivityDashboard() {

  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList />
      </Grid.Column>
      <Grid.Column width={6}>
        <div>filter</div>
      </Grid.Column>
    </Grid>
  );
}
export default observer(ActivityDashboard);
