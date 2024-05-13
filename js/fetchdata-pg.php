<?php

if (isset($_GET["txtnome"])) {
    $nome = $_GET["txtnome"];

    $host         = "localhost";
    $port         = "5432";
    $dbname       = "TCC";
    $user         = "GABRIEL";
    $password     = "gabriel";

    // Testando a conexão com o banco de dados
    $conn = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");
    if (!$conn) {
        echo "Não foi possível conectar ao banco de dados.";
        exit;
    }

    $sql = $nome;

    // Executando a consulta SQL
    $result = pg_query($conn, $sql);
    if (!$result) {
        echo "Erro ao executar a consulta.";
        exit;
    }

    $data = array();

    // Recuperando os resultados da consulta e armazenando em um array
    while ($row = pg_fetch_assoc($result)) {
        $data[] = $row;
    }

    // Fechando a conexão com o banco de dados
    pg_close($conn);

    // Definindo o cabeçalho da resposta como JSON
    header('Content-Type: application/json');

    // Convertendo o array em JSON e imprimindo na saída
    echo json_encode($data);
}
?>