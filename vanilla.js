const todoInput = document.getElementById("todoInput");
const addTodoBtn = document.getElementById("addTodoBtn");
const todoList = document.getElementById("todoList");
const completedTasks = document.getElementById("completedTasks");
const clearAllBtn= document.getElementById('clearAll');
addTodoBtn.addEventListener("click", addTodo);
clearAllBtn.addEventListener('click', clearAll);

function addTodo() {
  const todoText = todoInput.value.trim();
  const buttonsDiv = document.createElement("div");
  const textDiv = document.createElement("div");

  if (todoText !== "") {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = todoText;
    span.classList.add('todo-text');

    ed_del_but(buttonsDiv);

    todoInput.value = "";

   // textDiv.appendChild(span);
    li.appendChild(span);
    li.appendChild(buttonsDiv);
    todoList.appendChild(li);
  }
}
function ed_del_but(div) {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.addEventListener('change',toggleTodo);
  div.appendChild(checkbox);

  

  const editButton = document.createElement('button');
  editButton.classList.add('edit-button');
 // editButton.textContent = 'edit';
 editButton.type='edit';
  editButton.innerHTML = '&#9998; edit';
  editButton.addEventListener('click', editTodo);
  div.appendChild(editButton);

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-button');
  deleteButton.type = 'delete';
  deleteButton.innerHTML = '&#128465;';
  deleteButton.addEventListener('click', deleteTodo);
  div.appendChild(deleteButton);
}


function editTodo() {
  const li = this.parentElement.parentElement;
  const span = li.querySelector('span');
  const originalText = span.textContent;
  
  // Create an input element with the current todo text
  const input = document.createElement('input');
  input.type = 'text';
  input.value = originalText;
  input.classList.add('edit-input');

  // Replace the span with the input
  li.replaceChild(input, span);

  // Focus the input and select the text
  input.focus();
  input.select();

  // Function to save the updated text
  function saveEdit() {
      const newText = input.value.trim();
      if (newText !== "") {
          span.textContent = newText;
      } else {
          span.textContent = originalText; // Revert to original if empty
      }
      li.replaceChild(span, input);
  }

  // Event listener to save the edit when Enter is pressed or input loses focus
  //input.addEventListener('blur', saveEdit);
  input.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
          saveEdit();
      }
  });
}


function deleteTodo() {
  const confirmRemoval = confirm(" Do you want to remove this from the todo list?");
  if(confirmRemoval)
    this.parentElement.parentElement.remove();
}
function clearAll(){
  const confirmRemoval= confirm("Do you want to delete all the task?");
  if(confirmRemoval){
    while(todoList.firstChild){
      todoList.removeChild(todoList.firstChild);
    }
   // alert("All tasks have been deleted");
  }
  
}
function toggleTodo() {
  const li = this.parentElement.parentElement;
  const span = li.querySelector('span');
  const but =li.querySelector('buttonsDiv');
  if (this.checked) {
    const confirmRemoval = confirm("This task is completed. Do you want to move it to the completed tasks list?");
    if (confirmRemoval) {
      span.classList.add('completed');
      this.checked=true;
      todoList.removeChild(li);  
    //  li.removeChild(but);
    li.removeChild(this.parentElement);
      //li.removeChild(buttonsDiv);

      const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-button');
  deleteButton.type = 'delete';
  deleteButton.innerHTML = '&#128465;';
  deleteButton.addEventListener('click', deleteComp);
  li.appendChild(deleteButton);
        completedTasks.appendChild(li);

      //completedList.li.removeChild(but);
      this.disabled = true;
      console.log("Task moved to completed list:", span.textContent);
    } else {
      this.checked = false;
    }
  }
  function deleteComp() {
    const confirmRemoval = confirm(" Do you want to remove this from the todo list?");
    if(confirmRemoval)
      this.parentElement.remove();
  }
}