export default Vue.defineComponent({
    template: `
        <div class="min-h-screen bg-gray-900 p-4">
            <div class="max-w-md mx-auto bg-gray-800 rounded-lg p-6">
                <h1 class="text-xl font-bold text-white mb-6">Login</h1>
                <form @submit.prevent="handleLogin" class="space-y-4">
                    <div>
                        <label class="block text-gray-400 mb-1">Username</label>
                        <input 
                            type="text" 
                            v-model="username" 
                            placeholder="Enter your username" 
                            class="w-full px-3 py-2 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label class="block text-gray-400 mb-1">Password</label>
                        <input 
                            type="password" 
                            v-model="password" 
                            placeholder="Enter your password" 
                            class="w-full px-3 py-2 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button 
                        type="submit" 
                        class="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    `,
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        handleLogin() {
            console.log('Login attempt:', { username: this.username, password: this.password });
        }
    }
});
