let currentPage = 0; // Start with the first page
const pageSize = 12; // 12 items per page
let currentCategory = ''; // Default to all products

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

        // Update global variables
        currentPage = page;
        currentCategory = category;

        // Set category title dynamically
        const categoryTitle = document.querySelector('.category-title');
        categoryTitle.textContent = `Category: ${category || 'All Products'}`;

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
        pagination.innerHTML += `<button onclick="fetchProducts('${category}', ${current - 1}, ${pageSize}, '${sort}')">Previous</button>`;
    }

    // Add page buttons
    if (total > 1) {
        for (let i = 0; i < total; i++) {
            pagination.innerHTML += `
                <button onclick="fetchProducts('${category}', ${i}, ${pageSize}, '${sort}')" class="${i === current ? 'active' : ''}">
                    ${i + 1}
                </button>`;
        }
    }

    // Add "Next" button
    if (current < total - 1) {
        pagination.innerHTML += `<button onclick="fetchProducts('${category}', ${current + 1}, ${pageSize}, '${sort}')">Next</button>`;
    }
}

// Handle category filtering
function filterProducts() {
    const category = document.getElementById('categoryFilter').value;
    fetchProducts(category, 0, pageSize, 'id,asc'); // Fetch first page with default sorting
}

// Fetch products by category from query parameter on page load
function fetchProductsByCategory() {
    const category = getQueryParam('category'); // Get the 'category' parameter from the URL
    fetchProducts(category, 0, pageSize, 'price,asc'); // Fetch products with sorting by price ascending
}

// Apply selected sort option
function applySort() {
    const sortDropdown = document.getElementById('sort-by');
    let selectedSort = 'id,asc'; // Default sort

    // Match dropdown value with sort logic
    switch (sortDropdown.value) {
        case 'high-to-low':
            selectedSort = 'price,desc';
            break;
        case 'low-to-high':
            selectedSort = 'price,asc';
            break;
        case 'newest':
            selectedSort = 'createdDate,desc'; // Assuming you have a `createdDate` field
            break;
        case 'best-sellers':
            selectedSort = 'sales,desc'; // Assuming you have a `sales` field
            break;
    }

    // Fetch with the new sort order
    fetchProducts(currentCategory, 0, pageSize, selectedSort);
}

// Initialize products and set event listeners on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchProductsByCategory(); // Fetch products based on URL category
    document.getElementById('sort-by').addEventListener('change', applySort);
});
