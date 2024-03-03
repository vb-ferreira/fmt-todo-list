// Seleciona elementos do DOM
const form = document.querySelector('form');
const newTask = document.querySelector('#new-task');
const taskList = document.querySelector('ul');
const modal = document.querySelector('.modal');
let targetParent;

// Funções auxiliares
const saveTask = (task, done=false) => {
  const taskItem = document.createElement('li');
  taskItem.classList.add('task-item');

  const taskContainer = document.createElement('div');
  taskContainer.classList.add('task');

  const taskCheck = document.createElement('input');
  taskCheck.classList.add('task-check');
  taskCheck.setAttribute('type', 'checkbox');

  const taskTitle = document.createElement('span');
  taskTitle.innerText = task.toUpperCase();

  const clearBtn = document.createElement('button');
  clearBtn.classList.add('delete-task');
  clearBtn.innerHTML = '<i class="bi bi-trash3"></i>';

  taskContainer.append(taskCheck);
  taskContainer.append(taskTitle);
  taskItem.append(taskContainer);
  taskItem.append(clearBtn);

  taskList.append(taskItem);
  if (done == true) { taskCheck.checked = true }

  newTask.value = '';
  newTask.focus();
}

const checkTasks = () => {
  const msg = document.querySelector('.message');
  const numTasksEl = document.querySelector('h1 span');
  const numTasks = taskList.children.length;

  if (numTasks === 0 && !msg) {
    const message = document.createElement('p');
    message.innerText = 'Adicione uma tarefa!';
    message.classList.add('message');
    taskList.after(message);
  } else if (msg) {
    msg.remove();
  }

  const numTasksChecked = document.querySelectorAll('input[type="checkbox"]:checked').length;
  numTasksEl.textContent = numTasks - numTasksChecked;
}

function getTaskIndex() {
  const nodes = Array.from(taskList.children);
  const index = nodes.indexOf(targetParent);
  return index;
}

// Recupera os dados da localStorage ou lista vazia
const todos = JSON.parse(localStorage.getItem('todos')) || [];

// Exibe na tela itens armazenados
todos.forEach(todo => {
  saveTask(todo.content, todo.done);
});

// Eventos
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const inputTask = newTask.value.trim();
  const feedback = document.querySelector('small');

  // Objeto a ser salvo na localStorage
  const todo = {
    content: inputTask,
    done: false
  }

  if (inputTask) {
    // Salva na localStorage
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));

    saveTask(inputTask);
    feedback.innerText = '';
    checkTasks();
  } else {
    feedback.innerText = 'Descreva sua tarefa!';
    newTask.focus();
  }
});

taskList.addEventListener('click', (e) => {
  const target = e.target;
  targetParent = target.closest('li');
  const lowerTag = target.tagName.toLowerCase();

  if (target.classList.contains('delete-task') || lowerTag === 'i') {
    modal.classList.remove('hide');
  }

  // Atualiza o status da tarefa na localStorage
  if (target.classList.contains('task-check')) {
    index = getTaskIndex();
    todos[index].done = target.checked;
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  checkTasks();
});

modal.addEventListener('click', (e) => {
  const target = e.target;
  const lowerTag = target.tagName.toLowerCase();

  if (target.classList.contains('dismiss-modal')) {
    modal.classList.add('hide');
  } else if (target.classList.contains('delete-item')) {
    // Remove item da localStorage
    index = getTaskIndex();
    todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));

    targetParent.remove();
    checkTasks();
    modal.classList.add('hide');
  }

});

checkTasks();