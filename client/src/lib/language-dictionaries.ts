import type { SupportedLanguage, NicknameTheme } from "@shared/schema";

export const languageNames: Record<SupportedLanguage, string> = {
  "en": "English",
  "pt-br": "Português Brasileiro", 
  "es": "Español",
  "fr": "Français",
  "de": "Deutsch",
  "it": "Italiano"
};

export const themeWordsByLanguage: Record<SupportedLanguage, Record<NicknameTheme, { prefixes: string[], suffixes: string[], words: string[] }>> = {
  "en": {
    fantasy: {
      prefixes: ["Dark", "Shadow", "Fire", "Ice", "Storm", "Blood", "Soul", "Dragon", "Moon", "Star"],
      suffixes: ["blade", "heart", "soul", "wing", "fire", "storm", "shadow", "light", "guard", "walker"],
      words: ["wizard", "knight", "archer", "mage", "warrior", "paladin", "rogue", "ranger", "sorcerer", "monk"]
    },
    "sci-fi": {
      prefixes: ["Cyber", "Neo", "Quantum", "Alpha", "Beta", "Gamma", "Nova", "Tech", "Digital", "Virtual"],
      suffixes: ["tron", "byte", "core", "prime", "matrix", "sync", "flux", "wave", "net", "link"],
      words: ["android", "cyborg", "robot", "pilot", "captain", "commander", "agent", "operative", "hacker", "engineer"]
    },
    military: {
      prefixes: ["Alpha", "Bravo", "Charlie", "Delta", "Echo", "Steel", "Iron", "Titan", "Storm", "Strike"],
      suffixes: ["force", "eagle", "hawk", "wolf", "tiger", "viper", "falcon", "lion", "bear", "fox"],
      words: ["soldier", "captain", "sergeant", "lieutenant", "major", "colonel", "general", "sniper", "scout", "medic"]
    },
    cute: {
      prefixes: ["Sweet", "Cute", "Little", "Tiny", "Mini", "Baby", "Sugar", "Honey", "Angel", "Fluffy"],
      suffixes: ["pie", "cake", "cookie", "bunny", "kitten", "puppy", "bear", "star", "heart", "smile"],
      words: ["panda", "kitten", "bunny", "puppy", "hamster", "unicorn", "fairy", "princess", "angel", "butterfly"]
    },
    edgy: {
      prefixes: ["Dark", "Black", "Death", "Void", "Chaos", "Rage", "Fury", "Venom", "Toxic", "Skull"],
      suffixes: ["reaper", "killer", "destroyer", "slayer", "hunter", "shadow", "blade", "venom", "storm", "rage"],
      words: ["assassin", "reaper", "demon", "vampire", "werewolf", "phantom", "ghost", "specter", "wraith", "banshee"]
    },
    neutral: {
      prefixes: ["Pro", "Elite", "Master", "Super", "Ultra", "Mega", "Hyper", "Prime", "Max", "Power"],
      suffixes: ["gamer", "player", "hero", "legend", "champion", "winner", "master", "expert", "pro", "ace"],
      words: ["player", "gamer", "user", "champion", "legend", "hero", "master", "expert", "pro", "ace"]
    }
  },
  "pt-br": {
    fantasy: {
      prefixes: ["Sombra", "Fogo", "Gelo", "Tempestade", "Sangue", "Alma", "Dragão", "Lua", "Estrela", "Vento"],
      suffixes: ["lâmina", "coração", "alma", "asa", "fogo", "tempestade", "sombra", "luz", "guarda", "caminhante"],
      words: ["mago", "cavaleiro", "arqueiro", "guerreiro", "paladino", "ladino", "ranger", "feiticeiro", "monge", "druida"]
    },
    "sci-fi": {
      prefixes: ["Cyber", "Neo", "Quantum", "Alfa", "Beta", "Gama", "Nova", "Tech", "Digital", "Virtual"],
      suffixes: ["tron", "byte", "núcleo", "prime", "matrix", "sync", "flux", "onda", "net", "link"],
      words: ["androide", "ciborgue", "robô", "piloto", "capitão", "comandante", "agente", "operativo", "hacker", "engenheiro"]
    },
    military: {
      prefixes: ["Alfa", "Bravo", "Charlie", "Delta", "Echo", "Aço", "Ferro", "Titã", "Tempestade", "Ataque"],
      suffixes: ["força", "águia", "falcão", "lobo", "tigre", "víbora", "falcão", "leão", "urso", "raposa"],
      words: ["soldado", "capitão", "sargento", "tenente", "major", "coronel", "general", "atirador", "batedor", "médico"]
    },
    cute: {
      prefixes: ["Doce", "Fofo", "Pequeno", "Tiny", "Mini", "Bebê", "Açúcar", "Mel", "Anjo", "Fofinho"],
      suffixes: ["torta", "bolo", "biscoito", "coelho", "gatinho", "cachorro", "urso", "estrela", "coração", "sorriso"],
      words: ["panda", "gatinho", "coelho", "cachorro", "hamster", "unicórnio", "fada", "princesa", "anjo", "borboleta"]
    },
    edgy: {
      prefixes: ["Sombrio", "Negro", "Morte", "Vazio", "Caos", "Raiva", "Fúria", "Veneno", "Tóxico", "Caveira"],
      suffixes: ["ceifador", "assassino", "destruidor", "matador", "caçador", "sombra", "lâmina", "veneno", "tempestade", "raiva"],
      words: ["assassino", "ceifador", "demônio", "vampiro", "lobisomem", "fantasma", "espectro", "alma", "aparição", "banshee"]
    },
    neutral: {
      prefixes: ["Pro", "Elite", "Mestre", "Super", "Ultra", "Mega", "Hiper", "Prime", "Max", "Power"],
      suffixes: ["gamer", "jogador", "herói", "lenda", "campeão", "vencedor", "mestre", "expert", "pro", "ás"],
      words: ["jogador", "gamer", "usuário", "campeão", "lenda", "herói", "mestre", "expert", "pro", "ás"]
    }
  },
  "es": {
    fantasy: {
      prefixes: ["Sombra", "Fuego", "Hielo", "Tormenta", "Sangre", "Alma", "Dragón", "Luna", "Estrella", "Viento"],
      suffixes: ["hoja", "corazón", "alma", "ala", "fuego", "tormenta", "sombra", "luz", "guardia", "caminante"],
      words: ["mago", "caballero", "arquero", "guerrero", "paladín", "pícaro", "explorador", "hechicero", "monje", "druida"]
    },
    "sci-fi": {
      prefixes: ["Cyber", "Neo", "Quantum", "Alfa", "Beta", "Gamma", "Nova", "Tech", "Digital", "Virtual"],
      suffixes: ["tron", "byte", "núcleo", "prime", "matrix", "sync", "flux", "onda", "net", "enlace"],
      words: ["androide", "cyborg", "robot", "piloto", "capitán", "comandante", "agente", "operativo", "hacker", "ingeniero"]
    },
    military: {
      prefixes: ["Alfa", "Bravo", "Charlie", "Delta", "Echo", "Acero", "Hierro", "Titán", "Tormenta", "Ataque"],
      suffixes: ["fuerza", "águila", "halcón", "lobo", "tigre", "víbora", "halcón", "león", "oso", "zorro"],
      words: ["soldado", "capitán", "sargento", "teniente", "mayor", "coronel", "general", "francotirador", "explorador", "médico"]
    },
    cute: {
      prefixes: ["Dulce", "Lindo", "Pequeño", "Tiny", "Mini", "Bebé", "Azúcar", "Miel", "Ángel", "Peludo"],
      suffixes: ["pastel", "torta", "galleta", "conejo", "gatito", "perrito", "oso", "estrella", "corazón", "sonrisa"],
      words: ["panda", "gatito", "conejo", "perrito", "hámster", "unicornio", "hada", "princesa", "ángel", "mariposa"]
    },
    edgy: {
      prefixes: ["Oscuro", "Negro", "Muerte", "Vacío", "Caos", "Ira", "Furia", "Veneno", "Tóxico", "Calavera"],
      suffixes: ["segador", "asesino", "destructor", "matador", "cazador", "sombra", "hoja", "veneno", "tormenta", "ira"],
      words: ["asesino", "segador", "demonio", "vampiro", "hombre lobo", "fantasma", "espectro", "alma", "aparición", "banshee"]
    },
    neutral: {
      prefixes: ["Pro", "Elite", "Maestro", "Super", "Ultra", "Mega", "Hiper", "Prime", "Max", "Power"],
      suffixes: ["gamer", "jugador", "héroe", "leyenda", "campeón", "ganador", "maestro", "experto", "pro", "as"],
      words: ["jugador", "gamer", "usuario", "campeón", "leyenda", "héroe", "maestro", "experto", "pro", "as"]
    }
  },
  "fr": {
    fantasy: {
      prefixes: ["Sombre", "Feu", "Glace", "Tempête", "Sang", "Âme", "Dragon", "Lune", "Étoile", "Vent"],
      suffixes: ["lame", "cœur", "âme", "aile", "feu", "tempête", "ombre", "lumière", "garde", "marcheur"],
      words: ["magicien", "chevalier", "archer", "guerrier", "paladin", "voleur", "rôdeur", "sorcier", "moine", "druide"]
    },
    "sci-fi": {
      prefixes: ["Cyber", "Néo", "Quantum", "Alpha", "Beta", "Gamma", "Nova", "Tech", "Digital", "Virtuel"],
      suffixes: ["tron", "byte", "noyau", "prime", "matrix", "sync", "flux", "onde", "net", "lien"],
      words: ["androïde", "cyborg", "robot", "pilote", "capitaine", "commandant", "agent", "opératif", "hacker", "ingénieur"]
    },
    military: {
      prefixes: ["Alpha", "Bravo", "Charlie", "Delta", "Echo", "Acier", "Fer", "Titan", "Tempête", "Attaque"],
      suffixes: ["force", "aigle", "faucon", "loup", "tigre", "vipère", "faucon", "lion", "ours", "renard"],
      words: ["soldat", "capitaine", "sergent", "lieutenant", "major", "colonel", "général", "tireur", "éclaireur", "médecin"]
    },
    cute: {
      prefixes: ["Doux", "Mignon", "Petit", "Tiny", "Mini", "Bébé", "Sucre", "Miel", "Ange", "Duveteux"],
      suffixes: ["tarte", "gâteau", "biscuit", "lapin", "chaton", "chiot", "ours", "étoile", "cœur", "sourire"],
      words: ["panda", "chaton", "lapin", "chiot", "hamster", "licorne", "fée", "princesse", "ange", "papillon"]
    },
    edgy: {
      prefixes: ["Sombre", "Noir", "Mort", "Vide", "Chaos", "Rage", "Fureur", "Venin", "Toxique", "Crâne"],
      suffixes: ["faucheur", "tueur", "destructeur", "massacreur", "chasseur", "ombre", "lame", "venin", "tempête", "rage"],
      words: ["assassin", "faucheur", "démon", "vampire", "loup-garou", "fantôme", "spectre", "âme", "apparition", "banshee"]
    },
    neutral: {
      prefixes: ["Pro", "Élite", "Maître", "Super", "Ultra", "Méga", "Hyper", "Prime", "Max", "Puissance"],
      suffixes: ["gamer", "joueur", "héros", "légende", "champion", "gagnant", "maître", "expert", "pro", "as"],
      words: ["joueur", "gamer", "utilisateur", "champion", "légende", "héros", "maître", "expert", "pro", "as"]
    }
  },
  "de": {
    fantasy: {
      prefixes: ["Schatten", "Feuer", "Eis", "Sturm", "Blut", "Seele", "Drache", "Mond", "Stern", "Wind"],
      suffixes: ["klinge", "herz", "seele", "flügel", "feuer", "sturm", "schatten", "licht", "wache", "wanderer"],
      words: ["magier", "ritter", "bogenschütze", "krieger", "paladin", "schurke", "waldläufer", "zauberer", "mönch", "druide"]
    },
    "sci-fi": {
      prefixes: ["Cyber", "Neo", "Quantum", "Alpha", "Beta", "Gamma", "Nova", "Tech", "Digital", "Virtual"],
      suffixes: ["tron", "byte", "kern", "prime", "matrix", "sync", "flux", "welle", "netz", "link"],
      words: ["android", "cyborg", "roboter", "pilot", "hauptmann", "kommandant", "agent", "operative", "hacker", "ingenieur"]
    },
    military: {
      prefixes: ["Alpha", "Bravo", "Charlie", "Delta", "Echo", "Stahl", "Eisen", "Titan", "Sturm", "Angriff"],
      suffixes: ["kraft", "adler", "falke", "wolf", "tiger", "viper", "falke", "löwe", "bär", "fuchs"],
      words: ["soldat", "hauptmann", "sergeant", "leutnant", "major", "oberst", "general", "scharfschütze", "kundschafter", "sanitäter"]
    },
    cute: {
      prefixes: ["Süß", "Niedlich", "Klein", "Winzig", "Mini", "Baby", "Zucker", "Honig", "Engel", "Flauschig"],
      suffixes: ["kuchen", "torte", "keks", "hase", "kätzchen", "welpe", "bär", "stern", "herz", "lächeln"],
      words: ["panda", "kätzchen", "hase", "welpe", "hamster", "einhorn", "fee", "prinzessin", "engel", "schmetterling"]
    },
    edgy: {
      prefixes: ["Dunkel", "Schwarz", "Tod", "Leere", "Chaos", "Wut", "Zorn", "Gift", "Toxisch", "Schädel"],
      suffixes: ["schnitter", "killer", "zerstörer", "schlächter", "jäger", "schatten", "klinge", "gift", "sturm", "wut"],
      words: ["assassine", "schnitter", "dämon", "vampir", "werwolf", "geist", "spektrum", "seele", "erscheinung", "banshee"]
    },
    neutral: {
      prefixes: ["Pro", "Elite", "Meister", "Super", "Ultra", "Mega", "Hyper", "Prime", "Max", "Power"],
      suffixes: ["gamer", "spieler", "held", "legende", "champion", "gewinner", "meister", "experte", "pro", "ass"],
      words: ["spieler", "gamer", "benutzer", "champion", "legende", "held", "meister", "experte", "pro", "ass"]
    }
  },
  "it": {
    fantasy: {
      prefixes: ["Ombra", "Fuoco", "Ghiaccio", "Tempesta", "Sangue", "Anima", "Drago", "Luna", "Stella", "Vento"],
      suffixes: ["lama", "cuore", "anima", "ala", "fuoco", "tempesta", "ombra", "luce", "guardia", "camminatore"],
      words: ["mago", "cavaliere", "arciere", "guerriero", "paladino", "ladro", "ranger", "stregone", "monaco", "druido"]
    },
    "sci-fi": {
      prefixes: ["Cyber", "Neo", "Quantum", "Alpha", "Beta", "Gamma", "Nova", "Tech", "Digital", "Virtuale"],
      suffixes: ["tron", "byte", "nucleo", "prime", "matrix", "sync", "flusso", "onda", "rete", "collegamento"],
      words: ["androide", "cyborg", "robot", "pilota", "capitano", "comandante", "agente", "operativo", "hacker", "ingegnere"]
    },
    military: {
      prefixes: ["Alpha", "Bravo", "Charlie", "Delta", "Echo", "Acciaio", "Ferro", "Titano", "Tempesta", "Attacco"],
      suffixes: ["forza", "aquila", "falco", "lupo", "tigre", "vipera", "falco", "leone", "orso", "volpe"],
      words: ["soldato", "capitano", "sergente", "tenente", "maggiore", "colonnello", "generale", "cecchino", "esploratore", "medico"]
    },
    cute: {
      prefixes: ["Dolce", "Carino", "Piccolo", "Minuscolo", "Mini", "Bambino", "Zucchero", "Miele", "Angelo", "Soffice"],
      suffixes: ["torta", "dolce", "biscotto", "coniglio", "gattino", "cucciolo", "orso", "stella", "cuore", "sorriso"],
      words: ["panda", "gattino", "coniglio", "cucciolo", "criceto", "unicorno", "fata", "principessa", "angelo", "farfalla"]
    },
    edgy: {
      prefixes: ["Scuro", "Nero", "Morte", "Vuoto", "Caos", "Rabbia", "Furia", "Veleno", "Tossico", "Teschio"],
      suffixes: ["mietitore", "killer", "distruttore", "massacratore", "cacciatore", "ombra", "lama", "veleno", "tempesta", "rabbia"],
      words: ["assassino", "mietitore", "demone", "vampiro", "licantropo", "fantasma", "spettro", "anima", "apparizione", "banshee"]
    },
    neutral: {
      prefixes: ["Pro", "Elite", "Maestro", "Super", "Ultra", "Mega", "Iper", "Prime", "Max", "Potere"],
      suffixes: ["gamer", "giocatore", "eroe", "leggenda", "campione", "vincitore", "maestro", "esperto", "pro", "asso"],
      words: ["giocatore", "gamer", "utente", "campione", "leggenda", "eroe", "maestro", "esperto", "pro", "asso"]
    }
  }
};

export const syllablesByLanguage: Record<SupportedLanguage, { consonants: string[], vowels: string[] }> = {
  "en": {
    consonants: ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z"],
    vowels: ["a", "e", "i", "o", "u"]
  },
  "pt-br": {
    consonants: ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z", "ç"],
    vowels: ["a", "e", "i", "o", "u", "ã", "õ"]
  },
  "es": {
    consonants: ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "ñ", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z"],
    vowels: ["a", "e", "i", "o", "u"]
  },
  "fr": {
    consonants: ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z"],
    vowels: ["a", "e", "i", "o", "u", "é", "è", "ê", "à", "ô"]
  },
  "de": {
    consonants: ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z", "ß"],
    vowels: ["a", "e", "i", "o", "u", "ä", "ö", "ü"]
  },
  "it": {
    consonants: ["b", "c", "d", "f", "g", "h", "l", "m", "n", "p", "q", "r", "s", "t", "v", "z"],
    vowels: ["a", "e", "i", "o", "u"]
  }
};