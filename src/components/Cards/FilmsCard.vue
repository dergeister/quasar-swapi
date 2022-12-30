<template>
  <q-dialog v-model="isCardOpen">
    <q-card class="my-card">
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
            <strong>
              {{ $t("resources.films.characters") }}
            </strong>
            <span>Ver Personagens</span>
          </div>
        </div>
        <div class="row card-row">
          <div class="col-6 column">
            <strong>
              {{ $t("resources.planets.title") }}
            </strong>
            <span>Ver Planetas</span>
          </div>
          <div class="col-6 column">
            <strong>
              {{ $t("resources.species.title") }}
            </strong>
            <span>Ver Espécies</span>
          </div>
        </div>
        <div class="row card-row">
          <div class="col-6 column">
            <strong>
              {{ $t("resources.starships.title") }}
            </strong>
            <span>Ver Naves Estelares</span>
          </div>
          <div class="col-6 column">
            <strong>
              {{ $t("resources.vehicles.title") }}
            </strong>
            <span>Ver Veículos</span>
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions class="row justify-center q-my-sm">
        <q-btn color="primary">
          <span class="q-px-md"> Ver Texto de Abertura </span>
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
import { defineComponent, ref, watchEffect, computed } from "vue";
import { useFilmsStore } from "src/stores/films-store";
import { storeToRefs } from "pinia";
import moment from "moment";

export default defineComponent({
  name: "FilmsTable",
  setup() {
    const filmsStore = useFilmsStore();

    const isCardOpen = ref(false);

    const { cardFilm, isLoading } = storeToRefs(filmsStore);

    const filmReleaseDate = computed(() => {
      return moment(cardFilm.value.release_date).format("DD/MM/YYYY");
    });

    const openFilmsCard = () => {
      isCardOpen.value = true;
    };

    const closeFilmsCard = () => {
      isCardOpen.value = false;
    };

    // const watchCardFilmIndex = watchEffect(
    //   () => {
    //     if (cardFilm.value !== null) {
    //       openFilmsCard();
    //     }
    //   },
    //   {
    //     flush: "post",
    //   }
    // );

    return {
      isCardOpen,
      cardFilm,
      filmReleaseDate,
      isLoading,
      // watchCardFilmIndex,
      openFilmsCard,
      closeFilmsCard,
    };
  },
});
</script>
<style></style>
