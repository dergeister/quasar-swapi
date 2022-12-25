import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import { api } from "src/boot/axios";

export const usePeopleStore = defineStore("people", () => {
  const rowsPerPage = 10;

  //state
  const people = ref([]);
  const rowsPerPageOptions = ref([rowsPerPage]);
  const isLoading = ref(false);
  const pagination = reactive({
    rowsPerPage: rowsPerPage,
    rowsNumber: 0,
    page: 1,
  });

  //actions
  async function fetchPeople() {
    try {
      isLoading.value = true;
      const { data } = await api.get(`people/?page=${pagination.page}`);

      pagination.rowsNumber = data.count;

      people.value = [...data.results];
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  }

  return { people, rowsPerPageOptions, pagination, isLoading, fetchPeople };
});
