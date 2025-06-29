// VINAYAKA INDUSTRIES Catalog - JavaScript Logic
let allPartsData = [];
let currentProduct = null;

// Fetch Google Sheet CSV via PapaParse
function fetchSheetData() {
    Papa.parse("https://docs.google.com/spreadsheets/d/e/2PACX-1vQHwazOSmhehDR1Vi81t7OpoI7uXtFoXaDJYaqqDXQYdySUARbRiibS_eKd40IM2eax2uVgO2_gRk5p/pub?output=csv", {
        download: true,
        header: true,
        complete: function(results) {
            allPartsData = results.data.filter(row => row.MODEL);
        }
    });
}

// Page navigation
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

// Load parts on dropdown selection
function loadParts() {
    const selectedModel = document.getElementById('modelSelect').value;
    const partsTable = document.getElementById('partsTable');
    const noData = document.getElementById('noData');
    const partsTitle = document.getElementById('partsTitle');
    const partsBody = document.getElementById('partsBody');
    const selectedModelName = document.getElementById('selectedModelName');

    const filteredParts = allPartsData.filter(p => p.MODEL === selectedModel);

    if (selectedModel && filteredParts.length > 0) {
        partsTitle.textContent = `${selectedModel} - Spare Parts`;
        partsBody.innerHTML = '';

        filteredParts.forEach(part => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${part.MODEL}</td>
                <td>${part['MODEL NUMBER']}</td>
                <td>${part.DEVICE}</td>
                <td>${part.SIZE}</td>
                <td>${part['ITEM NAME']}</td>
                <td>₹${part.PRICE}</td>
            `;
            row.onclick = () => showProductDetail(part);
            partsBody.appendChild(row);
        });

        partsTable.style.display = 'block';
        noData.style.display = 'none';
    } else if (selectedModel) {
        selectedModelName.textContent = selectedModel;
        noData.style.display = 'block';
        partsTable.style.display = 'none';
    } else {
        partsTable.style.display = 'none';
        noData.style.display = 'none';
    }
}

// Show product details view
function showProductDetail(product) {
    currentProduct = product;

    document.getElementById('productBadges').innerHTML = `
        <span class="badge badge-orange">${product.DEVICE}</span>
        ${product.SIZE ? `<span class="badge badge-blue">${product.SIZE}</span>` : ''}
    `;

    document.getElementById('productTitle').textContent = product['ITEM NAME'];
    document.getElementById('productModel').textContent = `Model: ${product.MODEL}`;
    document.getElementById('productPrice').innerHTML = `₹${product.PRICE}`;

    const specsContainer = document.getElementById('productSpecs');
    specsContainer.innerHTML = `
        <div class="spec-row"><span class="spec-label">Model Number:</span><span class="spec-value">${product['MODEL NUMBER']}</span></div>
        <div class="spec-row"><span class="spec-label">Size:</span><span class="spec-value">${product.SIZE}</span></div>
        <div class="spec-row"><span class="spec-label">Device:</span><span class="spec-value">${product.DEVICE}</span></div>
        <div class="spec-row"><span class="spec-label">Item Name:</span><span class="spec-value">${product['ITEM NAME']}</span></div>
        <div class="spec-row"><span class="spec-label">Price:</span><span class="spec-value">₹${product.PRICE}</span></div>
        <div class="spec-row"><span class="spec-label">Origin:</span><span class="spec-value">India</span></div>
    `;

    showPage('productDetail');
}

// Fetch data on page load
fetchSheetData();
