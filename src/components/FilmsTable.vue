<template>
  <q-table
    :title="$t('resources.films.title')"
    :columns="columns"
    :rows="films"
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
    <template v-slot:body-cell-title="props">
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
import { useFilmsStore } from "src/stores/films-store";
import { storeToRefs } from "pinia";
import moment from "moment";

export default defineComponent({
  name: "FilmsTable",
  setup() {
    const { t } = useI18n();
    const filmsStore = useFilmsStore();

    const { films, pagination, rowsPerPageOptions, isLoading } =
      storeToRefs(filmsStore);

    const columns = [
      {
        name: "episode",
        label: t("resources.films.episode"),
        align: "center",
        field: "episode_id",
      },
      {
        name: "title",
        align: "left",
        label: t("resources.films.name"),
        field: "title",
        format: (val) => {
          return `Star Wars: ${val}`;
        },
      },
      {
        name: "release_date",
        align: "left",
        label: t("resources.films.releaseDate"),
        field: "release_date",
        format: (val) => {
          const date = moment(val).format("DD/MM/YYYY");
          return date;
        },
      },
    ];

    function paginationLabel(firstRowIndex, endRowIndex, totalRowsNumber) {
      return t("table.paginationLabel", {
        firstRowIndex,
        endRowIndex,
        totalRowsNumber,
      });
    }

    const onRequest = (requestProps) => {
      const { page } = requestProps.pagination;

      filmsStore.fetchFilms(page);
    };

    filmsStore.fetchFilms();

    return {
      films,
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
