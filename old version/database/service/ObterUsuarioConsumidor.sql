SELECT 
	tb_usuario.id_usuario as 'idUsuario', tb_usuario.foto, tb_usuario.nome, tb_usuario.sobrenome, tb_usuario.dt_nascimento as 'dtNascimento', tb_usuario.email, tb_usuario.senha,
    tb_usuario_consumidor.id_usuario_consumidor as 'idConsumidor', tb_usuario_consumidor.cpf, tb_usuario_consumidor.peso, tb_usuario_consumidor.altura
FROM tb_usuario INNER JOIN tb_usuario_consumidor 
WHERE tb_usuario.email = 'taylor.swift@example.com' or tb_usuario.senha = 'senha_secreta';
