<?php

if (isset($_GET["txtnome"])){
    $nome = $_GET["txtnome"];
    
    $servidor     = "localhost:1521/XEPDB1";
 	$usuario1     = "GABRIEL";
  	$senha1       = "gabriel";	
    $bancodedados = "TCC";
    //testando a conexao com o servidor
    $ss = oci_connect($usuario1, $senha1, $servidor);
	//testando a conexao com o banco de dados
    if (!$ss) {
        $e = oci_error();
        trigger_error(htmlentities($e['Não deu certo'], ENT_QUOTES), E_USER_ERROR);
    } 
    //$sql = '';
    $sql = $nome;
    $stid = oci_parse($ss, $sql);
    oci_execute($stid);
        
    $data = array();
    while ($row = oci_fetch_assoc($stid)) 
        array_push($data,$row);

    header('Content-Type: application/json');    
    echo json_encode($data);
        
    oci_close($ss);
}
?>