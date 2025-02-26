<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");

// Incluindo o arquivo de conexão
include 'db.php';

// Obtendo os dados do corpo da requisição
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['email']) || !isset($data['senha'])) {
    echo json_encode(["error" => "Email e senha são obrigatórios."]);
    exit;
}

$email = $conn->real_escape_string($data['email']);
$senha = $data['senha'];

// Verificar se o email existe no banco
$sql = "SELECT id, nome, senha FROM usuarios WHERE email = '$email'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    if (password_verify($senha, $row['senha'])) {
        echo json_encode(["message" => "Login realizado com sucesso!", "redirect" => "/Inicio", "nome" => $row['nome']]);
    } else {
        echo json_encode(["error" => "Senha incorreta."]);
    }
} else {
    echo json_encode(["error" => "Email não encontrado."]);
}

$conn->close();
?>
