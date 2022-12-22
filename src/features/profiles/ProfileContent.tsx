import { observer } from "mobx-react-lite";
import { Tab } from "semantic-ui-react";
import { Profile } from "../../app/models/Profile";
import { useStore } from "../../app/stores/store";
import ProfileAbout from "./ProfileAbout";
import ProfileEvent from "./ProfileEvent";
import ProfileFollowings from "./ProfileFollowings";
import ProfilePhotos from "./ProfilePhotos";

interface Props {
  profile: Profile;
}
function ProfilePage({ profile }: Props) {
  const {
    profileStore: { setActiveTab },
  } = useStore();
  const panes = [
    {
      menuItem: "About",
      render: () => <ProfileAbout bio={profile.bio || ""} />,
    },
    { menuItem: "Photos", render: () => <ProfilePhotos profile={profile} /> },
    { menuItem: "Events", render: () => <ProfileEvent userName={profile.userName} /> },
    {
      menuItem: "Followers",
      render: () => <ProfileFollowings />,
    },
    {
      menuItem: "Following",
      render: () => <ProfileFollowings />,
    },
  ];
  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
      onTabChange={(e, data) => setActiveTab(data.activeIndex)}
    />
  );
}
export default observer(ProfilePage);
