import React from "react";
import { create } from "react-test-renderer";
import Overlay from "../@lib/components/overlay/overlay";

describe("Button component", () => {
  test("Matches the snapshot", () => {
    const overlay = create(<Overlay color="red" />);
    expect(overlay.toJSON()).toMatchSnapshot();
  });
});
