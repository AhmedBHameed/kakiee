import { addDecorator } from "@storybook/react";
// import { withInfo } from "@storybook/addon-info";
import { withTests } from "@storybook/addon-jest";
import results from "../src/.jest-test-results.json";

// addDecorator(
//   withInfo({
//     styles: {
//       header: {
//         h1: {
//           marginRight: "20px",
//           fontSize: "25px",
//           display: "inline"
//         },
//         body: {
//           paddingTop: 0,
//           paddingBottom: 0
//         },
//         h2: {
//           display: "inline",
//           color: "#999"
//         }
//       },
//       infoBody: {
//         backgroundColor: "#eee",
//         padding: "0px 5px",
//         lineHeight: "2"
//       }
//     },
//     inline: false,
//     source: false
//   })
// );
addDecorator(
  withTests({
    results
  })
);
