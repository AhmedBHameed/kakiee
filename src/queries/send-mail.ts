import { graphty } from "@lib/services/graphty/graphty.service";
import { IBaseQueryResponse } from "./base";

/**
 * Response model of
 * getToken
 */
interface ISendMail {
  sendMail: {
    message: string;
  };
}
export type ISendMailGQL = IBaseQueryResponse<ISendMail>;
export const sendMailGQL = (data: any) =>
  graphty.stagnation({
    fun: {
      name: "sendMail", // required field and should be always string
      args: {
        name: data.name,
        subject: data.subject,
        email: data.email,
        message: data.message
      } // args is optional also it is auto detected when string inserted.
    },
    ret: ["message"]
  });
