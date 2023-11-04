import UserModal from "../model/UserModal";

class UserController {

    userModal = new UserModal();

    hasFullResgistration = async () => {
        return await this.userModal.hasFullResgistration();
    }

    signIn = async (email, password) => {
        return await this.userModal.signIn(email, password);
    }
    
    signUp = async (email, password) => {
        return this.userModal.signUp(email, password);
    }
    
    signOut = async () => {
        return this.userModal.signOut();
    }
    
    signInGoogle = async () => this.userModal.signInGoogle();
    
}

export default UserController;