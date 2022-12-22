<template>
  <q-layout view="lHh Lpr lFf">
    <q-drawer :v-model="true" show-if-above bordered>
      <q-list>
        <q-item-label header class="text-weight-bold">
          {{ $t("sidebar.title") }}
        </q-item-label>

        <SidebarResource
          v-for="(resource, index) in sidebarResources"
          :key="`resource-${index}`"
          v-bind="resource"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import SidebarResource from "src/components/SidebarResource.vue";
import sidebarResources from "../helpers/sidebar-resources";

export default defineComponent({
  name: "MainLayout",

  components: {
    SidebarResource,
  },

  setup() {
    return {
      sidebarResources: sidebarResources,
    };
  },
});
</script>
