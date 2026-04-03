import { createEntry } from "./controller.js";

const input = document.getElementById("input");
const addBtn = document.getElementById("addBtn");
const timeline = document.getElementById("timeline");
const themeBtn = document.getElementById("themeBtn");




addBtn.addEventListener("click", () => {
  const rawValue = input.value;

  if (!rawValue || !rawValue.trim()) {
    alert("Please enter a valid value");
    return;
  }

  const value = rawValue.trim();

  const result = createEntry(value);

  if (!result.success) {
    alert(result.message);
    return;
  }

  render(result.entry);
  input.value = "";
});


themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});


function render(entry) {
  const div = document.createElement("div");
  div.className = "card";

  div.innerHTML = `
    <div class="value">${entry.value}</div>
    <div class="meta">${entry.date} • ${entry.time}</div>
    <div class="user">👤 ${entry.user}</div>
  `;

  timeline.prepend(div);
}