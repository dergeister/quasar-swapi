import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";

export const useFilmsStore = defineStore("films", () => {
  const rowsPerPage = 10;

  //state
  const films = ref([]);
  const rowsPerPageOptions = ref([rowsPerPage]);
  const isLoading = ref(false);
  const pagination = ref({
    page: 1,
    rowsNumber: 0,
    rowsPerPage: rowsPerPage,
  });

  //actions
  const fetchFilms = () => {
    isLoading.value = true;
    return api
      .get(`films/?page=${page}`)
      .then((response) => {
        const { data } = response;

        films.value = data.results;

        pagination.value.page = page;
        pagination.value.rowsNumber = data.count;
      })
      .finally(() => {
        isLoading.value = false;
      });
  };

  return { films, rowsPerPageOptions, pagination, isLoading, fetchFilms };
});
