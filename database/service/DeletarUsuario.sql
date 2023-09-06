DELETE tb_usuario, tb_usuario_consumidor FROM tb_usuario_consumidor INNER JOIN tb_usuario ON tb_usuario.id_usuario = tb_usuario_consumidor.id_usuario_consumidor WHERE tb_usuario.id_usuario = 2;
