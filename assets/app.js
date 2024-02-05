const apiUrl = 'js/data.json';

async function DisplayProducts() {
    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        const productList = document.getElementById('product-list');

        productList.innerHTML = 'Product List';

        data.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            const productName = document.createElement('h3');
            productName.textContent = product.name;

            // Fix variable name for productDescription
            const productDescription = document.createElement('h3');
            productDescription.textContent = product.description;

            const productPrice = document.createElement('p');
            productPrice.textContent = `Price: $${product.price}`;

            // Fix variable name for productDate
            const productDate = document.createElement('h3');
            productDate.textContent = product.date_added;

            productCard.appendChild(productName);
            // Add productDescription to productCard
            productCard.appendChild(productDescription);
            productCard.appendChild(productPrice);
            // Add productDate to productCard
            productCard.appendChild(productDate);

            productList.appendChild(productCard);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

DisplayProducts();
