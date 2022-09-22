let form = document.getElementById("form");
let input = document.getElementById("input");
let todos = document.getElementById("todos");

let todoStorage = JSON.parse(localStorage.getItem("todoStorage"));

if (todoStorage) {
  todoStorage.forEach((item) => {
    addTodo(item);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo();
});

function addTodo(item) {
  let todoText = input.value;

  if (item) {
    todoText = item.text;
  }
  //   印出使用者的輸入
  console.log(todoText);

  if (todoText) {
    let todoEl = document.createElement("li");
    if (item && item.completed) {
      todoEl.classList.add("completed");
    }

    todoEl.innerText = todoText;

    todoEl.addEventListener("click", () => {
      todoEl.classList.toggle("completed");
      updateLS();
    });

    // 點擊右鍵即可移除
    todoEl.addEventListener("contextmenu", (e) => {
      e.preventDefault(); //取消右鍵點擊的預設行為
      todoEl.remove();
      updateLS();
    });
    // 新增至DOM裡，將子節點新增到父節點的尾巴
    todos.appendChild(todoEl);
    input.value = null;
  }
  updateLS();
}

// localStorage
function updateLS() {
  let todoList = document.querySelectorAll("li");
  let todoArr = [];
  todoList.forEach((todoEl) => {
    todoArr.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains("completed"),
    });
  });
  localStorage.setItem("todoStorage", JSON.stringify(todoArr));
}
