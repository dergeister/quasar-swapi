<template>
  <q-table
    :title="$t('resources.starships.title')"
    :columns="columns"
    :rows="starships"
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
import { useStarshipsStore } from "src/stores/starships-store";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "StarshipsTable",
  setup() {
    const { t } = useI18n();

    const starshipsStore = useStarshipsStore();
    const { starships, pagination, rowsPerPageOptions, isLoading } =
      storeToRefs(starshipsStore);

    const columns = [
      {
        name: "name",
        label: t("resources.starships.name"),
        align: "left",
        field: "name",
      },
      {
        name: "model",
        label: t("resources.starships.model"),
        align: "left",
        field: "model",
      },
      {
        name: "crew",
        label: t("resources.starships.crew"),
        align: "left",
        field: "crew",
      },
      {
        name: "passengers",
        label: t("resources.starships.passengers"),
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

      starshipsStore.fetchStarships(page);
    };

    starshipsStore.fetchStarships();

    return {
      starships,
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
