<?php

/**
*Script de creation de fichier XML a partir des donnees renvoyees en POST par le moteur Ajax.
*/
$status = "";
foreach($_POST as $keyname=>$value){
	if (!(stristr( $keyname, "button")) && $keyname != "null"){
		if (stristr($keyname, "status")){
			$status = $value;
			$doc = new DOMDocument('1.0');
			$doc->formatOutput = true;
			$root = $doc->createElement($value);
			$root = $doc->appendChild($root);
			$ip = $doc->createElement("lastIP");
			$ip = $root->appendChild($ip);
			$IPtext = $doc->createTextNode($_SERVER["REMOTE_ADDR"]);
			$IPtext = $ip->appendChild($IPtext);
		} else {
			if (!(ereg(".*[0-9]$", $keyname))) {
				$keyname = ereg_replace("combo_", "", $keyname);
				$node = $doc->createElement($keyname);
				$node = $root->appendChild($node);
				$text = $doc->createTextNode($value);
				$text = $node->appendChild($text);
			} else {
				$keyname = ereg_replace("(.*)[0-9]$", "\\1", $keyname);
				//echo "|$keyname| <br/>";
				if (stristr($keyname, "Diplome") || stristr($keyname, "Etablissement") || stristr($keyname, "Promotion")){
					if (stristr($keyname, "Diplome")) {
						$node = $doc->createElement("Formation");
						$node = $root->appendChild($node);
						$node2 = $doc->createElement($keyname);
						$node2 = $node->appendChild($node2);
						$text = $doc->createTextNode($value);
						$text = $node2->appendChild($text);
					} else {
						$node2 = $doc->createElement($keyname);
						$node2 = $node->appendChild($node2);
						$text = $doc->createTextNode($value);
						$text = $node2->appendChild($text);
					}//etablissement prom
				} else {
					if (stristr($keyname, "Langue") || stristr($keyname, "Niveau")) {
						if (stristr($keyname, "Langue")) {
							$node = $doc->createElement("Langues");
							$node = $root->appendChild($node);
							$node2 = $doc->createElement($keyname);
							$node2 = $node->appendChild($node2);
							$text = $doc->createTextNode($value);
							$text = $node2->appendChild($text);
						} else {
							$node2 = $doc->createElement($keyname);
							$node2 = $node->appendChild($node2);
							$text = $doc->createTextNode($value);
							$text = $node2->appendChild($text);
						}//niveau
					} else {
						if (stristr($keyname, "Nom") || stristr($keyname, "Téléphone") || stristr($keyname, "E-Mail")) {
							if (stristr($keyname, "Nom")) {
								$node = $doc->createElement("Contact");
								$node = $root->appendChild($node);
								$node2 = $doc->createElement($keyname);
								$node2 = $node->appendChild($node2);
								$text = $doc->createTextNode($value);
								$text = $node2->appendChild($text);
							} else {
								$node2 = $doc->createElement($keyname);
								$node2 = $node->appendChild($node2);
								$text = $doc->createTextNode($value);
								$text = $node2->appendChild($text);
							}//niveau
						} else {
							if (stristr($keyname, "Catégorie")) {
								$node = $doc->createElement("Description");
								$node = $root->appendChild($node);
								$node2 = $doc->createElement($keyname);
								$node2 = $node->appendChild($node2);
								$text = $doc->createTextNode($value);
								$text = $node2->appendChild($text);
							} else {
								$node2 = $doc->createElement($keyname);
								$node2 = $node->appendChild($node2);
								$text = $doc->createTextNode($value);
								$text = $node2->appendChild($text);
							}//niveau
						}//element de type simple entreprise
					}//si entreprise
				} //(stristr($keyname, "Langue") || stristr($keyname, "Niveau"))
			} //si chiffre
		}//premiere indentation
	}//if
}//foreach

$data = new DOMDocument();
$data->load('../XML/XML/data.xml');
$root = $data->documentElement;
$path = "../XML/XML/";

//mise a jour du fichier data.xml
switch ($status){
	case "Etudiant" : {
		$nb = $root->getElementsByTagName("students")->item(0)->firstChild->nodeValue; 
		$path = $path."students/student_".($nb + 1).".xml";
		$root->getElementsByTagName("students")->item(0)->firstChild->nodeValue = ($nb + 1);
		break;
	}
	case "Entreprise" : {
		$nb = $root->getElementsByTagName("companies")->item(0)->firstChild->nodeValue; 
		$path = $path."companies/company_".($nb + 1).".xml";
		$root->getElementsByTagName("companies")->item(0)->firstChild->nodeValue = ($nb + 1);
		break;
	}
	default : $nb = "erreur";
}//switch

//procedure d'enregistrement des 2 fichiers a mettre a jour
if (!($data->save("../XML/XML/data.xml"))) echo "erreur d'enregistrement";
else {
	if (!($doc->save($path))) echo "erreur d'enregistrement";
	else echo "profil enregistré";
}//else

sleep(3);
header('Location: ../homePage.html');


?>