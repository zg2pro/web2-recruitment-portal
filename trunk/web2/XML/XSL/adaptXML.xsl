<?xml version="1.0" encoding="utf8"?>
<xsl:stylesheet version="1.0" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output 
  		encoding="utf8"
  		method="html"
  		indent="yes" />

<!-- ceci est la generation du formulaire de profil pre rempli avec les valeurs deja presentes dans le XML de l'utilisateur -->


<xsl:template match="/">
<form name="profile" id="form-profile">
<h1>Modification du profil <xsl:value-of select="//Login[1]"/></h1>
Statut : <status><xsl:value-of select="local-name(child::*[1])"/></status>
<table>
<!-- pour chaque element (simple ou complexe) -->
<xsl:for-each select="child::*/child::*">
	<tr>
	<xsl:choose>
	<!-- ici on distingue les elements complexes -->
	<xsl:when test="count(descendant::*) > 0">
		<!-- la fonction local-name fournit le contenu de la balise -->
		<td><h2><xsl:value-of select="local-name(.)"/></h2></td>
		<td>
		<!-- l'attribut unbounded du schema n'etant plus accessible ici, il est obligatoire de connaitre le contenu des balises -->
		<xsl:if test="contains(local-name(.), 'Formation') or contains(local-name(.), 'Langues')">
			<xsl:element name="input">
				<xsl:attribute name="type">button</xsl:attribute>
				<xsl:attribute name="value">+</xsl:attribute>
				<xsl:attribute name="onClick">javascript:dubbleSection("<xsl:value-of select="local-name(.)"/>")</xsl:attribute>
			</xsl:element>
		</xsl:if>
		</td>
		<tr><td id="section_{local-name(.)}">
			<table>
		<xsl:for-each select="descendant::*">
		<tr><td><xsl:value-of select="local-name(.)"/></td><td>
			<xsl:element name="input">
				<!-- on ne peut pas mettre local-name() dans la condition du preceding cibling directement car il n'est pas interprete -->
				<xsl:choose>
				<xsl:when test="contains(local-name(parent::*), Formation)">
					<xsl:attribute name="name"><xsl:value-of select="concat(local-name(.), count(parent::*/preceding-sibling::*[Formation]))"/></xsl:attribute>
				</xsl:when>
				<xsl:otherwise>
					<xsl:attribute name="name"><xsl:value-of select="concat(local-name(.), count(parent::*/preceding-sibling::*[Langues]))"/></xsl:attribute>
				</xsl:otherwise>
				</xsl:choose>
				<xsl:attribute name="value"><xsl:value-of select="."/></xsl:attribute>
			</xsl:element>
		</td></tr>
		</xsl:for-each>
		</table>
		</td><td></td></tr>
	</xsl:when>
	<!-- ici on distingue les elements de type simple -->
	<xsl:otherwise>
		<xsl:if test="not(contains(local-name(.), 'lastIP'))">
		<xsl:choose>
		<!-- en mettant les competences dans un textarea ca fait n'importe quoi. -->
		<xsl:when test="contains(local-name(.), 'Comp')">
			<td><underscore><xsl:value-of select="local-name(.)"/></underscore></td><td>
			<!--xsl:element name="textarea"-->
			<xsl:element name="input">
				<xsl:attribute name="name"><xsl:value-of select="local-name(.)"/></xsl:attribute>
				<xsl:attribute name="value"><xsl:value-of select="."/></xsl:attribute>
			</xsl:element>
			</td>
		</xsl:when>
		<!-- en mettant les competences dans un textarea ca fait n'importe quoi. -->
		<xsl:when test="contains(local-name(.), 'Mot')">
			<td><underscore><xsl:value-of select="local-name(.)"/></underscore></td><td>
			<xsl:element name="input">
				<xsl:attribute name="type">password</xsl:attribute>
				<xsl:attribute name="name"><xsl:value-of select="local-name(.)"/></xsl:attribute>
				<xsl:attribute name="value"><xsl:value-of select="."/></xsl:attribute>
			</xsl:element>
			</td>
		</xsl:when>
		<!-- on affiche le sexe deja rentre par defaut -->
		<xsl:when test="contains(local-name(.), 'Sexe')">
			<td><underscore><xsl:value-of select="local-name(.)"/></underscore></td><td>
			<select name="{local-name(.)}">
				<option> <xsl:value-of select="."/> </option>
				<option>
					<xsl:choose>
						<xsl:when test="contains(., 'F')"> M </xsl:when>
						<xsl:otherwise> F </xsl:otherwise>
					</xsl:choose>
				</option>
			</select>
			</td>
		</xsl:when>
		<xsl:when test="contains(local-name(.), 'Autorisation')">
			<td><underscore><xsl:value-of select="local-name(.)"/></underscore></td><td>
			<select name="{local-name(.)}">
				<option> 
					<xsl:choose>
						<xsl:when test="contains(., '1')"> Autoriser les étudiants à consulter vos informations </xsl:when>
						<xsl:otherwise> Ne pas autoriser les étudiants à consulter vos informations </xsl:otherwise>
					</xsl:choose> 
				</option>
				<option>
					<xsl:choose>
						<xsl:when test="contains(., '1')"> Ne pas les autoriser </xsl:when>
						<xsl:otherwise> Les autoriser </xsl:otherwise>
					</xsl:choose>
				</option>
			</select>
			</td>
		</xsl:when>
		<xsl:when test="contains(local-name(.), 'Disponibili')">
			<td><underscore><xsl:value-of select="local-name(.)"/></underscore></td><td>
			<select name="{local-name(.)}">
				<option> 
					<xsl:choose>
						<xsl:when test="contains(., '1')"> Autoriser les entreprises à consulter mon profil </xsl:when>
						<xsl:otherwise> Ne pas autoriser les entreprises à consulter mon profil </xsl:otherwise>
					</xsl:choose> 
				</option>
				<option>
					<xsl:choose>
						<xsl:when test="contains(., '1')"> Ne pas les autoriser </xsl:when>
						<xsl:otherwise> Les autoriser </xsl:otherwise>
					</xsl:choose>
				</option>
			</select>
			</td>
		</xsl:when>
		<xsl:otherwise>
			<td><underscore><xsl:value-of select="local-name(.)"/></underscore></td><td>
			<xsl:element name="input">
				<xsl:attribute name="name"><xsl:value-of select="local-name(.)"/></xsl:attribute>
				<xsl:attribute name="value"><xsl:value-of select="."/></xsl:attribute>
			</xsl:element>
			</td>
		</xsl:otherwise>
		</xsl:choose>
		</xsl:if>
	</xsl:otherwise>
	</xsl:choose>
	</tr>
</xsl:for-each>
</table>
<input value="valider" type="submit" onClick='javascript:updateUser(file)'/>
</form>


</xsl:template>

</xsl:stylesheet>
 
