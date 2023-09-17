UPDATE tb_usuario
SET email = 'taylor.swift@example.com', senha = '123', estado = 'Tennessee', cidade = 'Nashville'
WHERE id_usuario = 1;

UPDATE tb_usuario_consumidor
INNER JOIN tb_usuario ON tb_usuario_consumidor.id_usuario = tb_usuario.id_usuario
SET tb_usuario_consumidor.peso = '58.7', tb_usuario_consumidor.altura = '1.78'
WHERE tb_usuario_consumidor.id_usuario = 1;