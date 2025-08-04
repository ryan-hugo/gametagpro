import { GenerationParameters, NicknameTheme, GenerationAlgorithm } from "@shared/schema";

// Theme-based word lists
const themeWords = {
  fantasy: {
    prefixes: ["Shadow", "Dark", "Light", "Fire", "Ice", "Storm", "Moon", "Star", "Dragon", "Phoenix", "Mystic", "Ancient", "Sacred", "Blood", "Soul"],
    suffixes: ["Blade", "Walker", "Bane", "Heart", "Wing", "Claw", "Flame", "Storm", "Mage", "Knight", "Rider", "Slayer", "Born", "Weaver", "Guard"],
    syllables: ["ar", "el", "in", "or", "an", "eth", "ael", "oth", "ven", "mor", "dal", "gar", "thal", "rin", "dor"]
  },
  "sci-fi": {
    prefixes: ["Cyber", "Neo", "Quantum", "Vector", "Binary", "Digital", "Plasma", "Laser", "Nano", "Hyper", "Meta", "Proto", "Alpha", "Beta", "Gamma"],
    suffixes: ["Bot", "Core", "Link", "Node", "Net", "Grid", "Tech", "Sync", "Data", "Code", "Flux", "Wave", "Pulse", "Byte", "Zero"],
    syllables: ["cy", "tech", "neo", "zi", "xa", "quo", "vel", "syn", "dex", "nix", "zar", "kex", "vox", "tron", "lex"]
  },
  military: {
    prefixes: ["Storm", "Thunder", "Steel", "Iron", "Battle", "War", "Strike", "Assault", "Recon", "Spec", "Elite", "Ghost", "Sniper", "Ranger", "Viper"],
    suffixes: ["Force", "Unit", "Ops", "Squad", "Team", "Guard", "Strike", "Hawk", "Wolf", "Bear", "Eagle", "Falcon", "Tiger", "Shark", "Venom"],
    syllables: ["tac", "ops", "war", "bat", "mil", "com", "sec", "def", "str", "for", "gua", "rea", "spe", "eli", "gho"]
  },
  cute: {
    prefixes: ["Sweet", "Fluffy", "Bubbly", "Sunny", "Happy", "Candy", "Sugar", "Honey", "Cherry", "Peach", "Pinky", "Sparkle", "Glitter", "Rainbow", "Angel"],
    suffixes: ["Pie", "Bear", "Cat", "Bunny", "Puff", "Star", "Heart", "Dream", "Kiss", "Hug", "Love", "Joy", "Smile", "Glow", "Shine"],
    syllables: ["cu", "ki", "mi", "pi", "ri", "ti", "chi", "shi", "ni", "li", "wi", "yi", "zi", "fi", "gi"]
  },
  edgy: {
    prefixes: ["Death", "Void", "Chaos", "Rage", "Fury", "Venom", "Toxic", "Skull", "Bone", "Razor", "Thorn", "Raven", "Phantom", "Wraith", "Demon"],
    suffixes: ["Killer", "Reaper", "Slayer", "Destroyer", "Ripper", "Hunter", "Stalker", "Beast", "Fiend", "Shade", "Blight", "Scythe", "Fang", "Claw", "Thorn"],
    syllables: ["mor", "vor", "grim", "nox", "zar", "kil", "tor", "dra", "nex", "vex", "rex", "hex", "axe", "rax", "zyx"]
  },
  neutral: {
    prefixes: ["Blue", "Red", "Green", "Quick", "Fast", "Smart", "Cool", "Bold", "Brave", "Swift", "Sharp", "Bright", "Clear", "Strong", "Free"],
    suffixes: ["Runner", "Player", "Gamer", "User", "Master", "Pro", "Hero", "Champion", "Winner", "Leader", "Chief", "Boss", "King", "Lord", "Star"],
    syllables: ["max", "ace", "pro", "zen", "neo", "sky", "rex", "fox", "ray", "jay", "kai", "zed", "tex", "lex", "hex"]
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
  strong: ["thor", "grim", "storm", "iron", "steel", "war", "rage", "fire", "blood", "death"],
  soft: ["silk", "moon", "star", "dawn", "mist", "pearl", "rose", "snow", "wind", "sky"],
  mystical: ["mage", "rune", "spell", "myth", "sage", "lore", "void", "ether", "soul", "spirit"],
  tech: ["byte", "code", "data", "cyber", "neo", "sync", "link", "node", "core", "net"],
  nature: ["leaf", "root", "bark", "fern", "moss", "pine", "oak", "elm", "ash", "ivy"]
};

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generateRandomNickname(theme: NicknameTheme, minLength: number, maxLength: number, includeNumbers: boolean, includeSpecialChars: boolean): string {
  const words = themeWords[theme];
  
  // Calculate space allocation
  const numberSpace = includeNumbers ? 2 : 0;
  const specialCharSpace = includeSpecialChars ? 2 : 0;
  const reservedSpace = numberSpace + specialCharSpace;
  const baseSpace = Math.max(4, maxLength - reservedSpace); // At least 4 chars for base
  
  // Build base nickname within allocated space
  let nickname = "";
  
  // Try different combinations to fit the space
  if (baseSpace >= 8) {
    // Full prefix + suffix
    const prefix = getRandomElement(words.prefixes);
    const suffix = getRandomElement(words.suffixes);
    nickname = prefix + suffix;
  } else {
    // Use shorter combinations
    if (Math.random() > 0.5) {
      nickname = getRandomElement(words.prefixes);
    } else {
      nickname = getRandomElement(words.suffixes);
    }
    
    // Add syllables if there's space
    while (nickname.length < baseSpace - 2) {
      const syllable = getRandomElement(words.syllables);
      if (nickname.length + syllable.length <= baseSpace) {
        nickname += syllable;
      } else {
        break;
      }
    }
  }
  
  // Trim base to fit reserved space
  if (nickname.length > baseSpace) {
    nickname = nickname.substring(0, baseSpace);
  }
  
  // Add numbers if requested
  if (includeNumbers && nickname.length < maxLength - 1) {
    const maxNumber = Math.pow(10, Math.min(2, maxLength - nickname.length)) - 1;
    const number = Math.floor(Math.random() * maxNumber) + 1;
    const numberStr = number.toString();
    if (nickname.length + numberStr.length <= maxLength) {
      nickname += numberStr;
    }
  }
  
  // Add special characters if requested and there's still space
  if (includeSpecialChars && nickname.length < maxLength - 1) {
    const specialChars = ["_", "-", ".", "!"];
    const char = getRandomElement(specialChars);
    
    if (nickname.length + char.length <= maxLength) {
      if (Math.random() > 0.5 && nickname.length + char.length + 2 <= maxLength) {
        const syllable = getRandomElement(words.syllables).substring(0, 2);
        nickname = nickname + char + syllable;
      } else {
        nickname = nickname + char;
      }
    }
  }
  
  // Ensure minimum length by adding syllables
  while (nickname.length < minLength && nickname.length < maxLength) {
    const syllable = getRandomElement(words.syllables);
    if (nickname.length + syllable.length <= maxLength) {
      nickname += syllable;
    } else {
      // Add partial syllable if needed
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

function generateSyllabicNickname(theme: NicknameTheme, minLength: number, maxLength: number, includeNumbers: boolean): string {
  const words = themeWords[theme];
  
  // Reserve space for numbers if requested
  const numberSpace = includeNumbers ? 2 : 0;
  const baseSpace = maxLength - numberSpace;
  const targetLength = Math.max(3, Math.min(baseSpace, Math.floor(Math.random() * (baseSpace - 3 + 1)) + 3));
  
  let nickname = "";
  const syllableCount = Math.floor(Math.random() * 3) + 2; // 2-4 syllables
  
  // Generate syllables using multiple approaches
  for (let i = 0; i < syllableCount && nickname.length < targetLength - 2; i++) {
    let syllable = "";
    const approach = Math.random();
    
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
      const ending = Math.random() > 0.5 ? getRandomElement(syllablePatterns.consonants) : "";
      syllable = consonant + vowel + ending;
    } else if (approach < 0.85) {
      // Use consonant clusters
      const cluster = getRandomElement(syllablePatterns.consonantClusters);
      const vowel = Math.random() > 0.5 ? 
        getRandomElement(syllablePatterns.vowels) : 
        getRandomElement(syllablePatterns.vowelCombinations);
      syllable = cluster + vowel;
    } else {
      // Complex patterns
      const start = Math.random() > 0.5 ? 
        getRandomElement(syllablePatterns.consonantClusters) : 
        getRandomElement(syllablePatterns.consonants);
      const middle = getRandomElement(syllablePatterns.vowelCombinations);
      const end = getRandomElement(syllablePatterns.endings);
      syllable = start + middle + end;
    }
    
    // Ensure we don't exceed target length
    if (nickname.length + syllable.length <= targetLength) {
      nickname += syllable;
    } else {
      // Add partial syllable to fill remaining space
      const remaining = targetLength - nickname.length;
      if (remaining > 0) {
        nickname += syllable.substring(0, remaining);
      }
      break;
    }
  }
  
  // Ensure minimum length with additional syllables
  while (nickname.length < Math.min(minLength, targetLength)) {
    const shortSyllable = getRandomElement(words.syllables);
    if (nickname.length + shortSyllable.length <= targetLength) {
      nickname += shortSyllable;
    } else {
      break;
    }
  }
  
  // Apply random capitalization patterns
  if (nickname.length > 0) {
    const capPattern = Math.random();
    if (capPattern < 0.6) {
      // Standard capitalization
      nickname = nickname.charAt(0).toUpperCase() + nickname.slice(1).toLowerCase();
    } else if (capPattern < 0.8) {
      // Alternate case
      nickname = nickname.split('').map((char, index) => 
        index % 2 === 0 ? char.toUpperCase() : char.toLowerCase()
      ).join('');
    } else {
      // Random caps
      nickname = nickname.split('').map(char => 
        Math.random() > 0.7 ? char.toUpperCase() : char.toLowerCase()
      ).join('');
    }
  }
  
  // Force add numbers if requested
  if (includeNumbers) {
    const availableSpace = maxLength - nickname.length;
    if (availableSpace >= 1) {
      const maxNumber = Math.pow(10, Math.min(2, availableSpace)) - 1;
      const number = Math.floor(Math.random() * maxNumber) + 1;
      
      // Random number placement
      if (Math.random() > 0.7 && availableSpace >= 2) {
        nickname = number.toString() + nickname;
      } else {
        nickname += number.toString();
      }
    }
  }
  
  // Final length check
  return nickname.substring(0, maxLength);
}

function generateThematicNickname(theme: NicknameTheme, minLength: number, maxLength: number, includeNumbers: boolean, useCapitalization: boolean): string {
  const words = themeWords[theme];
  
  // Reserve space for numbers if requested
  const numberSpace = includeNumbers ? 2 : 0;
  const baseSpace = maxLength - numberSpace;
  
  // Choose pattern based on available space
  let nickname = "";
  
  if (baseSpace >= 8) {
    // Full combinations
    const patterns = [
      () => getRandomElement(words.prefixes) + getRandomElement(words.suffixes),
      () => getRandomElement(words.prefixes) + getRandomElement(words.syllables) + getRandomElement(words.suffixes),
      () => getRandomElement(words.syllables) + getRandomElement(words.prefixes),
      () => getRandomElement(words.suffixes) + getRandomElement(words.syllables),
    ];
    nickname = getRandomElement(patterns)();
  } else {
    // Shorter combinations for limited space
    if (Math.random() > 0.5) {
      nickname = getRandomElement(words.prefixes);
    } else {
      nickname = getRandomElement(words.suffixes);
    }
    
    // Add syllables to fill space
    while (nickname.length < baseSpace - 2) {
      const syllable = getRandomElement(words.syllables);
      if (nickname.length + syllable.length <= baseSpace) {
        nickname += syllable;
      } else {
        break;
      }
    }
  }
  
  // Trim to base space
  if (nickname.length > baseSpace) {
    nickname = nickname.substring(0, baseSpace);
  }
  
  // Apply capitalization
  if (useCapitalization) {
    if (Math.random() > 0.5) {
      nickname = nickname.charAt(0).toUpperCase() + nickname.slice(1).toLowerCase();
    } else {
      // CamelCase style
      const parts = nickname.match(/.{1,4}/g) || [nickname];
      nickname = parts.map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()).join('');
    }
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
        nickname = generateRandomNickname(theme, minLength, maxLength, includeNumbers, includeSpecialChars);
        break;
      case "syllabic":
        nickname = generateSyllabicNickname(theme, minLength, maxLength, includeNumbers);
        break;
      case "thematic":
        nickname = generateThematicNickname(theme, minLength, maxLength, includeNumbers, useCapitalization);
        break;
      default:
        nickname = generateRandomNickname(theme, minLength, maxLength, includeNumbers, includeSpecialChars);
    }
    
    // Apply final capitalization rules
    if (useCapitalization && algorithm !== "thematic") {
      if (Math.random() > 0.5) {
        nickname = nickname.charAt(0).toUpperCase() + nickname.slice(1);
      }
    }
    
    // Ensure uniqueness in this generation batch
    if (!generatedSet.has(nickname.toLowerCase())) {
      generatedSet.add(nickname.toLowerCase());
      nicknames.push(nickname);
    }
  }
  
  return nicknames;
}
