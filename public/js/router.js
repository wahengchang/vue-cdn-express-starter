import Home from './components/Home.js';
import Login from './components/Login.js';
import Todo from './components/Todo.js';

const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/todo', component: Todo }
];

export const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes
});
