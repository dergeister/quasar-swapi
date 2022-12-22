<template>
  <q-table
    :title="$t('resources.films.title')"
    :columns="columns"
    :rows="tableRows"
    :rows-per-page-label="$t('table.rowsPerPageLabel')"
    :rows-per-page-options="[10, 20, 30]"
    row-key="title"
    :pagination="pagination"
    :pagination-label="paginationLabel"
    :loading="isLoading"
    :loading-label="$t('table.loadingLabel')"
  >
    <template v-slot:loading>
      <q-inner-loading showing color="primary" />
    </template>
    <template v-slot:body-cell-title="props">
      <q-td :props="props">
        <div clickable tag="a">
          {{ props.value }}
        </div>
      </q-td>
    </template>
  </q-table>
</template>
<script>
import { defineComponent, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useFilmsStore } from "src/stores/films-store";
import { storeToRefs } from "pinia";
import moment from "moment";

const pagination = {
  rowsPerPage: 10,
};

export default defineComponent({
  name: "FilmsTable",
  setup() {
    const { t } = useI18n();
    const filmsStore = useFilmsStore();

    const { films, isLoading } = storeToRefs(filmsStore);

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

    return {
      filmsStore,
      columns,
      isLoading,
      pagination,
      paginationLabel,
      tableRows: computed(() => {
        const mappedFilms = films.value.map((film) => {
          return { ...film };
        });
        return mappedFilms;
      }),
    };
  },
  async mounted() {
    await this.filmsStore.fetchFilms();
  },
});
</script>
<style></style>