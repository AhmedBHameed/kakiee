import { useState, useCallback, SyntheticEvent } from "react";
import { get } from "lodash";
import { useDispatch } from "react-redux";
import { getTokenGQL, IGetTokenGQL } from "queries";
import { END_POINT, ROUTER } from "config";
import {
  useFormReducer,
  httpClient,
  notify,
  setToken,
  catchError,
  IFormValidation,
  IAxiosErrorResponse,
  IFormBuilderState
} from "@lib";
import * as H from "history";

interface IUseLoginOrRegister<
  P = {
    history: H.History<H.History.PoorMansUnknown>;
  }
> {
  (props: P): {
    state: IFormBuilderState;
    handleOnChange: (e: any) => void;
    handleOnSubmit: (e: SyntheticEvent<HTMLElement>) => boolean;
    isLoading: boolean;
  };
}

const formModel = {
  email: "",
  password: ""
};

const validationSch: IFormValidation = {
  email: {
    required: true,
    validators: [
      {
        validate: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        error: "Invalid email address!"
      }
    ]
  },
  password: {
    required: true,
    validators: [
      {
        validate: state => {
          const length = state.password.length;
          return length > 6 && length < 32;
        },
        error: "Password should between 6-31 characters!"
      },
      {
        validate: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,32}$/,
        error: "Password should contain characters, numbers, samples."
      }
    ]
  }
};

export const useLoginOrRegisterApi: IUseLoginOrRegister = ({ history }) => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);

  const loginOrRegister = (isValid: boolean, data: any) => {
    if (isValid) {
      setLoading(true);
      httpClient
        .post(
          END_POINT.API_USER_AUTH,
          getTokenGQL({
            email: data.email,
            password: data.password
          })
        )
        .then((res: IGetTokenGQL) => {
          setLoading(false);
          if (!!res.data) {
            if (!!res.data.getToken.isAuthenticated) {
              setToken(res.data.getToken.token, "kakieeToken");
              dispatch(
                notify({
                  open: true,
                  message: `Welcome`,
                  type: "success"
                })
              );
              history.push(`${ROUTER.ROOT.path}/${ROUTER.DASHBOARD.path}`);
              return;
            }
            // if( get(res, "data.errors[0].extensions.code", "") ===  "ER_004_AUTH") {
            // }
            dispatch(
              notify({
                open: true,
                message: get(
                  res,
                  "errors[0].message",
                  "Can't handle server respond"
                ),
                type: "error"
              })
            );
          } else {
            throw new Error("Something went wrong!");
          }
        })
        .catch((e: IAxiosErrorResponse) => {
          setLoading(false);
          catchError(
            get(
              e,
              "serverRespond.errors[0].message",
              "Can't handle server respond"
            ),
            dispatch
          );
        });
    }
  };

  const { state, handleOnChange, handleOnSubmit } = useFormReducer(
    formModel,
    validationSch,
    loginOrRegister
  );

  return {
    state,
    handleOnChange,
    handleOnSubmit,
    isLoading
  };
};
