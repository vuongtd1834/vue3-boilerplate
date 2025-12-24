import { createApp } from "vue";

import { VueQueryPlugin } from "@tanstack/vue-query";
import { createPinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";

import App from "@/App.vue";
import { queryClient } from "@/composables/useQueryClient";
import { i18n } from "@/locales";
import router from "@/router";

import "@/styles/global.css";

const pinia = createPinia();
pinia.use(createPersistedState());

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(i18n);
app.use(VueQueryPlugin, {
  queryClient,
});

app.mount("#app");
