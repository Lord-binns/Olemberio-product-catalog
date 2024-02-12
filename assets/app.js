const apiUrl = 'js/data.json';

async function DisplayProducts() {
    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        const productList = document.getElementById('product-list');

        productList.innerHTML = '';

        const productListHeading = document.createElement('h1');
        productListHeading.textContent = 'SHOP ITEMS LIST';
        productList.appendChild(productListHeading);

        // Create a container for the product cards
        const productContainer = document.createElement('div');
        productContainer.style.display = 'flex'; // Apply flex display
        productContainer.style.flexWrap = 'wrap'; // Allow wrapping of items

        data.forEach(product => {
            // Create a product card
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            // Apply inline CSS for styling
            productCard.style.border = '2px solid #ccc';
            productCard.style.borderRadius = '8px';
            productCard.style.padding = '10px';
            productCard.style.width = 'calc(33.33% - 20px)';
            productCard.style.boxSizing = 'border-box';
            productCard.style.marginRight = '20px'; // Add some right margin between cards
            productCard.style.marginBottom = '20px'; // Add some bottom margin between cards

            const productName = document.createElement('h3');
            productName.textContent = product.name;

            const productDescription = document.createElement('p');
            productDescription.textContent = product.description;

            const productPrice = document.createElement('p');
            productPrice.textContent = `Price: $${product.price}`;

            const productDate = document.createElement('p');
            productDate.textContent = `Date Added: ${product['date added']}`;

            productCard.appendChild(productName);
            productCard.appendChild(productDescription);
            productCard.appendChild(productPrice);
            productCard.appendChild(productDate);

            // Create a button for each product
            const addButton = document.createElement('button');
            addButton.textContent = 'Add to Cart';
            addButton.classList.add('add-to-cart-button');

            // Create an indicator for the button click count
            const clickCountIndicator = document.createElement('span');
            clickCountIndicator.textContent = '0'; // Initial click count
            clickCountIndicator.classList.add('click-count');

            // Click event handler for the button
            let clickCount = 0;
            addButton.addEventListener('click', () => {
                clickCount++;
                clickCountIndicator.textContent = clickCount;
                console.log(`Product "${product.name}" added to cart. Click count: ${clickCount}`);
            });

            // Append the button and click count indicator to the product card
            productCard.appendChild(addButton);
            productCard.appendChild(clickCountIndicator);

            productContainer.appendChild(productCard);
        });

        productList.appendChild(productContainer);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

DisplayProducts();
