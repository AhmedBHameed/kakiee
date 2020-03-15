import React, { useState, useCallback } from "react";
import clsx from "clsx";
import { RouteComponentProps } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ReactMde from "react-mde";
import {
  Typography,
  Grid,
  FormControl,
  TextField,
  CircularProgress,
  Button,
  FormHelperText,
  Checkbox,
  FormControlLabel
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useFormReducer, IFormValidation } from "@lib/services";
import { useGlobalStyle } from "../../../@lib/styles/lib.style";
import { useStyle } from "./style.articals";
import { converter } from "./config";
import { specialChar } from "../../../@lib/util";
import { useAppStyle } from "../../../styles/app.style";
import "highlight.js/scss/github.scss";
import "./artical.scss";
import { useEffect } from "react";

const Articals: React.FC<RouteComponentProps<any>> = props => {
  const { t } = useTranslation();
  const gStyles = useGlobalStyle();
  const appStyles = useAppStyle();
  const classes = useStyle();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([{ title: "JS", year: "001" }]);
  const [selectedTab, setSelectedTab] = React.useState<"write" | "preview">(
    "write"
  );

  const [form] = useState<{ state: any; validators: IFormValidation }>({
    state: {
      subject: "",
      artical: `**Write your artical here**`,
      publish: false,
      categories: []
    },
    validators: {
      subject: {
        required: true,
        requiredLocales: t("validators.required")
      },
      artical: {
        required: true,
        requiredLocales: t("validators.required")
      },
      categories: {
        validators: [
          {
            validate: v => Array.isArray(v.categories) && !!v.categories.length,
            error: t("validators.required")
          }
        ]
      }
    }
  });

  const handleTagsChange = useCallback((_, value: any) => {
    handleOnChange({
      target: {
        name: "categories",
        value
      }
    });
  }, []);

  const { state, handleOnChange, handleOnSubmit } = useFormReducer(
    form.state,
    form.validators,
    (isValid, data) => {
      // let newData = specialChar(data, {
      //   clean: true,
      //   cleanFields: ["subject", "artical"]
      // });
      console.log(isValid, data);
    }
  );

  useEffect(() => {
    console.log("CALLED!");
    setTimeout(() => {
      setCategories(s => {
        s.push({ title: "CSS", year: "002" });
        return [...s];
      });
    }, 2000);
  }, [setCategories]);

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="flex-start"
      spacing={2}
      className={classes.whiteTxt}
    >
      <Typography variant="h4" display="block" gutterBottom>
        New artical
      </Typography>
      <Typography variant="subtitle1" display="block" gutterBottom>
        Create a new artical with love and motivation.
      </Typography>
      <form
        onSubmit={handleOnSubmit}
        className={clsx(gStyles.w100, gStyles["margin-top-2"])}
      >
        <Grid item xs={12}>
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
              size="small"
              InputLabelProps={{
                classes: {
                  root: appStyles.fieldsLabelColor,
                  focused: appStyles.fieldsLabelColor
                }
              }}
              InputProps={{
                classes: { root: appStyles.fieldsBackground }
              }}
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
        </Grid>
        <Grid item xs={12}>
          <FormControl className={clsx(gStyles.w100, gStyles["margin-top-2"])}>
            <Autocomplete
              multiple
              id="size-small-outlined-multi"
              size="small"
              disableCloseOnSelect
              options={categories}
              getOptionLabel={option => option.title}
              value={state.formData.categories}
              onChange={handleTagsChange}
              renderOption={(option, { selected }) => (
                <>
                  <Checkbox style={{ marginRight: 8 }} checked={selected} />
                  {option.title + ` ${JSON.stringify(selected)}`}
                </>
              )}
              renderInput={params => (
                <TextField
                  {...params}
                  className={appStyles.fieldsBackground}
                  variant="outlined"
                  label="Artical category"
                  placeholder="Category"
                  InputLabelProps={{
                    classes: {
                      root: appStyles.fieldsLabelColor,
                      focused: appStyles.fieldsLabelColor
                    }
                  }}
                />
              )}
              classes={{
                input: appStyles.fieldsBackground
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl className={clsx(gStyles.w100, gStyles["margin-top-2"])}>
            <ReactMde
              // getIcon={(commandName) => <MyCustomIcon name={commandName} />}
              value={state.formData.artical}
              onChange={(value: string) =>
                handleOnChange({
                  target: {
                    name: "artical",
                    value
                  }
                })
              }
              minEditorHeight={350}
              selectedTab={selectedTab}
              onTabChange={setSelectedTab}
              generateMarkdownPreview={markdown =>
                Promise.resolve(converter.makeHtml(markdown))
              }
              classes={{
                textArea: clsx(appStyles.fieldsBackground, classes.whiteTxt)
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl className={clsx(gStyles.w100, gStyles["margin-top-2"])}>
            <FormControlLabel
              control={
                <Checkbox
                  // checked={gilad}
                  value={state.formData.publish}
                  name="publish"
                  onChange={handleOnChange}
                />
              }
              label="Publish"
            />
            <FormHelperText>
              Publish means the artical will become public for all!
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl className={clsx(gStyles.w100, gStyles["margin-v-2"])}>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              className={gStyles.w100}
            >
              <span>Save</span>
              {loading && (
                <CircularProgress
                  className={classes.circulProgressColor}
                  size={30}
                  thickness={5}
                />
              )}
            </Button>
          </FormControl>
        </Grid>
      </form>
    </Grid>
  );
};

export default Articals;
