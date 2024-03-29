import { observer } from "mobx-react-lite";
import { Card, Grid, Header, Tab } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import ProfileCard from "./ProfileCard";

function ProfileFollowings() {
  const { profileStore } = useStore();
  const { profile, followings, loadingFollowing, activeTab } =
    profileStore;

  return (
    <Tab.Pane loading={loadingFollowing}>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated="left"
            icon="user"
            content={
              activeTab === 3
                ? `People follower ${profile?.displayName}`
                : `People following ${profile?.displayName}`
            }
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Card.Group itempsPerRow={4}>
            {followings.map((profile) => (
              <ProfileCard key={profile.userName} profile={profile} />
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}

export default observer(ProfileFollowings);
