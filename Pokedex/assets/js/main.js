const pokemon_list_id = document.getElementById('pokemonList');
const load_more_buttom = document.getElementById('load_more_buttom');
const limit = 5;
let offset = 0;

const max_records = 151;

function load_more_pokemons(offset, limit) {
	function convert_pokemon_to_html(pokemon) {
		return `
			<li class="pokemon ${pokemon.type}">
				<span class="number">#${pokemon.number}</span>
				<span class="name">${pokemon.name}</span>
				<div class="detail">
					<ol class="type">
						${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
					</ol>
					<img src="${pokemon.photo}" alt="${pokemon.name}">
				</div>
			</li>
		`
	}

	poke_api.get_pokemons(offset, limit).then((pokemons = []) => {
		pokemon_list_id.innerHTML += pokemons.map(convert_pokemon_to_html).join('');
	})
}

load_more_pokemons(offset, limit);

load_more_buttom.addEventListener('click', () => {
	offset += limit;
	const qtd_record = offset + limit;
	if (qtd_record >= max_records) {
		const new_limit = max_records - offset;
		load_more_pokemons(offset, new_limit);
		load_more_buttom.parentElement.removeChild(load_more_buttom);
	} else {
		load_more_pokemons(offset, limit);
	}
})
