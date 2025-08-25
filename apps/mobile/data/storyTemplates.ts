import { StoryTemplate } from '@/stores/storyStore';

export const storyTemplates: StoryTemplate[] = [
  {
    theme: 'forest_adventure',
    title: 'The Magical Forest Quest',
    description: 'Join friendly animals on an adventure through an enchanted forest',
    ageRange: '3-8',
    estimatedDuration: '5-7 minutes',
    icon: 'leaf',
    gradient: ['#2E8B57', '#90EE90'],
    sections: {
      start: {
        id: 'start',
        text: 'You walk into a magical forest where the trees sparkle with golden light. A friendly rabbit hops up to you and waves!',
        isEnding: false,
        choices: [
          { id: 'choice1', label: 'Follow the rabbit', nextSectionId: 'rabbit_path' },
          { id: 'choice2', label: 'Explore the sparkling trees', nextSectionId: 'tree_path' },
          { id: 'choice3', label: 'Listen for forest sounds', nextSectionId: 'sound_path' }
        ]
      },
      rabbit_path: {
        id: 'rabbit_path',
        text: 'The rabbit leads you to a clearing where woodland animals are having a picnic! They invite you to join them.',
        isEnding: false,
        choices: [
          { id: 'choice4', label: 'Join the picnic', nextSectionId: 'picnic_ending' },
          { id: 'choice5', label: 'Ask about the forest magic', nextSectionId: 'magic_path' }
        ]
      },
      tree_path: {
        id: 'tree_path',
        text: 'You touch one of the sparkling trees and it begins to glow even brighter! Suddenly, a wise old owl appears.',
        isEnding: false,
        choices: [
          { id: 'choice6', label: 'Ask the owl for wisdom', nextSectionId: 'wisdom_ending' },
          { id: 'choice7', label: 'Make a wish on the tree', nextSectionId: 'wish_ending' }
        ]
      },
      sound_path: {
        id: 'sound_path',
        text: 'You hear beautiful music coming from deeper in the forest. Following the sound, you discover a group of forest sprites dancing!',
        isEnding: false,
        choices: [
          { id: 'choice8', label: 'Join the dance', nextSectionId: 'dance_ending' },
          { id: 'choice9', label: 'Watch quietly', nextSectionId: 'watch_ending' }
        ]
      },
      magic_path: {
        id: 'magic_path',
        text: 'The animals tell you about the forest\'s ancient magic that protects all who live there. They offer to show you the secret garden.',
        isEnding: false,
        choices: [
          { id: 'choice10', label: 'Visit the secret garden', nextSectionId: 'garden_ending' }
        ]
      },
      picnic_ending: {
        id: 'picnic_ending',
        text: 'You have the most wonderful picnic with your new animal friends! They give you a special acorn to remember your forest adventure. The End!',
        isEnding: true,
        choices: []
      },
      wisdom_ending: {
        id: 'wisdom_ending',
        text: 'The wise owl teaches you about the harmony of nature and gives you a magical feather that will always guide you home. The End!',
        isEnding: true,
        choices: []
      },
      wish_ending: {
        id: 'wish_ending',
        text: 'Your wish fills the forest with even more magic! The trees bloom with colorful flowers and the animals cheer. You feel truly special. The End!',
        isEnding: true,
        choices: []
      },
      dance_ending: {
        id: 'dance_ending',
        text: 'You dance joyfully with the forest sprites until the stars come out! They crown you as an honorary forest guardian. The End!',
        isEnding: true,
        choices: []
      },
      watch_ending: {
        id: 'watch_ending',
        text: 'The sprites notice your respectful watching and gift you with the ability to understand all forest languages. What an amazing adventure! The End!',
        isEnding: true,
        choices: []
      },
      garden_ending: {
        id: 'garden_ending',
        text: 'In the secret garden, you plant a seed that instantly grows into a beautiful flower. The forest will always remember your kindness. The End!',
        isEnding: true,
        choices: []
      }
    }
  },
  {
    theme: 'ocean_quest',
    title: 'Under the Sea Adventure',
    description: 'Dive deep and meet colorful sea creatures',
    ageRange: '2-7',
    estimatedDuration: '4-6 minutes',
    icon: 'water',
    gradient: ['#0077be', '#87CEEB'],
    sections: {
      start: {
        id: 'start',
        text: 'You put on your magical diving gear and jump into the crystal blue ocean! A friendly dolphin swims up to greet you.',
        isEnding: false,
        choices: [
          { id: 'choice1', label: 'Swim with the dolphin', nextSectionId: 'dolphin_path' },
          { id: 'choice2', label: 'Explore the coral reef', nextSectionId: 'coral_path' },
          { id: 'choice3', label: 'Dive deeper', nextSectionId: 'deep_path' }
        ]
      },
      dolphin_path: {
        id: 'dolphin_path',
        text: 'The dolphin takes you on a thrilling ride through underwater caves filled with glowing fish! You feel like you\'re flying underwater.',
        isEnding: false,
        choices: [
          { id: 'choice4', label: 'Play with the glowing fish', nextSectionId: 'fish_ending' },
          { id: 'choice5', label: 'Explore the cave further', nextSectionId: 'cave_ending' }
        ]
      },
      coral_path: {
        id: 'coral_path',
        text: 'The coral reef is like an underwater rainbow! You meet a wise old sea turtle who offers to show you the greatest treasure.',
        isEnding: false,
        choices: [
          { id: 'choice6', label: 'Follow the sea turtle', nextSectionId: 'treasure_ending' },
          { id: 'choice7', label: 'Play hide and seek with fish', nextSectionId: 'play_ending' }
        ]
      },
      deep_path: {
        id: 'deep_path',
        text: 'In the deep ocean, you discover a magical underwater city where mermaids live! They welcome you warmly.',
        isEnding: false,
        choices: [
          { id: 'choice8', label: 'Learn to sing like a mermaid', nextSectionId: 'song_ending' },
          { id: 'choice9', label: 'Help decorate their palace', nextSectionId: 'palace_ending' }
        ]
      },
      fish_ending: {
        id: 'fish_ending',
        text: 'You play tag with the glowing fish and they teach you their secret dance! You become an honorary member of their school. The End!',
        isEnding: true,
        choices: []
      },
      cave_ending: {
        id: 'cave_ending',
        text: 'Deep in the cave, you find a magical pearl that grants ocean wishes! Your wish for ocean friends comes true instantly. The End!',
        isEnding: true,
        choices: []
      },
      treasure_ending: {
        id: 'treasure_ending',
        text: 'The sea turtle shows you that the greatest treasure is the friendship of all sea creatures! They throw a wonderful underwater party for you. The End!',
        isEnding: true,
        choices: []
      },
      play_ending: {
        id: 'play_ending',
        text: 'Playing hide and seek with the colorful fish is so much fun! They declare you the best hide-and-seek player in the ocean. The End!',
        isEnding: true,
        choices: []
      },
      song_ending: {
        id: 'song_ending',
        text: 'Your mermaid song is so beautiful that it attracts whales from far away! They sing along and create the most magical ocean concert ever. The End!',
        isEnding: true,
        choices: []
      },
      palace_ending: {
        id: 'palace_ending',
        text: 'You help decorate the mermaid palace with shells and seaweed. They love your creativity and make you the royal decorator! The End!',
        isEnding: true,
        choices: []
      }
    }
  },
  {
    theme: 'space_journey',
    title: 'Rocket Ship to the Stars',
    description: 'Blast off on a cosmic adventure',
    ageRange: '4-8',
    estimatedDuration: '6-8 minutes',
    icon: 'rocket',
    gradient: ['#191970', '#9932CC'],
    sections: {
      start: {
        id: 'start',
        text: 'You climb into your shiny rocket ship and blast off into space! Through your window, you see planets, stars, and a friendly alien waving at you.',
        isEnding: false,
        choices: [
          { id: 'choice1', label: 'Wave back at the alien', nextSectionId: 'alien_path' },
          { id: 'choice2', label: 'Fly to the colorful planet', nextSectionId: 'planet_path' },
          { id: 'choice3', label: 'Follow the shooting stars', nextSectionId: 'star_path' }
        ]
      },
      alien_path: {
        id: 'alien_path',
        text: 'The friendly alien invites you to their space station! It\'s full of amazing gadgets and space games you\'ve never seen before.',
        isEnding: false,
        choices: [
          { id: 'choice4', label: 'Play zero-gravity games', nextSectionId: 'games_ending' },
          { id: 'choice5', label: 'Learn about alien technology', nextSectionId: 'tech_ending' }
        ]
      },
      planet_path: {
        id: 'planet_path',
        text: 'You land on a planet made of rainbow crystals! Everything sparkles and makes beautiful music when you touch it.',
        isEnding: false,
        choices: [
          { id: 'choice6', label: 'Compose crystal music', nextSectionId: 'music_ending' },
          { id: 'choice7', label: 'Collect crystal souvenirs', nextSectionId: 'crystal_ending' }
        ]
      },
      star_path: {
        id: 'star_path',
        text: 'Following the shooting stars leads you to a cosmic playground where young stars learn to shine! They ask for your help.',
        isEnding: false,
        choices: [
          { id: 'choice8', label: 'Teach stars to twinkle', nextSectionId: 'twinkle_ending' },
          { id: 'choice9', label: 'Help organize a star parade', nextSectionId: 'parade_ending' }
        ]
      },
      games_ending: {
        id: 'games_ending',
        text: 'Playing zero-gravity games with your alien friend is incredible! You become the champion of space hopscotch and they give you a trophy made of stardust. The End!',
        isEnding: true,
        choices: []
      },
      tech_ending: {
        id: 'tech_ending',
        text: 'The alien teaches you how to make a translator that helps you talk to any creature in the universe! What an amazing gift for your space adventure. The End!',
        isEnding: true,
        choices: []
      },
      music_ending: {
        id: 'music_ending',
        text: 'Your crystal music is so beautiful that it attracts space butterflies from across the galaxy! They dance to your melody in the most spectacular show ever. The End!',
        isEnding: true,
        choices: []
      },
      crystal_ending: {
        id: 'crystal_ending',
        text: 'You collect magical crystals that will always remind you of your space adventure! Each one glows with the memory of this amazing journey. The End!',
        isEnding: true,
        choices: []
      },
      twinkle_ending: {
        id: 'twinkle_ending',
        text: 'You teach the young stars your best twinkling techniques! They twinkle so beautifully that you become their favorite twinkling teacher. The End!',
        isEnding: true,
        choices: []
      },
      parade_ending: {
        id: 'parade_ending',
        text: 'The star parade you organize is the most magnificent sight in the galaxy! All the planets stop to watch and cheer. You\'re now the official cosmic parade organizer! The End!',
        isEnding: true,
        choices: []
      }
    }
  }
];