const events = [
  {
    date: "2025-08-20",
    title: "Ciclo de Fortalecimiento a Consejer@s del SDACP",
    details: "📅 20 de agosto | 🕒 6:00 PM | 📍 Virtual",
    image: "ciclo20agosto.jpeg",
    link: "https://drive.google.com/file/d/1BpyfKlVvRB86lxG2ERYgbvKTgx_Jji8d/view"
  },
  {
    date: "2025-08-25",
    title: "Conversatorios Simultáneos",
    details: "📅 25 de agosto | 🕒 3:00 PM | 📍 Centro de Memoria, Paz y Reconciliación",
    image: "conversatorio25agosto.jpeg",
    link: "https://drive.google.com/file/d/1gNdJjDHOMqkZXuAT5laiqnm34xio3car/view"
  },
  {
    date: "2025-08-27",
    title: "Cáspulas Simultáneas",
    details: "📅 27 de agosto | 🕒 6:00 PM | 📍 Virtual",
    image: "capsulas27agosto.jpeg",
    link: "https://drive.google.com/file/d/1QN2Bx4YNT1ua8mqb_f7Qp3SGhiNWI6yN/view"
  },
  {
    date: "2025-08-30",
    title: "Ciclo de Fortalecimiento a Consejer@s del SDACP",
    details: "📅 30 de agosto | 🕒 10:00 AM | 📍 Virtual",
    image: "ciclo30agosto.jpeg",
    link: "https://drive.google.com/file/d/1LFNcqJAx4ADmScwN2x-sFdxP_yCEWQNI/view"
  },
  {
    date: "2025-09-13",
    title: "Foro: Arte y Participación",
    details: "📅 13 de septiembre | 🕒 10:00 AM | 📍 Virtual",
    image: "ciclo13septiembre.jpeg",
    link: "https://drive.google.com/file/d/1sJYYzx_sAoEc2gt6avbSHGKTU0IkDj5k/view"
  },
  {
    date: "2025-09-17",
    title: "Cáspulas Simultáneas",
    details: "📅 17 de septiembre | 🕒 6:00 PM | 📍 Virtual",
    image: "capsulas17septiembre.jpeg",
    link: "https://meet.google.com/wzx-risv-wpk"
  }
];

const yearView = document.getElementById("year-view");
const monthView = document.getElementById("month-view");
const calendarContainer = document.getElementById("calendar");
const monthYear = document.getElementById("month-year");
const viewTitle = document.getElementById("view-title");

const modal = document.getElementById("event-modal");
const closeModal = document.getElementById("close-modal");
const eventTitle = document.getElementById("event-title");
const eventDetails = document.getElementById("event-details");
const eventImage = document.getElementById("event-image");
const eventLink = document.getElementById("event-link");

let currentDate = new Date();

function renderYearView() {
  const startMonth = 7; // agosto
  for (let m = startMonth; m < 12; m++) {
    const card = document.createElement("div");
    card.classList.add("month-card");
    card.textContent = new Date(currentDate.getFullYear(), m).toLocaleString('es-ES', { month: 'long' });

    card.addEventListener("click", () => {
      currentDate.setMonth(m);
      showMonthView();
    });

    yearView.appendChild(card);
  }
}

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
      cell.insertAdjacentHTML('beforeend', '<span class="event-badge">Evento</span>');
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

function showMonthView() {
  yearView.classList.add("hidden");
  monthView.classList.remove("hidden");
  viewTitle.textContent = "Calendario de Eventos";
  renderCalendar();
}

document.getElementById("prev-month").addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

document.getElementById("next-month").addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

document.getElementById("back-to-year").addEventListener("click", () => {
  monthView.classList.add("hidden");
  yearView.classList.remove("hidden");
  viewTitle.textContent = "Calendario Anual 2025";
});

closeModal.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", (e) => { if (e.target === modal) modal.style.display = "none"; });

renderYearView();

// Abrir mes actual por defecto
if (currentDate.getMonth() >= 7) {
  showMonthView();
}