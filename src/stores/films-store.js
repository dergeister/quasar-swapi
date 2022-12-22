import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";

export const useFilmsStore = defineStore("films", () => {
  //state
  const films = ref([]);
  const isLoading = ref(false);

  //actions
  async function fetchFilms() {
    try {
      isLoading.value = true;
      const { data } = await api.get("films/");

      films.value = [...data.results];

      console.log(films.value);
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  }

  return { films, isLoading, fetchFilms };
});
