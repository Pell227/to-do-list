const list = document.getElementById("lc");
const text = document.getElementById("tdn");
const cc = document.getElementById("c-c");
const uc = document.getElementById("uc");

function updateCounts() {
  const items = list.querySelectorAll("li");
  const completed = list.querySelectorAll(
    "input[type='checkbox']:checked",
  ).length;
  cc.textContent = completed;
  uc.textContent = items.length - completed;
}

function at() {
  const task = text.value.trim();
  if (!task) {
    alert("Isi List!!");
    return;
  }

  const li = document.createElement("li");
  li.innerHTML = `
    <label>
      <input type="checkbox">
      <span>${task}</span>
    </label>
    <span class="edit">
      <i class="fa-solid fa-pencil"></i>
    </span>
    <span class="deletee">
      <i class="fa-solid fa-trash-can"></i>
    </span>
  `;

  list.appendChild(li);
  text.value = "";
  updateCounts();
}

list.addEventListener("click", function (e) {
  const li = e.target.closest("li");
  if (!li) return;

  if (e.target.closest(".deletee")) {
    li.remove();
    updateCounts();
  }

  if (e.target.closest(".edit")) {
    const ts = li.querySelector("span:not(.edit):not(.deletee)");
    const update = prompt("Edit task:", ts.textContent);
    if (update !== null && update.trim() !== "") {
      ts.textContent = update.trim();
      li.classList.remove("completed");
      li.querySelector("input").checked = false;
      updateCounts();
    }
  }
});

list.addEventListener("change", function (e) {
  if (e.target.type === "checkbox") {
    const li = e.target.closest("li");
    li.classList.toggle("completed", e.target.checked);
    updateCounts();
  }
});
