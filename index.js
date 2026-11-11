const roleGrid = document.querySelector(".role-grid");
const filterCheckboxes = document.querySelectorAll(".role-filter-checkbox");

let roles = [];

function renderRoles(items) {
  roleGrid.innerHTML = "";

  if (items.length === 0) {
    const noRolesMessage = document.createElement("p");
    noRolesMessage.className = "no-roles-message";
    noRolesMessage.textContent = "No roles found for the selected department.";
    roleGrid.appendChild(noRolesMessage);
    return;
  }

  items.forEach((role) => {
    const card = document.createElement("article");
    card.className = "role-card";
    card.dataset.category = role.category;

    card.innerHTML = `
      <h3>${role.title}</h3>
      <p>${role.description}</p>
      <span class="role-tag">${role.department}</span>
      <span class="role-tag">${role.type}</span>
    `;
    roleGrid.appendChild(card);
  });
}

function applyFilter() {
  const selected = Array.from(filterCheckboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);

  const filtered =
    selected.length === 0
      ? roles
      : roles.filter((role) => selected.includes(role.department));

  renderRoles(filtered);
}

filterCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", applyFilter);
});

fetch("role.json")
  .then((response) => response.json())
  .then((data) => {
    roles = data;
    renderRoles(roles);
  })
  .catch((error) => {
    console.error("Error loading roles:", error);
  });
