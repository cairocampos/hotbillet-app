import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/tailwind.css';
import Swal from 'sweetalert2';
// Global mixins
import {Alert} from './mixins/global';

const app = createApp(App);

app.config.globalProperties.Swal = Swal;
app
.mixin(Alert)
.use(store)
.use(router)
.mount('#app')
