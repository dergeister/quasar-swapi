<template>
  <q-table
    :title="$t('resources.planets.title')"
    :columns="columns"
    :rows="planets"
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
import { usePlanetsStore } from "src/stores/planets-store";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "FilmsTable",
  setup() {
    const { t } = useI18n();

    const planetsStore = usePlanetsStore();
    const { planets, pagination, rowsPerPageOptions, isLoading } =
      storeToRefs(planetsStore);

    const columns = [
      {
        name: "name",
        label: t("resources.planets.name"),
        align: "left",
        field: "name",
      },
      {
        name: "population",
        align: "left",
        label: t("resources.planets.population"),
        field: "population",
      },
      {
        name: "terrain",
        align: "left",
        label: t("resources.planets.terrain"),
        field: "terrain",
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

      planetsStore.fetchPlanets(page);
    };

    planetsStore.fetchPlanets();

    return {
      planets,
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
