
/**
* Cette methode procede a une transformation XSLT sur un XSchéma sans lancer de PHP,
* l'objet XSLTProcessor est suffisant.
*/
 function Init(id,xsl,xml){
	try {
	  if (window.XSLTProcessor && window.XMLHttpRequest) {//si Mozilla
		  var xmlDoc;
		  var xslStylesheet;
		  var xsltProcessor = new XSLTProcessor();
		  var myXMLHTTPRequest = new XMLHttpRequest();
		  myXMLHTTPRequest.open("GET", xsl, false);
		  myXMLHTTPRequest.send(null);
		  xslStylesheet = myXMLHTTPRequest.responseXML;
		  xsltProcessor.importStylesheet(xslStylesheet);
		  myXMLHTTPRequest = new XMLHttpRequest();
		  myXMLHTTPRequest.open("GET", xml, false);
		  myXMLHTTPRequest.send(null);
		  xmlDoc = myXMLHTTPRequest.responseXML;
		  var target = document.getElementById(id);
		  var doc = xsltProcessor.transformToDocument(xmlDoc);
		  var xmls = new XMLSerializer();
		  target.innerHTML = xmls.serializeToString(doc);
	  // ActiveX pour Internet Explorer
	  } else if (window.ActiveXObject) {
 	    var xmlDoc;
 	    var xslDoc;
		try {
		  xmlDoc = new ActiveXObject('Msxml2.XMLDOM');
		} catch (e) {
		  xmlDoc = new ActiveXObject('Microsoft.XMLDOM');
		}
		try {
		  xslDoc = new ActiveXObject('Msxml2.XMLDOM');
		} catch (e) {
		  xslDoc = new ActiveXObject('Microsoft.XMLDOM');
		}//catch
		xmlDoc.async = false;
		xmlDoc.load(xml);
		xslDoc.async = false;
		xslDoc.load(xsl);
		var target = document.getElementById(id);
		target.innerHTML = xmlDoc.transformNode(xslDoc);
	  }//si IE
	} catch (e) {
	  return e;
	}//catch
}//Init

/**
*Cette fonction s'utilise en placant au prealable dans votre code des balises <underscore/> autour
* des chaines de caracteres sur lesquelles operer. Le code enleve les '_' de ces chaines.
*/
function replace_(){
	var i = 0;
	var size = document.getElementsByTagName("underscore").length;
	while (i<size) {
		var ctrl = document.getElementsByTagName("underscore")[i].innerHTML;
		/* La fonction replace de javascript ne procede aux remplacements de plusieurs occurences, 
		or certains de nos elements contiennent plusieurs "_". C'est pourquoi l'appel a replace()
		est repete deux fois */
		document.getElementsByTagName("underscore")[i].innerHTML = ctrl.replace("_", " ").replace("_", " ");
		i++;
	}//while
}//replace_

/**
*dubbleSection permet d'ajouter des champs dynamiquement aux formulaires. Il gere le changement
*dynamique des noms des input afin de ne pas alterer l'enregistrement des donnees.
*/
function dubbleSection(aName){
	aName = "section_" + aName;
	var tab = document.getElementById(aName);
	//il faut dupliquer l'element pour pouvoir modifier des donnees sans alterer le contenu veritable
	var toAdd = document.createElement('toAdd');
	toAdd.innerHTML = tab.innerHTML;
	var tabToAdd = toAdd.getElementsByTagName('table');
	var deb = tabToAdd.length - 1;
	for (var i=deb - 1; i>=0; i--) {
		toAdd.removeChild(tabToAdd[i]);
	}//on retire les elements a ne pas repeter => la taille de tabToAdd change
	for (var i=0; i<tabToAdd.length; i++) {
		//alert("iug");
		var inputTab = tabToAdd[i].getElementsByTagName('input');
		for (var j=0; j<inputTab.length; j++){
			var str = tabToAdd[i].getElementsByTagName('input')[j].getAttribute('name');
			var c = deb + 1;
			str = str.replace(deb, c);
			tabToAdd[i].getElementsByTagName('input')[j].setAttribute('name', str);
		}//for j
	}//for i
	//ensuite on ajoute le nouveau contenu a l'ancien.
	tab.innerHTML += toAdd.innerHTML;
}//dubbleSection

