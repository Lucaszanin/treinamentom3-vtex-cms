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
					contents: [],
				},
			],
		},
		{
			id: "slide-principal",
			objects: [
				{
					type: "banner",
					name: "banner principal",
					contents: [
						{
							name: "banner principal content",
							active: true,
							type: "image",
							file: "./dist/arquivos/slide-principal.png",
							width: 1920,
							height: 500,
							//   "category": "*",
							//   "brand": "*"
							//   "period": ""
						},
					],
				},
				{
					type: "banner-2",
					name: "banner principal-2",
					contents: [
						{
							name: "banner principal content",
							active: true,
							type: "image",
							file: "./dist/arquivos/slide-principal.png",
							width: 1920,
							height: 500,
						},
					],
				},
			],
		},
		{
			id: "slide-principal-mobile",
			objects: [
				{
					type: "banner",
					name: "banner principal mobile",
					contents: [
						{
							name: "banner principal mobile content",
							active: true,
							type: "image",
							file: "./dist/arquivos/slide-principal-mobile.png",
							width: 500,
							height: 500,
						},
					],
				},
				{
					type: "banner",
					name: "banner principal mobile 2",
					contents: [
						{
							name: "banner principal mobile 2 content",
							active: true,
							type: "image",
							file: "./dist/arquivos/slide-principal-mobile.png",
							width: 500,
							height: 500,
						},
					],
				},
			],
		},
		//====================
		// MOSAICO
		//====================
		{
			id: "banner-1",
			objects: [
				{
					type: "banner",
					name: "banner 01",
					contents: [
						{
							name: "banner 01 content",
							active: true,
							type: "image",
							file: "./dist/arquivos/banner-01.png",
							width: 500,
							height: 500,
						},
					],
				},
			],
		},
		{
			id: "banner-2",
			objects: [
				{
					type: "banner",
					name: "banner 02",
					contents: [
						{
							name: "banner 02 content",
							active: true,
							type: "image",
							file: "./dist/arquivos/banner-02.png",
							width: 500,
							height: 500,
						},
					],
				},
			],
		},
		{
			id: "banner-3",
			objects: [
				{
					type: "banner",
					name: "banner 03",
					contents: [
						{
							name: "banner 03 content",
							active: true,
							type: "image",
							file: "./dist/arquivos/banner-03.png",
							width: 500,
							height: 500,
						},
					],
				},
			],
		},
		{
			id: "banner-4",
			objects: [
				{
					type: "banner",
					name: "banner 04",
					contents: [
						{
							name: "banner 04 content",
							active: true,
							type: "image",
							file: "./dist/arquivos/banner-04.png",
							width: 500,
							height: 500,
						},
					],
				},
			],
		},
		{
			id: "banner-5",
			objects: [
				{
					type: "banner",
					name: "banner 05",
					contents: [
						{
							name: "banner 05 content",
							active: true,
							type: "image",
							file: "./dist/arquivos/banner-05.png",
							width: 500,
							height: 500,
						},
					],
				},
			],
		},
		{
			id: "mobile-banner-05",
			objects: [
				{
					type: "banner",
					name: "banner 05 mobile",
					contents: [
						{
							name: "banner 05 mobile content",
							active: true,
							type: "image",
							file: "./dist/arquivos/banner-05.png",
							width: 500,
							height: 500,
						},
					],
				},
			],
		},
	],
};
