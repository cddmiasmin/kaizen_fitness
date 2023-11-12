import UserModel from "../model/UserModel";

class UserController {

    userModel = new UserModel();

    userHasAProfile = async () => {
        return await this.userModel.userHasAProfile();
    }

    signIn = async (email, password) => {
        return await this.userModel.signIn(email, password);
    }
    
    signUp = async (photo, name, familyName, email, password) => {
        const signUp = await this.userModel.signUp(email, password);
        let updateProfile;

        if(signUp.result){
            const update = {
                displayName: name + ' ' + familyName,
                photoURL: photo,
            }
            updateProfile = await this.userModel.updateProfile(update);
        }

        return signUp;
    }
    
    signOut = async () => {
        return this.userModel.signOut();
    }
    
    signInGoogle = async () => this.userModel.signInGoogle();

    forgotPassword = async (email) => {
        return await this.userModel.forgotPassword(email);
    }
    
}

export default UserController;