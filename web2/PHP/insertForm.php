<?php

/**
*Script de synthese du formulaire d'inscription en fonction du Xschema.
*Le type de schema a ouvrir est donne en POST par le moteur Ajax.
*/
if(isset($_POST['type'])){
	$type=$_POST['type'];
	$xml_file = '../XML/XSD/'.$type.'.xsd';
	$xsl_file = '../XML/XSL/adaptXSD.xsl';
	$dom_object = new DomDocument();
	if (!file_exists($xml_file)) exit('Failed to open $xml_file');
	$dom_object->load($xml_file);
	$xsl_obj = new DomDocument();
	if (!file_exists($xsl_file)) exit('Failed to open $xsl_file');
	$xsl_obj->load($xsl_file);
	$proc = new XSLTProcessor;
	$proc->importStyleSheet($xsl_obj);
	$html_fragment = $proc->transformToXML
	($dom_object);
	print ($html_fragment);
}//if

?>
