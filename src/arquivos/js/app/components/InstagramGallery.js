class InstagramGallery {
	constructor({ gallery, account, limit }) {
		this.options = {
			gallery: $(gallery),
			account,
			limit,
		};

		this.getPosts();
	}

	async getPosts() {
		const url = `https://www.instagram.com/${this.options.account}/?__a=1`;
		const data = await (await fetch(url)).json();

		this.buildGallery(data);
	}

	buildGallery(data) {
		const posts = data.graphql.user.edge_owner_to_timeline_media.edges;

		for(let i = 0; i < this.options.limit; i++) {
			const post = posts[i].node;
			const caption = post.edge_media_to_caption.edges[0]?.node.text;

			const galleryItem = `
				<a
					class="instagramGallery__photo"
					href="https://www.instagram.com/p/${post.shortcode}"
					title="${caption || ''}"
					target="_blank"
					style="background-image: url(${post.thumbnail_src})"
				>
			`;

			this.options.gallery.append(galleryItem);
		}
	}
}

export default InstagramGallery;
