const apiUrl = 'http://localhost:3000';

async function fetchUsers() {
  const response = await fetch(`${apiUrl}/api/users`);
  const users = await response.json();
  const usersTable = document.getElementById('usersTable').getElementsByTagName('tbody')[0];
  usersTable.innerHTML = '';
  users.forEach(user => {
    const row = usersTable.insertRow();
    row.innerHTML = `
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>
        <button onclick="editUser(${user.id})">Edit</button>
        <button class="delete" onclick="deleteUser(${user.id})">Delete</button>
      </td>
    `;
  });
}

async function fetchPersons() {
  const response = await fetch(`${apiUrl}/api/persons`);
  const persons = await response.json();
  const personsTable = document.getElementById('personsTable').getElementsByTagName('tbody')[0];
  personsTable.innerHTML = '';
  persons.forEach(person => {
    const row = personsTable.insertRow();
    row.innerHTML = `
      <td>${person.id}</td>
      <td>${person.name}</td>
      <td>${person.age}</td>
      <td>
        <button onclick="editPerson(${person.id})">Edit</button>
        <button class="delete" onclick="deletePerson(${person.id})">Delete</button>
      </td>
    `;
  });
}

document.getElementById('userForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('userName').value;
  const email = document.getElementById('userEmail').value;
  await fetch(`${apiUrl}/api/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email })
  });
  fetchUsers();
});

document.getElementById('personForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('personName').value;
  const age = document.getElementById('personAge').value;
  await fetch(`${apiUrl}/api/persons`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, age })
  });
  fetchPersons();
});

async function deleteUser(id) {
  await fetch(`${apiUrl}/api/users/${id}`, { method: 'DELETE' });
  fetchUsers(); // Refresh user list
}

async function deletePerson(id) {
  await fetch(`${apiUrl}/api/persons/${id}`, { method: 'DELETE' });
  fetchPersons(); // Refresh person list
}

window.onload = () => {
  fetchUsers();
  fetchPersons();
};
