import { makeAutoObservable, runInAction } from 'mobx';
import { HubConnection } from '@microsoft/signalr';
import { ChatComment } from './../models/Comment';
import { store } from './store';
import { HubConnectionBuilder } from '@microsoft/signalr/dist/esm/HubConnectionBuilder';
import { LogLevel } from '@microsoft/signalr/dist/esm/ILogger';
export default class CommentStore {
    comments: ChatComment[] = [];
    hubConnection: HubConnection | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    createHubConnection = (activityId: string) => {
        if (store.activityStore.selectedActivity) {
            this.hubConnection = new HubConnectionBuilder()
                .withUrl('https://192.168.1.104:443/chat?activityId=' + activityId, {
                    accessTokenFactory: () => store.userStore.user?.token!
                })
                .withAutomaticReconnect()
                .configureLogging(LogLevel.Information)
                .build();
            this.hubConnection.start().catch(err => console.log('Error establish connection: ', err))
        }

        this.hubConnection?.on('LoadComments', (comments: ChatComment[]) => {
            runInAction(() => this.comments = comments);
        })

        this.hubConnection?.on('ReceiveComment', (comment: ChatComment) => {
            runInAction(() => this.comments.push(comment));
        })
    }

    stopHubConnection = () => {
        this.hubConnection?.stop().catch(err => console.log('Error stop connection: ', err))
    }

    clearComments = () => {
        this.comments = [];
        this.stopHubConnection();
    }

    addComment = async (values: any) => {
        values.activityId = store.activityStore.selectedActivity?.id;
        try {
            await this.hubConnection?.invoke('SendComment', values)
        } catch (error) {
            console.log(error);
        }
    }
}