/**
 * Generate a random image url from picsum.photos
 *
 * @returns {string} Random image url
 */

export const generateDummyImageUrl = () => {
	const random = Math.floor(Math.random() * 1000);
	return `https://picsum.photos/400/400?random=${random}`;
};
