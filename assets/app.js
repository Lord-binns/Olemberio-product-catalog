const apiUrl = 'js/data.json'; // URL of the JSON data file

async function DisplayProducts() {
    try {
        // Fetch data from the API
        const response = await fetch(apiUrl);

        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON data from the response
        const data = await response.json();

        // Get the product list container element from the HTML
        const productList = document.getElementById('product-list');

        // Clear any existing content in the product list container
        productList.innerHTML = '';

        // Create a heading for the product list
        const productListHeading = document.createElement('h1');
        productListHeading.textContent = 'SHOP ITEMS LIST';
        productList.appendChild(productListHeading);

        // Create a container for the product cards
        const productContainer = document.createElement('div');
        // Apply flex display to the product container
        productContainer.style.display = 'flex';
        // Allow wrapping of items inside the product container
        productContainer.style.flexWrap = 'wrap';

        // Loop through each product in the data array
        data.forEach(product => {
            // Create a product card element
            const productCard = document.createElement('div');
            // Add a CSS class to the product card for styling
            productCard.classList.add('product-card');
            // Apply inline CSS for styling the product card
            productCard.style.border = '2px solid #ccc';
            productCard.style.borderRadius = '8px';
            productCard.style.padding = '10px';
            productCard.style.width = 'calc(33.33% - 20px)';
            productCard.style.boxSizing = 'border-box';
            productCard.style.marginRight = '20px'; // Add some right margin between cards
            productCard.style.marginBottom = '20px'; // Add some bottom margin between cards

            // Create elements for displaying product information
            const productName = document.createElement('h3');
            productName.textContent = product.name;

            const productDescription = document.createElement('p');
            productDescription.textContent = product.description;

            const productPrice = document.createElement('p');
            productPrice.textContent = `Price: $${product.price}`;

            const productDate = document.createElement('p');
            productDate.textContent = `Date Added: ${product['date added']}`;

            // Append product information elements to the product card
            productCard.appendChild(productName);
            productCard.appendChild(productDescription);
            productCard.appendChild(productPrice);
            productCard.appendChild(productDate);

            // Create a button for adding the product to the cart
            const addButton = document.createElement('button');
            addButton.textContent = 'Add to Cart';
            addButton.classList.add('add-to-cart-button');

            // Create an element for displaying the click count of the button
            const clickCountIndicator = document.createElement('span');
            clickCountIndicator.textContent = '0'; // Initial click count
            clickCountIndicator.classList.add('click-count');

            // Click event handler for the add to cart button
            let clickCount = 0;
            addButton.addEventListener('click', () => {
                clickCount++;
                clickCountIndicator.textContent = clickCount;
                console.log(`Product "${product.name}" added to cart. Click count: ${clickCount}`);
            });

            // Append the add to cart button and click count indicator to the product card
            productCard.appendChild(addButton);
            productCard.appendChild(clickCountIndicator);

            // Append the product card to the product container
            productContainer.appendChild(productCard);
        });

        // Append the product container to the product list
        productList.appendChild(productContainer);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Call the DisplayProducts function to display the products on the page
DisplayProducts();
