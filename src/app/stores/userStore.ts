import { runInAction } from 'mobx';
import { makeAutoObservable } from 'mobx';
import agent from '../api/agent';
import { User } from "../models/User";
import { UserFormValues } from "../models/UserFormValues";
import { store } from './store';
import { router } from '../router/Routes';
import { ProfileUpdateFormValues } from '../models/ProfileUpdateFormValues';

export default class UserStore {
    user: User | null = null;

    constructor() {
        makeAutoObservable(this);
    }
    get isLoggedIn() {
        return !!this.user;
    }

    setImage(image: string) {
        if (this.user)
            return this.user.image = image;
    }

    login = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => { this.user = user; });
            router.navigate('/activities');
            store.modalStore.closeModal();
        } catch (err) {
            throw err;
        }
    }

    logout = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user = null;
        router.navigate('/');
    }

    getUser = async () => {
        try {
            const user = await agent.Account.current();
            runInAction(() => this.user = user);
        } catch (err) {
            console.log(err);
        }
    }

    register = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.register(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => { this.user = user; });
            router.navigate('/activities');
            store.modalStore.closeModal();
        } catch (err) {
            throw err;
        }
    }

    setDisplayName =  (displayname: string) => {
        runInAction(() => {
            if (this.user) {
                this.user.displayName = displayname;
            }
        })
    }
}