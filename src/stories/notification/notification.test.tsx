import React from "react";
import { create } from "react-test-renderer";
import { Notification } from "../../@lib/components/notification/notification";

describe("Button component", () => {
  test("Matches the snapshot", () => {
    const notification = create(
      <Notification
        message={"This is a test notification message."}
        variant={"success"}
        open={true}
        direction={{
          vertical: "bottom",
          horizontal: "right"
        }}
      />
    );
    expect(notification.toJSON()).toMatchSnapshot();
  });
});
