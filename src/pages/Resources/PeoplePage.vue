<template>
  <q-page class="flex flex-center">
    <PeopleTable />
  </q-page>
</template>

<script>
import PeopleTable from "src/components/PeopleTable.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "PeoplePage",
  components: { PeopleTable },
});
</script>
