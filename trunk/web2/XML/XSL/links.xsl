<?xml version="1.0" encoding="utf8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">

<ol>
	<xsl:for-each select="//link">
	<li>
		<!-- chaque element est une image qui permet d'acceder a une URL en cliquant dessus -->
		<xsl:element name="a">
		<xsl:attribute name="href"><xsl:value-of select="url"/></xsl:attribute>
			<xsl:element name="img">
				<xsl:attribute name="src">img/<xsl:value-of select="img"/></xsl:attribute>
			</xsl:element>
		</xsl:element>
	</li>
	</xsl:for-each>
</ol>

</xsl:template>
</xsl:stylesheet>