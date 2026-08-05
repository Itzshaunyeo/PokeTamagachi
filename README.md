# PokeTamagachi

## What this game is about

PokeTamagachi is a small, pixel-art Pokémon virtual-pet game for Windows. It sits in a corner of the desktop and lets you raise one persistent companion from an egg into its later evolutionary forms. The game combines daily Tamagotchi-style care, Pokémon training and move management, and turn-based battles with other players on the same Wi-Fi network.

## How to play

Choose a starter family and your new companion will begin as an egg. Care for the egg until it hatches, then keep its hunger, happiness, energy, hygiene, and health in good condition by using the Habitat actions. Care actions give a small amount of daily EXP, while maintaining a healthy routine builds a bonus EXP streak. Open Train to inspect levels, EXP, IVs, EVs, and moves, relearn moves, or send your Pokémon to Daycare for a two-hour training session. Open Battle to host a room or join another player on the same LAN, then choose a move each round. Battles and training award EXP. When your Pokémon reaches its evolution requirement, a red Evolve button appears beside its name so you can decide when to evolve it.

## How to run

Install [Node.js](https://nodejs.org/) first. Download or clone this repository, open a terminal in the project folder, and run:

```bash
npm install
npm start
```

The app opens as a compact, always-on-top desktop widget. Drag the title bar to place it in any corner of the screen. Progress is saved locally and continues to update while the app is closed.

## Features

- Persistent egg, hatching, care, leveling, and manual evolution lifecycle
- Optional permanent Pokémon nicknames; default names follow the current evolution
- Five care needs: hunger, happiness, energy, hygiene, and health
- Daily care EXP and a healthy-care streak bonus
- Level and EXP display, IVs, EVs, four equipped moves, and Move Relearner
- Official-style level-up learnsets, Pokémon typings, move typings, power, PP, priority, critical hits, and type effectiveness
- Two-hour Daycare training with a live return timer
- Gen 5-inspired turn-based LAN battles for players on the same Wi-Fi network
- Compact frameless Windows layout with drag, minimize, close, and always-on-top behavior
- Local save data that preserves the chosen companion and its progress

## App information

The starter directory contains 61 evolving families connected to the original 151 Pokémon. Single-stage Kanto Pokémon are excluded, but Pokémon such as Snorlax remain available through later-generation baby forms.

Available starters:

- Bulbasaur
- Charmander
- Squirtle
- Caterpie
- Weedle
- Pidgey
- Rattata
- Spearow
- Ekans
- Pichu
- Sandshrew
- Nidoran♀
- Nidoran♂
- Cleffa
- Vulpix
- Igglybuff
- Zubat
- Oddish
- Paras
- Venonat
- Diglett
- Meowth
- Psyduck
- Mankey
- Growlithe
- Poliwag
- Abra
- Machop
- Bellsprout
- Tentacool
- Geodude
- Ponyta
- Slowpoke
- Magnemite
- Doduo
- Seel
- Grimer
- Shellder
- Gastly
- Drowzee
- Krabby
- Voltorb
- Exeggcute
- Cubone
- Koffing
- Rhyhorn
- Horsea
- Goldeen
- Staryu
- Magikarp
- Eevee
- Omanyte
- Kabuto
- Dratini
- Tyrogue
- Happiny
- Mime Jr.
- Smoochum
- Elekid
- Magby
- Munchlax

Every starter can evolve. Pokémon with official level-based evolutions use their game levels; evolutions that normally require friendship, stones, trades, time of day, or another special condition use an adapted level requirement. Eevee evolves randomly at level 20 into Vaporeon, Jolteon, Flareon, Espeon, Umbreon, Leafeon, or Glaceon.

PokeTamagachi is an unofficial, fan-made, non-commercial prototype and is not affiliated with or endorsed by Nintendo, Game Freak, The Pokémon Company, or Creatures Inc. Pokémon, Pokémon character names, artwork, and all related trademarks and intellectual-property rights belong to their respective owners, including Nintendo, Game Freak, The Pokémon Company, and Creatures Inc. No ownership of the Pokémon franchise or its assets is claimed. The original source code for this fan project is licensed under the MIT License.
