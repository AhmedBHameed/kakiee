import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "../../@lib/store/kakiee/actions";
import { IInitAppState } from "../../@lib/store/kakiee/rootReducer";
import { IProtectedOpt } from "../../@lib/store/kakiee/reducers";
import { RenderComponent } from "./protected.conf";

type FCProps = {
  path: string;
  component: any;
  onFailRedirectTo: string;
};

const Protected: React.FC<FCProps> = ({
  path,
  component,
  onFailRedirectTo
}) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: IInitAppState) => state.userProfile);

  const [protectionOpt, setProtectionOpt] = useState<IProtectedOpt>({
    isRequestFetched: false,
    isAdmin: false,
    onFailRedirectTo
  });

  useEffect(() => {
    if (!currentUser.id) {
      dispatch(fetchCurrentUser(setProtectionOpt));
    }
  }, [dispatch, setProtectionOpt, currentUser.id]);

  return (
    <Route
      path={path}
      render={props =>
        RenderComponent(
          component,
          {
            ...props
          },
          protectionOpt
        )
      }
    />
  );
};

export default Protected;
