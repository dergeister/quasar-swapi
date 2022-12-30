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
    @request="handleRequest"
    @row-click="handleRowClick"
  >
    <template v-slot:loading>
      <q-inner-loading showing color="primary" />
    </template>
  </q-table>
</template>
<script>
import { defineComponent, defineEmits } from "vue";
import { useI18n } from "vue-i18n";
import { useFilmsStore } from "src/stores/films-store";
import { storeToRefs } from "pinia";
import moment from "moment";

export default defineComponent({
  name: "FilmsTable",
  setup(props, { emit }) {
    const { t } = useI18n();
    const filmsStore = useFilmsStore();

    const { films, cardFilm, pagination, rowsPerPageOptions, isLoading } =
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

    const handleRequest = (requestProps) => {
      const { page } = requestProps.pagination;

      filmsStore.fetchFilms(page);
    };

    const handleRowClick = (event, row, index) => {
      cardFilm.value = row;
      emit("filmClick");
    };

    filmsStore.fetchFilms();

    return {
      films,
      rowsPerPageOptions,
      isLoading,
      pagination,
      columns,
      paginationLabel,
      handleRequest,
      handleRowClick,
    };
  },
});
</script>
<style></style>
