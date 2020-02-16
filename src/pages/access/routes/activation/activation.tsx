import React, { useEffect, useState } from "react";
import { Typography, Grid, LinearProgress, Box } from "@material-ui/core";
import { RouteComponentProps } from "react-router-dom";
import {
  httpClient,
  IAxiosErrorResponse,
  catchError
} from "../../../../@lib/services";
import { verifyUserGQL, IVerifyUserGQL } from "../../../../queries";
import { ROUTER, END_POINT } from "../../../../config";
import { notify } from "../../../../@lib/store/nodeys-dashboard/actions";
import { useStyles } from "./style.activation";
import { useDispatch } from "react-redux";

const Activation: React.FC<RouteComponentProps<any>> = ({ history, match }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [timer, setTimer] = useState(3);

  useEffect(() => {
    let loop = setInterval(() => {
      setTimer(time => {
        if (time === 1) {
          clearInterval(loop);
          httpClient
            .post(
              END_POINT.API_USER_AUTH,
              verifyUserGQL({
                verificationId: match.params.verificationId
              })
            )
            .then((res: IVerifyUserGQL) => {
              if (!!res.data) {
                if (!!res.data.verifyUser) {
                  dispatch(
                    notify({
                      open: true,
                      message: `Your account has been activated.`,
                      type: "success"
                    })
                  );
                  history.push(
                    `${ROUTER.ROOT.path}/${ROUTER.ACCESS.path}/${ROUTER.LOGIN.path}`
                  );
                  return;
                }
                dispatch(
                  notify({
                    open: true,
                    message:
                      "It seems that some monkey skills was not qualified enough to hide all error!!",
                    type: "error"
                  })
                );
              } else {
                throw new Error("Something went wrong!");
              }
            })
            .catch((e: IAxiosErrorResponse) => {
              catchError("Something went wrong!", dispatch);
            });
        }
        return --time;
      });
    }, 1000);
  }, [setTimer, dispatch, history, match.params.verificationId]);

  return (
    <>
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.container}
      >
        <Grid item>
          <Typography variant="h6" component="h2">
            <Box textAlign="center" m={2}>
              You will be activated in {timer} second{timer > 1 ? "s" : ""}
            </Box>
          </Typography>
        </Grid>
      </Grid>
      <LinearProgress color="secondary" />
    </>
  );
};

export default Activation;
