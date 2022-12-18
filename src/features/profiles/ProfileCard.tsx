import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Card, Image, Icon } from "semantic-ui-react";
import { Profile } from "../../app/models/Profile";
import { truncate } from "../common/utilities";
interface Props {
  profile: Profile;
}
function ProfileCard({ profile }: Props) {
  return (
    <Card as={Link} to={`/profiles/${profile.userName}`}>
      <Image src={profile.image || "/assets/user.png"} />
      <Card.Content>
        <Card.Header>{profile.displayName}</Card.Header>
        <Card.Description>{truncate(profile.bio)}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Icon name="user" /> {profile.followersCount} followers
      </Card.Content>
    </Card>
  );
}

export default observer(ProfileCard);
