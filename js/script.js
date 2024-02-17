// Seleciona elementos do DOM
const form = document.querySelector('form');
const newTask = document.querySelector('#new-task');
const taskList = document.querySelector('ul');

// Funções auxiliares
const saveTask = (task) => {
  const taskItem = document.createElement('li');
  taskItem.classList.add('task-item');

  const taskContainer = document.createElement('div');
  taskContainer.classList.add('task');

  const taskCheck = document.createElement('input');
  taskCheck.classList.add('task-check');
  taskCheck.setAttribute('type', 'checkbox');

  const taskTitle = document.createElement('span');
  taskTitle.innerText = task;

  const clearBtn = document.createElement('button');
  clearBtn.classList.add('delete-task');
  clearBtn.innerHTML = '<i class="bi bi-trash3"></i>';

  taskContainer.append(taskCheck);
  taskContainer.append(taskTitle);
  taskItem.append(taskContainer);
  taskItem.append(clearBtn);

  taskList.append(taskItem);
  newTask.value = '';
}

const noTasks = () => {
  const msg = document.querySelector('.message');
  
  if (taskList.children.length === 0 && !msg) {
    const message = document.createElement('p');
    message.innerText = 'Adicione uma tarefa!';
    message.classList.add('message');
    taskList.after(message);
  } else if (msg) {
    msg.remove();
  }
}

// Eventos
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const inputTask = newTask.value.trim();
  const feedback = document.querySelector('small');

  if (inputTask) {
    saveTask(inputTask);
    feedback.innerText = '';
    noTasks();
  } else {
    feedback.innerText = 'Descreva sua tarefa!';
  }
});

taskList.addEventListener('click', (e) => {
  const target = e.target;
  const targetParent = target.closest('li');
  const lowerTag = target.tagName.toLowerCase();
  
  if (target.classList.contains('delete-task') || lowerTag === 'i') {
    targetParent.remove();
  }

  noTasks();
});

noTasks();