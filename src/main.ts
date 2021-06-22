import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import { axios } from '@/api/index';

const app = createApp(App)

app.provide('axios', axios)
app.use(store)
app.use(router)
app.mount("#app");
