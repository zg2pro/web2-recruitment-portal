<xsl:stylesheet version="1.0" 
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xsd="http://www.w3.org/2001/XMLSchema">
	<xsl:output 
  		encoding="utf8"
  		method="html"
  		indent="yes" />
 

<!-- ceci est la generation du formulaire d'inscription a partir du schema -->


<xsl:template match="/xsd:schema">
	<form name="registration" id="form-registration">
	<!-- on souhaite ecrire le type de personne  inscrire, cela sera aussi utile a l'enregistrement -->
	<h1><status><xsl:value-of select="./xsd:element[1]/@name"/></status></h1>
	<table>
		<xsl:apply-templates select="./xsd:element[1]"/>
	</table>
	<input value="valider" type="submit" onClick='javascript:registerUser()'/>
	</form>
</xsl:template>

<!-- Pour les éléments ne contenant pas d'éléments fils -->
<xsl:template name="main" match="xsd:element[count(.//xsd:complexType) = 0]">
	<tr>
	<xsl:choose>
		<!-- le schéma contient un élément lastIP utile aux connexions de l'utilisateur mais l'utilisateur n'a pas a fournir sciament cette information -->
		<xsl:when test="contains(@name, 'IP')">
		</xsl:when>
		<!-- pour les etudiants -->
		<xsl:when test="contains(@name, 'Dispo')">
			<td><h2><xsl:value-of select="@name"/></h2></td><td>
			<select name="combo_{@name}">
				<option value="1">Autoriser les entreprises à consulter vos informations</option>
				<option value="0">Ne pas autoriser les entreprises à consulter vos informations</option>
			</select>
			</td>
		</xsl:when>
		<!-- pour les entreprises -->
		<xsl:when test="contains(@name, 'Autoris')">
			<td><h2><xsl:value-of select="@name"/></h2></td><td>
			<select name="combo_{@name}">
				<option value="1">Autoriser les étudiants à consulter vos informations</option>
				<option value="0">Ne pas autoriser les étudiants à consulter vos informations</option>
			</select>
			</td>
		</xsl:when>
		<!-- le mot de passe doit etre tappe a l'abri des regards -->
		<xsl:when test="contains(@name, 'Mot_de_passe')">
			<td><h2> <underscore><xsl:value-of select="@name"/></underscore></h2></td><td>
				<input type="password" name="{@name}"/>
			</td>
		</xsl:when>
		<xsl:when test="contains(@name, 'Sexe')">
			<td><h2><xsl:value-of select="@name"/></h2></td><td>
			<select name="combo_{@name}">
				<option>M</option>
				<option>F</option>
			</select>
			</td>
		</xsl:when>
		<xsl:when test="contains(@name, 'Adresse')">
			<td><h2><xsl:value-of select="@name"/></h2></td><td>
				<textarea name="{@name}"/>
			</td>
		</xsl:when>
		<xsl:when test="contains(@name, 'Activité')">
			<td><h2><xsl:value-of select="@name"/></h2></td><td>
				<textarea name="{@name}"/>
			</td>
		</xsl:when>
		<xsl:when test="contains(@name, 'Comp')">
			<td><h2><xsl:value-of select="@name"/></h2></td><td>
				<textarea name="{@name}"/>
			</td>
		</xsl:when>
		<xsl:otherwise>
			<td><h2><underscore><xsl:value-of select="@name"/></underscore></h2></td><td>
			<input type="text" name="{@name}"/>
			</td>
		</xsl:otherwise>
	</xsl:choose>
	</tr>
</xsl:template>


<!-- Pour les éléments contenant un ou des éléments fils -->
<xsl:template match="xsd:element[count(.//xsd:complexType) = 1]">
	<tr><td><h1><xsl:value-of select="@name"/></h1></td><td>
	<xsl:if test="contains(@maxOccurs, 'unbounded')">
		<!-- en fonction du schéma on permet ou pas d'ajouter des éléments -->
		<input type="button" value="+" name="buttonplus_{@name}" onClick="javascript:dubbleSection('{@name}')"/>
	</xsl:if></td></tr>
	<!-- xsl ne traite pas correctement le contenu d'un div, les elements fils sont donc forcement places dans une table introduite a l'interieur de la table principale -->
	<tr><td id="section_{@name}">
			<table>
		<xsl:for-each select="./xsd:complexType/xsd:sequence/xsd:element">
			<tr>
				<td><h2><xsl:value-of select="@name"/></h2></td><td>
				<!-- ce count determine la position du parent -->
				<input type="text" name="{@name}{count(parent::*/preceding-sibling::*)}"/>
				</td>
			</tr>
		</xsl:for-each>
			</table>
	<br/><td></td></td></tr>
</xsl:template>
 
</xsl:stylesheet>
 
