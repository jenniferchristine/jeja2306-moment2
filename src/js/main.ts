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