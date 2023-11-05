import UserModal from "../model/UserModal";

class UserController {

    userModal = new UserModal();

    userHasAProfile = async () => {
        return await this.userModal.userHasAProfile();
    }

    signIn = async (email, password) => {
        return await this.userModal.signIn(email, password);
    }
    
    signUp = async (photo, name, familyName, email, password) => {
        const signUp = await this.userModal.signUp(email, password);
        let updateProfile;

        if(signUp.result){
            const update = {
                displayName: name + ' ' + familyName,
                photoURL: photo,
            }
            updateProfile = await this.userModal.updateProfile(update);
        }

        return signUp;
    }
    
    signOut = async () => {
        return this.userModal.signOut();
    }
    
    signInGoogle = async () => this.userModal.signInGoogle();

    forgotPassword = async (email) => {
        return await this.userModal.forgotPassword(email);
    }
    
}

export default UserController;