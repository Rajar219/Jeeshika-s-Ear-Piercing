/**
 * Baby Jeeshika - Ear Piercing Ceremony (செவிப்பொன் சேர்ப்பு விழா)
 * Static Configuration File
 * Primary Source of Truth for all event details, verses, and family relations
 */

export interface EventDetail {
  title: string;
  tamilTitle: string;
  value: string;
  tamilValue: string;
  icon: string;
}

export interface FamilyPerson {
  relation: string;
  tamilRelation: string;
  names: string;
  tamilNames: string;
}

export const INVITATION_CONFIG = {
  // 1. Identity & Event Basics
  baby: {
    name: "Baby Jeeshika",
    tamilName: "பேபி. ஜீஷிகா",
    title: "EAR PIERCING CEREMONY",
    tamilTitle: "செவிப்பொன் சேர்ப்பு விழா",
    subtitle: "OF OUR BELOVED DAUGHTER",
    tamilSubtitle: "எங்கள் அன்பு மகள்",
    badge: "WITH LOVE ❤️ WE INVITE YOU",
    tamilBadge: "அன்புடன் அழைக்கின்றோம்",
    homepageMessage: "எங்கள் அன்பு மகளின் இந்த இனிய நாளில் தங்களின் வருகையையும் வாழ்த்துகளையும் அன்புடன் எதிர்பார்க்கிறோம்.",
  },

  // 2. Date, Time & Venue
  event: {
    day: "MONDAY",
    tamilDay: "திங்கட்கிழமை",
    dateDisplay: "Monday, 18th January 2027",
    tamilDateDisplay: "திங்கட்கிழமை, 18 ஜனவரி 2027",
    isoDateTime: "2027-01-18T12:00:00+05:30",
    timeDisplay: "12:00 PM to 1:00 PM",
    tamilTimeDisplay: "மதியம் 12:00 முதல் 1:00 மணி வரை",
    venueName: "Sri Angalaparameshwari Temple",
    tamilVenueName: "ஶ்ரீ அங்காளபரமேஸ்வரி கோவில்",
    venueLocation: "Kokkalai, Marapparai, Tamil Nadu – 637410",
    tamilVenueLocation: "கொக்கலை, மரப்பாறை, தமிழ்நாடு – 637410",
    fullVenueDisplay: "Sri Angalaparameshwari Temple, Kokkalai, Marapparai, Tamil Nadu – 637410",
    tamilFullVenueDisplay: "ஶ்ரீ அங்காளபரமேஸ்வரி கோவில், கொக்கலை, மரப்பாறை, தமிழ்நாடு – 637410",
    googleMapsUrl: "https://maps.app.goo.gl/k1Wv231imacHNNiY9?g_st=aw",
  },

  // 3. Poetic Verses & Invocations
  verses: {
    englishPoem: [
      "A flower blooming with a laughter so sweet,",
      "Her tiny golden steps make our joy complete.",
      "As we adorn her ears with auspicious gold,",
      "Come shower love as her stories unfold."
    ],
    englishWelcome: "We warmly invite you and your family to the Ear Piercing Ceremony of our beloved daughter.",
    tamilWelcome: "எங்கள் அன்பு மகளின் செவிப்பொன் சேர்ப்பு விழாவிற்கு குடும்பத்துடன் வருகை தந்து வாழ்த்தி சிறப்பிக்குமாறு அன்புடன் கேட்டுக்கொள்கிறோம்.",
    closingMotto: "BLESSED ❤️ CHERISHED ❤️ ALWAYS LOVED",
    tamilClosingMotto: "🛕 18.01.2027 • கொக்கலை, மரப்பாறை",
  },

  // 4. Scratch Section
  scratch: {
    heading: "தேதியைப் பார்க்க இதயத்தைத் தேய்க்கவும்",
    englishHeading: "SCRATCH TO REVEAL",
    instruction: "இதயத்தை மெதுவாகத் தேய்த்து தேதியைப் பாருங்கள்",
  },

  // 5. Grandparents' Blessings
  grandparents: [
    {
      names: "(Late) Thiru. Tamil Arasu – Thirumathi. Usha",
      tamilNames: "(லேட்) திரு. தமிழரசு – திருமதி. உஷா",
    },
    {
      names: "Thiru. Pazhanivappan – Thirumathi. Pushpalata",
      tamilNames: "திரு. பழனியப்பன் – திருமதி. புஷ்பலதா",
    }
  ],

  // 6. Family Members & Warm Regards
  family: [
    {
      relation: "Father & Mother",
      tamilRelation: "தந்தை – தாய்",
      names: "Suthakar – Lakshmi",
      tamilNames: "சுதாகர் – லக்ஷ்மி",
    },
    {
      relation: "Maternal Uncle & Aunt",
      tamilRelation: "தாய்மாமன் – மாமி",
      names: "Sarathkumar – Dharani",
      tamilNames: "சரத்குமார் – தாரணி",
    },
    {
      relation: "Sister",
      tamilRelation: "அக்கா",
      names: "Meera",
      tamilNames: "மீரா",
    },
    {
      relation: "Paternal Uncle & Aunt",
      tamilRelation: "சித்தப்பா – சித்தி",
      names: "Omprakash – Ragavi",
      tamilNames: "ஓம் பிரகாஷ் – ராகவி",
    },
    {
      relation: "Brother",
      tamilRelation: "அண்ணன்",
      names: "Yuga Velan",
      tamilNames: "யுக வேலன்",
    },
  ],

  familyClosingNote: "And Friends & Family.",
  tamilFamilyClosingNote: "மற்றும் உறவினர்கள், நண்பர்கள்.",

  // 7. Media Asset Paths
  assets: {
    introVideo: "/watermark removed seal tapping.mp4",
    heroVideo: "/watermark removed baby scene.mp4",
    fallbackBackground: "/Dreamy Pink Floral Baby Celebration Scene.png",
    bgmAudio: "/audio 2.mp3",
    bgmAudioWav: "/audio 2.mp3",
    introAudio: "/audio 1.mp3",
    mainAudio: "/audio 2.mp3",
    babyPortrait: "/baby_portrait.png",
  },

  // 8. Design System Palette
  theme: {
    royalBlushPink: "#E8B7C4",
    dustyRose: "#C97891",
    deepRose: "#9B3459",
    champagneGold: "#E8D39A",
    metallicGold: "#C9A34E",
    warmIvory: "#FFF8F0",
  }
};
