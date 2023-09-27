import UserModal from "../model/UserModal";

class UserController {

    userModal = new UserModal();

    hasFullResgistration = async () => {
        return await this.userModal.hasFullResgistration();
    }

    signIn = (email, password) => this.userModal.signIn(email, password);
    

    signUp = (email, password) => this.userModal.signUp(email, password);
    

    signOut = () => this.userModal.signOut();
    

    signInGoogle = () => this.userModal.signInGoogle();
    

}

export default UserController;