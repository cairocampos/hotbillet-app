import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/tailwind.css';
import Swal from 'sweetalert2';

// Global components
import {HeadPage} from './components/global'

// Global mixins
import {Alert} from './mixins/global';

const app = createApp(App);
app.component('HeadPage', HeadPage)

app.config.globalProperties.Swal = Swal;
app
.mixin(Alert)
.use(store)
.use(router)
.mount('#app')
