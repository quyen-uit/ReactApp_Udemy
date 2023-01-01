import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

interface Props {
  inverted?: boolean;
  content: string;
}
export default function LoadingComponent({ inverted, content }: Props) {
  return (
    <Dimmer style={{ height: "100%" }} inverted active={true}>
      <Loader content={content} />
    </Dimmer>
  );
}
