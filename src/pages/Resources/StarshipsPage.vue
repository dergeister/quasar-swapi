<template>
  <q-page class="flex flex-center">
    <StarshipsTable />
  </q-page>
</template>

<script>
import StarshipsTable from "src/components/StarshipsTable.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "StarshipsPage",
  components: { StarshipsTable },
});
</script>
