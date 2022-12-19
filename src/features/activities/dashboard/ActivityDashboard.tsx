import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Button, Grid } from "semantic-ui-react";
import { PagingParams } from "../../../app/models/Pagination";
import { useStore } from "../../../app/stores/store";
// import { useStore } from "../../../app/stores/store";
import ActivityList from "../dashboard/ActivityList";
// import ActivityDetail from "../detail/ActivityDetail";
// import ActivityForm from "../form/ActivityForm";

function ActivityDashboard() {
  const [loadNext, setLoadNext] = useState(false);
  const {
    activityStore: { setPagingParams, pagination, loadActivities },
  } = useStore();
  function handleGetNext() {
    setLoadNext(true);
    setPagingParams(new PagingParams(pagination!.currentPage + 1));
    loadActivities().then(() => setLoadNext(false));
  }
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList />
        <Button
          floated="right"
          content="More.."
          positive
          onClick={handleGetNext}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        <div>filter</div>
      </Grid.Column>
    </Grid>
  );
}
export default observer(ActivityDashboard);
