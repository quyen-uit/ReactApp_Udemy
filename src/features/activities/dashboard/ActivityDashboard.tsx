import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/Activity";
import ActivityList from "../dashboard/ActivityList";
import ActivityDetail from "../detail/ActivityDetail";
import ActivityForm from "../form/ActivityForm";
interface Props {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  selectActivity: (id: string) => void;
  cancelSelectActivity: () => void;
  editMode: boolean;
  openForm: (id: string) => void;
  closeForm: () => void;
  createOrEdit: (activity: Activity) => void;
  deleteActivity: (id: string) => void;
  submitting: boolean;
}
export default function ActivityDashboard({
  activities,
  selectedActivity,
  createOrEdit,
  selectActivity,
  cancelSelectActivity,
  editMode,
  openForm,
  closeForm,
  deleteActivity,
  submitting,
}: Props) {
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList
          deleteActivity={deleteActivity}
          activities={activities}
          selectActivity={selectActivity}
          submitting={submitting}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedActivity !== undefined && !editMode ? (
          <ActivityDetail
            cancelSelectActivity={cancelSelectActivity}
            activity={selectedActivity}
            openForm={openForm}
          />
        ) : null}
        {editMode ? (
          <ActivityForm
            activity={selectedActivity}
            closeForm={closeForm}
            createOrEdit={createOrEdit}
            submitting={submitting}
          />
        ) : null}
      </Grid.Column>
    </Grid>
  );
}
