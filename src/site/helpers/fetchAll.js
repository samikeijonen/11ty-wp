const axios = require('axios');

module.exports = async function fetchAll(pages, endPoint) {
	const allPages = [];
	let allPosts = [];

	// Loop all pages, which was counted from the first REST API fetch.
	for (let i = 1; i <= pages; i += 1) {
		const page = axios.get(`${endPoint}&page=${i}`);
		allPages.push(page);
	}

	// Fetch posts from all pages.
	await axios
		.all(allPages)
		.then(
			axios.spread(function (...responses) {
				const postData = responses.map((res) => res.data);
				allPosts = postData.flat();
			}),
		)
		.catch(function (error) {
			console.log( error ); /* eslint-disable-line */
		});

	return allPosts;
};
