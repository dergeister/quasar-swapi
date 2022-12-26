import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";

export const useSpeciesStore = defineStore("species", () => {
  const rowsPerPage = 10;

  //state
  const species = ref([]);
  const rowsPerPageOptions = ref([rowsPerPage]);
  const isLoading = ref(false);
  const pagination = ref({
    page: 1,
    rowsNumber: 0,
    rowsPerPage: rowsPerPage,
  });

  //actions
  const fetchSpecies = (page = 1) => {
    isLoading.value = true;
    return api
      .get(`species/?page=${page}`)
      .then((response) => {
        const { data } = response;

        species.value = data.results;

        pagination.value.page = page;
        pagination.value.rowsNumber = data.count;
      })
      .finally(() => {
        isLoading.value = false;
      });
  };

  return { species, rowsPerPageOptions, pagination, isLoading, fetchSpecies };
});
