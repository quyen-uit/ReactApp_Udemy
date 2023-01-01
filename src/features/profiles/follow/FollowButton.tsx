import { observer } from "mobx-react-lite";
import React, { SyntheticEvent } from "react";
import { Button, Reveal } from "semantic-ui-react";
import { Profile } from "../../../app/models/Profile";
import { useStore } from "../../../app/stores/store";

interface Props {
  profile: Profile;
}

function FollowButton({ profile }: Props) {
  const { profileStore, userStore } = useStore();
  const { updateFollowing, loadingBtnFollow } = profileStore;

  if (userStore.user?.userName === profile.userName) return null;

  function handleButton(e: SyntheticEvent, username: string) {
    e.preventDefault();
    profile.following
      ? updateFollowing(username, false)
      : updateFollowing(username, true);
  }
  return (
    <Reveal animated="move">
      <Reveal.Content visible style={{ width: "100%" }}>
        <Button
          fluid
          color="teal"
          content={profile.following ? "Following" : "Not following"}
          onClick={(e) => e.preventDefault()}
        />
      </Reveal.Content>
      <Reveal.Content hidden style={{ width: "100%" }}>
        <Button
          fluid
          loading={loadingBtnFollow}
          color={profile.following ? "red" : "green"}
          content={profile.following ? "Unfollow" : "Follow"}
          onClick={(e) => handleButton(e, profile.userName)}
        />
      </Reveal.Content>
    </Reveal>
  );
}

export default observer(FollowButton);
