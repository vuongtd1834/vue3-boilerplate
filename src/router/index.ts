import { createRouter, createWebHistory } from "vue-router";

import { changeLanguage } from "@/locales";

const supportedLocales = ["en", "ja"];
const defaultLocale = "en";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: () => `/${defaultLocale}`,
    },
    {
      path: "/:lang",
      component: () => import("@/components/templates/AppLayout.vue"),
      beforeEnter: (to, _from, next) => {
        const lang = to.params.lang as string;
        if (supportedLocales.includes(lang)) {
          changeLanguage(lang as "en" | "ja");
          next();
        } else {
          next(`/${defaultLocale}`);
        }
      },
      children: [
        {
          path: "",
          name: "home",
          component: () => import("@/views/Home/index.vue"),
        },
        {
          path: "upload",
          name: "upload",
          component: () => import("@/views/Upload/index.vue"),
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: () => `/${defaultLocale}`,
    },
  ],
});

// Navigation guard to sync locale with route
router.beforeEach((to, _from, next) => {
  const lang = to.params.lang as string;
  if (lang && supportedLocales.includes(lang)) {
    changeLanguage(lang as "en" | "ja");
  }
  next();
});

export default router;
