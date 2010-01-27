// isStudent =0 pour visiteur non connecté, =1 pour connexion comme étudiant, =2 pour connexion comme entreprise.
var isStudent = 0;
//check =0 si isStudent =0, sinon il prend la valeur du login de la personne connectée.
var check = 0;

/**
*Header insere l'en tete et le menu
*ce menu change en fonction du statut de la personne connectee
*/
function header () {
	//recuperation de l'intitule de la page dans une balise div invisible
	var page = document.getElementById("page").innerHTML;
	//en fonction de l'IP, on verifie si la personne n'est pas utilisatrice enregistree
	check = checkConnection();
	var titleString, linksString;
	var studentsList = "<li><a href='studentsList.html'>Etudiants</a></li>";
	var companiesList = "<li><a href='companiesList.html'>Entreprises</a></li>";
	var inscription = "<li><a href='registration.html'>Inscription</a></li>";
	var partenaires = "<li><a href='links.html'>Nos Partenaires</a></li>";
	var homepage = "<li><a href='homePage.html'>Accueil</a></li>";
	var profile = "<li><a href='profile.html'>Profil Utilisateur</a></li>";
	var map = "<li><a href='map.html'>Plan d'accès</a></li>";
	switch (page) {
		case "accueil" : 
			titleString = "Bienvenue sur ce site de rencontres inter étudiants et entreprises";
			linksString = "<ul>";
			switch (isStudent){
				case 0 : linksString += inscription; break;
				case 1 : linksString += companiesList + profile; break;
				default : linksString += studentsList + profile; break;
			}//switch
			linksString += partenaires + map + "</ul>";
			break;
		case "studentsList" : 
			titleString = "Etudiants : Ces personnes se sont inscrites sur le site afin d'y trouver un stage";
			linksString = "<ul>" + map + homepage + partenaires + profile + "</ul>";//isStudent = 1
			break;
		case "companiesList" : 
			titleString = "Entreprises : sociétés proposant des stages";
			linksString = "<ul>" + homepage + map + partenaires + profile + "</ul>";//isStudent = 2
			break;
		case "inscription" : 
			titleString = "Inscription : obtention de compte";
			linksString = "<ul>" + partenaires + homepage + map + "</ul>";//isStudent = 0
			break;
		case "map" : 
			titleString = "Plan : Accès au forum";
			linksString = "<ul>";
			switch (isStudent){
				case 0 : linksString += inscription; break;
				case 1 : linksString += companiesList + profile; break;
				default : linksString += studentsList + profile; break;
			}//switch
			linksString += homepage + partenaires + "</ul>";
			break;
		case "partenaires" : 
			titleString = "Partenaires : liste de nos partenaires";
			linksString = "<ul>";
			switch (isStudent){
				case 0 : linksString += inscription; break;
				case 1 : linksString += companiesList + profile; break;
				default : linksString += studentsList + profile; break;
			}//switch
			linksString += homepage + map + "</ul>";
			break;
		case "profile" : 
			titleString = "Profil : modification de vos données";
			linksString = "<ul>";
			if (isStudent == 1) {
				linksString += companiesList;
			} else {
				linksString += studentsList;
			}//switch
			linksString += homepage + partenaires + map + "</ul>";
			break;
		default : 
			titleString = "Erreur Interne !!!!";
			linksString = "";
			break;
	}//switch
	var stringIP = "Vous êtes connecté depuis : " + getIP();
	var stringIMG = "<div id='header'><div id='logo'><a href='homePage.html'></a></div></div>";
	var stringToInsert = stringIP + "<div id='top'></div>" + stringIMG + "<div id=\"title\" >" + titleString + "</div><div class='pill_m'><div class=\"pillmenu\" >" + linksString + "</div></div>";
	document.getElementById("H_"+page).innerHTML = stringToInsert;
}//header

/**
*le menu de gauche
*/
function leftmenu (){
	document.write("																						<div class='module_menu'>																		<div><div><div><h3>Informations</h3><ul class='menu'><li ><a href='map.html'>Consultez le plan d'accès</a></li><li><a href='registration.html'>Mettez en ligne votre CV</a></li></ul>																		</div></div></div>																	</div>																				<div class='module'>																			<div><div><div><h3>Votre Compte</h3><ul class='menu'><li class='item53'><a href='registration.html'>Créer un compte exposants</a></li><li><a href='registration.html'>Créer un compte visiteurs</a></li></ul>														</div></div></div>																	</div>																				<div class='module'>																			<div><div><div><h3>Style</h3><ul class='menu'><li><a  href='javascript:setActiveStyleSheet(\"css1\")'>Style 1</a></li><li>    <a  href='javascript:setActiveStyleSheet(\"css2\")'>Style 2</a></li><li><a  href='javascript:setActiveStyleSheet(\"css3\")'>Style 3</a></li></ul>				</div></div></div>																	</div>																				<div class='module_menu'>																		<div><div><div><h3>Partenaires</h3><ul class='menu'><a href='http://www.chezmoicamarche.org'><img src='images/afij.jpg' /></a><a href='http://www.chezmoicamarche.org'><img src='img/apec.jpg' /></a><a href='http://www.chezmoicamarche.org'><img src='img/anpe.jpg' /></a><a href='http://www.chezmoicamarche.org'><img src='img/placeojeunes.jpg' /></a><br /><br /><li><a href='links.html'>Liste des écoles partenaires</a></li></ul><br />					</div></div></div>																	</div><div class='module'>																		<div><div><div><h3>Identification</h3>																	<div id='connected'></div>																	<script>document.getElementById('connected').innerHTML = manageConnection();</script>									</div></div></div>																	</div>");
}//leftmenu

/**
*Le sous menu : bas de page contenant des accroches de la page.
*/
function footer (){
	var page = document.getElementById("page").innerHTML;
	var sousMenu;
	switch (page) {
		case "accueil" : 
			sousMenu = "<ul><li><a href='#Intro'>Introduction</a></li><li><a href='#Presentation'>Présentation</a></li><li><a href='#Prog'>Programme</a></li></ul>";
			break;
		case "inscription" : 
			sousMenu = "";
			break;
		case "partenaires" : 
			sousMenu = "";
			break;
		case "studentsList" : 
			sousMenu = "";
			break;
		case "companiesList" : 
			sousMenu = "";
			break;
		case "profile" : 
			sousMenu = "";
			break;
		case "map" : 
			sousMenu = "";
			break;
		default : sousMenu = "Erreur Interne !!!!";
	}//switch
	var stringToInsert = "<p><a href='http://validator.w3.org/check?uri=referer'><img src='http://www.w3.org/Icons/valid-xhtml10'  alt='Valid XHTML 1.0 Strict' class='Validator' /></a>   <a href='http://jigsaw.w3.org/css-validator/'> <img class='Validator' src='http://jigsaw.w3.org/css-validator/images/vcss' alt='CSS Valide !' />   </a></p>	<span class='article_separator'>&nbsp;</span>";
	document.getElementById("F_"+page).innerHTML = ("<div class='pill_m'><div class=\"pillmenu\" >" + sousMenu + "</div></div>"+stringToInsert);
}//footer

/**
*retour : login de la personne connectee, 0 si utilisateur non enregistre
*/
function checkConnection(){
	var ip = getIP();
	num = seekStudentIP(ip);
	if (num == 0) {
		num = seekCompanyIP(ip);
		if (num != 0) isStudent = 2;
		//num a soit change soit pas change.
		return num;
	}//if
	else {
		//si etudiant
		if (num != 0) isStudent = 1;
		return num;
	}//else
}//checkConnection

/**
*retourne une chaine de caractere a inserer dans la fenetre de connexion en mode connecte
*/
function presentConnected(){
	return ("Bienvenue "+check+"<br/><input type='button' name='deconnexion' value='Deconnexion' onClick='javascript:disconnect(\"" + check + "\")'/>");
}//presentConnected

/**
*retourne le code HTML necessaire a presenter la fenetre d'authetification
*/
function presentUnconnected(){
	return ("<form id=\"form-login\" name='authentification'><fieldset class='input'> Identifiant : <input name='login'/> Mot de Passe : <input name='password' type=\"password\"/> <input type=\"submit\" value=\"Valider\" onClick='javascript:connectUser()'/></fieldset></form>");
}//presentUnconnected

/**
*modifie la fenetre de connexion en fonction du mode connecte ou non connecte
*/
function manageConnection(){
	if(check == 0)
		return presentUnconnected();
	else 
		return presentConnected(check);
}//manageConnection
