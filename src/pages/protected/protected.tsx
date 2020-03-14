import React, { useEffect, useState } from "react";
import { Route, RouteComponentProps } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "../../@lib/store/kakiee/actions";
import { IStore } from "../../models";
import { IProtectedOpt } from "../../@lib/store/kakiee/reducers";
import { RenderComponent } from "./protected.conf";

type FCProps = {
  importedComponent: Promise<any>;
  onFailRedirectTo: string;
} & RouteComponentProps<any>;

const Protected: React.FC<FCProps> = ({
  match,
  importedComponent,
  onFailRedirectTo
}) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state: IStore.IAppState) => state.userProfile
  );

  const [protectionOpt, setProtectionOpt] = useState<IProtectedOpt>({
    isRequestFetched: false,
    isAdmin: false,
    onFailRedirectTo
  });

  useEffect(() => {
    !currentUser.id
      ? dispatch(fetchCurrentUser(setProtectionOpt))
      : setProtectionOpt(s => ({
          ...s,
          isRequestFetched: true,
          isAdmin: !!currentUser.isAdmin
        }));
  }, [dispatch, setProtectionOpt, currentUser.id, currentUser.isAdmin]);

  return (
    <Route
      path={match.url}
      render={props =>
        RenderComponent(
          importedComponent,
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
