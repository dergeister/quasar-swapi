<template>
  <div class="films-card">
    <q-dialog v-model="isCardOpen">
      <q-card class="data-card">
        <q-card-section>
          <div class="row justify-between items-center">
            <div class="text-h5">
              {{
                `${$t("resources.films.episode")} ${cardFilm.episode_id}: ${
                  cardFilm.title
                }`
              }}
            </div>
            <q-btn
              class="q-ml-lg"
              icon="close"
              color="none"
              text-color="grey"
              round
              unelevated
              @click="closeFilmsCard"
            />
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <div class="row card-row">
            <div class="col-6 column">
              <strong>
                {{ $t("resources.films.releaseDate") }}
              </strong>
              <span>
                {{ filmReleaseDate }}
              </span>
            </div>
          </div>
          <div class="row card-row">
            <div class="col-6 column">
              <strong>
                {{ $t("resources.films.director") }}
              </strong>
              <span>
                {{ cardFilm.director }}
              </span>
            </div>
            <div class="col-6 column">
              <strong>
                {{ $t("resources.films.producer") }}
              </strong>
              <span>
                {{ cardFilm.producer }}
              </span>
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <div class="row card-row">
            <div class="col-6 column">
              <q-btn color="primary">
                {{ $t("resources.films.seeCrawlingText") }}
              </q-btn>
            </div>
            <div class="col-6 column">
              <q-btn color="primary" @click="openCharactersCard">
                {{ $t("resources.films.seeCharacters") }}
              </q-btn>
            </div>
          </div>
          <div class="row card-row">
            <div class="col-6 column">
              <q-btn color="primary" @click="openPlanetsCard">
                {{ $t("resources.films.seePlanets") }}
              </q-btn>
            </div>
            <div class="col-6 column">
              <q-btn color="primary" @click="openStarshipsCard">
                {{ $t("resources.films.seeStarships") }}
              </q-btn>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <DataListCard
      ref="charactersCard"
      :title="$t('resources.films.characters')"
      :isLoading="isLoadingCharacters"
      :dataList="charactersList"
    />
    <DataListCard
      ref="planetsCard"
      :title="$t('resources.planets.title')"
      :isLoading="isLoadingPlanets"
      :dataList="planetsList"
    />
    <DataListCard
      ref="starshipsCard"
      :title="$t('resources.starships.title')"
      :isLoading="isLoadingStarships"
      :dataList="starshipsList"
    />
  </div>
</template>
<script>
import { defineComponent, ref, computed } from "vue";
import { useFilmsStore } from "src/stores/films-store";
import { storeToRefs } from "pinia";
import moment from "moment";

import DataListCard from "./DataListCard.vue";

export default defineComponent({
  name: "FilmsTable",
  components: { DataListCard },
  setup() {
    const filmsStore = useFilmsStore();
    const isCardOpen = ref(false);
    const isCharactersCardOpen = ref(false);
    const charactersCard = ref(null);
    const planetsCard = ref(null);
    const starshipsCard = ref(null);

    const {
      cardFilm,
      isLoading,
      isLoadingCharacters,
      isLoadingPlanets,
      isLoadingStarships,
    } = storeToRefs(filmsStore);

    const filmReleaseDate = computed(() => {
      return moment(cardFilm.value.release_date).format("DD/MM/YYYY");
    });

    const charactersList = computed(() => {
      let characters = [];

      if (cardFilm.value && cardFilm.value.characterNames) {
        characters = cardFilm.value.characterNames;
      }

      return characters;
    });

    const planetsList = computed(() => {
      let planets = [];

      if (cardFilm.value && cardFilm.value.planetNames) {
        planets = cardFilm.value.planetNames;
      }

      return planets;
    });

    const starshipsList = computed(() => {
      let starships = [];

      if (cardFilm.value && cardFilm.value.starshipNames) {
        starships = cardFilm.value.starshipNames;
      }

      return starships;
    });

    const openFilmsCard = () => {
      isCardOpen.value = true;
    };
    const closeFilmsCard = () => {
      isCardOpen.value = false;
    };
    const openCharactersCard = () => {
      filmsStore.fetchCharacters();
      charactersCard.value.openCard();
    };
    const openPlanetsCard = () => {
      filmsStore.fetchPlanets();
      planetsCard.value.openCard();
    };
    const openStarshipsCard = () => {
      filmsStore.fetchStarships();
      starshipsCard.value.openCard();
    };

    return {
      isCardOpen,
      isCharactersCardOpen,
      cardFilm,
      charactersCard,
      planetsCard,
      starshipsCard,
      isLoading,
      isLoadingCharacters,
      isLoadingPlanets,
      isLoadingStarships,
      filmReleaseDate,
      charactersList,
      planetsList,
      starshipsList,
      openFilmsCard,
      closeFilmsCard,
      openCharactersCard,
      openPlanetsCard,
      openStarshipsCard,
    };
  },
});
</script>
<style></style>
