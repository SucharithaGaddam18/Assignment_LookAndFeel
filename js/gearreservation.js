document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reservationForm");
  const reservationList = document.getElementById("reservationList");

  // Add mock data if empty
  if (!localStorage.getItem("gearReservations")) {
    const mockData = [
      { name: "Soccer Ball", date: "2025-06-10", time: "10:00", purpose: "Practice" },
      { name: "Running Shoes", date: "2025-06-12", time: "15:30", purpose: "Workout" },
      { name: "Yoga Mat", date: "2025-06-14", time: "08:00", purpose: "Training" }
    ];
    localStorage.setItem("gearReservations", JSON.stringify(mockData));
  }

  function loadReservations() {
    const data = JSON.parse(localStorage.getItem("gearReservations") || "[]");
    reservationList.innerHTML = "";
    data.forEach((res, index) => {
      const card = document.createElement("div");
      card.className = "reservation-card";
      card.innerHTML = `
        <h3><i class="fas fa-thumbtack"></i> ${res.name}</h3>
        <p><i class="fas fa-calendar-day"></i> <strong>Date:</strong> ${res.date}</p>
        <p><i class="fas fa-clock"></i> <strong>Time:</strong> ${res.time}</p>
        <p><i class="fas fa-bullseye"></i> <strong>Purpose:</strong> ${res.purpose}</p>
        <button class="btn-cancel" data-index="${index}">Cancel</button>
      `;
      reservationList.appendChild(card);
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newEntry = {
      name: document.getElementById("itemName").value,
      date: document.getElementById("reservationDate").value,
      time: document.getElementById("reservationTime").value,
      purpose: document.getElementById("reservationPurpose").value
    };
    const reservations = JSON.parse(localStorage.getItem("gearReservations") || "[]");
    reservations.push(newEntry);
    localStorage.setItem("gearReservations", JSON.stringify(reservations));
    loadReservations();
    form.reset();
  });

  reservationList.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-cancel")) {
      const index = e.target.getAttribute("data-index");
      const reservations = JSON.parse(localStorage.getItem("gearReservations") || "[]");
      reservations.splice(index, 1);
      localStorage.setItem("gearReservations", JSON.stringify(reservations));
      loadReservations();
    }
  });

  loadReservations();
});
