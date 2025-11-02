<?php
// This script fetches country data from the REST Countries API and generates SQL insert statements.
// To use this script, run `php populate.php > insert.sql` from the command line.
// This will create a file named `insert.sql` with the generated SQL statements.
// You can then import this file into your MySQL database.

$apiUrl = 'https://restcountries.com/v3.1/independent?status=true';

$json = file_get_contents($apiUrl);
$countries = json_decode($json, true);

if ($countries) {
    foreach ($countries as $country) {
        $name = addslashes($country['name']['common']);
        $officialName = addslashes($country['name']['official']);
        $flagSvg = addslashes($country['flags']['svg']);
        $flagPng = addslashes($country['flags']['png']);
        $flagAlt = isset($country['flags']['alt']) ? addslashes($country['flags']['alt']) : '';
        $capital = isset($country['capital'][0]) ? addslashes($country['capital'][0]) : 'N/A';
        $region = addslashes($country['region']);
        $subregion = isset($country['subregion']) ? addslashes($country['subregion']) : 'N/A';
        $population = $country['population'];
        $area = isset($country['area']) ? $country['area'] : 0;
        $languages = isset($country['languages']) ? addslashes(implode(', ', $country['languages'])) : 'N/A';
        $currencies = 'N/A';
        if (isset($country['currencies'])) {
            $currencyData = [];
            foreach ($country['currencies'] as $code => $currency) {
                $currencyData[] = $currency['name'] . (isset($currency['symbol']) ? ' (' . $currency['symbol'] . ')' : '');
            }
            $currencies = addslashes(implode(', ', $currencyData));
        }
        $lat = isset($country['latlng'][0]) ? $country['latlng'][0] : 0;
        $lng = isset($country['latlng'][1]) ? $country['latlng'][1] : 0;
        $countryCode = addslashes($country['cca2']);

        echo "INSERT INTO countries (name, official_name, flag_svg, flag_png, flag_alt, capital, region, subregion, population, area, languages, currencies, lat, lng, country_code) VALUES ('$name', '$officialName', '$flagSvg', '$flagPng', '$flagAlt', '$capital', '$region', '$subregion', $population, $area, '$languages', '$currencies', $lat, $lng, '$countryCode');\n";
    }
}
?>
