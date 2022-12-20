import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Button, Grid } from "semantic-ui-react";
import { PagingParams } from "../../../app/models/Pagination";
import { useStore } from "../../../app/stores/store";
// import { useStore } from "../../../app/stores/store";
import ActivityList from "../dashboard/ActivityList";
import ActivityFilter from "./ActivityFilter";
import ActivityListItemPlaceholder from "./ActivityListItemPlaceholder";
// import ActivityDetail from "../detail/ActivityDetail";
// import ActivityForm from "../form/ActivityForm";
import InfiniteScroll from 'react-infinite-scroller';

function ActivityDashboard() {
  const [loadNext, setLoadNext] = useState(false);
  const {
    activityStore: {
      setPagingParams,
      pagination,
      loadActivities,
      loadingInitial,
    },
  } = useStore();
  function handleGetNext() {
    setLoadNext(true);
    setPagingParams(new PagingParams(pagination!.currentPage + 1));
    loadActivities().then(() => setLoadNext(false));
  }
  return (
    <Grid>
      <Grid.Column width="10">
        {loadingInitial && !loadNext ? (
          <>
            <ActivityListItemPlaceholder />
            <ActivityListItemPlaceholder />
            <ActivityListItemPlaceholder />
          </>
        ) : (
          <>
            {/* <ActivityList />
            <Button
              floated="right"
              content="More.."
              positive
              onClick={handleGetNext}
            /> */}
            <InfiniteScroll
              pageStart={0}
              loadMore={handleGetNext}
              hasMore={!loadNext && !!pagination && pagination.currentPage < pagination.totalPages}
              initialLoad={loadNext}
              loader={
                <div className="loader" key={0}>
                  Loading ...
                </div>
              }
             >
              <ActivityList />
            </InfiniteScroll>
          </>
        )}
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityFilter />
      </Grid.Column>
    </Grid>
  );
}
export default observer(ActivityDashboard);
