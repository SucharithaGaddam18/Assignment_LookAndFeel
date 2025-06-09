document.addEventListener("DOMContentLoaded", function () {
  // Mock data used for analytics only
  const mockEquipment = [
    { name: "Soccer Ball", category: "Balls", quantity: 15, condition: "New" },
    { name: "Running Shoes", category: "Footwear", quantity: 20, condition: "Used" },
    { name: "Tennis Racket", category: "Gear", quantity: 12, condition: "Good" },
    { name: "Yoga Mat", category: "Gear", quantity: 17, condition: "New" },
    { name: "Cleats", category: "Footwear", quantity: 5, condition: "Needs Repair" },
    { name: "Jersey", category: "Apparel", quantity: 31, condition: "Used" }
  ];

  const conditions = ["New", "Used", "Good", "Needs Repair"];
  const colors = {
    New: "#4285f4",
    Used: "#fbbc04",
    Good: "#34a853",
    "Needs Repair": "#ea4335"
  };

  // Stats
  const totalQty = mockEquipment.reduce((sum, item) => sum + item.quantity, 0);
  const uniqueCats = [...new Set(mockEquipment.map(item => item.category))];

  document.getElementById("totalInventoryCount").textContent = totalQty;
  document.getElementById("uniqueCategoryCount").textContent = uniqueCats.length;

  // Chart 1: Item-wise Condition Breakdown
  const itemLabels = mockEquipment.map(item => item.name);
  const datasets1 = conditions.map(cond => ({
    label: cond,
    data: mockEquipment.map(item => item.condition === cond ? item.quantity : 0),
    backgroundColor: colors[cond]
  }));

  new Chart(document.getElementById("chart1"), {
    type: "bar",
    data: { labels: itemLabels, datasets: datasets1 },
    options: {
      responsive: true,
      plugins: { legend: { position: "top" } },
      scales: { x: { stacked: true }, y: { stacked: true } }
    }
  });

  // Chart 2: Category Distribution
  const catDist = {};
  mockEquipment.forEach(i => catDist[i.category] = (catDist[i.category] || 0) + i.quantity);

  new Chart(document.getElementById("chart2"), {
    type: "pie",
    data: {
      labels: Object.keys(catDist),
      datasets: [{
        data: Object.values(catDist),
        backgroundColor: ["#4285f4", "#fbbc04", "#34a853", "#ea4335"]
      }]
    }
  });

  // Chart 3: Condition Breakdown
  const condDist = {};
  mockEquipment.forEach(i => condDist[i.condition] = (condDist[i.condition] || 0) + 1);

  new Chart(document.getElementById("chart3"), {
    type: "doughnut",
    data: {
      labels: Object.keys(condDist),
      datasets: [{
        data: Object.values(condDist),
        backgroundColor: Object.keys(condDist).map(c => colors[c])
      }]
    }
  });

  // Chart 4: Category-wise Quantity by Condition
  const datasets4 = conditions.map(cond => ({
    label: cond,
    data: uniqueCats.map(cat => {
      return mockEquipment.filter(i => i.category === cat && i.condition === cond)
                          .reduce((sum, i) => sum + i.quantity, 0);
    }),
    backgroundColor: colors[cond]
  }));

  new Chart(document.getElementById("chart4"), {
    type: "bar",
    data: { labels: uniqueCats, datasets: datasets4 },
    options: {
      indexAxis: "y",
      plugins: { legend: { position: "top" } },
      scales: { x: { stacked: true }, y: { stacked: true } }
    }
  });

  // Download buttons
  document.querySelectorAll(".download-btn").forEach((btn, idx) => {
    btn.addEventListener("click", () => {
      const chart = document.getElementById(`chart${idx + 1}`);
      const link = document.createElement("a");
      link.href = chart.toDataURL();
      link.download = `chart${idx + 1}.png`;
      link.click();
    });
  });
});
