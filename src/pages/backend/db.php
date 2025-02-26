<?php
$servername = "127.0.0.1"; // Hostname
$username = "root"; // Nome de usuário
$password = "123456"; // Senha
$dbname = "tcc"; // Nome do banco de dados
$port = 3306; // Porta do MySQL

// Conexão com o banco de dados
$conn = new mysqli($servername, $username, $password, $dbname, $port);

// Verifica se a conexão foi bem-sucedida
if ($conn->connect_error) {
    die(json_encode(["error" => "Erro na conexão com o banco de dados: " . $conn->connect_error]));
}
?>
