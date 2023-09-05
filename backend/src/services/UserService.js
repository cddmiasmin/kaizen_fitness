const db = require('../db');

module.exports = {
    
    ObterUsuarioConsumidor: (email, senha) => {
        return new Promise((aceito, rejeitado)=>{

            db.query("SELECT tb_usuario.id_usuario as 'idUsuario', tb_usuario.foto, tb_usuario.nome, tb_usuario.sobrenome, tb_usuario.dt_nascimento as 'dtNascimento', tb_usuario.email, tb_usuario.senha, tb_usuario_consumidor.id_usuario_consumidor as 'idConsumidor', tb_usuario_consumidor.cpf, tb_usuario_consumidor.peso, tb_usuario_consumidor.altura FROM tb_usuario INNER JOIN tb_usuario_consumidor WHERE tb_usuario.email = ? or tb_usuario.senha = ?", 
            
            [email, senha], 
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