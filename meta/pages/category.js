module.exports = {
	contentPlaceHolders: [
		{
			// Registra  o contentPlaceholder
			id: "htmlSeo",
			objects: [
				//  Registra os objetos vtex
				{
					type: "html",
					name: "Html SEO",
					contents: [
						{
							name: "metaTag",
							active: true,
							content: `<meta name='language' content='pt-Br'>`,
						},
					],
				},
			],
		},
	],
};
