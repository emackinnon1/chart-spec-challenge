export const getRestaurantData = async () => {
	const data = await fetch("https://code-challenge.spectrumtoolbox.com/api/restaurants", {
		headers: {
			"Authorization": "Api-Key q3MNxtfep8Gt",
		},
	});
	return data.json();
}