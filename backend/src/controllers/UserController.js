const UserService = require('./../services/UserService');


module.exports = {
    
    ConsultarUsuarios: async (req, res) => {
        let json = {error:'', result:[]};

        let usuarios = await UserService.ConsultarUsuarios();

        for(let i in usuarios){
            json.result.push({
                codigo: usuarios[i].codigo,
                nome: usuarios[i].nome,
                email: usuarios[i].email,
                senha: usuarios[i].senha
            });
        }

        res.json(json);
    },

    ConsultarUsuario: async (req, res) => {
        let json = {error:'', result:{}};

        let codigo = req.params.codigo; 
        let usuario = await UserService.ConsultarUsuario(codigo);

        if(usuario){
            json.result = usuario; 
        }

        res.json(json);
    },

    CadastrarUsuario: async(req, res) => {
        let json = {error:'', result:{}};

        let {nome} = req.body;
        let {email} = req.body;
        let {senha} = req.body;

        console.log(req.body);

        if (nome && email && senha){
    
            let usuarioCodigo = await UserService.CadastrarUsuario(nome, email, senha);

            json.result = {
                codigo: usuarioCodigo,
                nome,
                email,
                senha
            };

        } else {
            json.error = 'Campos não enviados';
        }
        res.json(json);
    },

    AlterarUsuario: async(req, res) => {
        let json = {error:'', result:{}};

        let {codigo} = req.params;
        let {nome} = req.body;
        let {email} = req.body;
        let {senha} = req.body;

        if (codigo && nome && email && senha){
            await UserService.AlterarUsuario(codigo, nome, email, senha);
            json.result = {
                nome,
                email,
                senha
            };
        } else {
            json.error = 'Campos não enviados';
        }
        res.json(json);
    },

    DeletarUsuario: async(req, res) => {
        let json = {error:'', result:{}};

        let del = await UserService.DeletarUsuario(req.params.codigo);

        json.result = del;

        res.json(json);
    }
    
}