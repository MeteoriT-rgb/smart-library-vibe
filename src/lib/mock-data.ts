export type Book = {
  id: string;
  title: string;
  author: string;
  genre: string;
  cover: string;
  rating: number;
  copies: number;
  available: number;
  isbn: string;
  year: number;
  pages: number;
  description: string;
  featured?: boolean;
};

const covers = [
  "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&q=80",
  "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=600&q=80",
  "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80",
  "https://images.unsplash.com/photo-1589998059171-988d887df646?w=600&q=80",
  "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600&q=80",
  "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=600&q=80",
  "https://images.unsplash.com/photo-1531901599143-df5010ab9438?w=600&q=80",
  "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=600&q=80",
  "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=600&q=80",
  "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&q=80",
  "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=600&q=80",
  "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=600&q=80",
];

const titles = [
  ["The Silent Algorithm", "Maya Chen", "Science Fiction"],
  ["Echoes of Tomorrow", "Daniel Park", "Science Fiction"],
  ["A Brief History of Curiosity", "Dr. Eliza Hart", "Non-Fiction"],
  ["The Painter of Lisbon", "Tomás Ribeiro", "Historical Fiction"],
  ["Quantum Gardens", "Aiko Tanaka", "Science"],
  ["Letters from the Lighthouse", "Sarah Coleman", "Drama"],
  ["The Cartographer's Daughter", "James O'Connor", "Adventure"],
  ["Modern Calculus Made Simple", "Prof. R. Banerjee", "Mathematics"],
  ["World History: A Visual Journey", "Helena Müller", "History"],
  ["The Art of Mindful Coding", "Lucas Romero", "Technology"],
  ["Whispers Beneath the Pines", "Amelia Brooks", "Mystery"],
  ["Stars Beyond the Veil", "Rohan Mehta", "Fantasy"],
];

export const books: Book[] = titles.map(([title, author, genre], i) => ({
  id: `bk-${i + 1}`,
  title,
  author,
  genre,
  cover: covers[i % covers.length],
  rating: 3.6 + ((i * 7) % 14) / 10,
  copies: 4 + (i % 6),
  available: i % 5 === 0 ? 0 : 1 + (i % 4),
  isbn: `978-3-16-148${410 + i}-0`,
  year: 2014 + (i % 10),
  pages: 180 + i * 23,
  description:
    "An immersive journey that blends meticulous research with vivid storytelling. Readers are pulled through unforgettable characters, sweeping settings, and ideas that linger long after the final page.",
  featured: i < 4,
}));

export const announcements = [
  { id: 1, title: "New Arrivals This Week", body: "Over 120 new books just landed in the science and literature wings.", date: "May 10, 2026", tag: "News" },
  { id: 2, title: "Reading Marathon", body: "Join the annual reading marathon — prizes for top 10 students!", date: "May 8, 2026", tag: "Event" },
  { id: 3, title: "Extended Hours", body: "Library is now open until 9 PM during exam season.", date: "May 4, 2026", tag: "Notice" },
];

export const debtors = Array.from({ length: 8 }).map((_, i) => ({
  id: `st-${1000 + i}`,
  name: ["Aarav Sharma","Lily Tanaka","Marcus Reyes","Sofia Kowalski","Ethan Brown","Zara Ahmed","Noah Williams","Amelia Singh"][i],
  grade: `Grade ${9 + (i % 4)}`,
  book: books[i % books.length].title,
  due: `2026-04-${String(2 + i).padStart(2,"0")}`,
  daysLate: (i + 1) * 3,
  fine: (i + 1) * 1.5,
  avatar: `https://i.pravatar.cc/100?img=${i + 11}`,
}));

export const reservations = [
  { id: "rs-1", book: books[2].title, date: "2026-05-09", status: "Active", queue: 1, expected: "2026-05-15" },
  { id: "rs-2", book: books[5].title, date: "2026-05-07", status: "Ready", queue: 0, expected: "2026-05-12" },
  { id: "rs-3", book: books[7].title, date: "2026-04-29", status: "Completed", queue: 0, expected: "2026-05-04" },
  { id: "rs-4", book: books[10].title, date: "2026-04-22", status: "Cancelled", queue: 0, expected: "—" },
];

export const monthlyActivity = [
  { month: "Nov", borrowed: 220, returned: 198 },
  { month: "Dec", borrowed: 180, returned: 175 },
  { month: "Jan", borrowed: 260, returned: 244 },
  { month: "Feb", borrowed: 300, returned: 285 },
  { month: "Mar", borrowed: 340, returned: 322 },
  { month: "Apr", borrowed: 410, returned: 388 },
  { month: "May", borrowed: 470, returned: 401 },
];

export const popularGenres = [
  { genre: "Fiction", value: 38 },
  { genre: "Science", value: 22 },
  { genre: "History", value: 15 },
  { genre: "Tech", value: 13 },
  { genre: "Math", value: 12 },
];

export const recentActivity = [
  { who: "Aarav S.", action: "borrowed", what: "Quantum Gardens", when: "2m ago" },
  { who: "Sofia K.", action: "returned", what: "Echoes of Tomorrow", when: "18m ago" },
  { who: "Noah W.", action: "reserved", what: "Stars Beyond the Veil", when: "1h ago" },
  { who: "Lily T.", action: "borrowed", what: "Whispers Beneath the Pines", when: "2h ago" },
  { who: "Zara A.", action: "returned", what: "Modern Calculus Made Simple", when: "3h ago" },
];

export const librarians = [
  { name: "Mrs. Eleanor Hayes", role: "Head Librarian", avatar: "https://i.pravatar.cc/200?img=47", email: "ehayes@school.edu" },
  { name: "Mr. David Okafor", role: "Assistant Librarian", avatar: "https://i.pravatar.cc/200?img=12", email: "dokafor@school.edu" },
  { name: "Ms. Priya Iyer", role: "Digital Resources", avatar: "https://i.pravatar.cc/200?img=45", email: "piyer@school.edu" },
];

export const stats = {
  totalBooks: 12480,
  totalStudents: 1842,
  borrowed: 326,
  available: 12154,
};
