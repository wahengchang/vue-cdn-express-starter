import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Todo from './pages/Todo.js';

const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/todo', component: Todo }
];

export const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes
});
