import { createApp } from 'vue'
import App from './App.vue'
import { VuesticPlugin } from 'vuestic-ui'
import 'vuestic-ui/dist/vuestic-ui.css'
import store from './store'

createApp(App).use(store).use(VuesticPlugin).mount('#app');
