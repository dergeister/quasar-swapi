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
      {
        path: "species",
        component: () => import("src/pages/Resources/SpeciesPage.vue"),
      },
      {
        path: "starships",
        component: () => import("src/pages/Resources/StarshipsPage.vue"),
      },
      {
        path: "vehicles",
        component: () => import("src/pages/Resources/VehiclesPage.vue"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
