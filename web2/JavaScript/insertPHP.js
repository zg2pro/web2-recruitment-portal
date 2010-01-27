/**
*Cet appel asynchrone lance un script qui transforme un xschema en formulaire d'inscription
*/
function insertForm(studentOrCompany) {
	var xhr = setXHR ();
	xhr.open("POST", "PHP/insertForm.php", true);
	document.getElementById('transform').innerHTML = "Chargement...";
	xhr.onreadystatechange = function() {
		document.getElementById('transform').innerHTML = "<br/>Serveur en attente..."+xhr.readyState;
		if (xhr.readyState == 4){
			document.getElementById('transform').innerHTML = xhr.responseText;
			replace_();
		}//if
	};//function
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send("type="+studentOrCompany);
}//insertForm

/**
*simple recuperation de l'adresse IP
*/
function getIP() {
	var xhr = setXHR();
	xhr.open("POST", "PHP/giveRemoteIP.php", false);
	xhr.send(null);
	return xhr.responseText;
}//insertIP

/**
*@file : url du fichier a traiter
*@tag : balise sur laquelle l'operation s'effectue
*@stringValue : nouvelle valeur de la balise
*Remplace certaines donnees dans un fichier XML
*/
function setDataInXML(file, tag, stringValue){
	var xhr2 = setXHR ();
	xhr2.open("POST", "PHP/changeXMLTagValue.php", true);
	document.getElementById('connected').innerHTML = "Chargement...";
	xhr2.onreadystatechange = function() {
		document.getElementById('connected').innerHTML = "<br/>Serveur en attente..."+xhr2.readyState;
		if (xhr2.readyState == 4){
			document.getElementById('connected').innerHTML = manageConnection();
		}//if
	};//function
	xhr2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr2.send("file="+file+"&tag="+tag+"&value="+stringValue);
}//setDataInXML

/**
*Cette fonction sert a verifier l'appartenance d'un element a un tableau
*/
Array.prototype.contains = function (element) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] == element) {
		return true;
		}//if
	}//for
	return false;
}//function

/**
*Liste des champs obligatoires dans les formulaires
*/
studentMandatoryFields = ["Login", "Mot_de_passe", "Nom", "Prenom", "Ville"];
companyMandatoryFields = ["Login", "Mot_de_passe", "Nom", "Pays"];

/**
*Cette methode verifie si le champ fait partie des champs obligatoires et s'il est vide.
*/
function checkMandatoryField (theStatus, att, val) {
	if (theStatus == "Etudiant") {
		if (studentMandatoryFields.contains(att) && val == "") return 0;
		else return 1;
	} else {
		if (companyMandatoryFields.contains(att) && val == "") return 0;
		else return 1;
	}//if company
}//checkMandatoryField


/**
*appel asynchrone de script PHP une fois le formulaire d'inscription rempli.
*/
function registerUser() {
	var xhr = setXHR ();
	xhr.open("POST", "PHP/createUser.php", true);
	var aString = "status=";
	//status = etudiant ou entreprise
	var theStatus = document.registration.getElementsByTagName('status')[0].innerHTML;
	aString += (theStatus + "&");

	var tab = document.registration.getElementsByTagName('input');
	for (var i = 0; i<tab.length; i++){
		var att = tab[i].getAttribute('name');
		var val = tab[i].value;
		if (checkMandatoryField(theStatus, att, val)) aString += (tab[i].getAttribute('name') + "=" + tab[i].value + "&");
		else {alert("veuillez remplir le champ "+att); return;}
	}//for	

	tab = document.registration.getElementsByTagName('select');
	for (var i = 0; i<tab.length; i++){
		aString += (tab[i].getAttribute('name') + "=" + tab[i].value + "&");
	}//for

	tab = document.registration.getElementsByTagName('textarea');
	for (var i = 0; i<tab.length - 1; i++){
		aString += (tab[i].getAttribute('name') + "=" + tab[i].value + "&");
	}//for
	aString += (tab[tab.length - 1].getAttribute('name') + "=" + tab[i].value);

	document.getElementById('transform').innerHTML = "Chargement...";
	xhr.onreadystatechange = function() {
		document.getElementById('transform').innerHTML = "<br/>Serveur en attente..."+xhr.readyState;
		if (xhr.readyState == 4){
			//document.getElementById('transform').innerHTML = "profil enregistré";
			document.getElementById('transform').innerHTML = xhr.responseText;
			//replace_();
		}//if
	};//function
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send(aString);
}//registerUser

/**
*appel asynchrone de script PHP une fois le formulaire de profil modifie.
*/
function updateUser(file){
	var xhr = setXHR ();
	xhr.open("POST", "PHP/updateUser.php", true);
	
	//il faut tout d'abord elaborer le statut.
	var theStatus = document.profile.getElementsByTagName('status')[0].innerHTML;
	//file est le fichier a mettre a jour

	var aString = "file="+file+"&";

	var tab = document.profile.getElementsByTagName('input');
	for (var i = 0; i<tab.length; i++){
		var att = tab[i].getAttribute('name');
		var val = tab[i].value;
		if (checkMandatoryField(theStatus, att, val)) aString += (tab[i].getAttribute('name') + "=" + tab[i].value + "&");
		else {alert("veuillez remplir le champ "+att); return;}
		//aString += (tab[i].getAttribute('name') + "=" + tab[i].value + "&");
	}//for	

	tab = document.profile.getElementsByTagName('select');
	for (var i = 0; i<tab.length - 1; i++){
		aString += (tab[i].getAttribute('name') + "=" + tab[i].value + "&");
	}//for
	aString += (tab[tab.length - 1].getAttribute('name') + "=" + tab[i].value);

	document.getElementById('transform').innerHTML = "Chargement...";
	xhr.onreadystatechange = function() {
		document.getElementById('transform').innerHTML = "<br/>Serveur en attente..."+xhr.readyState;
		if (xhr.readyState == 4){
			document.getElementById('transform').innerHTML = xhr.responseText;
		}//if
	};//function
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send(aString);
}//updateUser
