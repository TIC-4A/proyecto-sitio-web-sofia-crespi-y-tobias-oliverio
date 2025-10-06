document.addEventListener('DOMContentLoaded', () => {

    const bestSellers = [
        { name: 'Producto 1', price: '$25.00', image: 'producto1.jpg' }, 
        { name: 'Producto 2', price: '$15.50', image: 'producto2.jpg' },
        { name: 'Producto 3', price: '$50.00', image: 'producto3.jpg' },
        { name: 'Producto 4', price: '$30.25', image: 'producto4.jpg' }
    ];

    const productsToCompare = [
        { name: 'Producto de Ejemplo A', stores: [
            { name: 'Tienda A', price: '$100.00' },
            { name: 'Tienda B', price: '$95.00' },
            { name: 'Tienda C', price: '$105.00' }
        ]},
        { name: 'Producto de Ejemplo B', stores: [
            { name: 'Tienda X', price: '$50.00' },
            { name: 'Tienda Y', price: '$48.50' }
        ]}
    ];

    const getLowestPriceStore = (stores) => {
        return stores.reduce((minStore, currentStore) => {
            const currentPriceValue = parseFloat(currentStore.price.replace('$', '').replace(',', ''));
            const minPriceValue = parseFloat(minStore.price.replace('$', '').replace(',', ''));
            
            return currentPriceValue < minPriceValue ? currentStore : minStore;
        }, stores[0]);
    };

    const renderBestSellers = () => {
        const bestSellersContainer = document.getElementById('best-sellers');
        bestSellersContainer.innerHTML = ''; 

        bestSellers.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            
            //
            productCard.innerHTML = `
                <div class="product-image" 
                     style="background-image: url('${product.image}');">
                </div>
                <h3>${product.name}</h3>
                <p>Precio: ${product.price}</p>
            `;
            bestSellersContainer.appendChild(productCard);
        });
    }; 
    const renderPriceComparison = () => {
        const productGrid = document.querySelector('.product-grid');
        productGrid.innerHTML = ''; 

        productsToCompare.forEach(product => {
            const comparisonItem = document.createElement('div');
            comparisonItem.classList.add('comparison-item');
            
            const lowestPriceStore = getLowestPriceStore(product.stores);

            let storeList = '';
            product.stores.forEach(store => {
                const isLowest = (store.name === lowestPriceStore.name && store.price === lowestPriceStore.price);
                const lowestClass = isLowest ? 'lowest-price' : '';

                storeList += `<p class="${lowestClass}">
                    <strong>${store.name}:</strong> ${store.price}
                </p>`;
            });

            comparisonItem.innerHTML = `
                <h4>${product.name}</h4>
                ${storeList}
            `;
            productGrid.appendChild(comparisonItem);
        });
    };

    renderBestSellers();
    renderPriceComparison();
});