# ATELIER — Interactive Closet

Website dhar ah oo ku salaysan fikradda muuqaalka aad soo dirtay: dhar ku laalaada bir, wareejin, product detail iyo shopping bag.

## Sida ugu fudud ee loo furo

1. ZIP-ka fur (Extract / Unzip).
2. Fur folder-ka `atelier`.
3. Laba jeer guji `index.html` — Chrome, Safari, Edge ama Firefox.

Internet iyo npm install midna looma baahna. Sawirrada, styles iyo JavaScript oo dhan waxay ku jiraan ZIP-ka. Browser-ku waa inuu taageeraa HTML dialog iyo CSS transforms (browsers casri ah).

### Local server (ikhtiyaari)

Haddii aad haysato Node.js 18 ama ka cusub:

```sh
npm start
```

Kadib fur http://localhost:3000. Wax dependency ah lama rakibayo. Railway wuxuu isticmaali karaa `npm start`; `PORT` waa la taageeraa. Static hosting waxaad u gelin kartaa dhammaan faylasha website-ka sida ay yihiin.

## Waxa shaqaynaya

- Showroom leh perspektif, hangers, bir iyo hooska dharka.
- Jiid bidix/midig, trackpad horizontal, fallaaro ama keyboard ← →.
- 18 alaab: shaadhadh, surwaallo, koodhadh iyo collection gaar ah.
- Shaandhayn collection, raadinta magac/nooc, grid iyo kala saaridda qiimaha.
- Faahfaahinta dharka, size guide, size selection iyo tiro 1–20.
- Shopping bag: kordhin/yareyn tirada, ka saarid, total sax ah.
- Bag iyo dalabyo ku sii jira browser-ka marka bogga la cusboonaysiiyo.
- Foom dalab tijaabo ah oo leh validation.
- Dalab tijaabo ah oo JSON ahaan loo soo dejisan karo.
- Somali interface, responsive layout, keyboard focus, reduced-motion support.

## Xadka noocan

Tani waa frontend si buuxda loo isticmaali karo, leh checkout tijaabo ah. Lacag-bixin, database, admin login, stock server, fariimo iyo dalab loo diro ganacsi dhab ah kuma xidhna. Checkout-ku si cad ayuu taas u sheegaa; ma abuuro dalab ganacsi oo dhab ah. Xogtu waxay ku jirtaa browser-ka keliya: qalab kale lagama arki karo; marka browser data la tirtiro way lumaysaa. File:// kaydintiisu waxay ku xidhnaan kartaa browser-ka; isticmaal local server si kaydintu joogto u noqoto.

18-ka sawir ee dharka waa SVG illustrations aan si gaar ah ugu samaynay website-kan, sawirro alaab ganacsi oo dhab ah ma aha. Dharku waa 2.5D CSS showroom; ma aha 3D WebGL model. Muuqaalka iyo habka interaction-ka ayaa laga tixraacay video-ga, mana aha clone pixel kasta ah.

Qiimaha, magacyada iyo stock-gu waa xog demo ah. Size guide waa tusaale guud oo aan la xaqiijin alaab dhab ah. Ha u isticmaalin xog macmiil oo xasaasi ah adigoon samayn backend iyo ilaalinta xogta.

## Beddel alaabta

Fur `products.js`. Alaab kastaa waxay leedahay:

- `id`: index-ga alaabta (0, 1, 2... si isku xiga).
- `name`, `category`, `price` (USD), `description`.
- `sizes`: size-yada la dooran karo.
- `image`: path sawirka, tusaale `assets/my-shirt.webp`.
- `edition`: Everyday, Special ama Limited.

Sawir dhab ah oo PNG/WebP transparent ah geli `assets/`, kadib `image` beddel. Background transparent ah iyo cabbir 360 × 470 ama u dhow ayaa showroom-ka ugu habboon. Image-ku ha muujiyo dharka iyo hanger-ka si loo ilaaliyo qaabka birta. Haddii aad beddesho IDs ama sizes, browser storage-kii demo-ga hore nadiifi.

Categories-ka interface-ka: `Shaadhadh`, `Surwaallo`, `Koodhadh`, `Special`. Ku dar category cusub adigoo sidoo kale badalaya nav-ga `index.html`.

## Beddel branding iyo design

- Magaca, qoraalka sign-ka: `index.html`.
- Midabada, rail, cards, responsive layout: `style.css`.
- Cart, search, checkout iyo rendering: `app.js`.
- Assets-ku wax external CDN ah kuma tiirsana.

## Tijaabooyinka la sameeyey

JavaScript syntax checks waxay mareen `app.js`, `products.js` iyo `server.js`.
Browser desktop: showroom render, collection Koodhadh, required size validation, size M, add to bag, quantity 1→2 iyo total $38→$76, iyo checkout tijaabo ah oo soo saaray receipt sax ah ayaa la xaqiijiyey. Browser refresh ka dib orders waa la eegay. Mobile waxaa loo sameeyey responsive CSS, laakiin qalab telefoon dhab ah laguma tijaabin.

## Faylasha

`index.html` · `style.css` · `app.js` · `products.js` · `assets/` · `server.js` · `package.json` · `README.md`

## Production mustaqbalka

Si loo noqdo dukaan dhab ah: ku dar server/database, server-side price/stock validation, maamulka alaabta, dalabyo ganacsi iyo payment provider. Ha ku kaydin API keys frontend-ka. Server-ka ku xaqiiji qiimaha, size, stock iyo lacag-bixinta ka hor aqbalidda dalab dhab ah.
