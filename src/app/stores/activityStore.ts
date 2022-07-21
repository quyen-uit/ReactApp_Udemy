import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/Activity";
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
        return Array.from(this.activityMap.values()).sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
    }

    get groupedActivities() {
        return Object.entries(
            this.activitiesByDate.reduce((activities, activity) => {
                const date = activity.date;
                activities[date] = activities[date] ? [...activities[date], activity] : [activity]
                return activities;
            }, {} as { [key: string]: Activity[] })
        )
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
        let activity = this.activityMap.get(id);
        if (activity === undefined) {
            this.loadingInitial = true;
            try {
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                this.selectedActivity = activity;
            } catch (err) {
                console.log(err);
            }
        } else
            this.selectedActivity = activity;
        runInAction(() => {
            this.editMode = false;
            this.loadingInitial = false;
        });
        return activity;
    }
    private setActivity(act: Activity) {
        act.date = act.date.split("T")[0];
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
            });
        } catch (err) {
            console.log(err);
            this.setSubmitting(false);
        }
    }

    setSubmitting = (submitting: boolean) => {
        this.submitting = submitting;
    }
    editActivity = async (activity: Activity) => {
        this.submitting = true;
        try {
            await agent.Activities.update(activity).then(() => {
                runInAction(() => {
                    this.activityMap.set(activity.id, activity);
                })
            });
        } catch (err) {
            console.log(err)
        }

        runInAction(() => {
            this.editMode = false;
            this.selectedActivity = undefined;
            this.submitting = false;
        });
        return activity;
    }
    createActivity = async (activity: Activity) => {
        this.submitting = true;

        try {
            await agent.Activities.create(activity).then(() => {
                runInAction(() => {
                    this.activityMap.set(activity.id, activity);
                })
            });
        } catch (err) {
            console.log(err);
        }

        runInAction(() => {
            this.editMode = false;
            this.selectedActivity = undefined;
            this.submitting = false;
        })
        return activity;
    }

}