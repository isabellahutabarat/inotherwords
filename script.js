const canvas = document.getElementById("textCanvas");
const ctx = canvas.getContext("2d");

// Adjust canvas size when the window is resized
window.addEventListener("resize", resizeCanvas);
resizeCanvas(); // Initial resize

// Resize the canvas to fit the full window
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

// Phrases and their corresponding languages
const phrases = [
  { text: "MALU BERTANYA,\n SESAT DI JALAN", language: "INDONESIAN" },
  { text: "SHY TO ASK,\nLOST ON THE ROAD", language: "ENGLISH" },
  { text: "VERGONHA DE PERGUNTAR,\nPERDIDO NA ESTRADA", language: "PORTUGUESE" },
  { text: "HÄVETTÄÄ KYSYÄ, \nEKSYNYT TIELLE", language: "FINNISH" },
  { text: "SKAMJE OM TE FREEGJEN, \nFERLERN OP 'E DYK", language: "WESTERN FRISIAN" },
  { text: "NDINEENTLONI ZOKUBUZA, \nNDALAHLEKA ENDLELENI", language: "XHOSA" },
  { text: "PRÍLIŠ HANBLIVÝ NA TO,\n ABY SOM SA SPÝTAL, \nSTRATIL SOM SA NA CESTE", language: "SLOVAK" },
  { text: "FOR GENERT TIL AT \n SPØRGE,JEG GIK \nVILD PÅ VEJEN", language: "DANISH" },
  { text: "KE LIHLONG HO BOTSA, \nKE ILE KA LAHLEHA TSELENG", language: "SOUTHERN SOTHO" },
  { text: "پوښتنه وکړم، \n زه شرمیږم چې رک شوم\n زه په لاره کې و ", language: "PASHTO" },
  { text: "NEUGODNO MI JE PITATI, \nIZGUBIO SAM SE PUTEM", language: "CROATIAN" },
  { text: "— ЗНІЯКОВІЛО СПИТАВ \n Я, РОЗГУБИВСЯ", language: "UKRANIAN" },
  { text: "I ASKED AWKWARDLY,\n CONFUSED", language: "ENGLISH" },
  { text: "मैले अलमलमा परेर सोधेँ", language: "NEPALI" },
  { text: "VERY HEVITRA \nAHO NANONTANY", language: "MALAGASY" },
  { text: "ZEPTAL JSEM \nSE ZMATENĚ", language: "CZECH" },
  { text: "NDAKABVUNZA\n NDAVHIRINGIKA", language: "SHONA" },
  { text: "УПИТАО САМ ЗБУЊЕНО", language: "SERBIAN" },
  { text: "VRA EK VERWARD", language: "AFRIKAANS" },
  { text: "E PYES I HUTUAR", language: "ALBANIAN" },
  { text: "混乱して尋ねる", language: "JAPANESE" },
  { text: "АБДЫРАП СҰРА", language: "KAZAKH" },
  { text: "ПОПИТАЙТЕ ОБЪРКАНО", language: "BULGARIAN" },
  { text: "TANONG NA NALILITO", language: "TAGALOG" },
  { text: "DEMANDIS KONFUZITE", language: "ESPERANTO" },
  { text: "BEERE IDAMU", language: "YORUBA" },
  { text: "DUMANDÒ CUNFUSU", language: "CORSICAN" },
  { text: "ÎNTREBĂ EL CONFUZ", language: "ROMANIAN" },
  { text: "उसले अलमलमा सोध्यो", language: "NEPALI" },
  { text: "JE ZMEDENO VPRAŠAL", language: "SLOVENE" },
  { text: "उसने भ्रमित होकर पूछा", language: "HINDI" },
  { text: "D'IARR SÉ AR \nDHAOINE EATARTHU", language: "IRISH" },
  { text: "DIA BERTANYA \nBINGUNG", language: "INDONESIAN" },
  { text: "SPÝTAL SA ZMÄTENE", language: "SLOVAK" },
  { text: "ELE PERGUNTOU\n CONFUSO", language: "PORTUGUESE" },
  { text: "HE ASKED CONFUSED", language: "ENGLISH" },
  { text: "त्याने गोंधळून विचारले", language: "MARATHI" },
  { text: "CHIESE CONFUSO", language: "ITALIAN" },
  { text: "TANYANYA KELIRU", language: "MALAY" },
  { text: "- СПРОСИЛ ОН В \nЗАМЕШАТЕЛЬСТВЕ", language: "RUSSIAN" },
  { text: "HOY IZY NANONTANY \nTAMIN'NY FISAVORITAHANA", language: "MALAGASY" },
  { text: "LI MANDE NAN\n KONFIZYON", language: "HAITIAN" },
  { text: "குழப்பத்துடன் கேட்டார்", language: "TAMIL" },
  { text: "ՀԱՐՑՐԵՑ ՇՓՈԹՎԱԾ", language: "ARMENIAN" },
  { text: "D'IARR MEARBHALL", language: "IRISH" },
  { text: "ആശയക്കുഴപ്പത്തോടെ\n ചോദിച്ചു", language: "MALAYALAM" },
  { text: "HA BOTSA A FEREKANE", language: "SOUTHERN SOTHO" },
  { text: "LI MANDE KONFONN", language: "HAITIAN" },
  { text: "UPITAO JE ZBUNJENO", language: "BOSNIAN" },
  { text: "TANYANYA KELIRU", language: "MALAY" },
  { text: "HIE GEFROT\n DUERCHERNEEN", language: "LUXEMBOURGISH" },
  { text: "PYETI AI I HUTUAR", language: "ALBANIAN" },
  { text: "AKABVUNZA \nACHIVHIRINGIKA", language: "SHONA" },
  { text: "هن پريشان ٿي پڇيو", language: "SINDHI" },
  { text: "ఆందోళనగా అడిగాడు", language: "TELUGU" },
  { text: "HE ASKED WORRIEDLY", language: "ENGLISH" },
  { text: "그는 걱정스럽게 물었다", language: "KOREAN" },
  { text: "سأل بقلق", language: "ARABIC" },
  { text: "NWS NUG TXHAWJ", language: "HMONG" },
  { text: "FRAGTE ER BESORGT", language: "GERMAN" },
  { text: "ENDIŞEYLE SORDU", language: "TURKISH" },
  { text: "ГЭЖ ТЭР САНАА \nЗОВЖ АСУУВ", language: "MONGOLIAN" },
  { text: "DH'FHAIGHNICH \nI GU DRAGHAIL", language: "SCOTTISH GAELIC" },
  { text: "SI WELWEL LEH \nAYAY U WEYDIISAY", language: "SOMALI" },
  { text: "SHE ASKED ANXIOUSLY", language: "ENGLISH" },
  { text: "УПИТАЛА ЈЕ ЗАБРИНУТО", language: "SERBIAN" },
  { text: "SPURTE HUN BEKYMRET", language: "NORWEIGAN" },
  { text: "GOFYNNODD YN\n BRYDERUS", language: "WELSH" },
  { text: "DIA BERTANYA\n DENGAN CEMAS", language: "INDONESIAN" },
  { text: "ԱՆՀԱՆԳՍՏԱՑԱԾ \nՀԱՐՑՐԵՑ ՆԱ", language: "ARMENIAN" },
  { text: "— деп уайымдап \nсұрады ол", language: "KAZAKH" },
  { text: "— ОБЕСПОКОЕННО \nСПРОСИЛ ОН", language: "RUSSIAN" },
  { text: "ਉਸਨੇ ਚਿੰਤਾ ਨਾਲ ਪੁੱਛਿਆ", language: "PUNJABI" },
  { text: "ENDIŞEYLE SORDU", language: "TURKISH" },
  { text: "ඔහු කනස්සල්ලෙන් ඇසුවේය", language: "SINHALA" },
  { text: "KÜSIS TA MURELIKULT", language: "ESTONIAN" },
  { text: "ELLE A DEMANDÉ \nAVEC INQUIÉTUDE", language: "FRENCH" },
  { text: "ΡΏΤΗΣΕ ΕΚΕΊΝΗ ΑΝΉΣΥΧΗ", language: "GREEK" },
  { text: "她担心地问道", language: "CHINESE" },
  { text: "તેણીએ ચિંતાથી પૂછ્યું", language: "GUJARATI" },
  { text: "ELLA PREGUNTÓ \nPREOCUPADA", language: "SPANISH" },
  { text: "CHIAMÒ PRIOCCUPATA", language: "SICILIAN" },
  { text: "– KÉRDEZTE \nAGGODALMASAN", language: "HUNGARIAN" },
  { text: "佢擔心噉問", language: "CANTONESE" },
  { text: "- ПРАША ЗАГРИЖЕНО", language: "MACEDONIAN" },
  { text: "AYUU SI WELWELSAN\n U WEYDIIYEY", language: "SOMALI" },
  { text: "เขาถามอย่างเป็นกังวล", language: "THAI" },
  { text: "ཁོས་སེམས་ཁྲལ་གྱི་ངང་ནས་དྲིས།", language: "TIBETAN" },
  { text: "UPITAO JE ZABRINUTO", language: "CROATIAN" },
  { text: "ZAPYTAŁ ZMARTWIONY", language: "POLISH" },
  { text: "BWE YABUUZIZZA NGA\n MWERALIIKIRIVU", language: "GANDA" },
  { text: "VIŅŠ NORAIZĒJIES \nJAUTĀJA", language: "LATVIAN" },
  { text: "ಅವರು ಚಿಂತೆಯಿಂದ \nಕೇಳಿದರು", language: "KANNADA" },
  { text: "ANAFUNSA MODANDAULA", language: "NYANJA" },
  { text: "YA TAMBAYA \nCIKIN TUHUMA", language: "HAUSA" },
  { text: "ШЕКОНЦА ХАЬТТИРА ЦО", language: "CHECHEN" },
  { text: "— ШУБХАКУНОН ПУРСИД У", language: "TAIJIK" },
  { text: "VROEG HIJ \nACHTERDOCHTIG", language: "DUTCH" },
  { text: "KA UI IA TŪPATO", language: "MAORI" },
  { text: "AKU TERKEJUT \nDENGAN PERTANYAANKU", language: "INDONESIAN" },
  { text: "I WAS SURPRISED \nBY MY QUESTION", language: "NYANJA" },

  
];

// Font settings
const fontFamily = "TT Commons Pro, sans-serif";
const fontSize = 100;
const typingSpeed = 20; // Speed of typing in milliseconds
const backgroundOpacity = 0.5; // Slightly reduced opacity for better readability of the main text

// Track current phrase and typed characters
let currentPhraseIndex = 0;
let currentTypedText = "";
let isTyping = false;
let typingInterval = null; // Store the current typing interval


// Floating phrases
const floatingPhrases = [];

// Language Info Element (can be added if needed)
const languageInfo = document.getElementById("languageInfo");

// Handle click to display the next phrase
document.addEventListener("click", () => {
  if (isTyping || currentPhraseIndex >= phrases.length) return;

  // Clear any existing typing intervals to prevent overlap
  if (typingInterval) {
    clearInterval(typingInterval);
  }

  // Start typing the next phrase
  isTyping = true;
  currentTypedText = "";
  const phrase = phrases[currentPhraseIndex];

  // Add current phrase to floating background after typing finishes
  if (currentPhraseIndex > 0) {
    addFloatingPhrase(phrases[currentPhraseIndex - 1].text);
  }

  // Update language info
  if (languageInfo) languageInfo.textContent = `${currentPhraseIndex + 1}: ${phrase.language}`;

  // Typing animation
  typingInterval = setInterval(() => {
    if (currentTypedText.length < phrase.text.length) {
      currentTypedText += phrase.text[currentTypedText.length];
      drawText(currentTypedText);
    } else {
      clearInterval(typingInterval);
      isTyping = false;
      currentPhraseIndex++;
    }
  }, typingSpeed);
});

// Add a floating phrase
function addFloatingPhrase(text) {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const size = Math.random() * 30 + 20; // Random font size
  const direction = Math.random() > 0.5 ? 1 : -1; // Random direction (up or down)

  // Start floating effect with 3 seconds for both up and down movement
  const totalTime = 10000; // Total time for one full cycle (up and down)
  const upwardMovementDuration = totalTime / 2;
  const downwardMovementDuration = totalTime / 2;

  floatingPhrases.push({
    text,
    x,
    y,
    size,
    direction, // Randomly up or down
    speed: 0, // Initial speed is 0, will calculate later for smooth movement
    offsetY: 0,
    startTime: Date.now(),
    upwardMovementDuration,
    downwardMovementDuration,
    directionIsUp: direction === 1, // True if it's moving up initially
    floatRange: Math.random() * 200 + 100, // Larger float range (between 100 and 300)
  });
}

// Draw text on canvas with word wrapping and padding for main phrase
function drawText(text) {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

  // Update and draw floating phrases
  floatingPhrases.forEach((phrase) => {
    const timeElapsed = Date.now() - phrase.startTime;
    let progress = (timeElapsed % (phrase.upwardMovementDuration + phrase.downwardMovementDuration)) / (phrase.upwardMovementDuration + phrase.downwardMovementDuration);

    // Determine the direction of movement
    if (progress < 0.5) {
      // Moving upward for the first half of the cycle
      phrase.offsetY = phrase.direction * (progress * 2) * phrase.floatRange; // Scale movement by floatRange
    } else {
      // Moving downward for the second half of the cycle
      phrase.offsetY = phrase.direction * (2 - progress * 2) * phrase.floatRange; // Scale movement by floatRange
    }

    // Draw floating phrase with reduced opacity
    ctx.font = `${phrase.size}px ${fontFamily}`;
    ctx.fillStyle = `rgba(0, 0, 0, ${backgroundOpacity})`; // Black color with reduced opacity
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(phrase.text, phrase.x, phrase.y + phrase.offsetY);
  });

  // Split text by \n (newline)
  const lines = text.split("\n");

  // Draw main phrase with bold weight and padding
  ctx.font = `bold ${fontSize}px ${fontFamily}`; // Making the font bold
  ctx.fillStyle = "#000000"; // Black color for main text
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const lineHeight = fontSize * 1.2; // Adjust line height for spacing
  const totalHeight = lineHeight * lines.length;
  const startY = canvas.height / 2 - totalHeight / 2; // Center the lines vertically

  // Draw each line of the manually split text
  lines.forEach((line, index) => {
    ctx.fillText(line, canvas.width / 2, startY + index * lineHeight);
  });

  // Keep updating
  requestAnimationFrame(() => drawText(text));
}

// Initial text
drawText("CLICK TO BEGIN");
