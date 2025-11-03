import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    token: null,
    email: null,
    username: null,
    recently_played: [],
  },
};

export const usersSlice = createSlice({
  name: "user",

  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.value = action.payload;
    },
    deleteUser: (state) => {
      state.value = {
        token: null,
        email: null,
        username: null,
        recently_played: [],
      };
    },
    updateRecentlyPlayed: (state, action) => {
      const storyToAdd = action.payload;
      const storyIdToAdd = storyToAdd._id;

      // 1. Filtrer l'ancienne liste pour supprimer l'histoire si elle existe déjà.
      //    Cela garantit qu'il n'y a pas de doublon, mais la déplace en haut.
      const filteredList = state.value.recently_played.filter((id) => id !== storyIdToAdd);

      // 2. Ajouter l'ID de la nouvelle histoire au début de la liste (unshift).
      filteredList.unshift(storyIdToAdd);

      // 3. Limiter la liste à 10 éléments si elle est trop longue.
      if (filteredList.length > 10) {
        filteredList.pop(); // Retire le dernier élément
      }

      // 4. Mettre à jour l'état (Mongoose utilise l'ID pour la liste de 'recently_played')
      state.value.recently_played = filteredList;
    },
  },
});

export const { updateUser, deleteUser, updateRecentlyPlayed } = usersSlice.actions;
export default usersSlice.reducer;
