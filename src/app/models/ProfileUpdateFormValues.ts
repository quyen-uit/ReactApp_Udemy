
export class ProfileUpdateFormValues {
    displayName: string = '';
    bio?: string = '';
    constructor(profile?: ProfileUpdateFormValues) {
        if (profile) {
            this.displayName = profile.displayName;
            this.bio = profile.bio;
        }
    }
}