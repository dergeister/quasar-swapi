import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";

export const useFilmsStore = defineStore("films", () => {
  //state
  const films = ref([]);
  const rowsPerPageOptions = ref([10]);
  const isLoading = ref(false);
  const pagination = ref({
    rowsPerPage: 10,
  });

  //actions
  async function fetchFilms() {
    try {
      isLoading.value = true;
      const { data } = await api.get("films/");

      films.value = [...data.results];
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  }

  return { films, rowsPerPageOptions, pagination, isLoading, fetchFilms };
});
