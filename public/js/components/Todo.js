export default Vue.defineComponent({
    template: `
        <div class="min-h-screen bg-gray-900 p-4">
            <div class="max-w-md mx-auto bg-gray-800 rounded-lg p-6">
                <h1 class="text-xl font-bold text-white mb-6">Todo List</h1>
                
                <!-- Add Todo Form -->
                <div class="mb-6">
                    <div class="space-y-4">
                        <div>
                            <label class="block text-gray-400 mb-1">Title</label>
                            <input 
                                v-model="newTodo.title" 
                                placeholder="Enter task title" 
                                class="w-full px-3 py-2 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label class="block text-gray-400 mb-1">Description</label>
                            <textarea 
                                v-model="newTodo.description" 
                                placeholder="Enter task description" 
                                rows="3"
                                class="w-full px-3 py-2 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            ></textarea>
                        </div>
                        <div class="flex space-x-4">
                            <div>
                                <label class="block text-gray-400 mb-1">Priority</label>
                                <select 
                                    v-model="newTodo.priority" 
                                    class="w-full px-3 py-2 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-gray-400 mb-1">Due Date</label>
                                <input 
                                    type="date" 
                                    v-model="newTodo.dueDate" 
                                    class="w-full px-3 py-2 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        <button 
                            @click="addTodo"
                            class="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                        >
                            Add Task
                        </button>
                    </div>
                </div>

                <!-- Todo List -->
                <div class="space-y-4">
                    <div class="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4">
                        <input 
                            type="text" 
                            v-model="searchQuery"
                            placeholder="Search tasks..."
                            class="flex-1 mb-2 sm:mb-0 px-3 py-2 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div class="w-full sm:w-auto">
                            <select v-model="filter" class="w-full px-3 py-2 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="all">All</option>
                                <option value="active">Active</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                    </div>

                    <ul class="space-y-3">
                        <li v-for="(todo, index) in filteredTodos" :key="todo.id" class="bg-gray-700 rounded-lg p-4">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center space-x-4">
                                    <input 
                                        type="checkbox"
                                        v-model="todo.completed"
                                        @change="updateTodo(todo)"
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <div class="flex-1">
                                        <h3 :class="[todo.completed ? 'line-through text-gray-400' : 'text-white']">
                                            {{ todo.title }}
                                        </h3>
                                        <p class="text-gray-400 mt-1">
                                            {{ todo.description }}
                                        </p>
                                        <div class="flex items-center space-x-2 mt-2">
                                            <span :class="[
                                                'px-2 py-1 rounded-full text-xs',
                                                todo.priority === 'high' ? 'bg-red-500' : 
                                                todo.priority === 'medium' ? 'bg-yellow-500' : 
                                                'bg-green-500'
                                            ]">
                                                {{ todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1) }}
                                            </span>
                                            <span v-if="todo.dueDate" class="text-gray-400">
                                                Due: {{ new Date(todo.dueDate).toLocaleDateString() }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex space-x-2">
                                    <button 
                                        @click="editTodo(todo)"
                                        class="text-blue-500 hover:text-blue-600"
                                        title="Edit task"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                    </button>
                                    <button 
                                        @click="removeTodo(index)"
                                        class="text-red-500 hover:text-red-600"
                                        title="Delete task"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            newTodo: {
                title: '',
                description: '',
                priority: 'medium',
                dueDate: ''
            },
            editingTodo: null,
            todos: [],
            searchQuery: '',
            filter: 'all'
        }
    },
    computed: {
        filteredTodos() {
            return this.todos
                .filter(todo => {
                    const matchesSearch = todo.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                                        todo.description.toLowerCase().includes(this.searchQuery.toLowerCase());
                    const matchesFilter = this.filter === 'all' ||
                                        (this.filter === 'active' && !todo.completed) ||
                                        (this.filter === 'completed' && todo.completed);
                    return matchesSearch && matchesFilter;
                })
                .sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
        }
    },
    methods: {
        addTodo() {
            if (!this.newTodo.title.trim()) return;
            
            if (this.editingTodo) {
                const index = this.todos.findIndex(t => t.id === this.editingTodo.id);
                if (index !== -1) {
                    this.todos[index] = {
                        ...this.newTodo,
                        completed: this.todos[index].completed,
                        createdAt: this.todos[index].createdAt
                    };
                    this.editingTodo = null;
                }
            } else {
                const todo = {
                    id: Date.now(),
                    title: this.newTodo.title,
                    description: this.newTodo.description,
                    priority: this.newTodo.priority,
                    dueDate: this.newTodo.dueDate,
                    completed: false,
                    createdAt: new Date().toISOString()
                };
                
                this.todos.push(todo);
            }
            
            this.saveToLocalStorage();
            this.resetNewTodo();
        },
        removeTodo(index) {
            this.todos.splice(index, 1);
            this.saveToLocalStorage();
        },
        editTodo(todo) {
            this.newTodo = {
                id: todo.id,
                title: todo.title,
                description: todo.description,
                priority: todo.priority,
                dueDate: todo.dueDate
            };
            this.editingTodo = todo;
        },
        updateTodo(todo) {
            this.saveToLocalStorage();
        },
        filterByStatus(status) {
            this.filter = status;
        },
        resetNewTodo() {
            this.newTodo = {
                title: '',
                description: '',
                priority: 'medium',
                dueDate: ''
            };
        },
        saveToLocalStorage() {
            localStorage.setItem('todos', JSON.stringify(this.todos));
        },
        loadFromLocalStorage() {
            const savedTodos = localStorage.getItem('todos');
            if (savedTodos) {
                this.todos = JSON.parse(savedTodos);
            }
        }
    },
    mounted() {
        this.loadFromLocalStorage();
    }
});
