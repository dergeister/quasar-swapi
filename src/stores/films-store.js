import { defineStore } from "pinia";
import { ref } from "vue";
import { api } from "src/boot/axios";

export const useFilmsStore = defineStore("films", () => {
  const rowsPerPage = 10;

  //state
  const films = ref([]);
  const rowsPerPageOptions = ref([rowsPerPage]);
  const isLoading = ref(false);
  const pagination = ref({
    page: 1,
    rowsNumber: 0,
    rowsPerPage: rowsPerPage,
  });

  const cardFilm = ref(null);
  const isLoadingCharacters = ref(false);
  const isLoadingPlanets = ref(false);
  const isLoadingStarships = ref(false);

  //actions
  const fetchFilms = (page = 1) => {
    isLoading.value = true;
    return api
      .get(`films/?page=${page}`)
      .then((response) => {
        const { data } = response;

        films.value = data.results;

        pagination.value.page = page;
        pagination.value.rowsNumber = data.count;
      })
      .finally(() => {
        isLoading.value = false;
      });
  };

  const fetchCharacters = () => {
    if (cardFilm.value.characterNames) return;

    isLoadingCharacters.value = true;

    const charactersRequests = cardFilm.value.characters.map((characterURL) => {
      return api.get(characterURL);
    });

    Promise.all(charactersRequests)
      .then((responses) => {
        const characterNames = responses.map((response) => {
          return response.data.name;
        });

        cardFilm.value.characterNames = characterNames;
      })
      .finally(() => {
        if (cardFilm.value.characterNames) {
          cardFilm.value.characterNames.sort();
        }

        isLoadingCharacters.value = false;
      });
  };

  const fetchPlanets = () => {
    if (cardFilm.value.planetNames) {
      return;
    }

    isLoadingPlanets.value = true;

    const planetsRequests = cardFilm.value.planets.map((planetURL) => {
      return api.get(planetURL);
    });

    Promise.all(planetsRequests)
      .then((responses) => {
        const planetNames = responses.map((response) => {
          return response.data.name;
        });

        cardFilm.value.planetNames = planetNames;
      })
      .finally(() => {
        if (cardFilm.value.planetNames) {
          cardFilm.value.planetNames.sort();
        }

        isLoadingPlanets.value = false;
      });
  };

  const fetchStarships = () => {
    if (cardFilm.value.starshipNames) {
      return;
    }

    isLoadingStarships.value = true;

    const starshipRequests = cardFilm.value.starships.map((starshipURL) => {
      return api.get(starshipURL);
    });

    Promise.all(starshipRequests)
      .then((responses) => {
        const starshipNames = responses.map((response) => {
          return response.data.name;
        });

        cardFilm.value.starshipNames = starshipNames;
      })
      .finally(() => {
        if (cardFilm.value.starshipNames) {
          cardFilm.value.starshipNames.sort();
        }

        isLoadingStarships.value = false;
      });
  };

  return {
    films,
    cardFilm,
    rowsPerPageOptions,
    pagination,
    isLoading,
    isLoadingCharacters,
    isLoadingPlanets,
    isLoadingStarships,
    fetchFilms,
    fetchCharacters,
    fetchPlanets,
    fetchStarships,
  };
});
