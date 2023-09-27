import ProfessionalModal from "../model/ProfessionalModal";

class ProfessionalController {

    professionalModal = new ProfessionalModal();

    registerProfessional = () => {
        this.professionalModal.registerProfessional({
            "nome": "Thiago"
        });
    }

    getProfessional = async (idUser) => {
        return this.professionalModal.getProfessional(idUser);
    }

}

export default ProfessionalController;