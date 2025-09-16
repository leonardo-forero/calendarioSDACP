const events = [
  {
    date: "2025-09-16",
    title: "Taller de Memoria Cultural",
    details: "📅 16 de septiembre | 🕒 5:00 PM | 📍 Virtual",
    image: "img/taller.jpg",
    link: "https://meet.google.com/ejemplo"
  },
  {
    date: "2025-09-30",
    title: "Foro: Arte y Participación",
    details: "📅 30 de septiembre | 🕒 3:00 PM | 📍 Biblioteca Virgilio Barco",
    image: "img/foro.jpg",
    link: "https://meet.google.com/ejemplo-foro"
  }
];

const calendarContainer = document.getElementById("calendar");
const monthYear = document.getElementById("month-year");
const modal = document.getElementById("event-modal");
const closeModal = document.getElementById("close-modal");
const eventTitle = document.getElementById("event-title");
const eventDetails = document.getElementById("event-details");
const eventImage = document.getElementById("event-image");
const eventLink = document.getElementById("event-link");

let currentDate = new Date();
currentDate.setMonth(7); // Agosto es mes 7 (0 = enero)

function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  monthYear.textContent = currentDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' });

  const firstDay = new Date(year, month, 1).getDay();
  const startDay = firstDay === 0 ? 6 : firstDay - 1;
  const lastDate = new Date(year, month + 1, 0).getDate();

  calendarContainer.innerHTML = "";

  for (let i = 0; i < startDay; i++) {
    const emptyCell = document.createElement("div");
    calendarContainer.appendChild(emptyCell);
  }

  for (let day = 1; day <= lastDate; day++) {
    const cell = document.createElement("div");
    cell.classList.add("day");
    cell.textContent = day;

    const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const event = events.find(e => e.date === dateString);

    const today = new Date();
    if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
      cell.classList.add("today");
    }

    if (event) {
      cell.classList.add("has-event");
      cell.addEventListener("click", () => {
        eventTitle.textContent = event.title;
        eventDetails.textContent = event.details;
        eventImage.src = event.image;
        eventLink.href = event.link;
        modal.style.display = "block";
      });
    }

    calendarContainer.appendChild(cell);
  }
}

document.getElementById("prev-month").addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

document.getElementById("next-month").addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

closeModal.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", (e) => { if (e.target === modal) modal.style.display = "none"; });

renderCalendar();