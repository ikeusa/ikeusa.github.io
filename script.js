// Fetch the JSON file and parse it
fetch('inventory.json')
  .then(response => response.json())
  .then(inventory => {
    const container = document.getElementById('inventory-container');

    // Iterate through the inventory and create HTML for each item
    inventory.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.innerHTML = `
        <h3>${item.name}</h3>
        <img src="${item.image}" alt="${item.name}" />
        <p>${item.description}</p>
        <a href="${item.downloadLink}" download>Download</a>
      `;

      // Add an event listener for the click on the download link
      itemElement.querySelector('a').addEventListener('click', (event) => {
        alert(`Starting download for ${item.name}`);
        // Additional code to handle the download can be added here
      });

      container.appendChild(itemElement);
    });
  })
  .catch(error => console.error('Error loading inventory:', error));
