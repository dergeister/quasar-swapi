<template>
  <q-page class="flex flex-center">
    <FilmsCard ref="filmsCard" />
    <FilmsTable @filmClick="handleTableRowClick" />
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import FilmsTable from "src/components/FilmsTable.vue";
import FilmsCard from "src/components/Cards/FilmsCard.vue";

export default defineComponent({
  name: "FilmsPage",
  components: { FilmsTable, FilmsCard },

  setup() {
    const filmsCard = ref(null);

    const handleTableRowClick = () => {
      filmsCard.value.openFilmsCard();
    };

    return {
      filmsCard,
      handleTableRowClick,
    };
  },
});
</script>
