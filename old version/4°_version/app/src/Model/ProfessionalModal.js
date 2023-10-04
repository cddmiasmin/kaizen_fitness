import React from "react";
import firestore from '@react-native-firebase/firestore';

class ProfessionalModal extends React.Component {

  createProfessional = (professional) => {
    firestore()
    .collection('UserProfessional')
    .add({
      'nome': 'Iasmin'
    })
    .then(() => {
        console.log('User added!');
    });
  }
 
  render() {
    return null;
  }
}

export default ProfessionalModal;