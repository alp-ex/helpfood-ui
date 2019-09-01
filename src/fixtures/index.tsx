// TODO : add env variable logic, to switch from db to fixtures when triggering call in the app
const users = [
  {
    username: "patrick",
    password: "patouchedu92",
    selected_hue: 224
  },
  {
    username: "alain",
    password: "alandu92",
    selected_hue: 4
  },
  {
    username: "gisèle",
    password: "giselelafollichine",
    selected_hue: 302
  },
  {
    username: "mahmoud",
    password: "soleillevant",
    selected_hue: 68
  },
  {
    username: "tchan",
    password: "motdepassedetchan",
    selected_hue: 12
  },
  {
    username: "cuillère",
    password: "soupe",
    selected_hue: 32
  }
];

const dishes = [
  {
    name: "cacoune",
    description:
      "It's like a real dish, but it's actually poo. That is my best dish when I receive people at my house.",
    characteristics: {
      isVegan: false,
      isVegetarian: true,
      warnings: ["not available for pregnant women"]
    }
  },
  {
    name: "pipoune",
    description:
      "It's like a real dish, but it's actually pee. That is my best dish when I receive people at my house.",
    characteristics: {
      isVegan: true,
      isVegetarian: false,
      warnings: ["not available for pregnant women"]
    }
  },
  {
    name: "tarte au cacoune",
    description:
      "It's like a real pie, but it's actually a poo pie. That is my best dish when I receive people at my house.",
    characteristics: {
      isVegan: false,
      isVegetarian: false
    }
  },
  {
    name: "smoothie au pipoune",
    description:
      "It's like a real smoothie, but it's actually a pee smoothie. That is my best dish when I receive people at my house.",
    characteristics: {
      isVegan: true,
      isVegetarian: true
    }
  }
];

export { dishes, users };
