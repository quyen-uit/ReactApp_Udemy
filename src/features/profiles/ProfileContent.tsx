import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Button, Tab } from "semantic-ui-react";
import { Profile } from "../../app/models/Profile";
import ProfileAbout from "./ProfileAbout";
import ProfileHeader from "./ProfileHeader";
import ProfilePhotos from "./ProfilePhotos";

interface Props {
  profile: Profile;
}
function ProfilePage({ profile }: Props) {
  const panes = [
    {
      menuItem: "About",
      render: () => <ProfileAbout bio={profile.bio || ""} />,
    },
    { menuItem: "Photos", render: () => <ProfilePhotos profile={profile} /> },
    { menuItem: "Events", render: () => <Tab.Pane>Events Content</Tab.Pane> },
    {
      menuItem: "Followers",
      render: () => <Tab.Pane>Followers Content</Tab.Pane>,
    },
    {
      menuItem: "Following",
      render: () => <Tab.Pane>Following Content</Tab.Pane>,
    },
  ];
  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
    />
  );
}
export default observer(ProfilePage);
