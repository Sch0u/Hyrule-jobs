import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import './assets/global.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";

library.add(faEdit, faTrashCan);

createApp(App)
.component("font-awesome-icon", FontAwesomeIcon)
.mount('#app')
