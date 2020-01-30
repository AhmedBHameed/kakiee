import { graphty } from "@lib/services/graphty/graphty.service";

interface IBaseErrorResponse {
  extensions: {
    code: string;
    exception: {
      stacktrace: any[];
    };
  };
  message: string;
}
interface IBaseQueryResponse<T> {
  data: T;
  errors?: IBaseErrorResponse[];
}

/**
 * Response model of
 * getToken
 */
interface IGetToken {
  getToken: {
    token: string;
    isAdmin: string;
    isAuthenticated: string;
  };
}
export type IGetTokenGQL = IBaseQueryResponse<IGetToken>;
export const getTokenGQL = (data: any) =>
  graphty.stagnation({
    fun: {
      name: "getToken", // required field and should be always string
      args: {
        email: data.email,
        password: data.password
      } // args is optional also it is auto detected when string inserted.
    },
    ret: ["token", "isAdmin", "isAuthenticated"]
  });

interface IChangePass {
  changePass: {
    message: string;
  };
}
export type IChangePassGQL = IBaseQueryResponse<IChangePass>;
export const changePassGQL = (data: any) =>
  graphty.mutation({
    fun: {
      name: "changePass",
      args: {
        verificationId: data.verificationId,
        password: data.password
      }
    },
    ret: ["message"]
  });

interface IForgetPass {
  forgetPass: {
    message: string;
  };
}
export type IForgetPassGQL = IBaseQueryResponse<IForgetPass>;
export const forgetPassGQL = (data: any) =>
  graphty.mutation({
    fun: {
      name: "forgetPass", // required field and should be always string
      args: data
    },
    ret: ["message"]
  });

interface IUser {
  id: string;
  email: string;
  status: string;
  isSuper: boolean;
  imageUrl: string;
  name?: {
    first: string;
    last: string;
  };
  createdAt: string;
  updatedAt: string;
}
/**
 * Response model of
 * checkToken
 */
interface ICheckTokenAndCurrentUser {
  currentUser: IUser;
  checkToken: {
    isAuthenticated: boolean;
    isAdmin: boolean;
  };
}
export type ICheckTokenAndCurrentUserGQL = IBaseQueryResponse<
  ICheckTokenAndCurrentUser
>;
export const checkTokenAndCurrentUserGQL = () => {
  return graphty.combine([
    graphty.stagnation({
      fun: {
        name: "currentUser"
      },
      ret: [
        "id",
        "email",
        "status",
        "imageUrl",
        "isSuper",
        graphty.stagnation({
          fun: {
            name: "name"
          },
          ret: ["first", "last"]
        })
      ]
    }),
    graphty.stagnation({
      fun: {
        name: "checkToken"
      },
      ret: ["isAuthenticated", "isAdmin"]
    })
  ]);
};

interface IAllUser {
  totalUsers: number;
  users: IUser;
}
export type IAllUsersGQL = IBaseQueryResponse<IAllUser>;
export const allUsersGQL = conf => {
  const usersQuery = graphty.stagnation({
    fun: {
      name: "users",
      args: {
        page: conf.page || 0,
        usersPerPage: conf.rowsPerPage || 20
      }
    },
    ret: [
      "id",
      "email",
      "status",
      "imageUrl",
      "isSuper",
      "createdAt",
      "updatedAt",
      graphty.stagnation({
        fun: {
          name: "name"
        },
        ret: ["first", "last"]
      })
    ]
  });

  return !conf.page
    ? graphty.combine([
        graphty.stagnation({
          fun: {
            name: "totalUsers"
          },
          ret: []
        }),
        usersQuery
      ])
    : usersQuery;
};

interface IUpdateUser {
  updateUser: IUser;
}
export type IUpdateUserGQL = IBaseQueryResponse<IUpdateUser>;
export const updateUserGQL = (data: any) => {
  return graphty.mutation({
    fun: {
      name: "updateUser",
      args: {
        id: data.id,
        email: data.email,
        isSuper: !!data.isSuper,
        imageUrl: data.imageUrl,
        status: data.status,
        firstname: data.firstName,
        lastname: data.lastName
      }
    },
    ret: [
      "id",
      "email",
      "status",
      "imageUrl",
      "isSuper",
      "createdAt",
      "updatedAt",
      graphty.stagnation({
        fun: {
          name: "name"
        },
        ret: ["first", "last"]
      })
    ]
  });
};

interface IAddUser {
  addUser: IUser;
}
export type IAddUserGQL = IBaseQueryResponse<IAddUser>;
export const addUserGQL = (data: any) => {
  return graphty.mutation({
    fun: {
      name: "addUser",
      args: {
        email: data.email,
        isSuper: !!data.isSuper,
        imageUrl: data.imageUrl,
        status: data.status,
        password: data.password,
        firstname: data.firstName,
        lastname: data.lastName
      }
    },
    ret: [
      "id",
      "email",
      "status",
      "imageUrl",
      "isSuper",
      "createdAt",
      "updatedAt",
      graphty.stagnation({
        fun: {
          name: "name"
        },
        ret: ["first", "last"]
      })
    ]
  });
};

interface IRegisterUser {
  registerUser: IUser;
}
export type IRegisterUserGQL = IBaseQueryResponse<IRegisterUser>;

export const registerUserGQL = (data: any) => {
  return graphty.mutation({
    fun: {
      name: "registerUser",
      args: {
        email: data.email,
        password: data.password
      }
    },
    ret: ["id", "email"]
  });
};

interface IVerifyUser {
  verifyUser: IUser;
}
export type IVerifyUserGQL = IBaseQueryResponse<IVerifyUser>;

export const verifyUserGQL = (data: any) => {
  return graphty.mutation({
    fun: {
      name: "verifyUser",
      args: {
        verificationId: data.verificationId
      }
    },
    ret: ["id", "email"]
  });
};

interface IDeleteUser {
  addUser: IUser;
}
export type IDeleteUserGQL = IBaseQueryResponse<IDeleteUser>;

export const deleteUserGQL = (data: any) => {
  return graphty.mutation({
    fun: {
      name: "deleteUser",
      args: {
        id: data.id
      }
    },
    ret: ["id"]
  });
};

export interface IAsylumProfile {
  id: string;
  email?: string;
  gender: string;
  firstName: string;
  lastName: string;
  imageUrl?: string;
  appliedAt: string;
  about: string;
  acceptTerms: boolean;
  verified?: boolean;
  isAdmin?: boolean;
  createdAt?: string;
  updatedAt?: string;
  city?: string;
  country?: string;
  address?: string;
  rejectedNum?: number;
  childrenNum?: number;
}

export type IAsylumProfileGQL = IBaseQueryResponse<{
  asylumUser: IAsylumProfile;
}>;

export const asylumProfileGQL = () => {
  return graphty.stagnation({
    fun: {
      name: "asylumUser"
    },
    ret: [
      "id",
      "email",
      "country",
      "city",
      "address",
      "firstName",
      "lastName",
      "gender",
      "imageUrl",
      "appliedAt",
      "acceptTerms",
      "verified",
      "isAdmin",
      "rejectedNum",
      "childrenNum",
      "about",
      "createdAt",
      "updatedAt"
    ]
  });
};

export type IAsylumApplicationsGQL = IBaseQueryResponse<{
  totalApplicants: number;
  asylumUsers?: IAsylumProfile[];
  asylumApplicationSearch?: IAsylumProfile[];
}>;

export const asylumApplicationsGQL = conf => {
  const asylumUsers = graphty.stagnation({
    fun: {
      name: "asylumUsers",
      args: {
        page: conf.page || 0,
        usersPerPage: conf.rowsPerPage || 20
      }
    },
    ret: [
      "id",
      "email",
      "country",
      "city",
      "address",
      "firstName",
      "lastName",
      "gender",
      "imageUrl",
      "appliedAt",
      "acceptTerms",
      "verified",
      "isAdmin",
      "rejectedNum",
      "childrenNum",
      "about",
      "createdAt",
      "updatedAt"
    ]
  });

  return !conf.page
    ? graphty.combine([
        graphty.stagnation({
          fun: {
            name: "totalApplicants"
          },
          ret: []
        }),
        asylumUsers
      ])
    : asylumUsers;
};

export const asylumApplicationSearchGQL = search =>
  graphty.stagnation({
    fun: {
      name: "asylumApplicationSearch",
      args: {
        search
      }
    },
    ret: [
      "id",
      "email",
      "country",
      "city",
      "address",
      "firstName",
      "lastName",
      "gender",
      "imageUrl",
      "appliedAt",
      "acceptTerms",
      "verified",
      "isAdmin",
      "rejectedNum",
      "childrenNum",
      "about",
      "createdAt",
      "updatedAt"
    ]
  });

export type IUpdateAsylumProfileGQL = IBaseQueryResponse<{
  updateAsylumUser: IAsylumProfile;
}>;

export const updateAsylumProfileGQL = (data: any) => {
  return graphty.mutation({
    fun: {
      name: "updateAsylumUser",
      args: data
    },
    ret: [
      "id",
      "email",
      "country",
      "city",
      "address",
      "firstName",
      "lastName",
      "gender",
      "imageUrl",
      "appliedAt",
      "acceptTerms",
      "verified",
      "isAdmin",
      "rejectedNum",
      "childrenNum",
      "about",
      "createdAt",
      "updatedAt"
    ]
  });
};

export interface IAsylumSettings {
  id: string;
  terms: string;
  isProfileEditable: boolean;
  createdAt?: string;
  updatedAt?: string;
}
export type IAsylumSettingsGQL = IBaseQueryResponse<{
  asylumSettings: IAsylumSettings;
}>;

export const asylumSettingsGQL = () => {
  return graphty.stagnation({
    fun: {
      name: "asylumSettings"
    },
    ret: ["id", "terms", "isProfileEditable", "createdAt", "updatedAt"]
  });
};

export type IPatchAsylumSettingsGQL = IBaseQueryResponse<{
  updateAsylumSettings: IAsylumSettings;
}>;

export const patchAsylumSettingsGQL = (data: IAsylumSettings) => {
  return graphty.mutation({
    fun: {
      name: "updateAsylumSettings",
      args: {
        id: data.id,
        terms: data.terms,
        isProfileEditable: data.isProfileEditable
      }
    },
    ret: ["terms", "isProfileEditable", "createdAt", "updatedAt"]
  });
};

/**
 * API interfaces
 */
export interface IFileLogsAPI {
  file: {
    event?: string;
    headers?: any;
    label?: string;
    level?: string;
    message?: string;
    request?: any;
    respond?: any;
    timestamp?: string;
  };
}
