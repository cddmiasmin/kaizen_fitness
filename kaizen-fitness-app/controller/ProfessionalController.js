import ProfessionalModel from "../model/ProfessionalModel";

class ProfessionalController {

    professionalModel = new ProfessionalModel();

    registerProfessional = async (professional) => {
        return await this.professionalModel.registerProfessional(professional);
    }

    getProfessional = async (idUser) => {
         return await this.professionalModel.getProfessional(idUser);
    }

    deleteProfessional = async () => {
         return await this.professionalModel.deleteProfessional();
    }

    updateProfessional = async ( professional ) => {
        return await this.professionalModel.updateProfessional(professional);
    }

}

export default ProfessionalController;