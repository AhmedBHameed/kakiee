import React, { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { get } from "lodash";
import MapGL, { Marker } from "react-map-gl";
import clsx from "clsx";
import { RouteComponentProps } from "react-router-dom";
// import { IFormValidation } from "../../../@lib/services/form-builder/models/form-builder-validation.model";
import { useGlobalStyle } from "../../../@lib/styles/lib.style";
import {
  Grid,
  FormControl,
  FormHelperText,
  TextField,
  Button,
  CircularProgress
} from "@material-ui/core";
import {
  useFormReducer,
  IAxiosErrorResponse,
  httpClient,
  catchError
} from "../../../@lib/services";
import { useStyle } from "./style.contact";
import { MyLocation, PhoneEnabled, Mail } from "@material-ui/icons";
import Service from "../../components/service/service";
import { useAppStyle } from "../../../styles/app.style";
import { sendMailGQL, ISendMailGQL } from "queries/send-mail";
import { END_POINT } from "config";
import { notify } from "../../../@lib/store/kakiee/actions";
import { specialChar } from "../../../@lib/util";
import { useTranslation } from "react-i18next";

const viewport = {
  width: "100%",
  height: 500,
  latitude: 48.17986781516112,
  longitude: 16.359264050177973,
  zoom: 14
};
const Contact: React.FC<RouteComponentProps<any>> = ({ history, match }) => {
  const gStyles = useGlobalStyle();
  const appStyles = useAppStyle();
  const classes = useStyle();
  const { t } = useTranslation();

  const [form] = useState({
    state: {
      name: "",
      subject: "",
      email: "",
      message: ""
    },
    validators: {
      name: {
        required: true,
        requiredLocales: t("validators.required")
      },
      email: {
        required: true,
        requiredLocales: t("validators.required"),
        validators: [
          {
            validate: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            error: t("validators.invalidEmail")
          }
        ]
      },
      subject: {
        required: true,
        requiredLocales: t("validators.required")
      },
      message: {
        required: true,
        requiredLocales: t("validators.required")
      }
    }
  });

  const dispatch = useDispatch();
  const [heightAxis, setHeightAxis] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const leftContainerEl = useRef<HTMLDivElement>(null);

  const { state, handleOnChange, handleOnSubmit } = useFormReducer(
    form.state,
    form.validators,
    (isValid, data) => sendMsg(isValid, data)
  );

  const sendMsg = (isValid: boolean, data: any) => {
    if (isValid) {
      setLoading(true);
      httpClient
        .post(
          END_POINT.API_GQL,
          sendMailGQL(
            specialChar(data, {
              clean: true,
              cleanFields: ["subject", "name", "message"]
            })
          )
        )
        .then((res: ISendMailGQL) => {
          setLoading(false);
          if (!!res.data) {
            if (!!res.data.sendMail) {
              dispatch(
                notify({
                  open: true,
                  message: res.data.sendMail.message,
                  type: "success"
                })
              );
              return;
            }
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

  // const _onMarkerDragEnd = event => {
  //   console.log("CHECK=>>: event", event);
  //   this._logDragEvent('onDragEnd', event);
  //   this.setState({
  //     marker: {
  //       longitude: event.lngLat[0],
  //       latitude: event.lngLat[1]
  //     }
  //   });
  // };

  useEffect(() => {
    setHeightAxis(() => {
      if (!!leftContainerEl && !!leftContainerEl.current) {
        return leftContainerEl.current.getBoundingClientRect().height;
      }
      return 0;
    });
  }, [leftContainerEl, setHeightAxis]);

  return (
    <>
      <div className={classes.infoContainer}>
        <Grid item xs={12} sm={4} className={classes.itemsSpacing}>
          <Service
            Icon={MyLocation}
            bodyTxt={`Wiedner Hauptstraße 141-143, Austria, Vienna.`}
            customClasses={{
              containerClass: classes.serviceCaptionTxt,
              bodyTxtClass: classes.serviceColorTxt
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4} className={classes.itemsSpacing}>
          <Service
            Icon={PhoneEnabled}
            bodyTxt={"+43 677-6276-8620"}
            customClasses={{
              containerClass: classes.serviceCaptionTxt,
              bodyTxtClass: classes.serviceColorTxt
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4} className={classes.itemsSpacing}>
          <Service
            Icon={Mail}
            bodyTxt={"contact.kakiee@gmail.com"}
            customClasses={{
              containerClass: classes.serviceCaptionTxt,
              bodyTxtClass: classes.serviceColorTxt
            }}
          />
        </Grid>
      </div>
      <form
        onSubmit={handleOnSubmit}
        className={clsx(
          appStyles.sectionSpacingAside,
          appStyles.sectionSpacingTop
        )}
      >
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={6} ref={leftContainerEl}>
            <FormControl className={gStyles.w100}>
              <TextField
                className={gStyles.noSpacing}
                autoFocus
                error={state.submitted && state.controllers.subject.inValid}
                id="subject"
                name="subject"
                type="subject"
                value={state.formData.subject}
                onChange={handleOnChange}
                variant="outlined"
                label="Subject"
                margin="none"
              />
              {/* <FormHelperText
              id="name"
              component={"div"}
              margin="dense"
              className={clsx([
                state.controllers.name.inValid ? classes.errorColor : ""
              ])}
            >
              <ul className={gStyles["padding-right-2"]}>
                {state.submitted &&
                  state.controllers.name.errors.map((error, i) => (
                    <li key={`name-error-${i.toString()}`}>
                      <small>{error}</small>
                    </li>
                  ))}
              </ul>
            </FormHelperText> */}
            </FormControl>
            <FormControl
              className={clsx([gStyles.w100, gStyles["margin-top-1"]])}
            >
              <TextField
                className={gStyles.noSpacing}
                error={state.submitted && state.controllers.name.inValid}
                id="name"
                name="name"
                type="name"
                value={state.formData.name}
                onChange={handleOnChange}
                variant="outlined"
                label="Name"
                margin="none"
              />
              {/* <FormHelperText
              id="name"
              component={"div"}
              margin="dense"
              className={clsx([
                state.controllers.name.inValid ? classes.errorColor : ""
              ])}
            >
              <ul className={gStyles["padding-right-2"]}>
                {state.submitted &&
                  state.controllers.name.errors.map((error, i) => (
                    <li key={`name-error-${i.toString()}`}>
                      <small>{error}</small>
                    </li>
                  ))}
              </ul>
            </FormHelperText> */}
            </FormControl>
            <FormControl
              className={clsx([gStyles.w100, gStyles["margin-top-1"]])}
            >
              {/* <InputLabel
            htmlFor="email"
            className={clsx([
              state.submitted && state.controllers.email.inValid
                ? classes.errorColor
                : "",
              classes.label
            ])}
          >
            Name
          </InputLabel> */}
              <TextField
                error={state.submitted && state.controllers.email.inValid}
                id="email"
                name="email"
                type="email"
                value={state.formData.email}
                onChange={handleOnChange}
                label="Email"
                variant="outlined"
                margin="none"
              />

              {/* <FormHelperText
              id="email"
              component={"div"}
              margin="dense"
              className={clsx([
                state.controllers.email.inValid ? classes.errorColor : ""
              ])}
            >
              <ul className={gStyles["padding-right-2"]}>
                {state.submitted &&
                  state.controllers.email.errors.map((error, i) => (
                    <li key={`email-error-${i.toString()}`}>
                      <small>{error}</small>
                    </li>
                  ))}
              </ul>
            </FormHelperText> */}
            </FormControl>
          </Grid>

          <Grid
            item
            xs={6}
            style={{
              height: `${heightAxis}px`
            }}
          >
            <FormControl className={clsx(gStyles.w100, gStyles.h100)}>
              {/* <InputLabel
            htmlFor="email"
            className={clsx([
              state.submitted && state.controllers.email.inValid
                ? classes.errorColor
                : "",
              classes.label
            ])}
          >
            Name
          </InputLabel> */}
              <TextField
                // inputProps={{
                //   ref: textareaEl
                // }}
                error={state.submitted && state.controllers.message.inValid}
                id="message"
                name="message"
                type="message"
                value={state.formData.message}
                onChange={handleOnChange}
                label="Message"
                variant="outlined"
                multiline
                rows="9"
                className={clsx(gStyles.h100, gStyles.noSpacing)}
                InputProps={{
                  classes: { root: clsx(gStyles.h100, classes.overflowHidden) }
                }}
                // defaultValue=""
              />
              {/* <FormHelperText
              id="email"
              component={"div"}
              margin="dense"
              className={clsx([
                state.controllers.email.inValid ? classes.errorColor : ""
              ])}
            >
              <ul className={gStyles["padding-right-2"]}>
                {state.submitted &&
                  state.controllers.message.errors.map((error, i) => (
                    <li key={`message-error-${i.toString()}`}>
                      <small>{error}</small>
                    </li>
                  ))}
              </ul>
            </FormHelperText> */}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl className={gStyles.w100}>
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                className={gStyles.w100}
              >
                <span>Send</span>
                {loading && (
                  <CircularProgress
                    className={classes.circulProgressColor}
                    size={30}
                    thickness={5}
                  />
                )}
              </Button>

              <FormHelperText
                id="email"
                component={"div"}
                margin="dense"
                className={classes.errorColor}
              >
                <ul className={gStyles["padding-right-2"]}>
                  {state.submitted &&
                  [
                    ...state.controllers.email.errors,
                    ...state.controllers.name.errors,
                    ...state.controllers.message.errors,
                    ...state.controllers.subject.errors
                  ].some(
                    error => error.indexOf(t("validators.required")) > -1
                  ) ? (
                    <li>
                      <small>{t("validators.allRequired")}</small>
                    </li>
                  ) : (
                    ""
                  )}

                  {state.submitted &&
                    [
                      ...state.controllers.email.errors,
                      ...state.controllers.name.errors,
                      ...state.controllers.message.errors,
                      ...state.controllers.subject.errors
                    ].map((error, i) => {
                      if (error.indexOf(t("validators.required")) > -1)
                        return "";
                      return (
                        <li key={`email-error-${i.toString()}`}>
                          <small>{error}</small>
                        </li>
                      );
                    })}
                </ul>
              </FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
      </form>
      {/* <div style={{ height: "500px", width: "100%" }}> */}
      <MapGL
        className={appStyles.sectionSpacingTop}
        mapboxApiAccessToken={process.env.REACT_APP_MAP_KEY}
        {...viewport}
        // onViewportChange={setViewport}
        // zoom={viewport.viewport.zoom}
        width="100%"
        height="500px"
        // mapStyle="mapbox://styles/mapbox/dark-v9"
      >
        <Marker
          longitude={viewport.longitude}
          latitude={viewport.latitude}
          offsetTop={-20}
          offsetLeft={-10}
          draggable
          // onDragStart={this._onMarkerDragStart}
          // onDrag={this._onMarkerDrag}
          // onDragEnd={_onMarkerDragEnd}
        >
          <svg
            height={20}
            viewBox="0 0 24 24"
            style={{
              fill: "#d00",
              stroke: "none"
            }}
          >
            <path
              d={`M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`}
            />
          </svg>
        </Marker>
      </MapGL>
    </>
  );
};

export default Contact;
