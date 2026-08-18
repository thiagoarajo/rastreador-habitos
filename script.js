const STORAGE_KEY = "habit-tracker-data";
const CALENDAR_DAYS = 60;

const listEl = document.getElementById("habit-list");
const formEl = document.getElementById("add-form");
const inputEl = document.getElementById("habit-input");
const emptyStateEl = document.getElementById("empty-state");
const todayLabelEl = document.getElementById("today-label");

function toDateKey(date) {
  return date.toISOString().slice(0, 10);
}

function loadHabits() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveHabits(habits) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
}

let habits = loadHabits();

function computeStreak(habit) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let cursor = new Date(today);

  if (!habit.dates[toDateKey(cursor)]) {
    cursor.setDate(cursor.getDate() - 1);
  }

  let streak = 0;
  while (habit.dates[toDateKey(cursor)]) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

function buildCalendar(habit) {
  const cells = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = CALENDAR_DAYS - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = toDateKey(d);
    const filled = !!habit.dates[key];
    const isToday = i === 0;
    cells.push(
      `<div class="day-cell ${filled ? "filled" : ""} ${isToday ? "today" : ""}" title="${key}"></div>`
    );
  }
  return cells.join("");
}

function render() {
  const todayKey = toDateKey(new Date());
  listEl.innerHTML = "";

  emptyStateEl.classList.toggle("visible", habits.length === 0);

  habits.forEach((habit) => {
    const doneToday = !!habit.dates[todayKey];
    const streak = computeStreak(habit);

    const card = document.createElement("div");
    card.className = "habit-card";
    card.innerHTML = `
      <div class="habit-top">
        <button class="check-btn ${doneToday ? "done" : ""}" data-id="${habit.id}">
          ${doneToday ? "✓" : ""}
        </button>
        <span class="habit-name ${doneToday ? "done" : ""}">${escapeHtml(habit.name)}</span>
        <span class="streak-badge">🔥 ${streak} ${streak === 1 ? "dia" : "dias"}</span>
        <button class="delete-btn" data-id="${habit.id}" title="Excluir">✕</button>
      </div>
      <div class="calendar">${buildCalendar(habit)}</div>
    `;
    listEl.appendChild(card);
  });
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = inputEl.value.trim();
  if (!name) return;

  habits.push({
    id: crypto.randomUUID(),
    name,
    dates: {},
  });
  saveHabits(habits);
  inputEl.value = "";
  render();
});

listEl.addEventListener("click", (e) => {
  const checkBtn = e.target.closest(".check-btn");
  const deleteBtn = e.target.closest(".delete-btn");

  if (checkBtn) {
    const id = checkBtn.dataset.id;
    const habit = habits.find((h) => h.id === id);
    const todayKey = toDateKey(new Date());
    if (habit.dates[todayKey]) {
      delete habit.dates[todayKey];
    } else {
      habit.dates[todayKey] = true;
    }
    saveHabits(habits);
    render();
  }

  if (deleteBtn) {
    const id = deleteBtn.dataset.id;
    habits = habits.filter((h) => h.id !== id);
    saveHabits(habits);
    render();
  }
});

todayLabelEl.textContent = new Date().toLocaleDateString("pt-BR", {
  weekday: "long",
  day: "numeric",
  month: "long",
});

render();
