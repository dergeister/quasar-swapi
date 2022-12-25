import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";

export const usePlanetsStore = defineStore("planets", () => {
  const rowsPerPage = 10;

  //state
  const planets = ref([]);
  const rowsPerPageOptions = ref([rowsPerPage]);
  const isLoading = ref(false);
  const pagination = ref({
    page: 1,
    rowsNumber: 0,
    rowsPerPage: rowsPerPage,
  });

  //actions
  const fetchPlanets = (page = 1) => {
    isLoading.value = true;
    return api
      .get(`planets/?page=${page}`)
      .then((response) => {
        const { data } = response;

        planets.value = data.results;

        pagination.value.page = page;
        pagination.value.rowsNumber = data.count;
      })
      .finally(() => {
        isLoading.value = false;
      });
  };

  return { planets, rowsPerPageOptions, pagination, isLoading, fetchPlanets };
});
