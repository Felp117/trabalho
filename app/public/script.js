document.addEventListener('DOMContentLoaded', function () {
  loadUsers();
  loadPeople();

  document.getElementById('user-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('user-name').value;
    const email = document.getElementById('user-email').value;

    fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email })
    })
    .then(response => response.json())
    .then(data => {
      alert('Usuário adicionado');
      loadUsers();
    })
    .catch(error => console.error('Erro:', error));
  });

  document.getElementById('person-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('person-name').value;
    const age = document.getElementById('person-age').value;

    fetch('http://localhost:3000/api/persons', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, age })
    })
    .then(response => response.json())
    .then(data => {
      alert('Pessoa adicionada');
      loadPeople();
    })
    .catch(error => console.error('Erro:', error));
  });
});

function loadUsers() {
  fetch('http://localhost:3000/api/users')
    .then(response => response.json())
    .then(data => {
      const usersList = document.getElementById('users');
      usersList.innerHTML = '';
      data.forEach(user => {
        const li = document.createElement('li');
        li.textContent = `${user.name} (${user.email})`;
        usersList.appendChild(li);
      });
    });
}

function loadPeople() {
  fetch('http://localhost:3000/api/persons')
    .then(response => response.json())
    .then(data => {
      const peopleList = document.getElementById('people');
      peopleList.innerHTML = '';
      data.forEach(person => {
        const li = document.createElement('li');
        li.textContent = `${person.name} (${person.age} anos)`;
        peopleList.appendChild(li);
      });
    });
}