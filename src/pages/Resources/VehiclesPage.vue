<template>
  <q-page class="flex flex-center">
    <VehiclesTable />
  </q-page>
</template>

<script>
import VehiclesTable from "src/components/VehiclesTable.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "VehiclesPage",
  components: { VehiclesTable },
});
</script>
