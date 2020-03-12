import React, { useCallback, SyntheticEvent } from "react";
import { RouteComponentProps, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Content from "../components/content/content";
import { IInitAppState } from "../../@lib/store/kakiee/rootReducer";
import { ROUTER } from "../../config";
import { resetAppState } from "../../@lib/store/kakiee/actions";
import { removeToken } from "../../@lib/util";
import NavbarAside from "../components/navbar-aside/navbar-aside";
import DashboardNavigation from "./dashboard-navigation/dashboard-navigation.page";
import { useStyle } from "./style.dashboard";
import MainDash from "./main/main.page";
import Articals from "./articals/articals.page";

const Dashboard: React.FC<RouteComponentProps<any>> = mainProps => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: IInitAppState) => state.userProfile);

  const handleLogout = useCallback(
    (e: SyntheticEvent) => {
      dispatch(resetAppState());
      removeToken("kakieeToken");
      return false;
    },
    [dispatch]
  );

  return (
    <NavbarAside
      menuComponent={
        <DashboardNavigation handleLogout={handleLogout} {...mainProps} />
      }
      {...mainProps}
    >
      <Content
        classes={{
          container: classes.contentContainer
        }}
      >
        <Route
          path={`${mainProps.match.path}`}
          exact
          render={props => <MainDash {...props} />}
        />
        <Route
          path={`${mainProps.match.path}/${ROUTER.NEWARTICAL.path}`}
          exact
          render={props => <Articals {...props} />}
        />
      </Content>
    </NavbarAside>
  );
};

export default Dashboard;
