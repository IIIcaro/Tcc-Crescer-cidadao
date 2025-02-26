<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");

// Incluindo o arquivo de conexão
include 'db.php';

// Obtendo os dados do corpo da requisição
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['nome']) || !isset($data['email']) || !isset($data['senha'])) {
    echo json_encode(["error" => "Todos os campos são obrigatórios."]);
    exit;
}

$nome = $conn->real_escape_string($data['nome']);
$email = $conn->real_escape_string($data['email']);
$senha = password_hash($data['senha'], PASSWORD_DEFAULT); // Hash da senha

// Verifica se o email já está cadastrado
$sql_check = "SELECT id FROM usuarios WHERE email = '$email'";
$result = $conn->query($sql_check);
if ($result->num_rows > 0) {
    echo json_encode(["error" => "Email já cadastrado."]);
    exit;
}

// Inserindo no banco de dados
$sql = "INSERT INTO usuarios (nome, email, senha) VALUES ('$nome', '$email', '$senha')";
if ($conn->query($sql) === TRUE) {
    echo json_encode(["message" => "Cadastro realizado com sucesso!"]);
} else {
    echo json_encode(["error" => "Erro ao cadastrar usuário: " . $conn->error]);
}

$conn->close();
?>
