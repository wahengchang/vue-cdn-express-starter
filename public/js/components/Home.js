import Counter from './Counter.js';

export default Vue.defineComponent({
    components: {
        Counter
    },
    data() {
        return {
            currentCount: 0,
            lastAction: 'No actions yet'
        };
    },
    methods: {
        // Function to pass to the Counter component
        handleIncrement(newCount) {
            this.lastAction = `Counter was incremented to ${newCount}`;
        },
        // Method to handle count update event
        onCountUpdated(newCount) {
            this.currentCount = newCount;
            console.log('Count updated from event:', newCount);
        },
        // Method to handle reset event
        onCounterReset() {
            this.lastAction = 'Counter was reset';
            console.log('Counter was reset');
        }
    },
    template: `
        <div class="min-h-screen bg-gray-900 p-4">
            <div class="max-w-md mx-auto bg-gray-800 rounded-lg p-6">
                <h1 class="text-2xl font-bold text-white mb-4">Welcome</h1>
                <p class="text-gray-400 mb-6">A simple todo application with dark theme</p>
                
                <!-- Status from parent -->
                <div class="mb-6 p-3 bg-gray-700 rounded">
                    <p class="text-gray-300">Parent State:</p>
                    <p class="text-white font-medium">Current Count: {{ currentCount }}</p>
                    <p class="text-sm text-gray-400">Last Action: {{ lastAction }}</p>
                </div>
                
                <!-- Counter component with props and event listeners -->
                <Counter 
                    :initial-count="5"
                    message="Click to increment:"
                    @count-updated="onCountUpdated"
                    @count-reset="onCounterReset"
                    :on-increment="handleIncrement"
                />
            </div>
        </div>
    `
});
