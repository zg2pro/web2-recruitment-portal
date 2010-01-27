<?php

/**
*Script de mise a jour de donnees XML d'un utilisateur, les donnees arrivent en POST du moteur Ajax.
*/
$file = "";
foreach($_POST as $keyname=>$value){
	if (!(stristr( $keyname, "button")) && $keyname != "null"){
		if (stristr($keyname, "file")){
			$file = $value;
			$doc = new DOMDocument('1.0');
			$doc->load("../$file.xml");
			$root = $doc->documentElement;
		}//if $file
		else {
			if(stristr( $keyname, "Diplome") || stristr( $keyname, "Etablissement") || stristr( $keyname, "Promotion") || stristr( $keyname, "Langue") || stristr( $keyname, "Niveau")){
				try {	//si le noeud est deja existant
					$root->getElementsByTagName(substr($keyname, 0, (strlen($string)-1)))->item(substr($keyname, -1, 1))->firstChild->nodeValue = $value;
				} catch (Exception $e) {
					if(stristr( $keyname, "Diplome")){
						//si diplome n'exite pas les deux autres non plus
						$node = $doc->createElement("Formation");
						$node = $root->getElementsByTagName('Etudiant')->item(0)->appendChild($node);
						$node2 = $doc->createElement("Diplome");
						$node3 = $doc->createElement("Etablissement");
						$node4 = $doc->createElement("Promotion");
						$node2 = $node->appendChild($node2);
						$node3 = $node->appendChild($node3);
						$node4 = $node->appendChild($node4);
						$root->getElementsByTagName(substr($keyname, 0, (strlen($string)-1)))->item(substr($keyname, -1, 1))->firstChild->nodeValue = $value;
					} else {
						if(stristr( $keyname, "Langue")){
							$node = $doc->createElement("Langues");
							$node = $root->getElementsByTagName('Etudiant')->item(0)->appendChild($node);
							$node2 = $doc->createElement("Langue");
							$node3 = $doc->createElement("Niveau");
							$node2 = $node->appendChild($node2);
							$node3 = $node->appendChild($node3);
							$root->getElementsByTagName(substr($keyname, 0, (strlen($string)-1)))->item(substr($keyname, -1, 1))->firstChild->nodeValue = $value;
						}//if langue
					}//else
				}//si nouveau noeud formation ou langue
			} else {
				//tous les noeuds existent deja sauf formation et langues.
				$root->getElementsByTagName($keyname)->item(0)->firstChild->nodeValue = $value;
			}//pour tous les noeuds contenant pas de chiffre
		}//else
	}//if
}//foreach

if (!($doc->save("../$file.xml"))) echo "erreur d'enregistrement";
else echo "profil enregistré";

sleep(3);
//header('Location: ../homePage.html');
//echo "<script>document.location.href='../homePage.html'</script>"

?>
