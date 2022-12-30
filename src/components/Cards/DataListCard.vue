<template>
  <q-dialog v-model="isCardOpen">
    <q-card class="data-card-list">
      <q-card-section>
        <div class="row justify-between items-center">
          <div class="text-h6">
            {{ title }}
          </div>
          <q-btn
            class="q-ml-lg"
            icon="close"
            color="none"
            text-color="grey"
            round
            unelevated
            @click="closeCard"
          />
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section v-if="isLoading" class="row justify-center">
        <q-spinner color="primary" size="3em" />
      </q-card-section>

      <q-card-section v-else>
        <div class="row card-row">
          <div
            class="col-6 column"
            v-for="(data, index) in dataList"
            :key="`list-item-${index}`"
          >
            {{ data }}
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
import { defineComponent, ref, toRefs } from "vue";

export default defineComponent({
  name: "DataListCard",
  props: {
    title: String,
    isLoading: Boolean,
    dataList: Array,
  },
  setup(props) {
    const isCardOpen = ref(false);

    const openCard = () => {
      isCardOpen.value = true;
    };

    const closeCard = () => {
      isCardOpen.value = false;
    };

    return {
      isCardOpen,
      openCard,
      closeCard,
    };
  },
});
</script>
<style></style>
