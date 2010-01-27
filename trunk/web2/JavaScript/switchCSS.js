 function verification_login(f)
{ 

  if(f[1].value == '')
  { 
    alert('Indiquez votre Identifiant , SVP.');
    f[1].focus();
    return(false); 
  }

  if(f[2].value == '')
  { 
    alert('Indiquez votre Mot de passe  , SVP.');
    f[2].focus();
    return(false); 
  }
  


  

}


function verif_compte_visiteur(f) {
	
	 if(f[0].value == '')
  { 
    alert('Indiquez votre nom , SVP.');
    f[0].focus();
    return(false); 
  }
  
  if(f[0].value.search(/[\/^'$():*+<>?#\"{}\\]/)!=-1){
    alert('Caratères interdit dans le champ nom ');
    f[0].focus();
    return(false);
    }

	if((f[0].value.search(/[0-9]{1,}/)!=-1))
  { 
    alert('Pas de chiffres dans le champ nom , SVP.');
    f[0].focus();
    return(false); 
  } 
	
	
	if(f[1].value == '')
  { 
    alert('Indiquez votre prenom , SVP.');
    f[1].focus();
    return(false); 
  }
  
  if(f[1].value.search(/[\/^'$():*+<>?#\"{}\\]/)!=-1){
    alert('Caratères interdit dans le champ prenom ');
    f[1].focus();
    return(false);
    }

	if((f[1].value.search(/[0-9]{1,}/)!=-1))
  { 
    alert('Pas de chiffres dans le champ prenom , SVP.');
    f[1].focus();
    return(false); 
  } 
  
  
	if(f[5].value == '')
  { 
    alert('Indiquez votre adresse , SVP.');
    f[5].focus();
    return(false); 
  }
  
  if(f[5].value.search(/[\/^'$():*+<>?#\"{}\\]/)!=-1){
    alert('Caratères interdit dans le champ adresse ');
    f[5].focus();
    return(false);
    }

	if(f[6].value == '')
  { 
    alert('Indiquez votre code postal , SVP.');
    f[6].focus();
    return(false); 
  }
  
  if((f[6].value.search(/[0-9]{1,}/)==-1))
  { 
    alert('Que des chiffres dans le champ code postal , SVP.');
    f[6].focus();
    return(false); 
  } 
	
  
	if(f[7].value == '')
  { 
    alert('Indiquez votre ville , SVP.');
    f[7].focus();
    return(false); 
  }
  
  if(f[7].value.search(/[\/^'$():*+<>?#\"{}\\]/)!=-1){
    alert('Caratères interdit dans le champ ville ');
    f[7].focus();
    return(false);
    }

	if((f[7].value.search(/[0-9]{1,}/)!=-1))
  { 
    alert('Pas de chiffres dans le champ ville , SVP.');
    f[7].focus();
    return(false); 
  } 
  
  
  
	if(f[8].value == '')
  { 
    alert('Indiquez votre pays , SVP.');
    f[8].focus();
    return(false); 
  }
  
  if(f[8].value.search(/[\/^'$():*+<>?#\"{}\\]/)!=-1){
    alert('Caratères interdit dans le champ  pays ');
    f[8].focus();
    return(false);
    }

	if((f[8].value.search(/[0-9]{1,}/)!=-1))
  { 
    alert('Pas de chiffres dans le champ pays , SVP.');
    f[8].focus();
    return(false); 
  } 
  
  
  	if(f[9].value == '')
  { 
    alert('Indiquez votre telephone , SVP.');
    f[9].focus();
    return(false); 
  }
  
  if((f[9].value.search(/[0-9]{1,}/)==-1))
  { 
    alert('Que des chiffres dans le champ telephone , SVP.');
    f[9].focus();
    return(false); 
  } 
  
   if((f[10].value==''))
  { 
    alert('Indique votre email , SVP.');
    f[10].focus();
    return(false); 
  } 
  
  var goodEmail = f[10].value.match(/\b(^(\S+@).+((\.com)|(\.net)|(\.edu)|(\.fr)|(\.mil)|(\.gov)|(\.org)|(\..{2,2}))$)\b/gi);

  if (!goodEmail){
   alert('Veuillez entrer un e-mail valide')
   f[10].focus()
   return(false); 
   }

   if(f[11].value == '')
  { 
    alert('Indiquez votre diplome 1 , SVP.');
    f[11].focus();
    return(false); 
  }
  
  if(f[11].value.search(/[\/^'$():*+<>?#\"{}\\]/)!=-1){
    alert('Caratères interdit dans le champ  diplome 1 ');
    f[11].focus();
    return(false);
    }

  
   if(f[12].value == '')
  { 
    alert('Indiquez votre etablissement 1 , SVP.');
    f[12].focus();
    return(false); 
  }
  
  if(f[12].value.search(/[\/^'$():*+<>?#\"{}\\]/)!=-1){
    alert('Caratères interdit dans le champ  etablissement 1 ');
    f[12].focus();
    return(false);
    }
	
	
	
   if(f[14].value == '')
  { 
    alert('Indiquez votre diplome 2 , SVP.');
    f[14].focus();
    return(false); 
  }
  
  if(f[14].value.search(/[\/^'$():*+<>?#\"{}\\]/)!=-1){
    alert('Caratères interdit dans le champ  diplome 2 ');
    f[14].focus();
    return(false);
    }
	
	
 
}

 i = 0;
//ajout d'un champ formation
function create_champ_formation() {
	
	
	if(i<1) {
	document.getElementById('champs').innerHTML +="<div id='champs_"+i+"' style='display:block'>"+
"<tr>"+
"<td>Diplome :</td>"+
"<td ><input type='text' name='diplome"+i+"' value='' id='diplome"+i+"'/></td>"+
"<td >Etablissement :</td>"+
"<td ><input type='text' name='etablissement"+i+"' value='' id='etablissement"+i+"'/></td>"+
"<td >Promotion :</td>"+
"<td ><select name='promotion"+i+"' id='promotion"+i+"'>"+
"<option>2011</option>"+
"<option>2010</option>"+
"<option>2009</option>"+
"<option>2008</option>"+
"<option>2007</option>"+
"<option>2006</option>"+
"<option>2005</option>"+
"<option>2004</option>"+
"</select></td></tr>"+
		"</div>";
	}
	else{
		document.getElementById('champs').innerHTML += "<div id='champs_"+i+"' style='display:block'>"+
		"<tr >"+
"<td>Diplome :</td>"+
"<td ><input type='text' name='diplome"+i+"' value='' id='diplome"+i+"'/></td>"+
"<td >Etablissement :</td>"+
"<td ><input type='text' name='etablissement"+i+"' value='' id='etablissement"+i+"'/></td>"+
"<td >Promotion :</td>"+
"<td ><select name='promotion"+i+"' id='promotion"+i+"'>"+
"<option>2011</option>"+
"<option>2010</option>"+
"<option>2009</option>"+
"<option>2008</option>"+
"<option>2007</option>"+
"<option>2006</option>"+
"<option>2005</option>"+
"<option>2004</option>"+
"</select></td>"+
"<td><input type='button' value='-' onClick='sup_champ_formation("+i+")' /></td>"+
"</tr>"+
"</div>";
	}
	i++;
	
}


function  sup_champ_formation(i) {
	var parent = document.getElementById("champs_"+i).parentNode;
	parent.removeChild(document.getElementById("champs_"+i));
	
}



function setActiveStyleSheet(title) {
   var i, a, main;
   for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
     if(a.getAttribute("rel").indexOf("style") != -1
        && a.getAttribute("title")) {
       a.disabled = true;
       if(a.getAttribute("title") == title) a.disabled = false;
     }
   }
}