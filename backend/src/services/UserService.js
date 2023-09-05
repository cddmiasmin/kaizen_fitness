const db = require('../db');

module.exports = {
    ConsultarUsuarios: () => {
        return new Promise((aceito, rejeitado)=>{

            db.query('SELECT * FROM usuario', (error, results)=>{
                if(error) { rejeitado(error); return; }
                aceito(results);
            });
        });
    },
    
    ConsultarUsuario: (codigo) => {
        return new Promise((aceito, rejeitado)=>{

            db.query('SELECT * FROM usuario WHERE id = ?', [codigo], 
            
            (error, results) => {
                if(error) { 
                    rejeitado(error); 
                    return; 
                }

                if(results.length > 0) { 
                    aceito(results[0]);
                } else {
                    aceito(false);
                }
            });
        });
    },

    CadastrarUsuario: (foto, nome, sobrenome, dtNascimento, email, senha, estado, cidade) => {
        return new Promise((aceito, rejeitado)=> {

            db.query('INSERT INTO tb_usuario (foto, nome, sobrenome, dt_nascimento, email, senha, estado, cidade) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [foto, nome, sobrenome, dtNascimento, email, senha, estado, cidade],
                (error, results) => {
                    if(error){ 
                        rejeitado(error); 
                        return; 
                    }
                    aceito(results.insertId); 
                }
            );
        });
    },

    CadastrarConsumidor: (cpf, peso, altura, usuarioCodigo) => {
        return new Promise((aceito, rejeitado)=> {

            db.query('INSERT INTO tb_usuario_consumidor (cpf, peso, altura, id_usuario) VALUES (?, ?, ?, ?)',
                [cpf, peso, altura, usuarioCodigo],
                (error, results) => {
                    if(error){ 
                        rejeitado(error); 
                        return; 
                    }
                    aceito(results); 
                }
            );
        });
    },

    AlterarUsuario: (codigo, nome, email, senha) => {
        return new Promise((aceito, rejeitado) => {
            db.query('UPDATE usuario SET nome = ?, email = ?, senha = ? WHERE id = ?',
                [nome, email, senha, codigo],
                (error, results) => {
                    if(error){ 
                        rejeitado(error); 
                        return; 
                    }

                    aceito(results);
                }
            );
        });
    },

    DeletarUsuario: (codigo)=> {
        return new Promise((aceito, rejeitado) => {
            db.query('DELETE FROM usuario WHERE id = ?',[codigo], 
            
            (error, results ) => {

                if(error){ 
                    rejeitado(error); 
                    return; 
                }

                aceito('Usuário removido!');
            });
        });
    }
};