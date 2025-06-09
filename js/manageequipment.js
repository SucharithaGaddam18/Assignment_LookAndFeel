const equipmentForm = document.getElementById("equipmentForm");
const equipmentTable = document.querySelector("#equipmentTable tbody");
const submitBtn = document.getElementById("submitBtn");
let editRow = null;

// Inject mock data ONCE if none exists
if (!localStorage.getItem("equipmentData")) {
  const mockEquipment = [
    { name: "Soccer Ball", category: "Balls", quantity: 15, condition: "New" },
    { name: "Running Shoes", category: "Footwear", quantity: 20, condition: "Used" },
    { name: "Tennis Racket", category: "Gear", quantity: 12, condition: "Good" },
    { name: "Yoga Mat", category: "Gear", quantity: 17, condition: "New" },
    { name: "Cleats", category: "Footwear", quantity: 5, condition: "Needs Repair" },
    { name: "Jersey", category: "Apparel", quantity: 31, condition: "Used" }
  ];
  localStorage.setItem("equipmentData", JSON.stringify(mockEquipment));
}

// Load table data
function loadEquipmentFromStorage() {
  const savedData = JSON.parse(localStorage.getItem("equipmentData") || "[]");
  equipmentTable.innerHTML = "";
  savedData.forEach(item => {
    createRow(item.name, item.category, item.quantity, item.condition);
  });
}

// Save table data
function updateStorage() {
  const rows = [...equipmentTable.querySelectorAll("tr")];
  const data = rows.map(row => ({
    name: row.children[0].textContent,
    category: row.children[1].textContent,
    quantity: parseInt(row.children[2].textContent),
    condition: row.children[3].textContent
  }));
  localStorage.setItem("equipmentData", JSON.stringify(data));
}

// Add row
function createRow(name, category, quantity, condition) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${name}</td>
    <td>${category}</td>
    <td>${quantity}</td>
    <td>${condition}</td>
    <td>
      <button class="edit-btn" style="background-color:#007bff; color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">Edit</button>
      <button class="delete-btn" style="background-color:#dc3545; color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">Delete</button>
    </td>
  `;
  equipmentTable.appendChild(row);
}

// Submit form
equipmentForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const category = document.getElementById("category").value;
  const quantity = parseInt(document.getElementById("quantity").value);
  const condition = document.getElementById("condition").value.trim();

  if (!name || !condition || isNaN(quantity)) return;

  if (editRow) {
    editRow.children[0].textContent = name;
    editRow.children[1].textContent = category;
    editRow.children[2].textContent = quantity;
    editRow.children[3].textContent = condition;
    editRow = null;
    submitBtn.textContent = "Add Equipment";
  } else {
    createRow(name, category, quantity, condition);
  }

  equipmentForm.reset();
  updateStorage();
});

// Handle edit/delete
equipmentTable.addEventListener("click", function (e) {
  const row = e.target.closest("tr");
  if (e.target.classList.contains("edit-btn")) {
    editRow = row;
    document.getElementById("name").value = row.children[0].textContent;
    document.getElementById("category").value = row.children[1].textContent;
    document.getElementById("quantity").value = row.children[2].textContent;
    document.getElementById("condition").value = row.children[3].textContent;
    submitBtn.textContent = "Update Equipment";
  } else if (e.target.classList.contains("delete-btn")) {
    if (confirm("Are you sure you want to delete this item?")) {
      row.remove();
      updateStorage();
    }
  }
});

// Load data on start
loadEquipmentFromStorage();
