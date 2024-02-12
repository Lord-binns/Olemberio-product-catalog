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

        data.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

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

            productList.appendChild(productCard);

            // Create a Bootstrap button
            const buttonContainer = document.createElement('div'); // Container for button and indicator
            buttonContainer.classList.add('button-container');
            
            const button = document.createElement('button');
            button.classList.add('btn', 'btn-primary'); 
            button.textContent = 'Add to Cart';

            const clickCountIndicator = document.createElement('span');
            clickCountIndicator.classList.add('click-count');
            clickCountIndicator.textContent = '0'; // Initial click count

            buttonContainer.appendChild(button);
            buttonContainer.appendChild(clickCountIndicator);
            productList.appendChild(buttonContainer);

            // Add click event listener to the button
            let clickCount = 0;
            button.addEventListener('click', () => {
                clickCount++;
                clickCountIndicator.textContent = clickCount;
                console.log(`Product "${product.name}" added to cart. Click count: ${clickCount}`);
                // You can perform additional actions here, like updating a cart counter or sending data to a server.
            });
        });

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

DisplayProducts();
