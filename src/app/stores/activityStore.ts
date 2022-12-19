import { ActivityFormvalues } from './../models/Activity';
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/Activity"; import { format } from "date-fns";
import { store } from "./store";
import { Profile } from "../models/Profile";
import { router } from '../router/Routes';

export default class ActivityStore {
    // activities: Activity[] = [];
    activityMap = new Map<string, Activity>();

    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loadingInitial = false;
    submitting = false;

    constructor() {
        makeAutoObservable(this);
    }

    get activitiesByDate() {
        return Array.from(this.activityMap.values()).sort((a, b) => a.date!.getTime() - b.date!.getTime());
    }

    get groupedActivities() {
        return Object.entries(
            this.activitiesByDate.reduce((activities, activity) => {
                const date = format(activity.date!, "dd MMM yyyy");
                // activity.attendees.map(attendee => attendee = {...{ ...activity }});
                activities[date] = activities[date] ? [...activities[date], activity] : [activity]
                // console.log(...{ ...activity }.attendees);
                return activities;
            }, {} as { [key: string]: Activity[] })
        )
    }
    private getActivity = (id: string) => {
        return this.activityMap.get(id);
    }
    loadActivities = async () => {
        this.setLoadingInitial(true);

        try {
            const activities = await agent.Activities.list();
            runInAction(() => {
                activities.forEach((item) => {
                    this.setActivity(item);
                    this.activityMap.set(item.id, item);
                });
                this.setLoadingInitial(false);
            })
        } catch (err) {
            console.log(err);
            this.setLoadingInitial(false);
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    loadActivity = async (id: string) => {
        var activity = this.activityMap.get(id);
        if (activity === undefined) {
            this.loadingInitial = true;
            try {
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                runInAction(() => {
                    this.selectedActivity = activity;
                })
            } catch (err) {
                console.log(err);
            }
        } else
            runInAction(() =>
                this.selectedActivity = activity
            );
        runInAction(() => {
            this.editMode = false;
            this.loadingInitial = false;
        });
        return activity;
    }
    private setActivity(act: Activity) {
        const user = store.userStore.user;
        if (user) {
            act.isGoing = act.attendees!.some(
                a => a.userName === user.userName
            )
            act.isHost = act.hostUserName === user.userName;
            act.host = act.attendees?.find(x => x.userName === act.hostUserName);
        }
        act.date = new Date(act.date!);
        this.activityMap.set(act.id, act)
    }


    deleteActivity = async (id: string) => {
        this.setSubmitting(true);
        try {
            await agent.Activities.delete(id).then(() => {
                runInAction(() => {
                    this.activityMap.delete(id);
                    this.selectedActivity = undefined;
                    this.setSubmitting(false);
                })
                router.navigate('/activities');
            });
        } catch (err) {
            console.log(err);
            this.setSubmitting(false);
        }
    }

    setSubmitting = (submitting: boolean) => {
        this.submitting = submitting;
    }

    editActivity = async (activity: ActivityFormvalues) => {
        try {
            await agent.Activities.update(activity).then(() => {
                runInAction(() => {
                    if (activity.id) {
                        let updatedActivity = { ...this.getActivity(activity.id), ...activity };
                        this.activityMap.set(activity.id, updatedActivity as Activity);
                        this.selectedActivity = updatedActivity as Activity;

                    }
                })
            });
        } catch (err) {
            console.log(err)
        }


        return activity;
    }

    createActivity = async (activity: ActivityFormvalues) => {
        const user = store.userStore.user;
        const attendee = new Profile(user!);
        try {
            await agent.Activities.create(activity).then(() => {
                const newActivity = new Activity(activity);
                newActivity.hostUserName = user!.userName;
                newActivity.attendees = [attendee];
                this.setActivity(newActivity);
                runInAction(() => {
                    this.selectedActivity = newActivity;
                })
            });
        } catch (err) {
            console.log(err);
        }

        return activity;
    }
    updateAttendace = async () => {
        const user = store.userStore.user;
        this.loadingInitial = true;
        try {
            await agent.Activities.attend(this.selectedActivity!.id);
            runInAction(() => {
                if (this.selectedActivity?.isGoing) {
                    this.selectedActivity.attendees = this.selectedActivity.attendees?.filter(a => a.userName !== user?.userName);
                    this.selectedActivity.isGoing = false;
                } else {
                    const attendee = new Profile(user!);
                    this.selectedActivity?.attendees?.push(attendee);
                    this.selectedActivity!.isGoing = true;
                }
                this.activityMap.set(this.selectedActivity!.id, this.selectedActivity!);
            })
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => this.loadingInitial = false);
        }
    }
    cancelActivityToggle = async () => {
        this.loadingInitial = true;
        try {
            await agent.Activities.attend(this.selectedActivity!.id);
            runInAction(() => {
                this.selectedActivity!.isCancelled = !this.selectedActivity!.isCancelled;
                this.activityMap.set(this.selectedActivity!.id, this.selectedActivity!);
                this.loadingInitial = false;
            });
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => this.loadingInitial = false);
        }
    }

    updateFollowing =  (username: string) => {
        this.activityMap.forEach(activity => {
            activity.attendees.forEach(attendee => {
                if (attendee.userName === username) {
                    attendee.following ? attendee.followersCount-- : attendee.followersCount++;
                    attendee.following = !attendee.following;
                }
            });
        })
    }
}