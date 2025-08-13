const yesterday = new Date(Date.now() - 1000 * 60 * 60 * 24);
const twoDaysAgo = new Date(Date.now() - 1000 * 60 * 60 * 24 * 2);
const threeDaysAgo = new Date(Date.now() - 1000 * 60 * 60 * 24 * 3);
const fourDaysAgo = new Date(Date.now() - 1000 * 60 * 60 * 24 * 4);
const fiveDaysAgo = new Date(Date.now() - 1000 * 60 * 60 * 24 * 5);

export const mockGroceriesList = [
  {
    id: "5",
    name: "Hortifruti",
    markedItems: 4,
    totalItems: 7,
    createdAt: fiveDaysAgo,
    createdBy: {
      name: "Samuel Laurindo",
      avatarUrl: "https://github.com/cybermumuca.png",
      initials: "SL",
    },
  },
  {
    id: "4",
    name: "Favo de Mel",
    markedItems: 12,
    totalItems: 15,
    createdAt: fourDaysAgo,
    createdBy: {
      name: "Samuel Laurindo",
      avatarUrl: "https://github.com/cybermumuca.png",
      initials: "SL",
    },
  },
  {
    id: "3",
    name: "Rio Sul",
    markedItems: 1,
    totalItems: 5,
    createdAt: threeDaysAgo,
    createdBy: {
      name: "Samuel Laurindo",
      avatarUrl: "https://github.com/cybermumuca.png",
      initials: "SL",
    },
  },
  {
    id: "2",
    name: "Carrefour",
    markedItems: 1,
    totalItems: 3,
    createdAt: twoDaysAgo,
    createdBy: {
      name: "Samuel Laurindo",
      avatarUrl: "https://github.com/cybermumuca.png",
      initials: "SL",
    },
  },
  {
    id: "1",
    name: "Açaí Atacadista",
    markedItems: 2,
    totalItems: 4,
    createdAt: yesterday,
    createdBy: {
      name: "Samuel Laurindo",
      avatarUrl: "https://github.com/cybermumuca.png",
      initials: "SL",
    },
  },
];