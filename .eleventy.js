const fs = require("fs");
const path = require("path");
const { DateTime } = require("luxon");

const isDev = process.env.NODE_ENV === "development";

const manifestPath = path.resolve(__dirname, "dist", "assets", "manifest.json");
const manifest = isDev
	? {
		"index.js": "/assets/index.js",
		"main.css": "/assets/main.css",
	}
	: JSON.parse(fs.readFileSync(manifestPath, { encoding: "utf8" }));

module.exports = function(eleventyConfig) {
	// Layout aliases make templates more portable.
	eleventyConfig.addLayoutAlias("base", "layouts/base.njk");

	// Adds a universal shortcode to embed bundled CSS. In Nunjack templates: {% bundledCss %}
	eleventyConfig.addShortcode("bundledCss", function() {
	return manifest["main.css"]
		? `<link href="${manifest["main.css"]}" rel="stylesheet" />`
		: "";
	});

	// Adds a universal shortcode to embed bundled JS. In Nunjack templates: {% bundledJs %}
	eleventyConfig.addShortcode("bundledJs", function() {
	return manifest["index.js"]
		? `<script src="${manifest["index.js"]}"></script>`
		: "";
	});

	// Readable date.
	eleventyConfig.addFilter("readableDate", (dateObj) => {
		return DateTime.fromISO(dateObj, {zone: 'utc'}).toFormat("LLLL d, yyyy");
	});

	// Valid date string.
	// https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
	eleventyConfig.addFilter('htmlDateString', (dateObj) => {
		return DateTime.fromISO(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
	});

	// Get path from URL.
	eleventyConfig.addFilter('urlPath', (fullUrl) => {
		const url = new URL(fullUrl);
		return url.pathname.replace(/\/+$/, '');
	});

	// Get post author by ID.
	eleventyConfig.addFilter('thisPostAuthor', (array, ID) => {
		return array.filter( user => {
			return user.id === ID;
		});
	});

	// Get post comments by ID.
	eleventyConfig.addFilter('thisPostComments', (array, ID) => {
		return array.filter( item => {
			return item.post === ID;
		});
	});

	// Get posts by tag IDs.
	eleventyConfig.addFilter('postsByTagId', (array, ID) => {
		return array.filter( item => {
			return item.tags.includes(ID);
		});
	});

	// Get posts by category IDs.
	eleventyConfig.addFilter('postsByCategoryId', (array, ID) => {
		return array.filter( item => {
			return item.categories.includes(ID);
		});
	});

	// Get post tags by array of tag IDs in that post.
	eleventyConfig.addFilter('thisPostTags', (allTags, postTags) => {
		return allTags.filter( item => {
			return postTags.includes(item.id);
		});
	});

	// Get post categories by array of category IDs in that post.
	eleventyConfig.addFilter('thisPostCategories', (allCategories, postCategories) => {
		return allCategories.filter( item => {
			return postCategories.includes(item.id);
		});
	});

	// A debug utility.
	eleventyConfig.addFilter("dump", obj => {
		return util.inspect(obj);
	});

	// Copy all images directly to dist.
	eleventyConfig.addPassthroughCopy({ "src/img": "img" });

	// Copy all fonts directly to dist.
	eleventyConfig.addPassthroughCopy({ "src/fonts": "fonts" });

	// Copy external dependencies to dist.
	eleventyConfig.addPassthroughCopy({ "src/vendor": "vendor" });

	// Reload the page every time the JS/CSS are changed.
	eleventyConfig.setBrowserSyncConfig({ files: [manifestPath] });

	return {
		dir: {
			input: "src/site",
			includes: "_includes", // relative to dir.input
			output: "dist",
		},
		htmlTemplateEngine: "njk",
		markdownTemplateEngine: "njk",
		passthroughFileCopy: true,
	};
};
