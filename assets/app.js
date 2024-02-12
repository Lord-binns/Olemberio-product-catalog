const apiUrl = 'js/data.json';  

async function DisplayProducts() {
    try {
     
        const response = await fetch(apiUrl);

        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON data from the response
        const data = await response.json();

       
        const productList = document.getElementById('product-list');

         
        productList.innerHTML = '';

        // Create a heading for the product list
        const productListHeading = document.createElement('h1');
        productListHeading.textContent = 'SHOP ITEMS LIST';
        productList.appendChild(productListHeading);

        //  the container for the product cards
        const productContainer = document.createElement('div');
        // Apply flex display  for the container
        productContainer.style.display = 'flex';
        
        productContainer.style.flexWrap = 'wrap';

        // Loop through each product in the data array
        data.forEach(product => {
           // this is the loop
            const productCard = document.createElement('div');
         
            productCard.classList.add('product-card');
            //  this is the inline css to have better design
            productCard.style.border = '2px solid #ccc';
            productCard.style.borderRadius = '8px';
            productCard.style.padding = '10px';
            productCard.style.width = 'calc(33.33% - 20px)';
            productCard.style.boxSizing = 'border-box';
            productCard.style.marginRight = '20px';  
            productCard.style.marginBottom = '20px';  

            // Create elements for displaying product information
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

     
            productCard.appendChild(addButton);
            productCard.appendChild(clickCountIndicator);

         
            productContainer.appendChild(productCard);
        });

     
        productList.appendChild(productContainer);
 
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Call the DisplayProducts function to display the products on the page
DisplayProducts();
