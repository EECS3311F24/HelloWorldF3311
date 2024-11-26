let currentPage = 0; // Start with the first page
const pageSize = 12; // 12 items per page


// Utility function to get query parameters from the URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Fetch products from the API and render them
async function fetchProducts(category = '', page = 0, size = 12, sort = 'id,asc') {
    try {
        const url = category
            ? `http://localhost:8080/api/products/filter?category=${encodeURIComponent(category)}&page=${page}&size=${size}&sort=${sort}`
            : `http://localhost:8080/api/products?page=${page}&size=${size}&sort=${sort}`;

        const response = await fetch(url);
        const data = await response.json();

        // Set category title dynamically
        const categoryTitle = document.querySelector('.category-title');
        categoryTitle.textContent = `Category: ${category || 'All'}`; // Display "All" if no category is selected

        const productGrid = document.getElementById('product-grid');
        productGrid.innerHTML = ''; // Clear existing products

        // Render products dynamically
        data.content.forEach((product) => {
            const productCard = `
                <div class="product-card">
                    <div class="product-image">
                        <img src="${product.imageUrl}" alt="${product.name}">
                    </div>
                    <div class="product-details">
                        <h2>${product.name}</h2>
                        <div class="tag">${product.tag}</div>
                        <p class="price">$${product.price.toFixed(2)} CAD</p>
                        <button class="add-to-cart">ADD TO CART</button>
                    </div>
                </div>
            `;
            productGrid.innerHTML += productCard;
        });

        // Update pagination
        updatePagination(data.number, data.totalPages, category, sort);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Update pagination buttons
function updatePagination(current, total, category = '', sort = 'id,asc') {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = ''; // Clear existing pagination buttons

    // Add "Previous" button
    if (current > 0) {
        pagination.innerHTML += `<button onclick="fetchProducts('${category}', ${current - 1}, 12, '${sort}')">Previous</button>`;
    }

    // Add page buttons
    if (total > 1) {
        for (let i = 0; i < total; i++) {
            pagination.innerHTML += `
                <button onclick="fetchProducts('${category}', ${i}, 12, '${sort}')" class="${i === current ? 'active' : ''}">
                    ${i + 1}
                </button>`;
        }
    }

    // Add "Next" button
    if (current < total - 1) {
        pagination.innerHTML += `<button onclick="fetchProducts('${category}', ${current + 1}, 12, '${sort}')">Next</button>`;
    }
}

// Handle category filtering
function filterProducts() {
    const category = document.getElementById('categoryFilter').value;
    fetchProducts(category, 0, 12, 'id,asc'); // Fetch first page with default sorting
}

// Fetch products by category from query parameter on page load
function fetchProductsByCategory() {
    const category = getQueryParam('category'); // Get the 'category' parameter from the URL
    fetchProducts(category, 0, 12, 'price,asc'); // Fetch products with sorting by price ascending
}

// Initialize products on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchProductsByCategory(); // Fetch products based on URL category
});
