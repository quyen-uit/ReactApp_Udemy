import { Photo } from './../models/Profile';
import { makeAutoObservable, runInAction, reaction } from 'mobx';
import agent from '../api/agent';
import { Profile } from "../models/Profile";
import { store } from './store';
import { ProfileUpdateFormValues } from '../models/ProfileUpdateFormValues';

export default class ProfileStore {
    profile: Profile | null = null;
    loadingProfile = false;
    uploading: boolean = false;
    followings: Profile[] = [];
    loadingFollowing: boolean = false;
    loadingBtnFollow: boolean = false;
    activeTab: number = 0;


    constructor() {
        makeAutoObservable(this);

        reaction(
            () => this.activeTab,
            activeTab => {
                if (activeTab === 3 || activeTab === 4) {
                    const predicate = activeTab === 3 ? 'followers' : 'followings';
                    this.loadFollowings(predicate);
                } else {
                    this.followings = [];
                }
            }
        )
    }

    get isCurrentUser() {
        if (store.userStore.user && this.profile) {
            return store.userStore.user.userName === this.profile.userName;
        }
        return false;
    }

    loadProfile = async (username: string) => {
        this.loadingProfile = true;
        try {
            const profile = await agent.Profiles.get(username);
            runInAction(() => {
                this.profile = profile;
                this.loadingProfile = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingProfile = false);
        }
    }

    uploadPhoto = async (file: Blob) => {
        this.uploading = true;

        try {
            const response = await agent.Profiles.uploadPhoto(file);
            const photo = response.data;
            runInAction(() => {
                if (this.profile) {
                    this.profile.photos?.push(photo);
                    if (photo.isMain && store.userStore.user) {
                        store.userStore.setImage(photo.url);
                        this.profile.image = photo.url;
                    }
                };
                this.uploading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.uploading = false);
        }
    }

    setMainPhoto = async (photo: Photo) => {
        this.uploading = true;

        try {
            await agent.Profiles.setMainPhoto(photo.id);
            store.userStore.setImage(photo.url);
            runInAction(() => {
                if (this.profile && this.profile.photos) {
                    this.profile.photos.find(x => x.isMain)!.isMain = false;
                    this.profile.photos.find(x => x.id === photo.id)!.isMain = true;
                    this.profile.image = photo.url;
                }
                this.uploading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.uploading = false);
        }
    }

    deletePhoto = async (photo: Photo) => {
        this.uploading = true;

        try {
            await agent.Profiles.deletePhoto(photo.id);
            runInAction(() => {
                if (this.profile) {
                    this.profile.photos = this.profile.photos?.filter(p => p.id !== photo.id);
                }
                this.uploading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.uploading = false);
        }
    }

    updateProfile = async (profileForm: ProfileUpdateFormValues) => {
        this.loadingProfile = false;
        try {
            await agent.Profiles.updateProfile(profileForm);
            if (this.profile) {
                let profileUpdate = { ...this.profile, ...profileForm };
                this.profile = profileUpdate as Profile;
            }
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingProfile = false);
        }

    }

    updateFollowing = async (username: string, following: boolean) => {
        this.loadingBtnFollow = false;
        try {
            await agent.Profiles.updateFollowing(username);
            store.activityStore.updateFollowing(username);
            runInAction(() => {
                if (this.profile && this.profile.userName !== store.userStore.user?.userName && this.profile.userName === username) {
                    following ? this.profile.followersCount++ : this.profile.followersCount--;
                    this.profile.following = !this.profile.following;
                }

                if (this.profile && this.profile.userName === store.userStore.user?.userName) {
                    following ? this.profile.followingsCount++ : this.profile.followingsCount--;
                }
                this.followings.forEach(profile => {
                    if (profile.userName === username) {
                        profile.following ? profile.followersCount-- : profile.followersCount++;
                        profile.following = !profile.following;
                    }
                })
                this.loadingBtnFollow = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingBtnFollow = false);
        }
    }

    loadFollowings = async (predicate: string) => {
        this.loadingFollowing = true;
        try {
            runInAction(async () => {
                this.followings = await agent.Profiles.listFollowings(this.profile!.userName, predicate);
                this.loadingFollowing = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingFollowing = false);
        }
    }

    setActiveTab = (activeTab: any) => {
        runInAction(() => this.activeTab = activeTab);
    }
}

