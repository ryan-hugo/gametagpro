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

// Syllable combinations for syllabic generation
const syllableCombinations = [
  ["con", "so", "nant"],
  ["vow", "el", "sounds"],
  ["syl", "la", "bles"],
  ["rhy", "thm", "ic"],
  ["pho", "net", "ic"],
  ["mor", "phe", "mic"],
  ["lex", "i", "cal"],
  ["syn", "tax", "is"],
  ["gram", "mar", "ly"],
  ["sem", "an", "tic"]
];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generateRandomNickname(theme: NicknameTheme, minLength: number, maxLength: number, includeNumbers: boolean, includeSpecialChars: boolean): string {
  const words = themeWords[theme];
  const prefix = getRandomElement(words.prefixes);
  const suffix = getRandomElement(words.suffixes);
  
  let nickname = prefix + suffix;
  
  // Add numbers if requested
  if (includeNumbers && Math.random() > 0.5) {
    const number = Math.floor(Math.random() * 999) + 1;
    nickname += number.toString();
  }
  
  // Add special characters if requested
  if (includeSpecialChars && Math.random() > 0.7) {
    const specialChars = ["_", "-", ".", "!"];
    const char = getRandomElement(specialChars);
    if (Math.random() > 0.5) {
      nickname = nickname + char + getRandomElement(words.syllables);
    } else {
      nickname = getRandomElement(words.syllables) + char + nickname;
    }
  }
  
  // Ensure length constraints
  if (nickname.length < minLength) {
    const extraSyllables = Math.ceil((minLength - nickname.length) / 3);
    for (let i = 0; i < extraSyllables; i++) {
      nickname += getRandomElement(words.syllables);
    }
  }
  
  if (nickname.length > maxLength) {
    nickname = nickname.substring(0, maxLength);
  }
  
  return nickname;
}

function generateSyllabicNickname(theme: NicknameTheme, minLength: number, maxLength: number, includeNumbers: boolean): string {
  const words = themeWords[theme];
  const targetLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  
  let nickname = "";
  let syllableCount = 0;
  const maxSyllables = Math.ceil(targetLength / 2);
  
  while (nickname.length < targetLength && syllableCount < maxSyllables) {
    const syllable = getRandomElement(words.syllables);
    nickname += syllable;
    syllableCount++;
    
    if (nickname.length >= targetLength) break;
  }
  
  // Capitalize first letter
  nickname = nickname.charAt(0).toUpperCase() + nickname.slice(1);
  
  // Add numbers if requested and there's space
  if (includeNumbers && nickname.length < maxLength - 2) {
    const number = Math.floor(Math.random() * 99) + 1;
    nickname += number.toString();
  }
  
  return nickname.substring(0, maxLength);
}

function generateThematicNickname(theme: NicknameTheme, minLength: number, maxLength: number, includeNumbers: boolean, useCapitalization: boolean): string {
  const words = themeWords[theme];
  
  // Choose combination pattern
  const patterns = [
    () => getRandomElement(words.prefixes) + getRandomElement(words.suffixes),
    () => getRandomElement(words.prefixes) + getRandomElement(words.syllables) + getRandomElement(words.suffixes),
    () => getRandomElement(words.syllables) + getRandomElement(words.prefixes),
    () => getRandomElement(words.suffixes) + getRandomElement(words.syllables),
  ];
  
  let nickname = getRandomElement(patterns)();
  
  // Apply capitalization
  if (useCapitalization) {
    // Random capitalization pattern
    if (Math.random() > 0.5) {
      nickname = nickname.charAt(0).toUpperCase() + nickname.slice(1).toLowerCase();
    } else {
      // CamelCase style
      const parts = nickname.match(/.{1,4}/g) || [nickname];
      nickname = parts.map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()).join('');
    }
  }
  
  // Add numbers strategically
  if (includeNumbers) {
    const numberPos = Math.random();
    const number = Math.floor(Math.random() * 999) + 1;
    
    if (numberPos > 0.7) {
      nickname = number.toString() + nickname;
    } else {
      nickname = nickname + number.toString();
    }
  }
  
  // Ensure length constraints
  if (nickname.length < minLength) {
    const extraSyllables = Math.ceil((minLength - nickname.length) / 3);
    for (let i = 0; i < extraSyllables; i++) {
      nickname += getRandomElement(words.syllables);
    }
  }
  
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
