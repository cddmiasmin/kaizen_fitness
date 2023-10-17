import ProfessionalModal from "../model/ProfessionalModal";

class ProfessionalController {

    professionalModal = new ProfessionalModal();

    registerProfessional = async (professional) => {
        return await this.professionalModal.registerProfessional(professional);
    }

    getProfessional = async (idUser) => {
         return await this.professionalModal.getProfessional(idUser);
    }

    deleteProfessional = async () => {
         return await this.professionalModal.deleteProfessional();
    }

    updateProfessional = async ( professional ) => {
        return await this.professionalModal.updateProfessional(professional);
    }

}

export default ProfessionalController;