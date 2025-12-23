import { createApp } from "vue";

import { VueQueryPlugin } from "@tanstack/vue-query";
import { createPinia } from "pinia";

import App from "@/App.vue";
import { queryClient } from "@/composables/useQueryClient";
import { i18n } from "@/locales";
import router from "@/router";

import "@/style.css";

const pinia = createPinia();

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(i18n);
app.use(VueQueryPlugin, {
  queryClient,
});

app.mount("#app");
