import React, { useCallback, MouseEventHandler, useState } from "react";
import { action } from "@storybook/addon-actions";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import InfoIcon from "@material-ui/icons/Info";
import ErrorIcon from "@material-ui/icons/Error";
import WarningIcon from "@material-ui/icons/Warning";
import { withKnobs, object, text } from "@storybook/addon-knobs/react";
import { Notification } from "../../@lib/components/notification/notification";
import { Button } from "@material-ui/core";

export default {
  title: "Notification",
  component: Notification,
  decorators: [withKnobs],
  excludeStories: /.*Data$/,
  parameters: {
    component: Notification,
    componentSubtitle:
      "Displays an image that represents a user or organization"
  }
};

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};
export interface NotificationProps {
  className?: string;
  /**
   * Notification message
   */
  message: string;
  open: boolean;
  direction?: {
    vertical: "bottom" | "top";
    horizontal: "left" | "right";
  };
  variant: keyof typeof variantIcon;
}

// Notification.propTypes = {
//   className: PropTypes.string,
//   message: PropTypes.string,
//   open: PropTypes.bool,
//   direction: PropTypes.shape({
//     horizontal: PropTypes.oneOf(["right", "left"]),
//     vertical: PropTypes.oneOf(["top", "bottom"])
//   }),
//   variant: PropTypes.oneOf(["success", "warning", "error", "info"])
// };

export const notification: React.FC<NotificationProps> = props => {
  const [openNotification, setOpenNotification] = useState(false);

  const handleNotify = useCallback(
    (event: MouseEventHandler<HTMLButtonElement> | any) => {
      setOpenNotification(false);
      setTimeout(() => {
        setOpenNotification(true);
      }, 200);
      action("clicked", { clearOnStoryChange: false })(event);
    },
    [setOpenNotification]
  );

  return (
    <>
      <Button onClick={handleNotify} variant="contained">
        Test notification
      </Button>
      <Notification
        message={text("message", "This is a test notification message.")}
        variant={text("variant", "success")}
        open={openNotification}
        direction={object("direction", {
          vertical: "bottom",
          horizontal: "right"
        })}
      />
    </>
  );
};

// @ts-ignore
notification.story = {
  parameters: {
    jest: ["notification.test.tsx"]
  }
};
