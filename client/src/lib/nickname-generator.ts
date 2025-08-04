import { GenerationParameters, NicknameTheme, GenerationAlgorithm } from "@shared/schema";

// Expanded theme-based word lists with multiple categories
const themeWords = {
  fantasy: {
    prefixes: ["Shadow", "Dark", "Light", "Fire", "Ice", "Storm", "Moon", "Star", "Dragon", "Phoenix", "Mystic", "Ancient", "Sacred", "Blood", "Soul", "Golden", "Silver", "Crimson", "Emerald", "Sapphire", "Divine", "Eternal", "Fallen", "Noble", "Arcane", "Crystal", "Enchanted", "Forgotten", "Hidden", "Cursed", "Blessed", "Phantom", "Spectral", "Celestial", "Infernal", "Frost", "Flame", "Thunder", "Lightning", "Wind", "Earth"],
    suffixes: ["Blade", "Walker", "Bane", "Heart", "Wing", "Claw", "Flame", "Storm", "Mage", "Knight", "Rider", "Slayer", "Born", "Weaver", "Guard", "Keeper", "Seeker", "Hunter", "Wielder", "Master", "Lord", "Sage", "Prophet", "Oracle", "Champion", "Herald", "Bearer", "Forged", "Bound", "Sworn", "Caller", "Bringer", "Wraith", "Spirit", "Soul", "Seer", "Warrior", "Paladin", "Monk"],
    syllables: ["ar", "el", "in", "or", "an", "eth", "ael", "oth", "ven", "mor", "dal", "gar", "thal", "rin", "dor", "fen", "gal", "mar", "kor", "zar", "lith", "wen", "tar", "sil", "cel", "nor", "val", "keth", "myr", "thel", "dral", "grim", "helm", "thor", "bane"]
  },
  "sci-fi": {
    prefixes: ["Cyber", "Neo", "Quantum", "Vector", "Binary", "Digital", "Plasma", "Laser", "Nano", "Hyper", "Meta", "Proto", "Alpha", "Beta", "Gamma", "Neural", "Synthetic", "Atomic", "Photon", "Electron", "Proton", "Matrix", "Nexus", "Omega", "Delta", "Epsilon", "Sigma", "Ultra", "Mega", "Techno", "Robo", "Mech", "Chrome", "Steel", "Titanium", "Carbon", "Silicon", "Network", "System", "Core"],
    suffixes: ["Bot", "Core", "Link", "Node", "Net", "Grid", "Tech", "Sync", "Data", "Code", "Flux", "Wave", "Pulse", "Byte", "Zero", "Matrix", "Protocol", "Algorithm", "System", "Network", "Database", "Interface", "Terminal", "Console", "Processor", "Circuit", "Module", "Array", "Vector", "Sequence", "Cipher", "Codec", "Stream", "Signal", "Engine", "Drive", "Unit", "Gear", "Frame"],
    syllables: ["cy", "tech", "neo", "zi", "xa", "quo", "vel", "syn", "dex", "nix", "zar", "kex", "vox", "tron", "lex", "rax", "tox", "flux", "crux", "jinx", "lynx", "onyx", "ajax", "apex", "unix", "xerx", "aqua", "nova", "zeta", "beta", "meta", "data", "code", "node", "grid"]
  },
  military: {
    prefixes: ["Storm", "Thunder", "Steel", "Iron", "Battle", "War", "Strike", "Assault", "Recon", "Spec", "Elite", "Ghost", "Sniper", "Ranger", "Viper", "Alpha", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot", "Golf", "Hotel", "India", "Juliet", "Kilo", "Lima", "Mike", "November", "Oscar", "Papa", "Quebec", "Romeo", "Sierra", "Tango", "Uniform", "Victor", "Whiskey", "Xray", "Yankee", "Zulu"],
    suffixes: ["Force", "Unit", "Ops", "Squad", "Team", "Guard", "Strike", "Hawk", "Wolf", "Bear", "Eagle", "Falcon", "Tiger", "Shark", "Venom", "Squadron", "Battalion", "Regiment", "Division", "Corps", "Platoon", "Company", "Brigade", "Command", "Tactical", "Strategic", "Operative", "Mission", "Recon", "Assault", "Defense", "Special", "Combat", "Warrior", "Soldier", "Marine", "Ranger", "Commando", "Sniper", "Gunner"],
    syllables: ["tac", "ops", "war", "bat", "mil", "com", "sec", "def", "str", "for", "gua", "rea", "spe", "eli", "gho", "rec", "ass", "att", "sup", "inf", "cav", "art", "eng", "med", "log", "int", "sig", "mp", "sf", "sof", "arm", "tank", "jet", "gun", "bomb", "seal", "delta", "force", "spec", "black"]
  },
  cute: {
    prefixes: ["Sweet", "Fluffy", "Bubbly", "Sunny", "Happy", "Candy", "Sugar", "Honey", "Cherry", "Peach", "Pinky", "Sparkle", "Glitter", "Rainbow", "Angel", "Snuggle", "Bubble", "Giggly", "Twinkle", "Shimmer", "Sunshine", "Moonbeam", "Stardust", "Fairy", "Cherub", "Bunny", "Kitty", "Puppy", "Teddy", "Little", "Precious", "Darling", "Lovely", "Adorable", "Charming", "Tiny", "Mini", "Baby", "Soft", "Gentle"],
    suffixes: ["Pie", "Bear", "Cat", "Bunny", "Puff", "Star", "Heart", "Dream", "Kiss", "Hug", "Love", "Joy", "Smile", "Glow", "Shine", "Whiskers", "Button", "Dimple", "Giggle", "Sparkle", "Twinkle", "Bubble", "Cuddle", "Snuggle", "Nuzzle", "Tickle", "Wiggle", "Bounce", "Flutter", "Glimmer", "Shimmer", "Beam", "Charm", "Cookie", "Cupcake", "Candy", "Marshmallow", "Cloud", "Petal"],
    syllables: ["cu", "ki", "mi", "pi", "ri", "ti", "chi", "shi", "ni", "li", "wi", "yi", "zi", "fi", "gi", "mew", "paw", "boo", "coo", "nya", "chu", "moe", "bee", "kit", "pop", "flo", "lil", "tiny", "mini", "baby", "sweet", "soft", "love", "hug", "kiss", "joy", "fun", "play", "happy", "cheer"]
  },
  edgy: {
    prefixes: ["Death", "Void", "Chaos", "Rage", "Fury", "Venom", "Toxic", "Skull", "Bone", "Razor", "Thorn", "Raven", "Phantom", "Wraith", "Demon", "Shadow", "Nightmare", "Devil", "Hell", "Abyss", "Inferno", "Poison", "Virus", "Plague", "Curse", "Hex", "Jinx", "Evil", "Wicked", "Sinister", "Malice", "Hatred", "Terror", "Horror", "Blood", "Black", "Doom", "Grim", "Dark", "Brutal"],
    suffixes: ["Killer", "Reaper", "Slayer", "Destroyer", "Ripper", "Hunter", "Stalker", "Beast", "Fiend", "Shade", "Blight", "Scythe", "Fang", "Claw", "Thorn", "Death", "Doom", "Rage", "Fury", "Pain", "Fear", "Blood", "Void", "Shadow", "Nightmare", "Terror", "Horror", "Chaos", "Destruction", "Annihilation", "Obliteration", "Devastation", "Ruin", "Decay", "Rot", "Corruption", "Venom", "Toxin", "Curse"],
    syllables: ["mor", "vor", "grim", "nox", "zar", "kil", "tor", "dra", "nex", "vex", "rex", "hex", "axe", "rax", "zyx", "doom", "rage", "dark", "edge", "void", "hate", "pain", "fear", "skull", "death", "blood", "bone", "black", "evil", "curse", "venom", "toxic", "virus", "chaos", "shadow", "demon", "devil", "hell", "abyss", "terror"]
  },
  neutral: {
    prefixes: ["Blue", "Red", "Green", "Quick", "Fast", "Smart", "Cool", "Bold", "Brave", "Swift", "Sharp", "Bright", "Clear", "Strong", "Free", "Epic", "Awesome", "Super", "Mega", "Ultra", "Pro", "Elite", "Master", "Legend", "Champion", "Hero", "Star", "Ace", "Prime", "Supreme", "Ultimate", "Extreme", "Radical", "Fantastic", "Amazing", "Incredible", "Outstanding", "Excellent", "Brilliant", "Genius"],
    suffixes: ["Runner", "Player", "Gamer", "User", "Master", "Pro", "Hero", "Champion", "Winner", "Leader", "Chief", "Boss", "King", "Lord", "Star", "Expert", "Genius", "Wizard", "Warrior", "Fighter", "Victor", "Crusher", "Destroyer", "Dominator", "Ruler", "Commander", "Captain", "General", "Admiral", "Ace", "Elite", "Legend", "Beast", "Machine", "Force", "Power", "Storm", "Fire", "Thunder", "Lightning"],
    syllables: ["max", "ace", "pro", "zen", "neo", "sky", "rex", "fox", "ray", "jay", "kai", "zed", "tex", "lex", "hex", "blue", "red", "gold", "fire", "ice", "storm", "wind", "rock", "steel", "iron", "blade", "sword", "shield", "crown", "star", "sun", "moon", "wave", "blast", "flash", "bolt", "spike", "edge", "core", "rage"]
  }
};

// Enhanced syllable patterns for more natural generation
const syllablePatterns = {
  consonants: ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "z"],
  vowels: ["a", "e", "i", "o", "u"],
  consonantClusters: ["br", "cr", "dr", "fr", "gr", "pr", "tr", "bl", "cl", "fl", "gl", "pl", "sl", "sp", "st", "sc", "sk", "sm", "sn", "sw"],
  vowelCombinations: ["ai", "au", "ea", "ei", "ie", "oa", "ou", "ue"],
  endings: ["er", "ar", "or", "en", "an", "on", "ex", "ax", "ix", "ox", "ux"]
};

// Advanced syllable combinations for different themes
const advancedSyllables = {
  strong: ["thor", "grim", "storm", "iron", "steel", "war", "rage", "fire", "blood", "death", "titan", "atlas", "zeus", "mars", "ares", "kratos", "hulk", "tank", "rock", "stone"],
  soft: ["silk", "moon", "star", "dawn", "mist", "pearl", "rose", "snow", "wind", "sky", "velvet", "satin", "cream", "milk", "honey", "butter", "silk", "cotton", "feather", "cloud"],
  mystical: ["mage", "rune", "spell", "myth", "sage", "lore", "void", "ether", "soul", "spirit", "oracle", "mystic", "arcane", "magic", "enchant", "divine", "sacred", "holy", "blessed", "cosmic"],
  tech: ["byte", "code", "data", "cyber", "neo", "sync", "link", "node", "core", "net", "pixel", "digital", "binary", "neural", "quantum", "matrix", "protocol", "algorithm", "system", "network"],
  nature: ["leaf", "root", "bark", "fern", "moss", "pine", "oak", "elm", "ash", "ivy", "forest", "jungle", "ocean", "river", "mountain", "valley", "desert", "meadow", "field", "garden"]
};

// New advanced word combination patterns
const wordPatterns = {
  adjNoun: ["adjective", "noun"],
  nounAdj: ["noun", "adjective"], 
  verbNoun: ["verb", "noun"],
  nounVerb: ["noun", "verb"],
  prefixSuffix: ["prefix", "suffix"],
  syllableCombo: ["syllable", "syllable", "syllable"],
  hybridPattern: ["prefix", "syllable", "suffix"],
  doublePrefix: ["prefix", "prefix"],
  doubleSuffix: ["suffix", "suffix"]
};

// Additional word banks for more variety
const additionalWords = {
  fantasy: {
    adjectives: ["ancient", "mystic", "eternal", "divine", "cursed", "blessed", "forgotten", "hidden", "sacred", "noble", "arcane", "enchanted", "magical", "legendary", "mythical", "powerful", "wise", "brave", "fierce", "gentle"],
    nouns: ["dragon", "phoenix", "unicorn", "griffin", "pegasus", "wizard", "sorceress", "paladin", "knight", "mage", "druid", "ranger", "bard", "rogue", "warrior", "cleric", "monk", "barbarian", "warlock", "witch"],
    verbs: ["soar", "enchant", "summon", "conjure", "banish", "protect", "defend", "quest", "adventure", "explore", "discover", "create", "destroy", "heal", "curse", "bless", "transform", "ascend", "descend", "awaken"]
  },
  "sci-fi": {
    adjectives: ["cyber", "digital", "virtual", "synthetic", "quantum", "neural", "atomic", "cosmic", "stellar", "galactic", "advanced", "futuristic", "robotic", "mechanical", "electronic", "photonic", "holographic", "encrypted", "programmed", "automated"],
    nouns: ["android", "cyborg", "robot", "drone", "ai", "computer", "server", "network", "database", "algorithm", "protocol", "interface", "terminal", "processor", "circuit", "satellite", "spaceship", "laser", "plasma", "energy"],
    verbs: ["compute", "process", "analyze", "encrypt", "decode", "hack", "program", "upload", "download", "stream", "transmit", "receive", "scan", "detect", "monitor", "control", "execute", "initialize", "terminate", "reboot"]
  },
  military: {
    adjectives: ["tactical", "strategic", "special", "elite", "veteran", "trained", "armed", "fortified", "camouflaged", "stealth", "covert", "classified", "secure", "defended", "assault", "combat", "military", "war", "battle", "strike"],
    nouns: ["soldier", "marine", "ranger", "sniper", "pilot", "captain", "sergeant", "lieutenant", "colonel", "general", "commander", "operative", "specialist", "trooper", "gunner", "scout", "medic", "engineer", "officer", "veteran"],
    verbs: ["attack", "defend", "assault", "strike", "advance", "retreat", "patrol", "scout", "recon", "infiltrate", "secure", "protect", "guard", "fortify", "deploy", "engage", "eliminate", "neutralize", "execute", "command"]
  },
  cute: {
    adjectives: ["adorable", "sweet", "cute", "tiny", "little", "small", "soft", "fluffy", "cuddly", "snuggly", "precious", "darling", "lovely", "charming", "delightful", "innocent", "playful", "cheerful", "happy", "joyful"],
    nouns: ["kitten", "puppy", "bunny", "teddy", "angel", "fairy", "butterfly", "flower", "rainbow", "sunshine", "moonbeam", "stardust", "cookie", "cupcake", "candy", "honey", "sugar", "marshmallow", "cotton", "cloud"],
    verbs: ["cuddle", "snuggle", "hug", "kiss", "tickle", "giggle", "laugh", "play", "bounce", "skip", "dance", "sing", "smile", "sparkle", "twinkle", "glow", "shine", "flutter", "wiggle", "nuzzle"]
  },
  edgy: {
    adjectives: ["dark", "evil", "wicked", "sinister", "malicious", "cruel", "brutal", "savage", "fierce", "deadly", "lethal", "toxic", "venomous", "cursed", "haunted", "possessed", "demonic", "hellish", "infernal", "abyssal"],
    nouns: ["demon", "devil", "reaper", "assassin", "killer", "destroyer", "annihilator", "predator", "hunter", "stalker", "shadow", "nightmare", "terror", "horror", "chaos", "destruction", "death", "skull", "bone", "blood"],
    verbs: ["destroy", "annihilate", "devastate", "obliterate", "eliminate", "exterminate", "terminate", "assassinate", "murder", "kill", "slaughter", "massacre", "torture", "torment", "terrorize", "horrify", "curse", "hex", "poison", "corrupt"]
  },
  neutral: {
    adjectives: ["awesome", "epic", "cool", "amazing", "incredible", "fantastic", "outstanding", "excellent", "brilliant", "superb", "magnificent", "spectacular", "extraordinary", "phenomenal", "remarkable", "impressive", "stunning", "dazzling", "breathtaking", "mind-blowing"],
    nouns: ["player", "gamer", "champion", "hero", "legend", "master", "expert", "genius", "wizard", "warrior", "fighter", "winner", "victor", "crusher", "dominator", "ruler", "commander", "leader", "chief", "boss"],
    verbs: ["dominate", "crush", "destroy", "conquer", "defeat", "overcome", "triumph", "succeed", "achieve", "accomplish", "excel", "master", "perfect", "optimize", "maximize", "enhance", "improve", "upgrade", "advance", "progress"]
  }
};

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generateRandomNickname(theme: NicknameTheme, minLength: number, maxLength: number, includeNumbers: boolean, includeSpecialChars: boolean, useCapitalization: boolean = true): string {
  const words = themeWords[theme];
  const additional = additionalWords[theme];
  
  // Calculate space allocation for special elements
  const numberSpace = includeNumbers ? Math.floor(Math.random() * 3) + 1 : 0; // 1-3 digits
  const specialCharSpace = includeSpecialChars ? 1 : 0;
  const reservedSpace = numberSpace + specialCharSpace;
  const baseSpace = Math.max(4, maxLength - reservedSpace);
  
  let nickname = "";
  
  // Choose random generation pattern (expanded possibilities)
  const patterns = [
    "prefixSuffix",      // Traditional: Prefix + Suffix
    "adjNoun",           // Adjective + Noun
    "nounAdj",           // Noun + Adjective
    "verbNoun",          // Verb + Noun
    "syllableCombo",     // Multiple syllables
    "hybridPattern",     // Prefix + Syllable + Suffix
    "doublePrefix",      // Two prefixes
    "doubleSuffix",      // Two suffixes
    "advancedSyllable",  // Advanced thematic syllables
    "mixedPattern"       // Mix different sources
  ];
  
  const pattern = getRandomElement(patterns);
  
  switch (pattern) {
    case "prefixSuffix":
      const prefix = getRandomElement(words.prefixes);
      const suffix = getRandomElement(words.suffixes);
      nickname = prefix + suffix;
      break;
      
    case "adjNoun":
      const adj = getRandomElement(additional.adjectives);
      const noun = getRandomElement(additional.nouns);
      nickname = adj + noun;
      break;
      
    case "nounAdj":
      const noun2 = getRandomElement(additional.nouns);
      const adj2 = getRandomElement(additional.adjectives);
      nickname = noun2 + adj2;
      break;
      
    case "verbNoun":
      const verb = getRandomElement(additional.verbs);
      const noun3 = getRandomElement(additional.nouns);
      nickname = verb + noun3;
      break;
      
    case "syllableCombo":
      const syllCount = Math.floor(Math.random() * 3) + 2; // 2-4 syllables
      for (let i = 0; i < syllCount && nickname.length < baseSpace; i++) {
        const syll = getRandomElement(words.syllables);
        if (nickname.length + syll.length <= baseSpace) {
          nickname += syll;
        }
      }
      break;
      
    case "hybridPattern":
      const hybridPrefix = getRandomElement(words.prefixes);
      const hybridSyll = getRandomElement(words.syllables);
      const hybridSuffix = getRandomElement(words.suffixes);
      nickname = hybridPrefix + hybridSyll + hybridSuffix;
      break;
      
    case "doublePrefix":
      const prefix1 = getRandomElement(words.prefixes);
      const prefix2 = getRandomElement(words.prefixes);
      nickname = prefix1 + prefix2;
      break;
      
    case "doubleSuffix":
      const suffix1 = getRandomElement(words.suffixes);
      const suffix2 = getRandomElement(words.suffixes);
      nickname = suffix1 + suffix2;
      break;
      
    case "advancedSyllable":
      // Use thematically appropriate advanced syllables
      const themeMapping: { [key in NicknameTheme]: keyof typeof advancedSyllables } = {
        fantasy: "mystical",
        "sci-fi": "tech",
        military: "strong",
        cute: "soft",
        edgy: "strong",
        neutral: "nature"
      };
      const advSyllables = advancedSyllables[themeMapping[theme]];
      const syllCount2 = Math.floor(Math.random() * 2) + 2; // 2-3 advanced syllables
      for (let i = 0; i < syllCount2 && nickname.length < baseSpace; i++) {
        const syll = getRandomElement(advSyllables);
        if (nickname.length + syll.length <= baseSpace) {
          nickname += syll;
        }
      }
      break;
      
    case "mixedPattern":
      // Randomly mix different word types
      const mixOptions = [
        () => getRandomElement(words.prefixes),
        () => getRandomElement(words.suffixes),
        () => getRandomElement(words.syllables),
        () => getRandomElement(additional.adjectives),
        () => getRandomElement(additional.nouns),
        () => getRandomElement(additional.verbs)
      ];
      const partCount = Math.floor(Math.random() * 2) + 2; // 2-3 parts
      for (let i = 0; i < partCount && nickname.length < baseSpace; i++) {
        const part = getRandomElement(mixOptions)();
        if (nickname.length + part.length <= baseSpace) {
          nickname += part;
        }
      }
      break;
      
    default:
      nickname = getRandomElement(words.prefixes) + getRandomElement(words.suffixes);
  }
  
  // Trim to fit allocated space
  if (nickname.length > baseSpace) {
    nickname = nickname.substring(0, baseSpace);
  }
  
  // Ensure minimum length with creative additions
  while (nickname.length < minLength && nickname.length < maxLength - reservedSpace) {
    const addOptions = [
      () => getRandomElement(words.syllables),
      () => getRandomElement(additional.adjectives).substring(0, 3),
      () => getRandomElement(additional.nouns).substring(0, 3),
      () => getRandomElement(words.prefixes).substring(0, 3)
    ];
    const addition = getRandomElement(addOptions)();
    if (nickname.length + addition.length <= maxLength - reservedSpace) {
      nickname += addition;
    } else {
      break;
    }
  }
  
  // Add numbers with varied placement
  if (includeNumbers && nickname.length < maxLength) {
    const maxDigits = Math.min(numberSpace, maxLength - nickname.length);
    const maxNumber = Math.pow(10, maxDigits) - 1;
    const number = Math.floor(Math.random() * maxNumber) + 1;
    const numberStr = number.toString();
    
    // Random placement: beginning, middle, or end
    const placement = Math.random();
    if (placement < 0.2 && nickname.length + numberStr.length <= maxLength) {
      // Beginning
      nickname = numberStr + nickname;
    } else if (placement < 0.4 && nickname.length > 2 && nickname.length + numberStr.length <= maxLength) {
      // Middle
      const midPoint = Math.floor(nickname.length / 2);
      nickname = nickname.substring(0, midPoint) + numberStr + nickname.substring(midPoint);
    } else if (nickname.length + numberStr.length <= maxLength) {
      // End (most common)
      nickname += numberStr;
    }
  }
  
  // Add special characters creatively
  if (includeSpecialChars && nickname.length < maxLength) {
    const specialChars = ["_", "-", ".", "!", "*", "+", "=", "^"];
    const char = getRandomElement(specialChars);
    
    // Random placement for special characters too
    const placement = Math.random();
    if (placement < 0.3 && nickname.length + char.length <= maxLength) {
      // Add at random position
      const pos = Math.floor(Math.random() * nickname.length);
      nickname = nickname.substring(0, pos) + char + nickname.substring(pos);
    } else if (nickname.length + char.length <= maxLength) {
      // Add at end
      nickname += char;
    }
  }

  // Apply capitalization with more variety
  if (nickname.length > 0) {
    if (useCapitalization) {
      // Various capitalization patterns
      const capPattern = Math.random();
      if (capPattern < 0.4) {
        // Standard: First letter uppercase
        nickname = nickname.charAt(0).toUpperCase() + nickname.slice(1).toLowerCase();
      } else if (capPattern < 0.6) {
        // Camel case for compound words
        nickname = nickname.toLowerCase();
        for (let i = 1; i < nickname.length - 1; i++) {
          if (Math.random() < 0.3) {
            nickname = nickname.substring(0, i) + nickname.charAt(i).toUpperCase() + nickname.substring(i + 1);
          }
        }
        nickname = nickname.charAt(0).toUpperCase() + nickname.slice(1);
      } else if (capPattern < 0.8) {
        // All lowercase with first uppercase
        nickname = nickname.charAt(0).toUpperCase() + nickname.slice(1).toLowerCase();
      } else {
        // Random caps
        let result = "";
        for (let i = 0; i < nickname.length; i++) {
          result += Math.random() < 0.3 ? nickname.charAt(i).toUpperCase() : nickname.charAt(i).toLowerCase();
        }
        nickname = result;
      }
    } else {
      nickname = nickname.toLowerCase();
    }
  }
  
  // Final length check and cleanup
  return nickname.substring(0, maxLength);
}

function generateSyllabicNickname(theme: NicknameTheme, minLength: number, maxLength: number, includeNumbers: boolean, useCapitalization: boolean = true): string {
  const words = themeWords[theme];
  
  // Reserve space for numbers if requested
  const numberSpace = includeNumbers ? 2 : 0;
  const baseSpace = Math.max(minLength, maxLength - numberSpace);
  
  let nickname = "";
  
  // Generate syllables one by one, checking length constraints
  while (nickname.length < minLength || (nickname.length < baseSpace && Math.random() > 0.3)) {
    let syllable = "";
    const approach = Math.random();
    
    // Calculate remaining space
    const remainingSpace = baseSpace - nickname.length;
    if (remainingSpace <= 0) break;
    
    if (approach < 0.3) {
      // Use theme-specific syllables
      syllable = getRandomElement(words.syllables);
    } else if (approach < 0.5) {
      // Use advanced thematic syllables
      const themeMapping: { [key in NicknameTheme]: keyof typeof advancedSyllables } = {
        fantasy: "mystical",
        "sci-fi": "tech",
        military: "strong",
        cute: "soft",
        edgy: "strong",
        neutral: "nature"
      };
      syllable = getRandomElement(advancedSyllables[themeMapping[theme]]);
    } else if (approach < 0.7) {
      // Generate phonetic syllables
      const consonant = getRandomElement(syllablePatterns.consonants);
      const vowel = getRandomElement(syllablePatterns.vowels);
      const ending = Math.random() > 0.5 && remainingSpace > 2 ? getRandomElement(syllablePatterns.consonants) : "";
      syllable = consonant + vowel + ending;
    } else if (approach < 0.85) {
      // Use consonant clusters
      const cluster = getRandomElement(syllablePatterns.consonantClusters);
      const vowel = Math.random() > 0.5 && remainingSpace > 3 ? 
        getRandomElement(syllablePatterns.vowelCombinations) : 
        getRandomElement(syllablePatterns.vowels);
      syllable = cluster + vowel;
    } else {
      // Simple patterns for tight spaces
      if (remainingSpace <= 3) {
        const consonant = getRandomElement(syllablePatterns.consonants);
        const vowel = getRandomElement(syllablePatterns.vowels);
        syllable = consonant + vowel;
      } else {
        const start = getRandomElement(syllablePatterns.consonants);
        const middle = getRandomElement(syllablePatterns.vowelCombinations);
        const end = remainingSpace > 4 ? getRandomElement(syllablePatterns.endings) : "";
        syllable = start + middle + end;
      }
    }
    
    // Trim syllable if too long for remaining space
    if (syllable.length > remainingSpace) {
      syllable = syllable.substring(0, remainingSpace);
    }
    
    // Only add if it contributes meaningfully
    if (syllable.length > 0) {
      nickname += syllable;
    }
    
    // Stop if we've reached a good length
    if (nickname.length >= minLength && nickname.length >= baseSpace - 2) {
      break;
    }
  }
  
  // Ensure we meet minimum length requirement
  while (nickname.length < minLength && nickname.length < baseSpace) {
    const simpleVowel = getRandomElement(syllablePatterns.vowels);
    const remainingForMin = minLength - nickname.length;
    
    if (remainingForMin === 1) {
      nickname += simpleVowel;
    } else {
      const shortSyllable = getRandomElement(words.syllables).substring(0, Math.min(remainingForMin, baseSpace - nickname.length));
      if (shortSyllable.length > 0) {
        nickname += shortSyllable;
      } else {
        break;
      }
    }
  }
  
  // Apply capitalization only if requested
  if (nickname.length > 0 && useCapitalization) {
    nickname = nickname.charAt(0).toUpperCase() + nickname.slice(1).toLowerCase();
  } else if (nickname.length > 0) {
    // Ensure all lowercase when capitalization is disabled
    nickname = nickname.toLowerCase();
  }
  
  // Add numbers if requested and there's space
  if (includeNumbers && nickname.length < maxLength - 1) {
    const availableSpace = maxLength - nickname.length;
    const maxNumber = Math.pow(10, Math.min(2, availableSpace)) - 1;
    const number = Math.floor(Math.random() * maxNumber) + 1;
    const numberStr = number.toString();
    
    if (numberStr.length <= availableSpace) {
      nickname += numberStr;
    }
  }
  
  // Absolute final length check
  if (nickname.length > maxLength) {
    nickname = nickname.substring(0, maxLength);
  }
  
  // Emergency fallback if somehow too short
  if (nickname.length < minLength) {
    const fallback = getRandomElement(words.syllables);
    nickname = fallback.substring(0, Math.min(fallback.length, maxLength));
  }
  
  return nickname;
}

function generateThematicNickname(theme: NicknameTheme, minLength: number, maxLength: number, includeNumbers: boolean, useCapitalization: boolean): string {
  const words = themeWords[theme];
  
  // Reserve space for numbers if requested
  const numberSpace = includeNumbers ? 2 : 0;
  const baseSpace = maxLength - numberSpace;
  
  // Advanced thematic generation with multiple sophisticated patterns
  const additional = additionalWords[theme];
  let nickname = "";
  
  // Expanded thematic patterns for much greater variety
  const thematicPatterns = [
    "adjNoun",           // Adjective + Noun (e.g., "AncientDragon")
    "verbNoun",          // Verb + Noun (e.g., "SummonWizard")
    "nounAdj",           // Noun + Adjective (e.g., "DragonAncient")
    "prefixSuffix",      // Traditional prefix + suffix
    "tripleCombo",       // Prefix + Syllable + Suffix
    "powerTitle",        // Power + Title combination
    "descriptiveRole",   // Descriptive + Role pattern
    "actionObject",      // Action + Object pattern
    "qualityEntity",     // Quality + Entity pattern
    "mysticalFormula",   // Complex syllable combinations
    "hierarchicalName",  // Rank + Specialty pattern
    "emotionalConcept",  // Emotion + Concept fusion
    "doubleDescriptor",  // Two descriptive elements
    "narrativeBased",    // Story-inspired patterns
    "archetypeVariant"   // Character archetype variations
  ];
  
  const pattern = getRandomElement(thematicPatterns);
  
  switch (pattern) {
    case "adjNoun":
      const adj = getRandomElement(additional.adjectives);
      const noun = getRandomElement(additional.nouns);
      nickname = adj + noun;
      break;
      
    case "verbNoun":
      const verb = getRandomElement(additional.verbs);
      const noun2 = getRandomElement(additional.nouns);
      nickname = verb + noun2;
      break;
      
    case "nounAdj":
      const noun3 = getRandomElement(additional.nouns);
      const adj2 = getRandomElement(additional.adjectives);
      nickname = noun3 + adj2;
      break;
      
    case "prefixSuffix":
      const prefix = getRandomElement(words.prefixes);
      const suffix = getRandomElement(words.suffixes);
      nickname = prefix + suffix;
      break;
      
    case "tripleCombo":
      const prefix2 = getRandomElement(words.prefixes);
      const syllable = getRandomElement(words.syllables);
      const suffix2 = getRandomElement(words.suffixes);
      nickname = prefix2 + syllable + suffix2;
      break;
      
    case "powerTitle":
      // Theme-specific power + title combinations
      const powerMappings = {
        fantasy: {powers: ["Fire", "Ice", "Shadow", "Light", "Storm", "Blood", "Soul", "Magic"], titles: ["Mage", "Lord", "Knight", "Guardian", "Keeper"]},
        "sci-fi": {powers: ["Cyber", "Quantum", "Neural", "Plasma", "Digital", "Matrix", "Binary", "Laser"], titles: ["Agent", "Unit", "Core", "System", "Protocol"]},
        military: {powers: ["Strike", "Assault", "Tactical", "Combat", "Elite", "Stealth", "Sniper", "Armor"], titles: ["Force", "Unit", "Squad", "Team", "Ops"]},
        cute: {powers: ["Sparkle", "Giggle", "Bounce", "Shimmer", "Glow", "Twinkle", "Sweet", "Soft"], titles: ["Angel", "Star", "Dream", "Heart", "Joy"]},
        edgy: {powers: ["Death", "Doom", "Rage", "Blood", "Skull", "Void", "Chaos", "Venom"], titles: ["Reaper", "Killer", "Hunter", "Stalker", "Beast"]},
        neutral: {powers: ["Max", "Pro", "Elite", "Super", "Ultra", "Prime", "Mega", "Epic"], titles: ["Player", "Master", "Champion", "Hero", "Legend"]}
      };
      const mapping = powerMappings[theme];
      const power = getRandomElement(mapping.powers);
      const title = getRandomElement(mapping.titles);
      nickname = power + title;
      break;
      
    case "descriptiveRole":
      const descriptive = getRandomElement(additional.adjectives);
      const role = getRandomElement(words.suffixes);
      nickname = descriptive + role;
      break;
      
    case "actionObject":
      const action = getRandomElement(additional.verbs);
      const object = getRandomElement(words.prefixes);
      nickname = action + object;
      break;
      
    case "qualityEntity":
      const quality = getRandomElement(additional.adjectives);
      const entity = getRandomElement(words.prefixes);
      nickname = quality + entity;
      break;
      
    case "mysticalFormula":
      // Complex multi-syllable mystical combinations
      const syll1 = getRandomElement(words.syllables);
      const syll2 = getRandomElement(words.syllables);
      const syll3 = getRandomElement(words.syllables);
      nickname = syll1 + syll2 + syll3;
      break;
      
    case "hierarchicalName":
      const ranks = {
        fantasy: ["Lord", "Master", "Grand", "High", "Elder", "Prime", "Ancient", "Sacred"],
        "sci-fi": ["Captain", "Admiral", "Commander", "Director", "Chief", "Prime", "Alpha", "Beta"],
        military: ["General", "Colonel", "Major", "Captain", "Sergeant", "Lieutenant", "Commander", "Chief"],
        cute: ["Little", "Baby", "Sweet", "Tiny", "Mini", "Dear", "Precious", "Lovely"],
        edgy: ["Dark", "Death", "Shadow", "Blood", "Bone", "Grim", "Evil", "Cursed"],
        neutral: ["Master", "Chief", "Prime", "Supreme", "Ultimate", "Grand", "Elite", "Pro"]
      };
      const rank = getRandomElement(ranks[theme]);
      const specialty = getRandomElement(words.suffixes);
      nickname = rank + specialty;
      break;
      
    case "emotionalConcept":
      const emotions = {
        fantasy: ["Mystical", "Enchanted", "Ethereal", "Divine", "Noble", "Sacred", "Ancient", "Blessed"],
        "sci-fi": ["Logical", "Precise", "Advanced", "Enhanced", "Optimized", "Digital", "Neural", "Quantum"],
        military: ["Tactical", "Strategic", "Elite", "Veteran", "Disciplined", "Trained", "Fearless", "Bold"],
        cute: ["Sweet", "Gentle", "Playful", "Innocent", "Joyful", "Cheerful", "Bubbly", "Happy"],
        edgy: ["Sinister", "Brutal", "Savage", "Cruel", "Ruthless", "Menacing", "Deadly", "Fierce"],
        neutral: ["Confident", "Bold", "Strong", "Smart", "Brilliant", "Amazing", "Incredible", "Epic"]
      };
      const emotion = getRandomElement(emotions[theme]);
      const concept = getRandomElement(additional.nouns);
      nickname = emotion + concept;
      break;
      
    case "doubleDescriptor":
      const desc1 = getRandomElement(additional.adjectives);
      const desc2 = getRandomElement(words.prefixes);
      nickname = desc1 + desc2;
      break;
      
    case "narrativeBased":
      // Story-inspired combinations
      const narrative1 = getRandomElement(words.prefixes);
      const narrative2 = getRandomElement(additional.nouns);
      nickname = narrative1 + "Of" + narrative2;
      break;
      
    case "archetypeVariant":
      const archetypes = {
        fantasy: ["Mage", "Warrior", "Paladin", "Rogue", "Druid", "Bard", "Monk", "Ranger"],
        "sci-fi": ["Pilot", "Hacker", "Android", "Cyborg", "Agent", "Engineer", "Captain", "Commander"],
        military: ["Soldier", "Marine", "Sniper", "Medic", "Scout", "Operative", "Specialist", "Trooper"],
        cute: ["Angel", "Sweetie", "Buddy", "Sunshine", "Starlight", "Cupcake", "Bubbles", "Sparkles"],
        edgy: ["Reaper", "Assassin", "Hunter", "Stalker", "Phantom", "Wraith", "Shadow", "Destroyer"],
        neutral: ["Champion", "Hero", "Legend", "Master", "Expert", "Ace", "Pro", "Elite"]
      };
      const archetype = getRandomElement(archetypes[theme]);
      const variant = getRandomElement(additional.adjectives);
      nickname = variant + archetype;
      break;
      
    default:
      // Fallback to enhanced traditional combination
      nickname = getRandomElement(words.prefixes) + getRandomElement(words.suffixes);
  }
  
  // Trim to base space
  if (nickname.length > baseSpace) {
    nickname = nickname.substring(0, baseSpace);
  }
  
  // Apply capitalization only if requested
  if (useCapitalization) {
    if (Math.random() > 0.5) {
      nickname = nickname.charAt(0).toUpperCase() + nickname.slice(1).toLowerCase();
    } else {
      // CamelCase style
      const parts = nickname.match(/.{1,4}/g) || [nickname];
      nickname = parts.map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()).join('');
    }
  } else {
    nickname = nickname.toLowerCase();
  }
  
  // Force add numbers if requested
  if (includeNumbers) {
    const availableSpace = maxLength - nickname.length;
    if (availableSpace >= 1) {
      const maxNumber = Math.pow(10, Math.min(3, availableSpace)) - 1;
      const number = Math.floor(Math.random() * maxNumber) + 1;
      const numberStr = number.toString();
      
      if (Math.random() > 0.7 && numberStr.length <= availableSpace) {
        // Add at beginning
        nickname = numberStr + nickname;
      } else if (numberStr.length <= availableSpace) {
        // Add at end
        nickname = nickname + numberStr;
      }
    }
  }
  
  // Ensure minimum length
  while (nickname.length < minLength && nickname.length < maxLength) {
    const syllable = getRandomElement(words.syllables);
    if (nickname.length + syllable.length <= maxLength) {
      nickname += syllable;
    } else {
      const remaining = maxLength - nickname.length;
      if (remaining > 0) {
        nickname += syllable.substring(0, remaining);
      }
      break;
    }
  }
  
  // Final length check
  return nickname.substring(0, maxLength);
}

export function generateNicknames(params: GenerationParameters): string[] {
  const { algorithm, theme, minLength, maxLength, includeNumbers, includeSpecialChars, useCapitalization, count } = params;
  
  const nicknames: string[] = [];
  const generatedSet = new Set<string>();
  
  while (nicknames.length < count && generatedSet.size < count * 2) {
    let nickname: string;
    
    switch (algorithm) {
      case "random":
        nickname = generateRandomNickname(theme, minLength, maxLength, includeNumbers, includeSpecialChars, useCapitalization);
        break;
      case "syllabic":
        nickname = generateSyllabicNickname(theme, minLength, maxLength, includeNumbers, useCapitalization);
        break;
      case "thematic":
        nickname = generateThematicNickname(theme, minLength, maxLength, includeNumbers, useCapitalization);
        break;
      default:
        nickname = generateRandomNickname(theme, minLength, maxLength, includeNumbers, includeSpecialChars, useCapitalization);
    }
    
    // Final capitalization is now handled within each algorithm function
    
    // Ensure uniqueness in this generation batch
    if (!generatedSet.has(nickname.toLowerCase())) {
      generatedSet.add(nickname.toLowerCase());
      nicknames.push(nickname);
    }
  }
  
  return nicknames;
}
