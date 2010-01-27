
/**
*Recuperation de donnees :
*@xhr = est une instance de XMLHTTPRequest, un document en cours de lecture est lie a cet objet
*@xmlTag est la balise dont on veut recuperer le contenu textuel.
*/
function getDataWithXML(xmlTag, xhr){ 
	return xhr.responseXML.getElementsByTagName(xmlTag).item(0).firstChild.data; // renvoi de l’objet XML
}//getXMLDataFromTag

/**
*Instanciation d'un objet XMLHTTPRequest par la methode Microsoft ou Open Source.
*/
function setXHR(){
 var xhr; 
    try {  xhr = new ActiveXObject('Msxml2.XMLHTTP');   }
    catch (e) {
        try {   xhr = new ActiveXObject('Microsoft.XMLHTTP');    }
        catch (e2) {
          try {  xhr = new XMLHttpRequest();     }
          catch (e3) {  xhr = false;   }
        }//catch e2
     }//catch e
	return xhr;
}//setXHR

/**
* Lorsqu'un utilisateur enregistre se connecte au site, on enregistre son IP dans ses donnees personnelles et on rafraichit ensuite les elements necessaires si son authentification est verifiee. Le procede par adresse IP lui permettra de reacceder au site en mode connecte depuis la meme machine sans se reconnecter.
*/
function connectUser(){
	var Login = document.authentification.login.value;
	var password = document.authentification.password.value;
	var ip = getIP();
	//on verifie s'il s'agit d'un etudiant
	num = seekStudentLogin(Login, password, ip);
	//num vaut zero si seekStudentLogin a echoue dans sa recherche
	if (num == 0) {
		num = seekCompanyLogin(Login, password, ip);
		//il se peut que seekCompanyLogin echoue aussi : cela signifie que l'utilisateur n'est pas enregistre
		if (num != 0) {
			//s'il s'agit d'une entreprise
			check = Login;
			isStudent = 2;
			//rafraichessement de l'entete de la page.
			header();
			//rafraichissement de la fenetre de connexion.
			document.getElementById('connected').innerHTML = presentConnected();
		}//si entreprise
	}
	else {
		//s'il s'agit d'un etudiant
		check = Login;
		isStudent = 1;
		header();
		document.getElementById('connected').innerHTML = presentConnected();
	}//si etudiant
}//connectUser

/**
*Lorsqu'un utilisateur se deconnecte, on retire son adresse IP de ses informations personnelles. et on rafraichit ce qui doit l'etre.
*/
function disconnect(Login){
	var xhr = setXHR ();
	//il est impossible de lister un repertoire en javascript c'est pourquoi il faut noter le nombre d'utilisateurs inscrits sur le site dans un fichier pour pouvoir boucler sur les fichiers XML.
	xhr.open("GET", "XML/XML/data.xml", false);
	xhr.send(null);
	var nbOfStudents = getDataWithXML("students", xhr);
	var nbOfCompanies = getDataWithXML("companies", xhr);
	for (i = 1 ; i <= nbOfStudents ; i++) {
		xhr.open("GET", "XML/XML/students/student_" + i + ".xml", false);
		xhr.send(null);
		var xmlLogin = getDataWithXML("Login", xhr);
		if (Login == xmlLogin) {
			//Une fois le bon fichier trouve
			var file = "student_" + i;
			//on efface l'adresse IP
			setDataInXML(file, "lastIP", "0.0.0.0");
			//et on rafraichit l'entete
			isStudent = 0; check = 0; header();
			return 0;
		}//if
	}//for
	for (i = 1 ; i <= nbOfCompanies ; i++) {
		xhr.open("GET", "XML/XML/companies/company_" + i + ".xml", false);
		xhr.send(null);
		var xmlLogin = getDataWithXML("Login", xhr);
		if (Login == xmlLogin) {
			var file = "company_" + i;
			setDataInXML(file, "lastIP", "0.0.0.0");
			isStudent = 0; check = 0; header();
			return 0;
		}//if
	}//for
	return 1;
}//disconnect

/**
*@divArea est l'id de la balise div dans laquelle on insere le HTML
* Les entreprises ont acces aux informations des etudiants qui l'autorisent,
* ces informations sont presentees dans un tableau.
*/
function listStudents(divArea){
	var stringToInsert = "<table id='studentsTab' class=\"sortable\"><thead><tr><th>Nom</th><th>Prenom</th><th>Ville</th><th>Diplome</th><th>Promotion</th></tr></thead><tbody>";
	var xhr = setXHR ();
	xhr.open("GET", "XML/XML/data.xml", false);
	xhr.send(null);
	var nbOfStudents = getDataWithXML("students", xhr);
	for (i = 1 ; i <= nbOfStudents ; i++) {
		xhr.open("GET", "XML/XML/students/student_" + i + ".xml", false);
		xhr.send(null);
		if (getDataWithXML("Disponibilité", xhr) == 1) {
			stringToInsert = stringToInsert + "<tr><td>" + getDataWithXML("Nom", xhr) + "</td>";
			stringToInsert = stringToInsert + "<td>" + getDataWithXML("Prenom", xhr) + "</td>";
			stringToInsert = stringToInsert + "<td>" + getDataWithXML("Ville", xhr) + "</td>";
			//certains champs ne sont pas obligatoires a remplir
			try { 
				stringToInsert = stringToInsert + "<td>" + getDataWithXML("Diplome", xhr) + "</td>";
				stringToInsert = stringToInsert + "<td>" + getDataWithXML("Promotion", xhr) + "</td></tr>";
			} catch (e) {
				stringToInsert += "<td></td><td></td></tr>";
			}//catch
		}//if
	}//for
	stringToInsert = stringToInsert + "</tbody></table>";
	document.getElementById(divArea).innerHTML = stringToInsert;
}//listStudents

/**
*@Login @Password de l'authentification, @ip est calcule par PHP.
*retour : 0 si echec, 1 si succes
*Recherche d'un utilisateur parmi les etudiants
*/
function seekStudentLogin (Login, password, ip){
	var xhr = setXHR ();
	xhr.open("GET", "XML/XML/data.xml", false);
	xhr.send(null);
	var nbOfStudents = getDataWithXML("students", xhr);
	for (i = 1 ; i <= nbOfStudents ; i++) {
		var file = "student_" + i;
		xhr.open("GET", "XML/XML/students/" + file + ".xml", false);
		xhr.send(null);
		var xmlLogin = getDataWithXML("Login", xhr);
		var xmlPassword = getDataWithXML("Mot_de_passe", xhr);
		//on ne change rien si le login ET le mot de passe ne correspondent pas
		if (Login == xmlLogin && password == xmlPassword) {
			setDataInXML(file, "lastIP", ip);
			return 1;
		}//if
	}//for
	return 0;
}//seekStudentLogin

/**
*@ip
*retour : Login de la personne connectee
*Si une personne est connectee au site, son IP est incluse dans son fichier XML,
* il faut trouver de quel fichier il s'agit
*/
function seekStudentIP (ip){
	var xhr = setXHR ();
	xhr.open("GET", "XML/XML/data.xml", false);
	xhr.send(null);
	var nbOfStudents = getDataWithXML("students", xhr);
	for (i = 1 ; i <= nbOfStudents ; i++) {
		xhr.open("GET", "XML/XML/students/student_" + i + ".xml", false);
		xhr.send(null);
		var lastIP = getDataWithXML("lastIP", xhr);
		if (lastIP == ip) {
			return getDataWithXML("Login", xhr);
		}//if
	}//for
	return 0;
}//seekStudentIP

/**
*@divArea est l'id de la balise div dans laquelle on insere le HTML
*les etudiants ont acces aux informations des entreprises qui le permettent.
*/
function listCompanies(divArea){
	var stringToInsert = "<table id='companiesTab' class=\"sortable\"><thead><tr><th>Nom</th><th>Pays</th></tr></thead><tbody>";
	var xhr = setXHR ();
	xhr.open("GET", "XML/XML/data.xml", false);
	xhr.send(null);
	var nbOfCompanies = getDataWithXML("companies", xhr);
	for (i = 1 ; i <= nbOfCompanies ; i++) {
		xhr.open("GET", "XML/XML/companies/company_" + i + ".xml", false);
		xhr.send(null);
		if (getDataWithXML("Autorisation", xhr) == 1) {
			stringToInsert = stringToInsert + "<tr><td>" + getDataWithXML("Nom", xhr) + "</td>";
			stringToInsert = stringToInsert + "<td>" + getDataWithXML("Pays", xhr) + "</td></tr>";
		}//if
	}//for
	stringToInsert = stringToInsert + "</tbody></table>";
	document.getElementById(divArea).innerHTML = stringToInsert;
}//listCompanies

/**
*retour : 0 si echec, 1 si succes
*Recherche d'un utilisateur parmi les entreprises
*/
function seekCompanyLogin (Login, password, ip){
	var xhr = setXHR ();
	xhr.open("GET", "XML/XML/data.xml", false);
	xhr.send(null);
	var nbOfCompanies = getDataWithXML("companies", xhr);
	for (i = 1 ; i <= nbOfCompanies ; i++) {
		var file = "company_" + i;
		xhr.open("GET", "XML/XML/companies/" + file + ".xml", false);
		xhr.send(null);
		var xmlLogin = getDataWithXML("Login", xhr);
		var xmlPassword = getDataWithXML("Mot_de_passe", xhr);
		if (Login == xmlLogin && password == xmlPassword) {
			setDataInXML(file, "lastIP", ip);
			return 1;
		}//if
	}//for
	return 0;
}//seekCompanyLogin

/**
*Idem seekStudentIP
*/
function seekCompanyIP (ip){
	var xhr = setXHR ();
	xhr.open("GET", "XML/XML/data.xml", false);
	xhr.send(null);
	var nbOfCompanies = getDataWithXML("companies", xhr);
	for (i = 1 ; i <= nbOfCompanies ; i++) {
		//xhr = setXHR ();
		xhr.open("GET", "XML/XML/companies/company_" + i + ".xml", false);
		xhr.send(null);
		var lastIP = getDataWithXML("lastIP", xhr);
		//lastIP = "<b>" + lastIP + "</b>";
		if (lastIP == ip) {
			return getDataWithXML("Login", xhr);
		}//if
	}//for
	return 0;
}//seekCompanyIP

/**
*cette fontion renvoie le fichier (url) de la personne connectee afin que celui ci soit traite ensuite
*/
function loadProfile (){
	var xhr = setXHR ();
	xhr.open("GET", "XML/XML/data.xml", false);
	xhr.send(null);
	var path = "XML/XML/";
	switch (isStudent) {
		case 1 : 
			path += "students/student_"; 
			var nb = getDataWithXML("students", xhr);
			break;
		case 2 : 
			path += "companies/company_"; 
			var nb = getDataWithXML("companies", xhr);
			break;
		default : path = "erreur"; return;
	}//switch
	for (i = 1 ; i <= nb ; i++) {
		var file = path + i;
		xhr.open("GET", file + ".xml", false);
		xhr.send(null);
		var xmlLogin = getDataWithXML("Login", xhr);
		if (check == xmlLogin) {
			//ex : file = "/XML/XML/students/student_2.xml"
			return file;
		}//if
	}//for
	return 0;
}//loadProfile
