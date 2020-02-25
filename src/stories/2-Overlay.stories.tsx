import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs, text } from "@storybook/addon-knobs/react";
import Overlay from "../@lib/components/overlay/overlay";
// import { storiesOf } from "@storybook/react";

export default {
  title: "Overlay",
  component: Overlay,
  decorators: [withKnobs],
  excludeStories: /.*Data$/
};

export interface IProps {
  color: string;
  opacity?: string;
  onClick?: (e: any) => void;
}

export const OverlayScreen: React.FC<IProps> = props => {
  return (
    <Overlay
      onClick={action("clicked")}
      opacity={text("opacity", "0.5")}
      color={text("color", "red")}
    />
  );
};

// @ts-ignore
OverlayScreen.story = {
  parameters: {
    jest: ["2-Overlay.test.tsx"]
  }
};
// storiesOf("LayoutColor", module)
//   .add("red", () => <OverlayScreen color="red" />)
//   .add("yellow", () => <OverlayScreen color="yellow" />)
