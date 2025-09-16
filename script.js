// Lista de eventos
const events = [
  {
    date: "2025-08-15",
    title: "Lanzamiento Diálogos Culturales",
    details: "📅 15 de agosto | 🕒 4:00 PM | 📍 Virtual (Google Meet)",
    image: "img/lanzamiento.jpg",
    link: "https://meet.google.com/grabacion-lanzamiento"
  },
  {
    date: "2025-09-20",
    title: "Diálogo Cultural: Saberes Ancestrales",
    details: "📅 20 de septiembre | 🕒 5:00 PM | 📍 Virtual",
    image: "img/dialogo1.jpg",
    link: "https://meet.google.com/grabacion-ejemplo"
  },
  {
    date: "2025-09-30",
    title: "Foro: Arte y Participación",
    details: "📅 30 de septiembre | 🕒 3:00 PM | 📍 Biblioteca Virgilio Barco",
    image: "img/foro.jpg",
    link: "https://meet.google.com/grabacion-foro"
  }
];

const calendarContainer = document.getElementById("calendar");
const monthYearLabel = document.getElementById("month-year");
const prevBtn = document.getElementById("prev-month");
const nextBtn = document.getElementById("next-month");

const modal = document.getElementById("event-modal");
const closeModal = document.getElementById("close-modal");
const eventTitle = document.getElementById("event-title");
const eventDetails = document.getElementById("event-details");
const eventImage = document.getElementById("event-image");
const eventLink = document.getElementById("event-link");

let currentYear = 2025;
let currentMonth = 7; // Agosto (0=enero, 7=agosto)

function renderCalendar() {
  calendarContainer.innerHTML = "";

  const monthNames = [
    "Enero","Febrero","Marzo","Abril","Mayo","Junio",
    "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
  ];

  monthYearLabel.textContent = `${monthNames[currentMonth]} ${currentYear}`;

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement("div");
    calendarContainer.appendChild(emptyCell);
  }

  for (let day = 1; day <= lastDate; day++) {
    const cell = document.createElement("div");
    cell.classList.add("day");
    cell.textContent = day;

    const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const event = events.find(e => e.date === dateString);

    if (event) {
      const indicator = document.createElement("div");
      indicator.classList.add("event-indicator");
      cell.appendChild(indicator);

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

// Botones de navegación
prevBtn.addEventListener("click", () => {
  if (currentMonth > 7) { // No permitir ir antes de agosto
    currentMonth--;
    renderCalendar();
  }
});

nextBtn.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar();
});

// Modal
closeModal.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", (e) => { if (e.target === modal) modal.style.display = "none"; });

// Render inicial
renderCalendar();