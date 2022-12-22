<template>
  <q-page class="flex flex-center">
    <FilmsTable />
  </q-page>
</template>

<script>
import FilmsTable from "src/components/FilmsTable.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "FilmsPage",
  components: { FilmsTable },
});
</script>
