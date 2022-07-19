import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/Activity";
import { v4 as uuid } from 'uuid';
export default class ActivityStore {
    activities: Activity[] = [];
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loadingInitial = false;
    submitting = false;

    constructor() {
        makeAutoObservable(this);
    }

    loadActivities = async () => {
        this.setLoadingInitial(true);

        try {
            const activities = await agent.Activities.list();
            activities.forEach((item) => {
                item.date = item.date.split("T")[0];
                this.activities.push(item);
            });

            this.setLoadingInitial(false);
        } catch (err) {
            console.log(err);
            this.setLoadingInitial(false);
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    loadActivity = (id: string) => {
        this.selectedActivity = this.activities.find((x) => x.id === id);
        this.editMode = false;
    }

    cancelActivity = () => {
        this.selectedActivity = undefined;
    }

    deleteActivity = async (id: string) => {
        this.setSubmitting(true);
        try {
            await agent.Activities.delete(id).then(() => {
                runInAction(() => {
                    this.activities = [...this.activities.filter((item) => item.id !== id)];
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
    createActivity = async (activity: Activity) => {
        this.submitting = true;
        try {
            await agent.Activities.update(activity).then(() => {
                runInAction(() => {
                    this.activities = [
                        ...this.activities.filter((item) => item.id !== activity.id),
                        activity,
                    ];
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
    }
    editActivity = async (activity: Activity) => {
        this.submitting = true;

        try {
            activity.id = uuid();
            await agent.Activities.create(activity).then(() => {
                runInAction(() => {
                    this.activities = [...this.activities, activity];
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
    }
    openForm = (id?: string) => {
        id ? this.loadActivity(id) : this.cancelActivity();
        this.editMode = true;
    }
    closeForm = () => {
        this.editMode = false;
    }
}