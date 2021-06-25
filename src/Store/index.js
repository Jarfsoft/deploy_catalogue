import { createStore } from 'redux';

import getPokemon from '../pokeApi';

const lis = [];

const pushPokemon = (data) => {
  lis.push(data);
};

for (let i = 1; i <= 12; i += 1) {
  getPokemon(i, pushPokemon);
}

const stateDefault = {
  list: lis,
  iteration: 0,
};

const pokemons = (state = stateDefault, action) => {
  let newState;
  let newIteration;
  let pushNewPokemon;
  switch (action.type) {
    case 'NEXT':
      newState = { list: [], iteration: 0 };
      newIteration = state.iteration;
      pushNewPokemon = (data) => {
        newState.list.push(data);
      };
      newIteration += 1;
      for (let i = 1 + newIteration * 12; i <= 12 + newIteration * 12; i += 1) {
        getPokemon(i, pushNewPokemon);
        newState.iteration = newIteration;
      }
      return newState;
    case 'PREVIOUS':
      newState = { list: [], iteration: 0 };
      newIteration = state.iteration;
      pushNewPokemon = (data) => {
        newState.list.push(data);
      };
      newIteration -= 1;
      for (let i = 1 + newIteration * 12; i <= 12 + newIteration * 12; i += 1) {
        getPokemon(i, pushNewPokemon);
        newState.iteration = newIteration;
      }
      return newState;
    default:
      return state;
  }
};

const store = createStore(pokemons);

export default store;