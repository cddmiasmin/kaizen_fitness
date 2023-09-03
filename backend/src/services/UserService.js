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

    CadastrarUsuario: (nome, email, senha) => {
        return new Promise((aceito, rejeitado)=> {

            db.query('INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)',
                [nome, email, senha],
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