<template>
  <q-table
    :title="$t('resources.vehicles.title')"
    :columns="columns"
    :rows="vehicles"
    :rows-per-page-label="$t('table.rowsPerPageLabel')"
    :rows-per-page-options="rowsPerPageOptions"
    row-key="title"
    v-model:pagination="pagination"
    :pagination-label="paginationLabel"
    :loading="isLoading"
    :loading-label="$t('table.loadingLabel')"
    @request="onRequest"
  >
    <template v-slot:loading>
      <q-inner-loading showing color="primary" />
    </template>
    <template v-slot:body-cell-name="props">
      <q-td :props="props">
        <div class="tableClickable">
          {{ props.value }}
        </div>
      </q-td>
    </template>
  </q-table>
</template>
<script>
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import { useVehiclesStore } from "src/stores/vehicles-store";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "VehiclesTable",
  setup() {
    const { t } = useI18n();

    const vehiclesStore = useVehiclesStore();
    const { vehicles, pagination, rowsPerPageOptions, isLoading } =
      storeToRefs(vehiclesStore);

    const columns = [
      {
        name: "name",
        label: t("resources.vehicles.name"),
        align: "left",
        field: "name",
      },
      {
        name: "model",
        label: t("resources.vehicles.model"),
        align: "left",
        field: "model",
      },
      {
        name: "crew",
        label: t("resources.vehicles.crew"),
        align: "left",
        field: "crew",
      },
      {
        name: "passengers",
        label: t("resources.vehicles.passengers"),
        align: "left",
        field: "passengers",
      },
    ];

    const paginationLabel = (firstRowIndex, endRowIndex, totalRowsNumber) => {
      return t("table.paginationLabel", {
        firstRowIndex,
        endRowIndex,
        totalRowsNumber,
      });
    };

    const onRequest = (requestProps) => {
      const { page } = requestProps.pagination;

      vehiclesStore.fetchVehicles(page);
    };

    vehiclesStore.fetchVehicles();

    return {
      vehicles,
      rowsPerPageOptions,
      isLoading,
      pagination,
      columns,
      paginationLabel,
      onRequest,
    };
  },
});
</script>
<style></style>
