import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  Menu,
  Tab,
  Image,
  Icon,
  Grid,
  List,
  Item,
  Header,
} from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { format } from "date-fns";

interface Props {
  userName: string;
}

function ProfileEvent({ userName }: Props) {
  const {
    profileStore: { setActiveEventTab, activeEventTab, events },
  } = useStore();

  useEffect(() => {
    setActiveEventTab("infuture");
  }, []);
  return (
    <Tab.Pane>
      <Header  icon="user" content={"Profile Event"} />
      <Menu>
        <Menu.Item
          name="infuture"
          active={activeEventTab === "infuture"}
          onClick={(e, { name }) => setActiveEventTab(name)}
        >
          In Future
        </Menu.Item>

        <Menu.Item
          name="ishosting"
          active={activeEventTab === "ishosting"}
          onClick={(e, { name }) => setActiveEventTab(name)}
        >
          In Past
        </Menu.Item>

        <Menu.Item
          name="inpast"
          active={activeEventTab === "inpast"}
          onClick={(e, { name }) => setActiveEventTab(name)}
        >
          Is Hosting
        </Menu.Item>
      </Menu>
      <Grid columns={4} stackable>
        {Array.from(events.values()).map((event) => (
          <Grid.Column>
            <Card>
              <Image src={event.image ?? "/assets/user.png"} />
              <Card.Content>
                <Card.Header>{event.title}</Card.Header>
                <Card.Description>{event.category}</Card.Description>
                <Card.Description>
                  {format(event.date!, "dd MMM yyyy h:mm aa")}
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
        ))}
      </Grid>
    </Tab.Pane>
  );
}

export default observer(ProfileEvent);
