const pokemon_list_id = document.getElementById('pokemonList');
const limit = 24;
let offset = 0;

const max_records = 151;

function load_more_pokemons(offset, limit) {
	function convert_pokemon_to_html(pokemon) {
		return `<li class="pokemon ${pokemon.type}">
					<div class"main">
						<span class="name">${pokemon.name}</span>
						<span class="number">#${pokemon.id}</span>
					</div>
					<ol class="types">
						${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
					</ol>
					<img src="${pokemon.photo}" alt="">
					<div class="data">
						<div class="views">
							<span class="view-info ${pokemon.type}">Info</span>
							<span>Evolution</span>
							<span>Moves</span>
						</div>
						<div class="info">
							<p class="about">
								${pokemon.about}
							</p>
							<div>
								<div class="container">
									<span>HP</span>
									<span class="skills HP ${pokemon.type}"></span>
								</div>
								 <div class="container">
									<span>ATK</span>
									<span class="skills ATK ${pokemon.type}"></span>
								</div>
								  <div class="container">
									<span>DEF</span>
									<span class="skills DEF ${pokemon.type}">

								</span>
								</div>
								   <div class="container">
									<span>SATK</span>
									<span class="skills SATK ${pokemon.type}"></div>
								</div>
									<div class="container">
									<span>SDEF</span>
									<span class="skills SDEF ${pokemon.type}"></div>
								</div>
								<div class="container">
									<span>SPD</span>
									<span class="skills SPD ${pokemon.type}"></div>
								</div>
							</div>
						</div>
					</div>
				</li>`;
	}

	poke_api.get_pokemons(offset, limit).then((pokemons = []) => {
		pokemon_list_id.innerHTML += pokemons.map(convert_pokemon_to_html).join('');
		console.log(pokemons);
	})
}

load_more_pokemons(offset, limit);
