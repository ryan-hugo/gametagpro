import type { GenerationParameters, SupportedLanguage, NicknameTheme, ComplexityLevel, NicknameStyle } from "@shared/schema";
import { themeWordsByLanguage, syllablesByLanguage } from "./language-dictionaries";

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function applyCapitalization(str: string, useCapitalization: boolean, style: NicknameStyle): string {
  if (!useCapitalization) return str.toLowerCase();
  
  switch (style) {
    case "professional":
      return capitalizeFirst(str);
    case "modern":
      return Math.random() > 0.5 ? str.toUpperCase() : capitalizeFirst(str);
    case "unique":
      return str.split('').map((char, i) => 
        Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase()
      ).join('');
    default: // classic
      return capitalizeFirst(str);
  }
}

function addNumbers(str: string, includeNumbers: boolean, complexity: ComplexityLevel): string {
  if (!includeNumbers) return str;
  
  const chance = complexity === "simple" ? 0.3 : complexity === "medium" ? 0.5 : 0.7;
  if (Math.random() > chance) return str;
  
  const maxNumber = complexity === "simple" ? 99 : complexity === "medium" ? 999 : 9999;
  const number = getRandomNumber(1, maxNumber);
  
  const position = Math.random();
  if (position < 0.7) {
    return str + number;
  } else if (position < 0.9) {
    return number + str;
  } else {
    const mid = Math.floor(str.length / 2);
    return str.slice(0, mid) + number + str.slice(mid);
  }
}

function addSpecialChars(str: string, includeSpecialChars: boolean, style: NicknameStyle): string {
  if (!includeSpecialChars || Math.random() > 0.4) return str;
  
  const chars = style === "professional" ? ["_", "-"] : 
                style === "unique" ? ["_", "-", ".", "x", "X"] :
                ["_", "-", ".", "!", "?"];
  
  const char = getRandomElement(chars);
  const position = Math.random();
  
  if (position < 0.6) {
    return str + char + getRandomElement(["pro", "x", "gaming", "elite"]);
  } else if (position < 0.8) {
    return getRandomElement(["the", "mr", "epic"]) + char + str;
  } else {
    const mid = Math.floor(str.length / 2);
    return str.slice(0, mid) + char + str.slice(mid);
  }
}

function filterByPreferences(words: string[], params: GenerationParameters): string[] {
  let filtered = [...words];
  
  if (params.preferShortWords) {
    filtered = filtered.filter(word => word.length <= 6);
  }
  
  if (params.avoidCommonWords) {
    const commonWords = ["the", "and", "pro", "gamer", "player", "user", "cool", "nice"];
    filtered = filtered.filter(word => 
      !commonWords.some(common => word.toLowerCase().includes(common.toLowerCase()))
    );
  }
  
  return filtered.length > 0 ? filtered : words; // fallback to original if all filtered out
}

function generateRandomNickname(params: GenerationParameters): string {
  const language = params.language || "en";
  const themeWords = themeWordsByLanguage[language]?.[params.theme];
  
  if (!themeWords) {
    // Fallback to English if language not found
    const fallbackWords = themeWordsByLanguage["en"][params.theme];
    const prefix = getRandomElement(filterByPreferences(fallbackWords.prefixes, params));
    const suffix = getRandomElement(filterByPreferences(fallbackWords.suffixes, params));
    let nickname = prefix + suffix;
    
    nickname = addNumbers(nickname, params.includeNumbers, params.complexity);
    nickname = addSpecialChars(nickname, params.includeSpecialChars, params.style);
    return applyCapitalization(nickname, params.useCapitalization, params.style);
  }
  
  const prefix = getRandomElement(filterByPreferences(themeWords.prefixes, params));
  const suffix = getRandomElement(filterByPreferences(themeWords.suffixes, params));
  
  let nickname = prefix + suffix;
  
  // Apply complexity-based modifications
  if (params.complexity === "complex" && Math.random() > 0.6) {
    const extraWord = getRandomElement(filterByPreferences(themeWords.words, params));
    nickname = Math.random() > 0.5 ? extraWord + nickname : nickname + extraWord;
  }
  
  nickname = addNumbers(nickname, params.includeNumbers, params.complexity);
  nickname = addSpecialChars(nickname, params.includeSpecialChars, params.style);
  
  return applyCapitalization(nickname, params.useCapitalization, params.style);
}

function generateSyllabicNickname(params: GenerationParameters): string {
  const language = params.language || "en";
  const syllables = syllablesByLanguage[language];
  
  if (!syllables) {
    // Fallback to English
    const fallbackSyllables = syllablesByLanguage["en"];
    return generateSyllabicFromLanguage(params, fallbackSyllables);
  }
  
  return generateSyllabicFromLanguage(params, syllables);
}

function generateSyllabicFromLanguage(params: GenerationParameters, syllables: { consonants: string[], vowels: string[] }): string {
  const minSyllables = params.complexity === "simple" ? 2 : params.complexity === "medium" ? 3 : 4;
  const maxSyllables = params.complexity === "simple" ? 3 : params.complexity === "medium" ? 4 : 6;
  const syllableCount = getRandomNumber(minSyllables, maxSyllables);
  
  let nickname = "";
  
  for (let i = 0; i < syllableCount; i++) {
    const consonant = getRandomElement(syllables.consonants);
    const vowel = getRandomElement(syllables.vowels);
    
    if (Math.random() > 0.5) {
      nickname += consonant + vowel;
    } else {
      nickname += vowel + consonant;
    }
  }
  
  // Ensure minimum length
  while (nickname.length < params.minLength) {
    const consonant = getRandomElement(syllables.consonants);
    const vowel = getRandomElement(syllables.vowels);
    nickname += consonant + vowel;
  }
  
  // Trim to maximum length
  if (nickname.length > params.maxLength) {
    nickname = nickname.substring(0, params.maxLength);
  }
  
  nickname = addNumbers(nickname, params.includeNumbers, params.complexity);
  nickname = addSpecialChars(nickname, params.includeSpecialChars, params.style);
  
  return applyCapitalization(nickname, params.useCapitalization, params.style);
}

function generateThematicNickname(params: GenerationParameters): string {
  const language = params.language || "en";
  const themeWords = themeWordsByLanguage[language]?.[params.theme];
  
  if (!themeWords) {
    // Fallback to English
    return generateThematicFromWords(params, themeWordsByLanguage["en"][params.theme]);
  }
  
  return generateThematicFromWords(params, themeWords);
}

function generateThematicFromWords(params: GenerationParameters, themeWords: { prefixes: string[], suffixes: string[], words: string[] }): string {
  const approach = Math.random();
  let nickname = "";
  
  if (approach < 0.4) {
    // Prefix + core word
    const prefix = getRandomElement(filterByPreferences(themeWords.prefixes, params));
    const word = getRandomElement(filterByPreferences(themeWords.words, params));
    nickname = prefix + word;
  } else if (approach < 0.8) {
    // Core word + suffix
    const word = getRandomElement(filterByPreferences(themeWords.words, params));
    const suffix = getRandomElement(filterByPreferences(themeWords.suffixes, params));
    nickname = word + suffix;
  } else {
    // Prefix + word + suffix (complex)
    if (params.complexity !== "simple") {
      const prefix = getRandomElement(filterByPreferences(themeWords.prefixes, params));
      const word = getRandomElement(filterByPreferences(themeWords.words, params));
      const suffix = getRandomElement(filterByPreferences(themeWords.suffixes, params));
      nickname = prefix + word + suffix;
    } else {
      // Simple fallback
      const word = getRandomElement(filterByPreferences(themeWords.words, params));
      nickname = word;
    }
  }
  
  nickname = addNumbers(nickname, params.includeNumbers, params.complexity);
  nickname = addSpecialChars(nickname, params.includeSpecialChars, params.style);
  
  return applyCapitalization(nickname, params.useCapitalization, params.style);
}

function ensureLengthConstraints(nickname: string, params: GenerationParameters): string {
  // If too short, add padding
  if (nickname.length < params.minLength) {
    const language = params.language || "en";
    const themeWords = themeWordsByLanguage[language]?.[params.theme] || themeWordsByLanguage["en"][params.theme];
    
    while (nickname.length < params.minLength) {
      const addon = getRandomElement(themeWords.words);
      nickname += addon.substring(0, Math.min(addon.length, params.minLength - nickname.length));
    }
  }
  
  // If too long, trim
  if (nickname.length > params.maxLength) {
    nickname = nickname.substring(0, params.maxLength);
  }
  
  return nickname;
}

export function generateNicknames(params: GenerationParameters): string[] {
  const nicknames: string[] = [];
  
  for (let i = 0; i < params.count; i++) {
    let nickname = "";
    
    switch (params.algorithm) {
      case "random":
        nickname = generateRandomNickname(params);
        break;
      case "syllabic":
        nickname = generateSyllabicNickname(params);
        break;
      case "thematic":
        nickname = generateThematicNickname(params);
        break;
      default:
        nickname = generateRandomNickname(params);
    }
    
    // Ensure length constraints
    nickname = ensureLengthConstraints(nickname, params);
    
    // Avoid duplicates
    if (!nicknames.includes(nickname)) {
      nicknames.push(nickname);
    } else {
      i--; // retry this iteration
    }
  }
  
  return nicknames;
}