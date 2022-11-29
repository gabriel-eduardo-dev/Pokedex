const poke_api = {};

async function convert_pokeApi_to_pokemon(poke_detail) {
	const pokemon = new Pokemon();
	pokemon.id = poke_detail.id;
	pokemon.name = poke_detail.name;

	const types = poke_detail.types.map((typeSlot) => typeSlot.type.name);
	const [type] = types;

	pokemon.types = types;
	pokemon.type = type;

	pokemon.photo = poke_detail.sprites.other.dream_world.front_default;

	const stats = poke_detail.stats.map((stat) => stat.base_stat);
	pokemon.hp = stats[0];
	pokemon.atk = stats[1];
	pokemon.def = stats[2];
	pokemon.satk = stats[3];
	pokemon.spd = stats[4];
	pokemon.spd = stats[5];

	fetch(poke_detail.species.url)
		.then((response) => response.json())
		.then((detail) => {
			const texts = detail.flavor_text_entries.map((text) => text.flavor_text);
			pokemon.about = texts[0];
		})
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
