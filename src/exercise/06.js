import * as React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {PokemonForm, fetchPokemon, PokemonInfoFallback, PokemonDataView} from '../pokemon'

function PokemonInfo({pokemonName}) {
  // const [pokemon, setPokemon] = React.useState(null);
  // const [error, setError] = React.useState(null);
  // const [status, setStatus] = React.useState('idle');
  const [pokemonState, setPokemonState] = React.useState({pokemon: null, status: 'idle', error: null});

  React.useEffect(() => {
    if (!pokemonName) {
      return;
    }
    // setStatus('pending');
    setPokemonState({status: 'pending'});
    fetchPokemon(pokemonName).then(pokemon => {
      // setPokemon(pokemon);
      // setStatus('resolved')
      setPokemonState({pokemon, status: 'resolved'});
    }).catch(error => {
      // setError(error);
      // setStatus('rejected');
      setPokemonState({error, status: 'rejected'});
    });
  }, [pokemonName]);

  switch(pokemonState.status) {
    case 'idle':
      return 'Submit a pokemon';
    case 'rejected':
      return (
        <div role="alert">
          There was an error: <pre style={{whiteSpace: 'normal'}}>{pokemonState.error.message}</pre>
        </div>
      );
    case 'pending':
      return <PokemonInfoFallback name={pokemonName} />;
    case 'resolved':
      return <PokemonDataView pokemon={pokemonState.pokemon} />;
    default:
      return;
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
