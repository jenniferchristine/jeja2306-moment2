interface Todo { // interface för todo
    task: string;
    completed: boolean;
    priority: 1 | 2 | 3;
}

class TodoList { // klass för hantera todo-lista
    private todos: Todo[]; // privat instansvariabel

    constructor() { this.todos = this.loadFromLocalStorage(); } // ladda från localstorage

    addTodo(task: string, priority: number): boolean { // ny to do med uppgift och prio
        if (task.trim() === '' || priority < 1 || priority > 3) { // kontroll
            return false; // false om inmatining är felaktig
        }

        const newTodo: Todo = { task, completed: false, priority: priority as 1 | 2 | 3 };
        this.todos.push(newTodo); // pushar ny todo i listan

        this.saveToLocalStorage(); // spara till localstorage
        return true;
    }

    markTodoCompleted(todoIndex: number): void { // markering för todo baserat på index
        if (todoIndex >= 0 && todoIndex < this.todos.length) { // kontroll
            this.todos[todoIndex].completed = true; // markera todo som klar
            this.saveToLocalStorage();
        }
    }

    getTodos(): Todo[] { return this.todos; } // hämta alla todos
    saveToLocalStorage(): void { localStorage.setItem("todos", JSON.stringify(this.todos)); } // spara todos till localstorage
    loadFromLocalStorage(): Todo[] { // hämta lagrad data
        const storedTodos = localStorage.getItem("todos");
        if (storedTodos) {
            return JSON.parse(storedTodos); // formatera om till ny array av todo
        }
        return []; // ingen data lagrad = returnera tom
    }

    clearTodos(): void { // rensa todos
        this.todos = [];
        this.saveToLocalStorage(); // sparar tom lista
    }
}

const todoList = new TodoList(); // instans av todo-klassen

const addForm = document.getElementById("new") as HTMLFormElement; // lyssnar efter tillägg i formulär
addForm.addEventListener("submit", handleForm); // submittar då och anropar funktion för detta

const addButton = document.getElementById("newtodobutton") as HTMLButtonElement; // lägg till todo
addButton.addEventListener("click", handleForm);

function handleForm(event: Event): void { // hanterar submit för tillägg av todo
    event.preventDefault();

    const taskInput = document.getElementById("task") as HTMLInputElement;
    const priorityInput = document.getElementById("priority") as HTMLSelectElement;

    const task = taskInput.value.trim(); // tar bort mellanslag i början
    const priority = parseInt(priorityInput.value); // extraherar värde från inmatning för prio och konverterar till heltal och tilldelar prio-variabel

    if (todoList.addTodo(task, priority)) {
        renderTodos();
        taskInput.value = ''; // återställ input
    } else {
        alert("Fält behöver vara ifyllt och prioritering vald");
    }
}

function renderTodos(): void { // återger todos
    const todoListContainer = document.getElementById("todo-list") as HTMLUListElement;
    todoListContainer.innerHTML = ''; // rensar befintliga todos

    let todos = todoList.getTodos();
    todos = todos.sort((a, b) => a.priority - b.priority); // sorterar prio iordning

    todos.forEach((todo, index) => {
        const todoItem = document.createElement("li");
        todoItem.textContent = todo.task;

        switch (todo.priority) { // switch för klasser beroende på prio
            case 1:
                todoItem.classList.add("prio-one");
                break;
            case 2:
                todoItem.classList.add("prio-two");
                break;
            case 3:
                todoItem.classList.add("prio-three");
                break;
            default:
                break;
        }

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox"; // input för checkbox
        checkbox.checked = todo.completed; // för iklick
        checkbox.addEventListener("change", () => {
            todoList.markTodoCompleted(index); // ändrar färdighet beroende på status
            renderTodos();
        });

        todoItem.prepend(checkbox); // placerar checkbox före allt annat
        todoListContainer.appendChild(todoItem);
    });

    const content = document.getElementsByTagName("li"); // hämtar in li
    
    if (content.length > 0) { // kontroll för innehåll
        const clearButton = document.createElement("button");
        clearButton.textContent = "Rensa allt";
        clearButton.classList.add("btn");

        const headingElement = document.createElement("h1");
        headingElement.textContent = "Din lista";

        clearButton.addEventListener("click", () => { // rensar innehåll och knapp
            todoList.clearTodos();
            clearButton.remove();
            renderTodos();
        });

        const resultDiv = document.getElementById("todo-list") as HTMLUListElement;
        resultDiv.appendChild(clearButton); // ritar ut
        resultDiv.prepend(headingElement); // placeras högst upp i div
    }
}

renderTodos();