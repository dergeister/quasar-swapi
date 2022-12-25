import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";

export const usePeopleStore = defineStore("people", () => {
  const rowsPerPage = 10;

  //state
  const people = ref([]);
  const rowsPerPageOptions = ref([rowsPerPage]);
  const isLoading = ref(false);
  const pagination = ref({
    page: 1,
    rowsNumber: 0,
    rowsPerPage: rowsPerPage,
  });

  //actions
  const fetchPeople = (page = 1) => {
    isLoading.value = true;
    return api
      .get(`people/?page=${page}`)
      .then((response) => {
        const { data } = response;

        people.value = data.results;

        pagination.value.page = page;
        pagination.value.rowsNumber = data.count;
      })
      .finally(() => {
        isLoading.value = false;
      });
  };

  return { people, rowsPerPageOptions, pagination, isLoading, fetchPeople };
});
