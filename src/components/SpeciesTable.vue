<template>
  <q-table
    :title="$t('resources.species.title')"
    :columns="columns"
    :rows="species"
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
import { useSpeciesStore } from "src/stores/species-store";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "SpeciesTable",
  setup() {
    const { t } = useI18n();

    const speciesStore = useSpeciesStore();
    const { species, pagination, rowsPerPageOptions, isLoading } =
      storeToRefs(speciesStore);

    const columns = [
      {
        name: "name",
        label: t("resources.species.name"),
        align: "left",
        field: "name",
      },
      {
        name: "classification",
        align: "left",
        label: t("resources.species.classification"),
        field: "classification",
      },
      {
        name: "designation",
        align: "left",
        label: t("resources.species.designation"),
        field: "designation",
      },
      {
        name: "language",
        align: "left",
        label: t("resources.species.language"),
        field: "language",
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

      speciesStore.fetchSpecies(page);
    };

    speciesStore.fetchSpecies();

    return {
      species,
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
