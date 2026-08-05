# PokeTamagachi

A nostalgic desktop virtual-pet game with a persistent, single-companion lifecycle and a data-driven Pokémon directory.

## Features

- Choose one companion from 61 evolving families connected to the original Kanto Pokédex.
- Real-time hunger, happiness, energy, hygiene, and health decay—even while the app is closed.
- Feed, play, rest, clean, and heal actions with a persistent care journal.
- The selected companion remains locked until its lifecycle ends and the user restarts.
- Roster entries live in `src/catalog.js`, making future additions a one-record update.
- Desktop-ready Electron shell with a responsive browser fallback.
- Compact frameless widget that opens at the bottom-right of the Windows work area.
- Draggable title bar with always-on-top, minimize, and close controls.
- Remembers its dragged screen position between launches.
- Pokémon-inspired pixel iconography: Poké Ball branding plus Great, Premier, Master, berry, and moon care icons.
- Simple animated Poké Ball starter screen and animated companion idle art.
- One-click starter selection without browser prompts.
- Every selectable Pokémon begins a multi-stage family containing an original Kanto species. Later baby forms such as Munchlax, Pichu, Elekid, and Magby are retained, while unrelated single-stage species are excluded. Eevee retains all Generation 1–5 Eeveelutions.
- Every new starter begins as a mystery egg. The egg hatches after 24 hours and at least three care interactions; evolution time starts when it hatches.
- Battles award EXP and drive progression. Existing official level thresholds are preserved; friendship, stone, daytime, and trade evolutions use level 20 as an average substitute. Later stages use level 30 or 35 where needed to prevent skipping stages.
- Eevee randomly evolves at level 20 into a Generation 1–5 option: Vaporeon, Jolteon, Flareon, Espeon, Umbreon, Leafeon, or Glaceon.
- Pokémon learn moves by level, equip four at a time, and can relearn archived moves.
- Form-specific level-up learnsets, move power, type, PP, priority, and critical-hit stages are bundled from Pokémon Black/White data via PokéAPI. Battles apply STAB, resistance, weakness, dual-type multipliers, and immunities, with effectiveness and critical-hit feedback in the dialogue.
- LAN battle hosting and discovery lets nearby desktop players battle over the same Wi‑Fi network.
- The active-pet directory is a private Battle/Train hub: Battle lists each discovered LAN opponent, while Train shows level, EXP, IVs, EVs, equipped moves, pending moves, evolution requirements, and the Move Relearner.
- The starter directory is hidden after selection and only returns when no living companion exists.

## Run

```bash
npm install
npm start
```

For a dependency-free preview, open `index.html` in a browser. Run logic tests with `npm test`.

Pokémon names and sprite links are used for this fan-made prototype. Pokémon is owned by Nintendo, Game Freak, and Creatures.
