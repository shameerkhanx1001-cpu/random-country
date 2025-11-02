<?php include '../templates/header.php'; ?>

<div id="country-container" class="bg-white p-8 rounded shadow-md">
    <h1 class="text-2xl font-bold mb-4">Random Country</h1>
    <div id="country-info">
        <!-- Country information will be displayed here -->
    </div>
    <button id="fetch-country-button" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Get Random Country
    </button>
</div>

<script>
    const countryInfoDiv = document.getElementById('country-info');
    const fetchCountryButton = document.getElementById('fetch-country-button');

    function fetchCountry() {
        fetch('/api/random_country.php')
            .then(response => response.json())
            .then(data => {
                countryInfoDiv.innerHTML = `
                    <h2 class="text-xl font-bold">${data.name}</h2>
                    <img src="${data.flag_svg}" alt="${data.flag_alt}" class="w-1/2 my-4">
                    <p><strong>Official Name:</strong> ${data.official_name}</p>
                    <p><strong>Capital:</strong> ${data.capital}</p>
                    <p><strong>Region:</strong> ${data.region}</p>
                    <p><strong>Subregion:</strong> ${data.subregion}</p>
                    <p><strong>Population:</strong> ${data.population}</p>
                    <p><strong>Area:</strong> ${data.area} km²</p>
                    <p><strong>Languages:</strong> ${data.languages}</p>
                    <p><strong>Currencies:</strong> ${data.currencies}</p>
                `;
            })
            .catch(error => {
                console.error('Error fetching country:', error);
                countryInfoDiv.innerHTML = '<p>Could not fetch country data.</p>';
            });
    }

    // Fetch a country when the page loads
    fetchCountry();

    // Fetch a new country when the button is clicked
    fetchCountryButton.addEventListener('click', fetchCountry);
</script>

<?php include '../templates/footer.php'; ?>
