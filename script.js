const events = [
  {
    date: "2025-08-15",
    title: "Lanzamiento Diálogos Culturales",
    details: "📅 15 de agosto | 🕒 4:00 PM | 📍 Virtual (Google Meet)",
    image: "img/lanzamiento.jpg",
    link: "https://meet.google.com/grabacion-lanzamiento"
  },
  {
    date: "2025-09-16",
    title: "Mesa de Saberes",
    details: "📅 16 de septiembre | 🕒 6:00 PM | 📍 Virtual",
    image: "img/mesa.jpg",
    link: "https://meet.google.com/mesa"
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
let currentMonth = 7; // Agosto

function renderCalendar() {
  calendarContainer.innerHTML = "";

  const monthNames = ["Enero","Febrero","Marzo","Abril","Mayo","Junio",
                      "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

  monthYearLabel.textContent = `${monthNames[currentMonth]} ${currentYear}`;

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const offset = firstDay === 0 ? 6 : firstDay - 1;
  const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();

  for (let i = 0; i < offset; i++) {
    const emptyCell = document.createElement("div");
    calendarContainer.appendChild(emptyCell);
  }

  const today = new Date();
  const todayString = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,"0")}-${String(today.getDate()).padStart(2,"0")}`;

  for (let day = 1; day <= lastDate; day++) {
    const cell = document.createElement("div");
    cell.classList.add("day");
    cell.textContent = day;

    const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    if (dateString === todayString) cell.classList.add("today");

    const event = events.filter(e => e.date === dateString);
    if (event.length > 0) {
      const indicator = document.createElement("div");
      indicator.classList.add("event-indicator");
      cell.appendChild(indicator);

      cell.addEventListener("click", () => {
        if (event.length === 1) {
          showEvent(event[0]);
        } else {
          // si hay varios eventos en el mismo día
          let details = event.map(e => `<p><b>${e.title}</b><br>${e.details}<br><a href="${e.link}" target="_blank">Ver grabación</a></p>`).join("<hr>");
          eventTitle.textContent = `Eventos del ${day} de ${monthNames[currentMonth]}`;
          eventDetails.innerHTML = details;
          eventImage.style.display = "none";
          modal.style.display = "block";
        }
      });
    }

    calendarContainer.appendChild(cell);
  }
}

function showEvent(event) {
  eventTitle.textContent = event.title;
  eventDetails.textContent = event.details;
  eventImage.src = event.image;
  eventImage.style.display = "block";
  eventLink.href = event.link;
  modal.style.display = "block";
}

prevBtn.addEventListener("click", () => {
  if (currentMonth > 7) { 
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

closeModal.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", (e) => { if (e.target === modal) modal.style.display = "none"; });

renderCalendar();