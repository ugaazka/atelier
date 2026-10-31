const PRODUCTS = [
  {
    "id": 0,
    "name": "Utility Camp Shirt",
    "category": "Shaadhadh",
    "type": "shirt",
    "color": "#a99f88",
    "price": 38,
    "edition": "Everyday",
    "image": "assets/0.svg",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Utility Camp Shirt — dhar si taxaddar leh loo xushay. Naqshad nadiif ah, raaxo iyo muuqaal qurux badan. Ku habboon labiska maalinlaha ah iyo munaasabadaha."
  },
  {
    "id": 1,
    "name": "Midnight Tailored Coat",
    "category": "Koodhadh",
    "type": "coat",
    "color": "#282b2a",
    "price": 115,
    "edition": "Special",
    "image": "assets/1.svg",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Midnight Tailored Coat — dhar si taxaddar leh loo xushay. Naqshad nadiif ah, raaxo iyo muuqaal qurux badan. Ku habboon labiska maalinlaha ah iyo munaasabadaha."
  },
  {
    "id": 2,
    "name": "Stone Pleated Trousers",
    "category": "Surwaallo",
    "type": "pants",
    "color": "#a6a59b",
    "price": 48,
    "edition": "Everyday",
    "image": "assets/2.svg",
    "sizes": [
      "28",
      "30",
      "32",
      "34",
      "36"
    ],
    "description": "Stone Pleated Trousers — dhar si taxaddar leh loo xushay. Naqshad nadiif ah, raaxo iyo muuqaal qurux badan. Ku habboon labiska maalinlaha ah iyo munaasabadaha."
  },
  {
    "id": 3,
    "name": "Ivory Resort Shirt",
    "category": "Shaadhadh",
    "type": "shirt",
    "color": "#e7e3d6",
    "price": 42,
    "edition": "Everyday",
    "image": "assets/3.svg",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Ivory Resort Shirt — dhar si taxaddar leh loo xushay. Naqshad nadiif ah, raaxo iyo muuqaal qurux badan. Ku habboon labiska maalinlaha ah iyo munaasabadaha."
  },
  {
    "id": 4,
    "name": "Racing Knit Polo",
    "category": "Special",
    "type": "polo",
    "color": "#202c36",
    "price": 65,
    "edition": "Limited",
    "image": "assets/4.svg",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Racing Knit Polo — dhar si taxaddar leh loo xushay. Naqshad nadiif ah, raaxo iyo muuqaal qurux badan. Collection gaar ah oo tiro kooban ah."
  },
  {
    "id": 5,
    "name": "Sandstone Trench",
    "category": "Koodhadh",
    "type": "coat",
    "color": "#bba888",
    "price": 125,
    "edition": "Special",
    "image": "assets/5.svg",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Sandstone Trench — dhar si taxaddar leh loo xushay. Naqshad nadiif ah, raaxo iyo muuqaal qurux badan. Ku habboon labiska maalinlaha ah iyo munaasabadaha."
  },
  {
    "id": 6,
    "name": "Forest Signature Tee",
    "category": "Shaadhadh",
    "type": "tee",
    "color": "#3e5748",
    "price": 28,
    "edition": "Everyday",
    "image": "assets/6.svg",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Forest Signature Tee — dhar si taxaddar leh loo xushay. Naqshad nadiif ah, raaxo iyo muuqaal qurux badan. Ku habboon labiska maalinlaha ah iyo munaasabadaha."
  },
  {
    "id": 7,
    "name": "Black Wide Leg",
    "category": "Surwaallo",
    "type": "pants",
    "color": "#292929",
    "price": 52,
    "edition": "Everyday",
    "image": "assets/7.svg",
    "sizes": [
      "28",
      "30",
      "32",
      "34",
      "36"
    ],
    "description": "Black Wide Leg — dhar si taxaddar leh loo xushay. Naqshad nadiif ah, raaxo iyo muuqaal qurux badan. Ku habboon labiska maalinlaha ah iyo munaasabadaha."
  },
  {
    "id": 8,
    "name": "Burgundy Varsity",
    "category": "Special",
    "type": "jacket",
    "color": "#6b303b",
    "price": 89,
    "edition": "Limited",
    "image": "assets/8.svg",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Burgundy Varsity — dhar si taxaddar leh loo xushay. Naqshad nadiif ah, raaxo iyo muuqaal qurux badan. Collection gaar ah oo tiro kooban ah."
  },
  {
    "id": 9,
    "name": "Oxford Blue Shirt",
    "category": "Shaadhadh",
    "type": "shirt",
    "color": "#91acb9",
    "price": 45,
    "edition": "Everyday",
    "image": "assets/9.svg",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Oxford Blue Shirt — dhar si taxaddar leh loo xushay. Naqshad nadiif ah, raaxo iyo muuqaal qurux badan. Ku habboon labiska maalinlaha ah iyo munaasabadaha."
  },
  {
    "id": 10,
    "name": "Chocolate Overcoat",
    "category": "Koodhadh",
    "type": "coat",
    "color": "#58473c",
    "price": 110,
    "edition": "Special",
    "image": "assets/10.svg",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Chocolate Overcoat — dhar si taxaddar leh loo xushay. Naqshad nadiif ah, raaxo iyo muuqaal qurux badan. Ku habboon labiska maalinlaha ah iyo munaasabadaha."
  },
  {
    "id": 11,
    "name": "Cream Cable Knit",
    "category": "Special",
    "type": "knit",
    "color": "#ded6c3",
    "price": 68,
    "edition": "Limited",
    "image": "assets/11.svg",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Cream Cable Knit — dhar si taxaddar leh loo xushay. Naqshad nadiif ah, raaxo iyo muuqaal qurux badan. Collection gaar ah oo tiro kooban ah."
  },
  {
    "id": 12,
    "name": "Indigo Denim",
    "category": "Surwaallo",
    "type": "pants",
    "color": "#354c68",
    "price": 55,
    "edition": "Everyday",
    "image": "assets/12.svg",
    "sizes": [
      "28",
      "30",
      "32",
      "34",
      "36"
    ],
    "description": "Indigo Denim — dhar si taxaddar leh loo xushay. Naqshad nadiif ah, raaxo iyo muuqaal qurux badan. Ku habboon labiska maalinlaha ah iyo munaasabadaha."
  },
  {
    "id": 13,
    "name": "Terracotta Studio Tee",
    "category": "Shaadhadh",
    "type": "tee",
    "color": "#ac6b50",
    "price": 30,
    "edition": "Everyday",
    "image": "assets/13.svg",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Terracotta Studio Tee — dhar si taxaddar leh loo xushay. Naqshad nadiif ah, raaxo iyo muuqaal qurux badan. Ku habboon labiska maalinlaha ah iyo munaasabadaha."
  },
  {
    "id": 14,
    "name": "Olive Field Jacket",
    "category": "Koodhadh",
    "type": "jacket",
    "color": "#6b7054",
    "price": 85,
    "edition": "Special",
    "image": "assets/14.svg",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Olive Field Jacket — dhar si taxaddar leh loo xushay. Naqshad nadiif ah, raaxo iyo muuqaal qurux badan. Ku habboon labiska maalinlaha ah iyo munaasabadaha."
  },
  {
    "id": 15,
    "name": "Pearl Linen Trousers",
    "category": "Surwaallo",
    "type": "pants",
    "color": "#d7d0bb",
    "price": 49,
    "edition": "Everyday",
    "image": "assets/15.svg",
    "sizes": [
      "28",
      "30",
      "32",
      "34",
      "36"
    ],
    "description": "Pearl Linen Trousers — dhar si taxaddar leh loo xushay. Naqshad nadiif ah, raaxo iyo muuqaal qurux badan. Ku habboon labiska maalinlaha ah iyo munaasabadaha."
  },
  {
    "id": 16,
    "name": "Noir Evening Shirt",
    "category": "Special",
    "type": "shirt",
    "color": "#303332",
    "price": 59,
    "edition": "Limited",
    "image": "assets/16.svg",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Noir Evening Shirt — dhar si taxaddar leh loo xushay. Naqshad nadiif ah, raaxo iyo muuqaal qurux badan. Collection gaar ah oo tiro kooban ah."
  },
  {
    "id": 17,
    "name": "Sky Knit Polo",
    "category": "Shaadhadh",
    "type": "polo",
    "color": "#8caaa9",
    "price": 44,
    "edition": "Everyday",
    "image": "assets/17.svg",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Sky Knit Polo — dhar si taxaddar leh loo xushay. Naqshad nadiif ah, raaxo iyo muuqaal qurux badan. Ku habboon labiska maalinlaha ah iyo munaasabadaha."
  }
];