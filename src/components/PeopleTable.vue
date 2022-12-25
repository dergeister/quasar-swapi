<template>
  <q-table
    :title="$t('resources.people.title')"
    :columns="columns"
    :rows="people"
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
import { usePeopleStore } from "src/stores/people-store";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "FilmsTable",
  setup() {
    const { t } = useI18n();

    const peopleStore = usePeopleStore();
    const { people, pagination, rowsPerPageOptions, isLoading } =
      storeToRefs(peopleStore);

    const columns = [
      {
        name: "name",
        label: t("resources.people.name"),
        align: "left",
        field: "name",
      },
      {
        name: "birth_year",
        align: "left",
        label: t("resources.people.birthYear"),
        field: "birth_year",
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

      peopleStore.fetchPeople(page);
    };

    peopleStore.fetchPeople();

    return {
      people,
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
