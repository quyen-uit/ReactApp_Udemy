import React from "react";
import { Calendar } from "react-calendar";
 import { Header, Menu } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default function ActivityFilter() {
  const {
    activityStore: { predicates, setPredicate },
  } = useStore();
  return (
    <>
      <Menu vertical size="large" style={{ width: "100%" }}>
        <Header icon="filter" attached color="teal" content="Filters" />
        <Menu.Item
          content="All"
          active={predicates.has("all")}
          onClick={() => setPredicate("all", "true")}
        />
        <Menu.Item
          content="I'm going"
          active={predicates.has("isGoing")}
          onClick={() => setPredicate("isGoing", "true")}
        />
         <Menu.Item
          content="I'm hosting"
          active={predicates.has("isHost")}
          onClick={() => setPredicate("isHost", "true")}
        />
      </Menu>
      <Header />
      <Calendar
        onChange={(date: any) => setPredicate("startDate", date)}
        value={predicates.get("startDate") || new Date()}
      />
    </>
  );
}
