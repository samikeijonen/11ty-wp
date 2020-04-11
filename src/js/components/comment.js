import { speak } from '@wordpress/a11y';

/**
 * Post comment via REST API.
 */
const postComment = () => {
	// Comment form.
	const commentForm = document.querySelector('.js-comment-respond-form');

	// Bail if there is no comment form.
	if (!commentForm) {
		return;
	}

	const endpoint = 'https://11ty.foxnet.fi/wp-json/wp/v2/comments';

	const spinner = document.querySelector('.js-spinner');

	/**
	 * Handle comment form submit via REST API.
	 *
	 * @param {string} message Message to show when comment is send.
	 * @param {string} className Class to use in message.
	 */
	function handleMessage(message, className = 'is-style-success') {
		// Remove content from the form.
		commentForm.innerHTML = '';

		// Add custom message.
		const messageContent = document.createElement('p');
		messageContent.classList.add(className);
		messageContent.textContent = message;

		commentForm.appendChild(messageContent);

		speak(message);
	}

	/**
	 * Handle comment form submit via REST API.
	 *
	 * @param {object} e Event.
	 */
	function handleSubmit(e) {
		// Prevent form submitting.
		e.preventDefault();

		// Show spinner.
		spinner.classList.remove('is-hidden');

		// Get form elements.
		const [postId, comment, name, email, url, address] = e.target.elements;

		// Bail if required fields are not given.
		if (!postId.value || !name.value || !email.value) {
			return;
		}

		// Bail if "address" is given (honeypot).
		if (address.value) {
			spinner.classList.add('is-hidden');
			return;
		}

		// Set correct values from form fields.
		const data = JSON.stringify({
			post: postId.value,
			content: comment.value,
			author_name: name.value,
			author_email: email.value,
			author_url: url.value,
		});

		// Post new comment.
		fetch(endpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: data,
		})
			.then((response) => {
				if (response.ok === true) {
					handleMessage(
						'Thanks for commenting! Your comment is under moderation.',
						'is-style-success',
					);

					comment.value = '';
					name.value = '';
					email.value = '';
					url.value = '';

					return response.json();
				}

				return Promise.reject(response);
			})
			.then( ( responseObject ) => { /* eslint-disable-line */
				// responseObject is the JSON from our response.
				// Hide spinner.
				spinner.classList.add('is-hidden');
			})
			.catch((error) => {
				handleMessage('Something went wrong! Can you try again.', 'is-style-error');
				console.error( 'Error:', error ); /* eslint-disable-line */
			});
	}

	commentForm.addEventListener('submit', handleSubmit);
};

export default postComment;
