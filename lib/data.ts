export type Product = {
  id: string;
  name: string;
  type: string;
  price: number;
  discountPrice?: number;
  image: string;
  images: string[];
  tag?: string;
  colors: string[];
  sizes: string[];
  description: string;
  materialJersey?: string;
  materialCelana?: string;
  isCustom?: boolean;
  minOrder?: number;
  wholesalePrice?: number;
  suitableFor?: string[];
};

export const products: Product[] = [
  {
    id: 'dont-quit-set',
    name: 'Set Jersey Sport + Celana "Dont Quit"',
    type: 'Sportswear Set',
    price: 245000,
    discountPrice: 199000,
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=900&q=85',
    images: [
      'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=900&q=85'
    ],
    tag: 'KATALOG UTAMA',
    colors: ['#151515', '#df2028', '#f5f4f0'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    description: 'Setelan olahraga premium dirancang khusus untuk kenyamanan maksimal dalam segala aktivitas sport. Pola eksklusif zig-zag pada kain memberikan sirkulasi udara optimal.',
    materialJersey: 'Jersey Dryfit Milano (Pola eksklusif zig-zag, halus, lembut, ringan, adem, menyerap keringat, cepat kering)',
    materialCelana: 'Scuba (Ringan, adem, lembut, celana panjang untuk menutup aurat namun tetap bebas bergerak)',
    suitableFor: ['Running', 'Bersepeda', 'Badminton', 'Voli', 'Futsal']
  },
  {
    id: 'victory-premium-set',
    name: 'Set Pendek (CPX Victory Premium Edition)',
    type: 'Football Set',
    price: 250000,
    discountPrice: 195000,
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=900&q=85',
    images: [
      'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=900&q=85'
    ],
    tag: 'BEST SELLER',
    colors: ['#e3262e', '#151515', '#f4f1e8'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    description: 'Setelan jersey sepak bola lengan pendek edisi Victory Premium. Bahan Dryfit Milano zig-zag, adem, jahitan kuat dan rapi, warna tajam full printing.',
    materialJersey: 'Jersey Dryfit Milano',
    suitableFor: ['Football', 'Futsal']
  },
  {
    id: 'victory-longsleeve-set',
    name: 'Set Long Sleeve (Longsleeve Victory Premium Quality)',
    type: 'Sportswear Set',
    price: 265000,
    discountPrice: 206700,
    image: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=900&q=85',
    images: [
      'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?auto=format&fit=crop&w=2200&q=90',
      'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=900&q=85'
    ],
    tag: 'PREMIUM QUALITY',
    colors: ['#151515', '#df2028', '#888'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    description: 'Setelan olahraga lengan panjang Victory Series. Sangat cocok untuk cuaca dingin maupun perlindungan ekstra dari sinar matahari langsung.',
    materialJersey: 'Jersey Dryfit Milano',
    suitableFor: ['Running', 'Bersepeda', 'Futsal', 'Voli']
  },
  {
    id: 'jersey-sepeda-roadbike',
    name: 'Jersey Sepeda Roadbike CPX Pro Full Zip',
    type: 'Cycling Jersey',
    price: 135000,
    discountPrice: 119000,
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=85',
    images: [
      'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=900&q=85'
    ],
    tag: 'POPULER',
    colors: ['#df2028', '#111', '#ffea00'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    description: 'Jersey sepeda balap (roadbike) premium dengan resleting depan penuh, saku belakang 3 slot yang praktis, dan bahan breathable Dryfit Milano.',
    materialJersey: 'Jersey Dryfit Milano',
    suitableFor: ['Cycling']
  },
  {
    id: 'celana-sepeda-padding',
    name: 'Celana Sepeda Ketat Padding Gel 3D CPX',
    type: 'Cycling Pants',
    price: 165000,
    discountPrice: 139000,
    image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=85',
    images: [
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=900&q=85'
    ],
    tag: 'BEST SELLER',
    colors: ['#111'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    description: 'Celana ketat bersepeda dengan padding (bantalan) gel 3D pad yang empuk dan ergonomis, meminimalkan lelah saat gowes jarak jauh.',
    materialCelana: 'Polyester Spandex elastis dengan 3D Gel Padding',
    suitableFor: ['Cycling']
  },
  {
    id: 'cpx-cycling-cap',
    name: 'Topi Sepeda CPX Cycling Cap Classic',
    type: 'Cycling Accessories',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&w=900&q=85',
    images: [
      'https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&w=900&q=85'
    ],
    tag: 'AKSESORIS',
    colors: ['#df2028', '#111', '#fff'],
    sizes: ['All Size'],
    description: 'Topi gowes klasik penahan keringat agar tidak masuk ke mata, sangat pas dipakai di bawah helm sepeda.',
    materialJersey: 'Dryfit Breathable Mesh',
    suitableFor: ['Cycling']
  },
  {
    id: 'cpx-arm-sleeves',
    name: 'Manset Lengan Sepeda CPX Arm Sleeve Pro',
    type: 'Cycling Accessories',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=900&q=85',
    images: [
      'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=900&q=85'
    ],
    tag: 'HOT DEALS',
    colors: ['#111', '#fff'],
    sizes: ['M', 'L', 'XL'],
    description: 'Manset lengan elastis pelindung sinar UV untuk olahraga outdoor. Bahan spandeks kualitas ekspor dingin dan melar maksimal.',
    suitableFor: ['Cycling', 'Running']
  },
  {
    id: 'cpx-futsal-team',
    name: 'Jersey Futsal CPX Sport Team Edition',
    type: 'Futsal Jersey',
    price: 120000,
    discountPrice: 99000,
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=900&q=85',
    images: [
      'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=900&q=85'
    ],
    tag: 'NEW DROP',
    colors: ['#df2028', '#111'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    description: 'Jersey futsal printing premium dari CPX Sport. Bahan Dryfit Milano dingin dan menyerap keringat, jahitan ganda kuat.',
    materialJersey: 'Jersey Dryfit Milano',
    suitableFor: ['Futsal', 'Football']
  },
  {
    id: 'cpx-roadbike-set',
    name: 'Setelan Jersey Sepeda Roadbike CPX Premium (Baju + Celana Bib)',
    type: 'Cycling Set',
    price: 280000,
    discountPrice: 229000,
    image: 'https://images.unsplash.com/photo-1553008106-a9604eb76f5e?auto=format&fit=crop&w=900&q=85',
    images: [
      'https://images.unsplash.com/photo-1553008106-a9604eb76f5e?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=85'
    ],
    tag: 'PAKET HEMAT',
    colors: ['#df2028', '#111'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    description: 'Setelan lengkap baju jersey sepeda roadbike full resleting depan dan celana bib shorts pad gel. Desain aerodinamis modern.',
    materialJersey: 'Jersey Dryfit Milano',
    materialCelana: 'Bib shorts padding gel',
    suitableFor: ['Cycling']
  },
  {
    id: 'jersey-mtb-trailblazer',
    name: 'Jersey Sepeda MTB CPX Trailblazer',
    type: 'Cycling Jersey',
    price: 130000,
    discountPrice: 110000,
    image: 'https://images.unsplash.com/photo-1544192240-4a34feb0104a?auto=format&fit=crop&w=900&q=85',
    images: [
      'https://images.unsplash.com/photo-1544192240-4a34feb0104a?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=900&q=85'
    ],
    tag: 'MTB SERIES',
    colors: ['#ffea00', '#111'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    description: 'Jersey sepeda gunung (MTB) longgar (loose fit) untuk kebebasan bergerak melintasi medan trail berlumpur.',
    materialJersey: 'Dryfit Mesh Premium',
    suitableFor: ['Cycling']
  },
  {
    id: 'jersey-xc',
    name: 'Jersey Custom XC (Zipper & Saku Belakang)',
    type: 'Cycling Jersey',
    price: 135000,
    wholesalePrice: 125000,
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=85',
    images: [
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=900&q=85'
    ],
    tag: 'CUSTOM CYCLING',
    colors: ['#df2028', '#111'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    description: 'Jersey sepeda Cross Country (XC) custom. Dilengkapi resleting (zipper) depan dan saku belakang yang fungsional untuk menyimpan barang.',
    materialJersey: 'Jersey Dryfit Milano',
    isCustom: true,
    minOrder: 6,
    suitableFor: ['Cycling']
  },
  {
    id: 'jersey-dh',
    name: 'Jersey Custom DH (Tanpa Zipper & Saku)',
    type: 'Cycling Jersey',
    price: 125000,
    wholesalePrice: 115000,
    image: 'https://images.unsplash.com/photo-1544192240-4a34feb0104a?auto=format&fit=crop&w=900&q=85',
    images: [
      'https://images.unsplash.com/photo-1544192240-4a34feb0104a?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=900&q=85'
    ],
    tag: 'CUSTOM DH',
    colors: ['#111', '#888'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    description: 'Jersey Downhill (DH) custom dengan potongan longgar dan tanpa saku, nyaman dipakai dengan pelindung badan (body armor).',
    materialJersey: 'Jersey Dryfit Milano',
    isCustom: true,
    minOrder: 6,
    suitableFor: ['Cycling']
  },
  {
    id: 'jersey-sport-short',
    name: 'Jersey Sport Custom Lengan Pendek',
    type: 'Sportswear Jersey',
    price: 105000,
    wholesalePrice: 95000,
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1000&q=85',
    images: [
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=900&q=85'
    ],
    tag: 'BEST PRICE',
    colors: ['#df2028', '#111', '#f5f4f0'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    description: 'Jersey olahraga custom lengan pendek. Sangat cocok untuk tim badminton, futsal, voli, running, dan komunitas olahraga lainnya.',
    materialJersey: 'Jersey Dryfit Milano',
    isCustom: true,
    minOrder: 6,
    suitableFor: ['Futsal', 'Badminton', 'Voli', 'Running', 'Football']
  },
  {
    id: 'jersey-sport-long',
    name: 'Jersey Sport Custom Lengan Panjang',
    type: 'Sportswear Jersey',
    price: 125000,
    wholesalePrice: 115000,
    image: 'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?auto=format&fit=crop&w=2200&q=90',
    images: [
      'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?auto=format&fit=crop&w=2200&q=90',
      'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=900&q=85'
    ],
    tag: 'BEST QUALITY',
    colors: ['#e3262e', '#111', '#aaa'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    description: 'Jersey olahraga custom lengan panjang. Perlindungan maksimal dan kenyamanan tinggi menggunakan Dryfit Milano zig-zag.',
    materialJersey: 'Jersey Dryfit Milano',
    isCustom: true,
    minOrder: 6,
    suitableFor: ['Futsal', 'Badminton', 'Voli', 'Running', 'Football']
  },
  {
    id: 'jersey-basketball-cpx',
    name: 'Jersey Basket CPX Streetball Edition',
    type: 'Basketball Jersey',
    price: 135000,
    discountPrice: 115000,
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1000&q=85',
    images: [
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=900&q=85'
    ],
    tag: 'NEW DROP',
    colors: ['#ff6600', '#111', '#fff'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    description: 'Jersey basket dengan potongan sleeveless yang bebas bergerak. Bahan Dryfit Milano ringan dan menyerap keringat, cocok untuk streetball maupun pertandingan resmi.',
    materialJersey: 'Jersey Dryfit Milano',
    isCustom: true,
    minOrder: 6,
    suitableFor: ['Basketball']
  },
  {
    id: 'jersey-badminton-cpx',
    name: 'Jersey Badminton CPX Smash Pro',
    type: 'Badminton Jersey',
    price: 110000,
    discountPrice: 95000,
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=85',
    images: [
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=900&q=85'
    ],
    tag: 'BEST SELLER',
    colors: ['#0066cc', '#fff', '#111'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Jersey badminton premium dengan potongan slim-fit yang aerodinamis. Bahan ultra-ringan dan breathable, mendukung pergerakan cepat di lapangan.',
    materialJersey: 'Jersey Dryfit Milano',
    isCustom: true,
    minOrder: 6,
    suitableFor: ['Badminton']
  },
  {
    id: 'jersey-esport-cpx',
    name: 'Jersey E-Sport CPX Gamer Edition',
    type: 'E-Sport Jersey',
    price: 120000,
    image: 'https://images.unsplash.com/photo-1544192240-4a34feb0104a?auto=format&fit=crop&w=900&q=85',
    images: [
      'https://images.unsplash.com/photo-1544192240-4a34feb0104a?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=900&q=85'
    ],
    tag: 'GAMING',
    colors: ['#7b2ff7', '#00f0ff', '#111'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    description: 'Jersey e-sport dengan desain futuristik dan warna neon yang mencolok. Bahan adem dan nyaman dipakai sesi gaming panjang.',
    materialJersey: 'Cotton Combed 30s',
    isCustom: true,
    minOrder: 6,
    suitableFor: ['E-Sport']
  },
  {
    id: 'jersey-running-cpx',
    name: 'Jersey Running CPX Marathon Elite',
    type: 'Running Jersey',
    price: 115000,
    discountPrice: 99000,
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=85',
    images: [
      'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=900&q=85'
    ],
    tag: 'RUNNING',
    colors: ['#00cc66', '#111', '#fff'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Jersey running ultra-ringan dengan ventilasi mesh di area ketiak dan punggung. Dirancang untuk marathon dan lari jarak jauh.',
    materialJersey: 'Dryfit Mesh Ultra-Light',
    isCustom: true,
    minOrder: 6,
    suitableFor: ['Running']
  },
  {
    id: 'set-voli-cpx',
    name: 'Set Jersey Voli CPX Smash Edition',
    type: 'Volleyball Set',
    price: 230000,
    discountPrice: 189000,
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=900&q=85',
    images: [
      'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=900&q=85'
    ],
    tag: 'TEAM SET',
    colors: ['#ff3366', '#111', '#fff'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Set jersey voli lengkap (atasan + celana). Desain dinamis dengan warna kontras, bahan elastis untuk lompatan dan dive maksimal.',
    materialJersey: 'Jersey Dryfit Milano',
    materialCelana: 'Scuba Premium Elastis',
    isCustom: true,
    minOrder: 6,
    suitableFor: ['Voli']
  },
  {
    id: 'jaket-cpx-windbreaker',
    name: 'Jaket Windbreaker CPX Outdoor Pro',
    type: 'Outerwear',
    price: 185000,
    discountPrice: 159000,
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=900&q=85',
    images: [
      'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=900&q=85'
    ],
    tag: 'OUTDOOR',
    colors: ['#111', '#2d5a27', '#888'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    description: 'Jaket windbreaker tahan angin dan ringan. Cocok untuk olahraga outdoor, sepeda, dan hiking. Dilengkapi hoodie dan saku zipper.',
    materialJersey: 'Polyester Water-Resistant',
    suitableFor: ['Cycling', 'Running', 'Outdoor']
  },
  {
    id: 'jersey-futsal-goalkeeper',
    name: 'Jersey Futsal Kiper CPX Guardian',
    type: 'Futsal Jersey',
    price: 130000,
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=900&q=85',
    images: [
      'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=900&q=85'
    ],
    tag: 'KIPER',
    colors: ['#ffcc00', '#00cc66', '#ff3300'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    description: 'Jersey kiper futsal dengan padding busa di siku dan dada. Warna mencolok agar mudah terlihat di lapangan. Bahan tebal namun tetap fleksibel.',
    materialJersey: 'Padded Polyester Mesh',
    isCustom: true,
    minOrder: 6,
    suitableFor: ['Futsal']
  }
];

export const faqs = [
  {
    q: 'Apakah saya bisa pesan jersey custom sesuai desain sendiri?',
    a: 'Bisa banget. Untuk pemesanan produk custom, silakan langsung hubungi WA Admin kami di 085172003667.'
  },
  {
    q: 'Apa saja bahan yang tersedia untuk jersey?',
    a: 'Kami menggunakan bahan berkualitas tinggi Drifit Milano dengan pola eksklusif zig-zag yang halus, lembut, adem, dan sangat nyaman untuk olahraga.'
  },
  {
    q: 'Berapa lama proses pembuatan jersey custom?',
    a: 'Estimasi pengerjaan berkisar antara 7–14 hari kerja (rata-rata 10 hari kerja), tergantung pada jumlah antrean dan volume order Anda.'
  },
  {
    q: 'Apakah bisa mencetak nama dan nomor di jersey?',
    a: 'Ya, untuk pemesanan produk custom sudah all-in termasuk pencetakan nickname, nomor punggung, logo tim, dan desain bebas.'
  },
  {
    q: 'Apakah ada minimum order untuk jersey custom?',
    a: 'Minimal order untuk harga normal custom adalah 6 pcs. Pemesanan satuan (1 pcs) tetap dilayani dengan tambahan biaya desain Rp 10.000.'
  },
  {
    q: 'Apakah bisa retur atau ganti jersey jika ukurannya salah?',
    a: 'Jika Anda membeli produk ready stock, retur ukuran diperbolehkan. Namun, untuk produk custom, kami tidak menerima penukaran ukuran karena dibuat khusus sesuai pesanan.'
  },
  {
    q: 'Apakah ada diskon untuk pembelian dalam jumlah besar?',
    a: 'Tentu saja. Kami menyediakan skema Harga Grosir atau Harga Partai untuk pesanan dalam jumlah banyak (mulai dari minimal 12 pcs).'
  }
];

export const testimonials = [
  {
    id: 't-1',
    name: 'Budi Santoso',
    team: 'Cileungsi Football Club',
    text: 'Jersey pesanan tim kami sangat nyaman dipakai. Bahan Milano-nya beneran menyerap keringat dengan baik, dan desainnya persis dengan mockup!',
    rating: 5
  },
  {
    id: 't-2',
    name: 'Rian Hidayat',
    team: 'Bogor Cycling Community',
    text: 'Pesan jersey XC custom di sini layanannya ramah banget. Dikasi saran desain gratis, proses pengerjaan 10 hari selesai tepat waktu.',
    rating: 5
  },
  {
    id: 't-3',
    name: 'Dewi Lestari',
    team: 'Voli Putri Harmoni',
    text: 'Desainnya modis dan celananya panjang (scuba) nyaman menutup aurat tapi tetap luwes buat lompat-lompat pas tanding voli. Best banget CPX!',
    rating: 5
  },
  {
    id: 't-4',
    name: 'Ahmad Fauzi',
    team: 'Bandung Basket Club',
    text: 'Jersey basket yang kami pesan kualitasnya top. Potongannya pas, bahan adem, dan printing-nya tajam. Sudah 2x repeat order di sini!',
    rating: 5
  },
  {
    id: 't-5',
    name: 'Siti Nurhaliza',
    team: 'Garuda Badminton Club',
    text: 'Awalnya ragu order online, tapi ternyata kualitasnya melebihi ekspektasi. Jersey badminton-nya ringan banget, cocok buat pertandingan.',
    rating: 4
  },
  {
    id: 't-6',
    name: 'Dimas Prayoga',
    team: 'E-Sport Nusantara',
    text: 'Jersey e-sport buat tim gaming kami keren abis! Desainnya futuristik, bahannya adem buat sesi latihan berjam-jam. Recommended seller!',
    rating: 5
  },
  {
    id: 't-7',
    name: 'Rina Wati',
    team: 'Jakarta Running Community',
    text: 'Order 20 pcs jersey running untuk event marathon. Semua peserta puas, bahannya ringan dan cepat kering. Next event pasti order lagi!',
    rating: 5
  },
  {
    id: 't-8',
    name: 'Hendra Kusuma',
    team: 'Futsal Liga Surabaya',
    text: 'Jersey kiper-nya ada padding di siku dan dada, jadi aman buat diving. Harga juga masuk akal untuk kualitas segini. Top CPX!',
    rating: 4
  }
];

export const sports = ['All', 'Football', 'Futsal', 'Basketball', 'Running', 'Cycling', 'Badminton', 'Voli'] as const;
export type Sport = (typeof sports)[number];

export function formatPrice(amount: number): string {
  return `IDR ${amount.toLocaleString('id-ID')}`;
}