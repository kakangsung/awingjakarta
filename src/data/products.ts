export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  sizes: number[];
  heights: number[];
  rating: number;
  reviews: number;
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Songkok Awing AC Hitam",
    price: 132500,
    description: "Bahan Beludru Premium (Tanpa Kertas): Berbeda dengan peci biasa, Awing AC dibuat dari beludru berkualitas tanpa menggunakan lapisan kertas keras di dalamnya. Hasilnya? Songkok lebih lentur, empuk, mengikuti bentuk kepala, dan pastinya tidak sakit saat dipakai.",
    category: "Polos",
    image: "/images/songkok-ac-hitam.jpg",
    sizes: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    heights: [8, 9, 10, 11, 12],
    rating: 4.8,
    reviews: 124,
    inStock: true,
  },
  {
    id: 2,
    name: "Songkok Awing Border Gold",
    price: 155000,
    description: "Songkok premium dengan bordir emas yang elegan. Dibuat dari bahan beludru berkualitas tinggi dengan finishing rapi. Cocok untuk acara formal dan keagamaan.",
    category: "Border",
    image: "/images/songkok-border-gold.jpg",
    sizes: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    heights: [8, 9, 10, 11, 12],
    rating: 4.9,
    reviews: 89,
    inStock: true,
  },
  {
    id: 3,
    name: "Songkok Awing Laser Navy",
    price: 165000,
    description: "Teknologi laser cutting untuk presisi sempurna. Desain modern dengan potongan yang sangat rapi dan presisi. Bahan premium yang nyaman dipakai seharian.",
    category: "Laser",
    image: "/images/songkok-laser-navy.jpg",
    sizes: [4, 5, 6, 7, 8, 9, 10, 11],
    heights: [8, 9, 10, 11, 12],
    rating: 4.7,
    reviews: 67,
    inStock: true,
  },
  {
    id: 4,
    name: "Songkok Awing Susun Classic",
    price: 145000,
    description: "Desain susun klasik yang timeless. Perpaduan tradisional dan modern dalam satu songkok. Bahan beludru premium dengan jahitan tangan yang teliti.",
    category: "Susun",
    image: "/images/songkok-susun-classic.jpg",
    sizes: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    heights: [8, 9, 10, 11, 12],
    rating: 4.6,
    reviews: 53,
    inStock: true,
  },
  {
    id: 5,
    name: "Songkok Awing AC Putih",
    price: 132500,
    description: "Varian putih dari seri AC yang legendaris. Bahan beludru premium tanpa kertas, lentur dan empuk. Sempurna untuk acara keagamaan dan formal.",
    category: "Polos",
    image: "/images/songkok-ac-putih.jpg",
    sizes: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    heights: [8, 9, 10, 11, 12],
    rating: 4.8,
    reviews: 98,
    inStock: true,
  },
  {
    id: 6,
    name: "Songkok Awing Border Silver",
    price: 155000,
    description: "Bordir silver premium yang memberikan kesan mewah dan elegan. Bahan beludru halus dengan finishing anti-kusut. Pilihan tepat untuk tampilan berkelas.",
    category: "Border",
    image: "/images/songkok-border-silver.jpg",
    sizes: [4, 5, 6, 7, 8, 9, 10, 11],
    heights: [9, 10, 11, 12],
    rating: 4.7,
    reviews: 72,
    inStock: true,
  },
  {
    id: 7,
    name: "Songkok Awing Laser Black",
    price: 175000,
    description: "Edisi premium dengan teknologi laser cutting terkini. Potongan ultra presisi dengan desain minimalis modern. Material terbaik untuk kenyamanan maksimal.",
    category: "Laser",
    image: "/images/songkok-laser-black.jpg",
    sizes: [5, 6, 7, 8, 9, 10, 11, 12],
    heights: [8, 9, 10, 11, 12],
    rating: 4.9,
    reviews: 45,
    inStock: true,
  },
  {
    id: 8,
    name: "Songkok Awing Susun Modern",
    price: 150000,
    description: "Desain susun dengan sentuhan modern. Perpaduan motif tradisional dan gaya kontemporer. Nyaman dipakai untuk berbagai kesempatan.",
    category: "Susun",
    image: "/images/songkok-susun-modern.jpg",
    sizes: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    heights: [8, 9, 10, 11, 12],
    rating: 4.5,
    reviews: 38,
    inStock: true,
  },
];

export const categories = ["Semua", "Polos", "Border", "Laser", "Susun"];
