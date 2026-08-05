# PokeTamagachi

A nostalgic desktop virtual-pet game with a persistent, single-companion lifecycle and a data-driven Pokémon directory.

## Features

- Choose one companion from a 29-entry searchable roster, including Maushold.
- Real-time hunger, happiness, energy, hygiene, and health decay—even while the app is closed.
- Feed, play, rest, clean, and heal actions with a persistent care journal.
- The selected companion remains locked until its lifecycle ends and the user restarts.
- Roster entries live in `src/catalog.js`, making future additions a one-record update.
- Desktop-ready Electron shell with a responsive browser fallback.
- Compact frameless widget that opens at the bottom-right of the Windows work area.
- Draggable title bar with always-on-top, minimize, and close controls.
- Remembers its dragged screen position between launches.
- Pokémon-inspired pixel iconography: Poké Ball branding plus Great, Premier, Master, berry, and moon care icons.

## Run

```bash
npm install
npm start
```

For a dependency-free preview, open `index.html` in a browser. Run logic tests with `npm test`.

Pokémon names and sprite links are used for this fan-made prototype. Pokémon is owned by Nintendo, Game Freak, and Creatures. The generated key art is original and intentionally avoids official character likenesses.
