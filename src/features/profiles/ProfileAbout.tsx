import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Tab } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";

interface Props {
  bio: string;
}

function ProfileAbout({ bio }: Props) {
  const {
    profileStore: { isCurrentUser },
  } = useStore();
  return (
    <Tab.Pane>
      {isCurrentUser && (
        <Button
          content="Edit Profile"
          floated="right"
          as={Link}
          to={"/editprofile"}
        />
      )}
      <div
        style={{ whiteSpace: "pre-wrap" }}
        dangerouslySetInnerHTML={{ __html: bio }}
      />
    </Tab.Pane>
  );
}

export default observer(ProfileAbout);
