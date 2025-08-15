const yesterday = new Date(Date.now() - 1000 * 60 * 60 * 24);
const twoDaysAgo = new Date(Date.now() - 1000 * 60 * 60 * 24 * 2);
const threeDaysAgo = new Date(Date.now() - 1000 * 60 * 60 * 24 * 3);
const fourDaysAgo = new Date(Date.now() - 1000 * 60 * 60 * 24 * 4);
const fiveDaysAgo = new Date(Date.now() - 1000 * 60 * 60 * 24 * 5);

// Colaboradores mockados
const mockCollaborators = [
  { id: '1', name: 'Samuel Laurindo', avatar: 'https://github.com/cybermumuca.png', initials: 'SL', isOnline: true },
  { id: '2', name: 'Maria Santos', avatar: 'https://github.com/gaearon.png', initials: 'MS', isOnline: true },
  { id: '3', name: 'Pedro Costa', avatar: 'https://github.com/tj.png', initials: 'PC', isOnline: false },
  { id: '4', name: 'Ana Oliveira', avatar: 'https://github.com/addyosmani.png', initials: 'AO', isOnline: true },
];

export interface GroceryItem {
  id: string;
  name: string;
  quantity?: number;
  price?: number;
  isChecked: boolean;
  category?: string;
}

export interface Collaborator {
  id: string;
  name: string;
  avatar: string;
  initials: string;
  isOnline: boolean;
}

export interface GroceryList {
  id: string;
  name: string;
  markedItems: number;
  totalItems: number;
  createdAt: Date;
  createdBy: {
    name: string;
    avatarUrl: string;
    initials: string;
  };
  collaborators: Collaborator[];
  items: GroceryItem[];
}

export const mockGroceriesList: GroceryList[] = [
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
    collaborators: mockCollaborators,
    items: [
      { id: "5-1", name: "Maçã", quantity: 6, price: 8.50, isChecked: false, category: "Frutas" },
      { id: "5-2", name: "Banana", quantity: 1, price: 4.20, isChecked: true, category: "Frutas" },
      { id: "5-3", name: "Alface", price: 3.00, isChecked: false, category: "Verduras" },
      { id: "5-4", name: "Tomate", quantity: 2, price: 6.80, isChecked: true, category: "Verduras" },
      { id: "5-5", name: "Cenoura", quantity: 1, price: 2.50, isChecked: true, category: "Verduras" },
      { id: "5-6", name: "Batata", quantity: 2, price: 5.40, isChecked: true, category: "Verduras" },
      { id: "5-7", name: "Cebola", quantity: 1, price: 3.20, isChecked: false, category: "Verduras" },
    ],
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
    collaborators: [mockCollaborators[0], mockCollaborators[1], mockCollaborators[3]], // Samuel, Maria, Ana
    items: [
      { id: "4-1", name: "Pão de açúcar", quantity: 2, price: 8.90, isChecked: true, category: "Padaria" },
      { id: "4-2", name: "Leite integral", quantity: 3, price: 15.60, isChecked: true, category: "Laticínios" },
      { id: "4-3", name: "Ovos", quantity: 1, price: 12.50, isChecked: false, category: "Proteínas" },
      { id: "4-4", name: "Queijo mussarela", quantity: 1, price: 18.90, isChecked: true, category: "Laticínios" },
      { id: "4-5", name: "Presunto", quantity: 1, price: 16.40, isChecked: true, category: "Frios" },
    ],
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
    collaborators: [mockCollaborators[1], mockCollaborators[2]], // Maria, Pedro
    items: [
      { id: "3-1", name: "Arroz", quantity: 2, price: 12.80, isChecked: false, category: "Grãos" },
      { id: "3-2", name: "Feijão", quantity: 2, price: 8.90, isChecked: false, category: "Grãos" },
      { id: "3-3", name: "Açúcar", quantity: 1, price: 4.50, isChecked: false, category: "Condimentos" },
      { id: "3-4", name: "Sal", quantity: 1, price: 2.20, isChecked: false, category: "Condimentos" },
      { id: "3-5", name: "Óleo de soja", quantity: 1, price: 6.90, isChecked: true, category: "Condimentos" },
    ],
  },
  {
    id: "2",
    name: "Carrefour",
    markedItems: 1,
    totalItems: 4,
    createdAt: twoDaysAgo,
    createdBy: {
      name: "Samuel Laurindo",
      avatarUrl: "https://github.com/cybermumuca.png",
      initials: "SL",
    },
    collaborators: [mockCollaborators[0], mockCollaborators[3]], // Samuel, Ana
    items: [
      { id: "2-1", name: "Macarrão", price: 0, isChecked: false, category: "Massas" },
      { id: "2-2", name: "leite testando", price: 0, isChecked: false, category: "Laticínios" },
      { id: "2-3", name: "nuggets de frango", quantity: 2, price: 12, isChecked: false, category: "Congelados" },
      { id: "2-4", name: "detergente", price: 0, isChecked: true, category: "Limpeza" },
    ],
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
    collaborators: [mockCollaborators[1]], // Apenas Maria
    items: [
      { id: "1-1", name: "Açaí", quantity: 2, price: 18.90, isChecked: false, category: "Congelados" },
      { id: "1-2", name: "Granola", quantity: 1, price: 12.50, isChecked: true, category: "Cereais" },
      { id: "1-3", name: "Banana", quantity: 6, price: 8.40, isChecked: true, category: "Frutas" },
      { id: "1-4", name: "Mel", quantity: 1, price: 15.80, isChecked: false, category: "Condimentos" },
    ],
  },
];