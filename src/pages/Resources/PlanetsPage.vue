<template>
  <q-page class="flex flex-center">
    <PlanetsTable />
  </q-page>
</template>

<script>
import PlanetsTable from "src/components/PlanetsTable.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "PlanetsPage",
  components: { PlanetsTable },
});
</script>
