<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Country Information</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100">
    <header class="bg-white shadow">
        <div class="container mx-auto px-4">
            <nav class="flex items-center justify-between flex-wrap p-6">
                <div class="flex items-center flex-shrink-0 text-white mr-6">
                    <span class="font-semibold text-xl tracking-tight text-black">Country Info</span>
                </div>
                <div class="block lg:hidden">
                    <button id="hamburger-button" class="flex items-center px-3 py-2 border rounded text-black border-black hover:text-gray-500 hover:border-gray-500">
                        <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                    </button>
                </div>
                <div id="menu" class="w-full hidden block flex-grow lg:flex lg:items-center lg:w-auto">
                    <div class="text-sm lg:flex-grow">
                        <a href="index.php" class="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-gray-500 mr-4">
                            Home
                        </a>
                        <a href="about.php" class="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-gray-500 mr-4">
                            About Us
                        </a>
                        <a href="privacy.php" class="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-gray-500 mr-4">
                            Privacy Policy
                        </a>
                        <a href="user-guide.php" class="block mt-4 lg:inline-block lg:mt-0 text-black hover:text-gray-500">
                            User Guide
                        </a>
                    </div>
                </div>
            </nav>
        </div>
    </header>
    <main class="container mx-auto px-4 py-8">
<script>
    const hamburgerButton = document.getElementById('hamburger-button');
    const menu = document.getElementById('menu');

    hamburgerButton.addEventListener('click', () => {
        menu.classList.toggle('hidden');
    });
</script>
