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

        let { foto, nome, sobrenome, dtNascimento, email, senha, estado, cidade, cpf, peso, altura} = req.body;

        if (foto && nome && dtNascimento && email && senha && estado && cidade && cpf && peso && altura){
    
            let usuarioCodigo = await UserService.CadastrarUsuario(foto, nome, sobrenome, dtNascimento, email, senha, estado, cidade);
            let consumidorCodigo = await UserService.CadastrarConsumidor(cpf, peso, altura, usuarioCodigo);

            json.result = {
                idUsuario: usuarioCodigo, foto, nome, sobrenome, dtNascimento, email, senha, estado, cidade, cpf, peso, altura, idConsumidor: consumidorCodigo
            };

        } else {
            json.error = {foto, nome, sobrenome, dtNascimento, email, senha, estado, cidade, cpf, peso, altura};
        }
        res.json(json);
    },

    AlterarUsuario: async(req, res) => {
        let json = {error:'', result:{}};

        let {codigo} = req.params;

        let {email} = req.body;
        let {senha} = req.body;
        let {estado} = req.body;
        let {cidade} = req.body;
        let {peso} = req.body;
        let {altura} = req.body;

        if (codigo && email && senha && estado && cidade && peso && altura){
            let atualizacao = await UserService.AlterarUsuario(codigo, email, senha, estado, cidade, peso, altura);
            json.result = atualizacao;
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