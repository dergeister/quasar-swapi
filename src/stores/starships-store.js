import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";

export const useStarshipsStore = defineStore("starships", () => {
  const rowsPerPage = 10;

  //state
  const starships = ref([]);
  const rowsPerPageOptions = ref([rowsPerPage]);
  const isLoading = ref(false);
  const pagination = ref({
    page: 1,
    rowsNumber: 0,
    rowsPerPage: rowsPerPage,
  });

  //actions
  const fetchStarships = (page = 1) => {
    isLoading.value = true;
    return api
      .get(`starships/?page=${page}`)
      .then((response) => {
        const { data } = response;

        starships.value = data.results;

        pagination.value.page = page;
        pagination.value.rowsNumber = data.count;
      })
      .finally(() => {
        isLoading.value = false;
      });
  };

  return {
    starships,
    rowsPerPageOptions,
    pagination,
    isLoading,
    fetchStarships,
  };
});
