import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import './bootstrap.css'

// SweetAlert 2
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2);

// Fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faGear, faCircleCheck, faCirclePlay, faCircleStop, faCircleLeft} from '@fortawesome/pro-duotone-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faTrash, faGear, faCircleCheck, faCirclePlay, faCircleStop, faCircleLeft,)
Vue.component('font-awesome-icon', FontAwesomeIcon)

// Vue Router
import router from './router'

Vue.config.productionTip = false
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
