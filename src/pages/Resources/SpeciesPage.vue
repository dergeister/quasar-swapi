<template>
  <q-page class="flex flex-center">
    <SpeciesTable />
  </q-page>
</template>

<script>
import SpeciesTable from "src/components/SpeciesTable.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "SpeciesPage",
  components: { SpeciesTable },
});
</script>
