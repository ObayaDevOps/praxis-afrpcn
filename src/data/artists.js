// data/artists.js
export const artists = [
    {
      id: "1",
      name: "Vincent van Gogh",
      info: "Dutch Post-Impressionist painter who is among the most famous and influential figures in the history of Western art.",
      born: "1853",
      died: "1890",
      nationality: "Dutch",
      notableWorks: ["The Starry Night", "Sunflowers", "Irises"],
    },
    {
      id: "2",
      name: "Leonardo da Vinci",
      info: "Italian polymath of the High Renaissance who is widely considered one of the greatest painters of all time.",
      born: "1452",
      died: "1519",
      nationality: "Italian",
      notableWorks: ["Mona Lisa", "The Last Supper", "Vitruvian Man"],
    },
    {
      id: "3",
      name: "Pablo Picasso",
      info: "Spanish painter, sculptor, printmaker, ceramicist and theatre designer who spent most of his adult life in France.",
      born: "1881",
      died: "1973",
      nationality: "Spanish",
      notableWorks: ["Guernica", "Les Demoiselles d'Avignon"],
    },
    {
      id: "4",
      name: "Claude Monet",
      info: "A founder of French Impressionist painting, and the most consistent and prolific practitioner of the movement's philosophy.",
      born: "1840",
      died: "1926",
      nationality: "French",
      notableWorks: ["Impression, soleil levant", "Water Lilies series"],
    },
  ];
  
  export const connections = [
    { source: "1", target: "4" }, // Van Gogh influenced by Impressionism (Monet)
    { source: "3", target: "1" }, // Picasso admired Van Gogh
    { source: "2", target: "1" }, // Da Vinci (Renaissance) is a foundational figure
    { source: "2", target: "3" }, // Picasso studied old masters
  ];