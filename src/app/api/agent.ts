import { Profile } from "./../models/Profile";
import { store } from "./../stores/store";
import { Activity, ActivityFormvalues } from "./../models/Activity";
import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { User } from "../models/User";
import { UserFormValues } from "../models/UserFormValues";
import { router } from "../router/Routes";
import { ProfileUpdateFormValues } from "../models/ProfileUpdateFormValues";
import { PaginatedResult } from "../models/Pagination";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use((config) => {
  const token = store.commonStore.token;
  if (token) {
    config.headers!.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    const pagination = response.headers["pagination"];
    if (pagination) {
      response.data = new PaginatedResult(
        response.data,
        JSON.parse(pagination)
      );
      return response as AxiosResponse<PaginatedResult<any>>;
    }
    return response;
  },
  (error) => {
    const { data, status, config } = error.response!;
    switch (status) {
      case 400:
        if (typeof data == "string") {
          toast.error(data);
        }
        if (config.method === "get" && data.errors.hasOwnProperty("id")) {
          router.navigate("/notfound");
        }
        if (data.errors) {
          const listErrors: any[] = [];
          for (const item in data.errors) {
            if (data.errors[item]) {
              listErrors.push(data.errors[item]);
            }
          }
          throw listErrors.flat();
        }

        break;
      case 401:
        toast.error("unauthorize");
        break;
      case 404:
        router.navigate("/notfound");
        break;
      case 500:
        store.commonStore.setServerError(data);
        router.navigate("/server-error");

        toast.error("server error");
        break;
    }
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Activities = {
  list: (params: URLSearchParams) =>
    axios
      .get<PaginatedResult<Activity[]>>("/activity", { params })
      .then(responseBody),
  details: (id: string) => requests.get<Activity>(`/activity/${id}`),
  create: (activity: ActivityFormvalues) =>
    requests.post<void>("/activity", activity),
  update: (activity: ActivityFormvalues) =>
    requests.put<void>(`/activity/${activity.id}`, activity),
  delete: (id: string) => requests.delete<void>(`/activity/${id}`),
  attend: (id: string) => requests.post<void>(`/activity/${id}/attend`, {}),
};

const Account = {
  current: () => requests.get<User>("/account"),
  login: (user: UserFormValues) => requests.post<User>("/account/login", user),
  register: (user: UserFormValues) =>
    requests.post<User>("/account/register", user),
  fbLogin: (accessToken: string) =>
    requests.post<User>(`/account/fbLogin?accessToken=${accessToken}`, {}),
};

const Profiles = {
  get: (username: string) => requests.get<Profile>(`/profile/${username}`),
  getEvents: (username: string, predicate: string) =>
    requests.get<Activity[]>(
      `/profile/${username}/activities?predicate=${predicate}`
    ),
  uploadPhoto: (file: Blob) => {
    let formData = new FormData();
    console.log(file);
    formData.append("File", file);
    return axios.post("photo", formData, {
      headers: { "Content-type": "multipart/form-data" },
    });
  },
  setMainPhoto: (id: string) => requests.put(`/photo/setMain/${id}`, {}),
  deletePhoto: (id: string) => requests.delete(`/photo/${id}`),
  updateProfile: (profile: ProfileUpdateFormValues) =>
    requests.put(`/profile`, profile),
  updateFollowing: (username: string) =>
    requests.post(`/follow/${username}`, {}),
  listFollowings: (username: string, predicate: string) =>
    requests.get<Profile[]>(`/follow/${username}?predicate=${predicate}`),
};

const agent = {
  Activities,
  Account,
  Profiles,
};
export default agent;
