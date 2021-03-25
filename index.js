require('dotenv').config();

const Pokemon = require('pokemon.js');
const { Client, MessageEmbed } = require('discord.js');

const bot = new Client();
// Create an instance of a Discord client

//Setup
Pokemon.setLanguage('english');

const superShinyPokemonEmbed = (pokemon) => {
  return pokemonEmbed(pokemon, 0xc91a1a, "Super Shiny", pokemon.sprites.front_shiny);
}

const shinyPokemonEmbed = (pokemon) => {
  return pokemonEmbed(pokemon, 0xebe834, "Shiny", pokemon.sprites.front_shiny);
}

const normalPokemonEmbed = (pokemon) => {
  return pokemonEmbed(pokemon, 0xffffff, "Normal", pokemon.sprites.front_default);
}

const pokemonEmbed = (pokemon, color, description, sprite) => {
  const { name, sprites } = pokemon;
  return new MessageEmbed()
    .setTitle(name)
    .setColor(color)
    .setImage(sprite)
    .setDescription(description);
}

const getHuntResult = async () => {
  let randomPokemonId = Math.ceil(Math.random() * 150);
  let pokemon = await Pokemon.getPokemon(randomPokemonId);

  let randomRarity = Math.ceil(Math.random() * 25);
  if (randomRarity == 25) {
    let superRarity = Math.ceil(Math.random() * 25);
    if (superRarity == 25) {
      // Super Shiny
      return superShinyPokemonEmbed(pokemon);
    }
    //Shiny
    return shinyPokemonEmbed(pokemon);
  }
  //normal
  return normalPokemonEmbed(pokemon);

}


bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', async msg => {
  if (msg.content === 'pokehunt') {
    let pokemonHunt = await getHuntResult();
    msg.channel.send(pokemonHunt);
  }
});

bot.login(process.env.TOKEN);
