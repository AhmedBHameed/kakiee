import React, { useCallback, SyntheticEvent, useMemo } from "react";
import { RouteComponentProps, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Content from "../components/content/content";
// import { IStore } from "../../models";
import { ROUTER } from "../../config";
import { resetAppState } from "../../@lib/store/kakiee/actions";
import { removeToken } from "../../@lib/util";
import NavbarAside from "../components/navbar-aside/navbar-aside";
import DashboardNavigation from "./dashboard-navigation/dashboard-navigation.page";
import { useStyle } from "./style.dashboard";
import MainDash from "./main/main.page";
import Articals from "./articals/articals.page";

type IDashboard = RouteComponentProps<any> & { handleToggleTheme: () => void };

const Dashboard: React.FC<IDashboard> = mainProps => {
  const classes = useStyle();
  const dispatch = useDispatch();
  // const currentUser = useSelector((state: IStore.IAppState) => state.userProfile);

  const handleLogout = useCallback(
    (e: SyntheticEvent) => {
      dispatch(resetAppState());
      removeToken("kakieeToken");
      return false;
    },
    [dispatch]
  );

  const memoRoutes = useMemo(
    () => (
      <>
        <Route
          path={`${mainProps.match.url}`}
          exact
          render={props => <MainDash {...props} />}
        />
        <Route
          path={`${mainProps.match.url}/${ROUTER.ARTICAL.path}/${ROUTER.NEW_ARTICAL.path}`}
          exact
          render={props => <Articals {...props} />}
        />
        <Route
          path={`${mainProps.match.url}/${ROUTER.ARTICAL.path}/${ROUTER.UPDATE_ARTICAL.path}/:articalId`}
          exact
          render={props => <Articals {...props} />}
        />
      </>
    ),
    [mainProps.match.url]
  );
  return (
    <NavbarAside
      menuComponent={
        <DashboardNavigation
          handleToggleTheme={mainProps.handleToggleTheme}
          handleLogout={handleLogout}
          {...mainProps}
        />
      }
      {...mainProps}
    >
      <Content
        classes={{
          container: classes.contentContainer
        }}
      >
        {memoRoutes}
      </Content>
    </NavbarAside>
  );
};

export default Dashboard;
