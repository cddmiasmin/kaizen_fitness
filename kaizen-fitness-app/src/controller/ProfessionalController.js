import ProfessionalModal from "../model/ProfessionalModal";

class ProfessionalController {

    professionalModal = new ProfessionalModal();

    registerProfessional = (professional) => {
        this.professionalModal.registerProfessional(professional);
    }

    getProfessional = async (idUser) => {
        return this.professionalModal.getProfessional(idUser);
    }

    deleteProfessional = async () => {
        return this.professionalModal.deleteProfessional();
    }

}

export default ProfessionalController;