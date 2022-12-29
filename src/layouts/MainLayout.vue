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

    <q-page-container
      class="column space-background"
      @mousemove="handleMouseMove"
    >
      <div class="stars-far"></div>
      <div class="stars-mid" :style="midStarsStyle"></div>
      <div class="stars-close" :style="closeStarsStyle"></div>
      <router-view class="content-wrapper" />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import SidebarResource from "src/components/SidebarResource.vue";
import sidebarResources from "../helpers/sidebar-resources";

export default defineComponent({
  name: "MainLayout",
  components: {
    SidebarResource,
  },

  setup() {
    const midStarsMultiplier = 0.02;
    const closeStarsMultiplier = 0.06;
    const defaultOffset = 50;

    const leftDrawerOpen = ref(false);
    const midStarsCoordinates = ref({
      x: defaultOffset,
      y: defaultOffset,
    });
    const closeStarsCoordinates = ref({
      x: defaultOffset,
      y: defaultOffset,
    });

    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    };

    const handleMouseMove = (e) => {
      console.log(e);
      applyParallax(e.clientX, e.clientY);
    };

    const applyParallax = (offsetX, offsetY) => {
      const contentWrapper = document.querySelector(".content-wrapper");

      const halfWidth = contentWrapper.offsetWidth / 2;
      const halfHeight = contentWrapper.offsetHeight / 2;

      const midMovement = {
        x: (offsetX - halfWidth) * midStarsMultiplier,
        y: (offsetY - halfHeight) * midStarsMultiplier,
      };
      const closeMovement = {
        x: (offsetX - halfWidth) * closeStarsMultiplier,
        y: (offsetY - halfHeight) * closeStarsMultiplier,
      };

      midStarsCoordinates.value.x = defaultOffset - midMovement.x;
      midStarsCoordinates.value.y = defaultOffset - midMovement.y;

      closeStarsCoordinates.value.x = defaultOffset - closeMovement.x;
      closeStarsCoordinates.value.y = defaultOffset - closeMovement.y;
    };

    const midStarsStyle = computed(() => {
      return `left:${midStarsCoordinates.value.x}px;top:${midStarsCoordinates.value.y}px`;
    });

    const closeStarsStyle = computed(() => {
      return `left:${closeStarsCoordinates.value.x}px;top:${closeStarsCoordinates.value.y}px`;
    });

    return {
      leftDrawerOpen,
      midStarsStyle,
      closeStarsStyle,
      sidebarResources,
      toggleLeftDrawer,
      handleMouseMove,
    };
  },
});
</script>

<style lang="scss" scoped>
$spawnWidth: 2048px;
$spawnHeight: 1080px;

.space-background {
  height: 100%;
  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
  overflow: hidden;
  position: relative;
}

@mixin star-template($numStars, $starSize) {
  z-index: 10;
  width: $starSize;
  height: $starSize;
  border-radius: 50%;
  background: transparent;
  box-shadow: create-stars($numStars);
  position: absolute;
}

@function create-stars($n) {
  $stars: "#{random($spawnWidth)}px #{random($spawnHeight)}px #FFF";

  @for $i from 2 through $n {
    $stars: "#{$stars} , #{random($spawnWidth)}px #{random($spawnHeight)}px #FFF";
  }

  @return unquote($stars);
}

.stars-far {
  @include star-template(500, 1px);
}

.stars-mid {
  @include star-template(100, 2px);
}

.stars-close {
  @include star-template(20, 4px);
}
</style>
