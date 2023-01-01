import { runInAction } from "mobx";
import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { User } from "../models/User";
import { UserFormValues } from "../models/UserFormValues";
import { store } from "./store";
import { router } from "../router/Routes";

export default class UserStore {
  user: User | null = null;
  fbLoading: boolean = false;
  refreshTimeout: any;
  constructor() {
    makeAutoObservable(this);
  }
  get isLoggedIn() {
    return !!this.user;
  }

  setImage(image: string) {
    if (this.user) return (this.user.image = image);
  }

  login = async (creds: UserFormValues) => {
    try {
      const user = await agent.Account.login(creds);
      store.commonStore.setToken(user.token);
      this.startRefreshTokenTimer(user);
      runInAction(() => {
        this.user = user;
      });
      router.navigate("/activities");
      store.modalStore.closeModal();
    } catch (err) {
      throw err;
    }
  };

  logout = () => {
    store.commonStore.setToken(null);
    window.localStorage.removeItem("jwt");
    this.user = null;
    router.navigate("/");
  };

  getUser = async () => {
    try {
      const user = await agent.Account.current();
      runInAction(() => (this.user = user));
      this.startRefreshTokenTimer(user);
    } catch (err) {
      console.log(err);
    }
  };

  register = async (creds: UserFormValues) => {
    try {
      const user = await agent.Account.register(creds);
      store.commonStore.setToken(user.token);
      this.startRefreshTokenTimer(user);
      runInAction(() => {
        this.user = user;
      });
      router.navigate("/activities");
      store.modalStore.closeModal();
    } catch (err) {
      throw err;
    }
  };

  setDisplayName = (displayname: string) => {
    runInAction(() => {
      if (this.user) {
        this.user.displayName = displayname;
      }
    });
  };

  loginFacebook = async (accessToken: string) => {
    try {
      this.fbLoading = true;
      const user = await agent.Account.fbLogin(accessToken);
      store.commonStore.setToken(user.token);
      this.startRefreshTokenTimer(user);
      runInAction(() => {
        this.user = user;
        this.fbLoading = false;
      });
    } catch (error) {
      console.log(error);
    }
  };

  refreshToken = async () => {
    this.stopRefreshTokenTimer();
    try {
      const user = await agent.Account.refreshToken();
      runInAction(() => this.user = user);
      store.commonStore.setToken(user.token);
      this.startRefreshTokenTimer(user);
    } catch (error) {
      console.log(error)
    }
  }

  private startRefreshTokenTimer(user: User) {
    const jwtToken = JSON.parse(atob(user.token.split('.')[1]));
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (30 * 1000);
    console.log(timeout)
    this.refreshTimeout = setTimeout(this.refreshToken, timeout);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTimeout);
  }
}
