import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";

export const useVehiclesStore = defineStore("vehicles", () => {
  const rowsPerPage = 10;

  //state
  const vehicles = ref([]);
  const rowsPerPageOptions = ref([rowsPerPage]);
  const isLoading = ref(false);
  const pagination = ref({
    page: 1,
    rowsNumber: 0,
    rowsPerPage: rowsPerPage,
  });

  //actions
  const fetchVehicles = (page = 1) => {
    isLoading.value = true;
    return api
      .get(`vehicles/?page=${page}`)
      .then((response) => {
        const { data } = response;

        vehicles.value = data.results;

        pagination.value.page = page;
        pagination.value.rowsNumber = data.count;
      })
      .finally(() => {
        isLoading.value = false;
      });
  };

  return {
    vehicles,
    rowsPerPageOptions,
    pagination,
    isLoading,
    fetchVehicles,
  };
});
