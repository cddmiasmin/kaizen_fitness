const db = require('../db');

module.exports = {
    
    ObterUsuarioConsumidor: (email, senha) => {
        return new Promise((aceito, rejeitado)=>{

            db.query("SELECT tb_usuario.id_usuario as 'idUsuario', tb_usuario.foto, tb_usuario.nome, tb_usuario.sobrenome, tb_usuario.dt_nascimento as 'dtNascimento', tb_usuario.email, tb_usuario.senha,  tb_usuario.estado, tb_usuario.cidade, tb_usuario_consumidor.id_usuario_consumidor as 'idConsumidor', tb_usuario_consumidor.cpf, tb_usuario_consumidor.peso, tb_usuario_consumidor.altura FROM tb_usuario INNER JOIN tb_usuario_consumidor ON tb_usuario.id_usuario = tb_usuario_consumidor.id_usuario WHERE tb_usuario.email = ? or tb_usuario.senha = ?", 
            
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
                    aceito(results.insertId); 
                }
            );
        });
    },

    AlterarUsuario: (codigo, email, senha, estado, cidade, peso, altura) => {
        return new Promise((aceito, rejeitado) => {
            db.query('UPDATE tb_usuario SET email = ?, senha = ?, estado = ?, cidade = ? WHERE id_usuario = ?',
                [email, senha, estado, cidade, codigo],
                (error, results) => {
                    if(error){ 
                        rejeitado(error); 
                        return; 
                    }
                   
                    db.query('UPDATE tb_usuario_consumidor INNER JOIN tb_usuario ON tb_usuario_consumidor.id_usuario = tb_usuario.id_usuario SET tb_usuario_consumidor.peso = ?, tb_usuario_consumidor.altura = ? WHERE tb_usuario_consumidor.id_usuario = ?',
                    [peso, altura, codigo],
                    (error, results) => {
                        if(error){ 
                            rejeitado(error); 
                            return; 
                        }
    
                        aceito("Seus dados foram atualizados!");
                    }
                );
                }
            );
        });
    },

    DeletarUsuario: (codigo)=> {
        return new Promise((aceito, rejeitado) => {
            db.query('DELETE tb_usuario, tb_usuario_consumidor FROM tb_usuario_consumidor INNER JOIN tb_usuario ON tb_usuario.id_usuario = tb_usuario_consumidor.id_usuario_consumidor WHERE tb_usuario.id_usuario = ?;',
            
            [codigo], 
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