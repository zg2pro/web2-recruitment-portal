<?php

/**
*Ce script est appele pour le changement de la valeur lastIP dans les donnes des utilisateurs
*/
if(isset($_POST['file']) && isset($_POST['tag']) && isset($_POST['value'])){
	$file=$_POST['file'];
	$tag=$_POST['tag'];
	$value=$_POST['value'];
	if(strcmp(substr($file, 0, 2), "st") == 0) {
		$type = "students/";
	} else {
		$type = "companies/";
	}//else
	$xml_file = "../XML/XML/".$type.$file.".xml";
	$dom = new DomDocument();
	if (!file_exists($xml_file)) exit('Failed to open file');
	$dom->load($xml_file);
  	$listeP = $dom->getElementsByTagName($tag);
	foreach($listeP as $p) {
		$p->firstChild->nodeValue = $value;
	}//foreach
	$dom->save($xml_file);
}//if

?>