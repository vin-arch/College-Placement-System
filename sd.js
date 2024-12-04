
document.getElementById('update-btn').addEventListener('click', function () {
  // Enable inputs
  document.querySelectorAll('input').forEach(input => {
    input.removeAttribute('disabled');
  });

  enableEditing('certifications-list', 'certifications-add-btn');
  enableEditing('skills-list', 'skills-add-btn');

  const saveBtn = document.createElement('button');
  saveBtn.innerText = 'Save';
  saveBtn.classList.add('btn', 'btn-success', 'ms-3');
  saveBtn.addEventListener('click', saveUpdates);
  this.parentElement.appendChild(saveBtn);
  this.setAttribute('disabled', true);
});

function enableEditing(listId, addBtnId) {
  const list = document.getElementById(listId);
  list.querySelectorAll('li').forEach(item => {
    const text = item.innerText;
    item.innerHTML = `<input type="text" value="${text}" class="form-control form-control-sm">`;
  });

  const addBtn = document.getElementById(addBtnId);
  addBtn.classList.remove('d-none');
  addBtn.addEventListener('click', () => addListItem(listId));
}

function addListItem(listId) {
  const list = document.getElementById(listId);
  const newItem = document.createElement('li');
  newItem.classList.add('list-group-item');
  newItem.innerHTML = `<input type="text" class="form-control form-control-sm" placeholder="Enter new item">`;
  list.appendChild(newItem);
}

function saveUpdates() {
  document.querySelectorAll('input').forEach(input => {
    input.setAttribute('disabled', true);
  });

  saveListUpdates('certifications-list', 'certifications-add-btn');
  saveListUpdates('skills-list', 'skills-add-btn');

  alert('Updates saved successfully!');

  const updateBtn = document.getElementById('update-btn');
  updateBtn.removeAttribute('disabled');

  this.remove();
}

function saveListUpdates(listId, addBtnId) {
  const list = document.getElementById(listId);
  list.querySelectorAll('li').forEach(item => {
    const input = item.querySelector('input');
    if (input) {
      item.innerText = input.value;
    }
  });

  document.getElementById(addBtnId).classList.add('d-none');
}

document.getElementById('placement-update-btn').addEventListener('click', () => {
  window.location.href = 'placement_updates.html';
});

document.getElementById('resume-btn').addEventListener('click', () => {
  window.location.href = 'upload_resume.html';
});
