document.addEventListener('DOMContentLoaded', function () {
  loadUsers();
  loadPeople();

  // Função para adicionar um usuário
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

  // Função para adicionar uma pessoa
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

// Função para carregar os usuários
async function loadUsers() {
  const response = await fetch('/api/users');
  const users = await response.json();
  const userList = document.getElementById('user-list');
  userList.innerHTML = '';  // Limpa a lista de usuários

  // Adiciona cada usuário à lista com os botões de editar e deletar
  users.forEach(user => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${user.name} (${user.email})
      <button class="edit" onclick="editUser(${user.id})">Editar</button>
      <button class="delete" onclick="deleteUser(${user.id})">Deletar</button>
    `;
    userList.appendChild(li);
  });
}

// Função para carregar as pessoas
function loadPeople() {
  fetch('http://localhost:3000/api/persons')
    .then(response => response.json())
    .then(data => {
      const peopleList = document.getElementById('people');
      peopleList.innerHTML = ''; // Limpa a lista de pessoas
      data.forEach(person => {
        const li = document.createElement('li');
        li.innerHTML = `
          ${person.name} (${person.age} anos)
          <button class="edit" onclick="editPerson(${person.id})">Editar</button>
          <button class="delete" onclick="deletePerson(${person.id})">Deletar</button>
        `;
        peopleList.appendChild(li);
      });
    });
}

// Função para editar um usuário
async function editUser(id) {
  const name = prompt("Digite o novo nome:");
  const email = prompt("Digite o novo email:");

  // Verifica se o usuário forneceu os dados
  if (!name || !email) {
    alert('Nome e Email são obrigatórios!');
    return;
  }

  const response = await fetch(`/api/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email })
  });

  const data = await response.json();

  if (response.ok) {
    alert('Usuário atualizado com sucesso!');
    loadUsers();  // Recarrega a lista de usuários
  } else {
    alert('Erro ao atualizar usuário');
  }
}

// Função para deletar um usuário
async function deleteUser(id) {
  const confirmDelete = confirm("Tem certeza que deseja excluir este usuário?");
  
  if (!confirmDelete) {
    return;  // Se o usuário cancelar, nada acontece
  }

  const response = await fetch(`/api/users/${id}`, {
    method: 'DELETE',
  });

  const data = await response.json();

  if (response.ok) {
    alert('Usuário excluído com sucesso!');
    loadUsers();  // Recarrega a lista de usuários
  } else {
    alert('Erro ao excluir usuário');
  }
}

// Função para editar uma pessoa
async function editPerson(id) {
  const name = prompt("Digite o novo nome:");
  const age = prompt("Digite a nova idade:");

  // Verifica se os dados estão completos
  if (!name || !age) {
    alert('Nome e Idade são obrigatórios!');
    return;
  }

  const response = await fetch(`/api/people/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, age })
  });

  const data = await response.json();

  if (response.ok) {
    alert('Pessoa atualizada com sucesso!');
    loadPeople();  // Recarrega a lista de pessoas
  } else {
    alert('Erro ao atualizar pessoa');
  }
}

// Função para deletar uma pessoa
async function deletePerson(id) {
  const confirmDelete = confirm("Tem certeza que deseja excluir esta pessoa?");
  
  if (!confirmDelete) {
    return;  // Se o usuário cancelar, nada acontece
  }

  const response = await fetch(`/api/people/${id}`, {
    method: 'DELETE',
  });

  const data = await response.json();

  if (response.ok) {
    alert('Pessoa excluída com sucesso!');
    loadPeople();  // Recarrega a lista de pessoas
  } else {
    alert('Erro ao excluir pessoa');
  }
}