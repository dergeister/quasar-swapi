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
import { defineComponent, computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { usePeopleStore } from "src/stores/people-store";
import { storeToRefs } from "pinia";
import { api } from "src/boot/axios";

export default defineComponent({
  name: "FilmsTable",
  setup() {
    const { t } = useI18n();
    const people = ref([]);
    const rowsPerPageOptions = ref([10]);
    const isLoading = ref(false);
    const pagination = ref({
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 0,
    });

    const fetchPeople = (page = 1) => {
      isLoading.value = true;
      return api
        .get(`people/?page=${page}`)
        .then((response) => {
          const { data } = response;

          people.value = data.results;

          pagination.value.rowsNumber = data.count;
          pagination.value.page = page;
        })
        .finally(() => {
          isLoading.value = false;
        });
    };

    // const peopleStore = usePeopleStore();

    // const { people, rowsPerPageOptions, isLoading } = storeToRefs(peopleStore);

    // const pagination = peopleStore.pagination;

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

      fetchPeople(page);
    };

    fetchPeople();

    return {
      people,
      rowsPerPageOptions,
      isLoading,
      columns,
      pagination,
      paginationLabel,
      onRequest,
      fetchPeople,
    };
  },
});
</script>
<style></style>
