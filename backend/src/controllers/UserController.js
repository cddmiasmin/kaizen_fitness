const UserService = require('./../services/UserService');


module.exports = {
    
    LogarUsuario: async (req, res) => {
        let json = {error:'', result:[]};

        let { email  } = req.body;
        let { senha  } = req.body;
        let { google } = req.body;

        let usuario = await UserService.ObterUsuarioConsumidor(email, senha);

        // json.result.push(usuario === false || email != usuario.email, senha != usuario.senha);
        
        if(usuario){
            if (email == usuario.email && google === 'true') 
                json.result.push(usuario);

            else if(email == usuario.email && senha == usuario.senha && google === 'false') 
                json.result.push(usuario);

            else if(email != usuario.email) 
                json.error = 'Conta não encontrada!';
            
            else if(senha != usuario.senha) 
                json.error = ('Senha incorreta!');
        } else {
            json.error = 'Conta não encontrada!';
        }
    
        res.json(json);
    },

    CadastrarUsuario: async(req, res) => {
        let json = {error:'', result:{}};

        let { foto, nome, sobrenome, dtNascimento, email, senha, estado, cidade, cpf, peso, altura } = req.body;

        if (nome && email && senha){
    
            let usuarioCodigo = await UserService.CadastrarUsuario(foto, nome, sobrenome, dtNascimento, email, senha, estado, cidade);
            await UserService.CadastrarConsumidor(cpf, peso, altura, usuarioCodigo);

            json.result = {
                codigo: usuarioCodigo, foto, nome, sobrenome, dtNascimento, email, senha, estado, cidade, cpf, peso, altura
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