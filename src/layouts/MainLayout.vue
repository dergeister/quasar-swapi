<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          {{ $t("header.title") }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
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

    <q-page-container class="column">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import SidebarResource from "src/components/SidebarResource.vue";
import sidebarResources from "../helpers/sidebar-resources";

export default defineComponent({
  name: "MainLayout",

  components: {
    SidebarResource,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      sidebarResources,
    };
  },
});
</script>
