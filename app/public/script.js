document.addEventListener("DOMContentLoaded", () => {
  // Carregar e exibir os usuários e pessoas
  fetchUsers();
  fetchPeople();
});

async function fetchUsers() {
  try {
      const response = await fetch('http://localhost:3000/usuarios/all');
      const users = await response.json();
      displayUsers(users);
  } catch (error) {
      console.error("Erro ao buscar usuários:", error);
  }
}

async function fetchPeople() {
  try {
      const response = await fetch('http://localhost:3000/pessoas/all');
      const people = await response.json();
      displayPeople(people);
  } catch (error) {
      console.error("Erro ao buscar pessoas:", error);
  }
}

function displayUsers(users) {
  const usersList = document.getElementById("user-list");
  usersList.innerHTML = ''; // Limpa a lista antes de adicionar os novos usuários

  users.forEach(user => {
      const li = document.createElement("li");
      li.textContent = `Nome: ${user.name}, Email: ${user.email}`;
      usersList.appendChild(li);
  });
}

function displayPeople(people) {
  const peopleList = document.getElementById("people-list");
  peopleList.innerHTML = ''; // Limpa a lista antes de adicionar as novas pessoas

  people.forEach(person => {
      const li = document.createElement("li");
      li.textContent = `Nome: ${person.name}, Idade: ${person.age}`;
      peopleList.appendChild(li);
  });
}