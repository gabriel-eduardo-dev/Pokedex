const poke_api = {};

function convert_pokeApi_to_pokemon(poke_detail) {
	const pokemon = new Pokemon();
	pokemon.number = poke_detail.id;
	pokemon.name = poke_detail.name;

	const types = poke_detail.types.map((typeSlot) => typeSlot.type.name);
	const [type] = types;

	pokemon.types = types;
	pokemon.type = type;

	pokemon.photo = poke_detail.sprites.other.dream_world.front_default;

	return pokemon;

}

poke_api.get_pokemon_detail = (pokemon) => {
	return fetch(pokemon.url)
		.then((response) => response.json())
		.then(convert_pokeApi_to_pokemon)
}

poke_api.get_pokemons = (offset = 0, limit = 10) => {
	const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
	
	return fetch(url)
		.then((response) => response.json())
		.then((json_body) => json_body.results)
		.then((pokemons) => pokemons.map(poke_api.get_pokemon_detail))
		.then((detail_request) => Promise.all(detail_request))	
		.then((pokemon_details) => pokemon_details)
		.catch((error) => console.log(error))
}
