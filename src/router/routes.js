const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },
  {
    path: "/resources/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "films",
        component: () => import("pages/Resources/FilmsPage.vue"),
      },
      {
        path: "people",
        component: () => import("src/pages/Resources/PeoplePage.vue"),
      },
      {
        path: "planets",
        component: () => import("src/pages/Resources/PlanetsPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
