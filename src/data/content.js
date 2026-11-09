export const nav = [
  { id: 'menu', label: 'Menu' },
  { id: 'ritual', label: 'Experience' },
  { id: 'our-story', label: 'Our Story' },
  { id: 'why-us', label: 'Why Us' },
  { id: 'visit', label: 'Visit' },
]

export const stages = [
  {
    scene: 'beans', chapter: 'Chapter 01 of 04', tab: 'The Beans',
    title: 'It all starts with the beans.',
    desc: 'Great coffee begins with great ingredients. Single-origin heirloom beans, roasted in small vintage drum roasters to reveal notes of dark stone fruit, cocoa nib and warm hazelnut butter.',
    chip: 'Single-Origin Arabica', temp: 'Roaster Temp: 204°C',
    metrics: [['Aroma Depth', '94%', 94], ['Crema Viscosity', 'Silky', 88], ['Balance Index', 'Balanced', 96]],
  },
  {
    scene: 'grind', chapter: 'Chapter 02 of 04', tab: 'The Grind',
    title: 'Precision-calibrated burr grind.',
    desc: 'Even particles, milled through flat burrs at low RPM. Less heat means pristine terroir, bright acidity and an even extraction without bitterness.',
    chip: 'Particle Size: 280µm', temp: 'Dose: 18.5g',
    metrics: [['Aroma Depth', '98%', 98], ['Particle Match', 'Uniform', 92], ['Retention', 'Near zero', 99]],
  },
  {
    scene: 'pour', chapter: 'Chapter 03 of 04', tab: 'The Pour',
    title: 'Slow lever pressure extraction.',
    desc: 'Nine bars of pre-heated mountain-spring water. Watch the viscous, tiger-striped espresso cascade through a bottomless portafilter in a steady golden stream.',
    chip: '9.2 Bar Pressure', temp: 'Water Temp: 93.5°C',
    metrics: [['Aroma Depth', '96%', 96], ['Crema Viscosity', 'Dense', 95], ['Balance Index', 'Optimal TDS', 91]],
  },
  {
    scene: 'cup', chapter: 'Chapter 04 of 04', tab: 'The Cup',
    title: 'The hand-thrown terracotta cup.',
    desc: 'Micro-textured whole milk, poured into kiln-fired terracotta that holds its warmth and cradles the velvety rosetta on top.',
    chip: 'Warm Clay Vessel', temp: 'Serving Temp: 65°C',
    metrics: [['Aroma Depth', '99%', 99], ['Microfoam', 'Velvet', 97], ['Balance Index', 'Pure soul', 100]],
  },
]

export const filters = [
  { id: 'all', label: 'All' },
  { id: 'hot', label: 'Hot Brews' },
  { id: 'cold', label: 'Chilled' },
  { id: 'house', label: 'Signatures' },
]

export const menu = [
  { id: 1, cat: 'hot', art: 'espresso', tag: 'Classic Extract', price: 450, name: 'Classic Espresso', desc: 'Double ristretto, hazelnut crema and a dark cocoa finish, pulled slowly at 9 bar.', cup: 'No. 01 · Ristretto', note: 'Quick Cup', icon: 'Coffee' },
  { id: 2, cat: 'house', art: 'cappuccino', tag: 'Steamed Foam', price: 650, name: 'Velvet Cappuccino', desc: 'Equal parts espresso and steamed microfoam in our terracotta cup, with a hand-poured rosetta.', cup: 'No. 02 · Terracotta', note: 'House Love', icon: 'Heart', featured: true },
  { id: 3, cat: 'hot', art: 'latte', tag: 'House Confection', price: 750, name: 'Caramel Cloud Latte', desc: 'House-made sea-salt brown-butter caramel, velvety milk and toasted turbinado crystals.', cup: 'No. 03 · Dulce', note: 'Sweet Sip', icon: 'Cookie' },
  { id: 4, cat: 'hot', art: 'mocha', tag: 'Single-Origin Cacao', price: 800, name: 'Midnight Mocha', desc: '72% Ecuadorian dark chocolate melted into a double espresso, dusted with Ceylon cinnamon.', cup: 'No. 04 · Cacao Reserve', note: 'Rich Blend', icon: 'Flame' },
  { id: 5, cat: 'cold', art: 'coldbrew', tag: '18-Hour Slow Steep', price: 700, name: 'Vanilla Cream Cold Brew', desc: 'Steeped 18 hours in cold spring water, finished with slow-whipped Madagascar vanilla cream.', cup: 'No. 05 · Cold Draft', note: 'Slow Cold', icon: 'Snowflake' },
  { id: 6, cat: 'house', art: 'signature', tag: 'Patron Choice', price: 850, name: 'Amaro Signature', desc: 'Green cardamom, candied orange peel, a concentrated double shot and warm oat-milk foam.', cup: 'No. 06 · Milano Special', note: 'Patron Favorite', icon: 'Star' },
]

export const pillars = [
  { n: '01', icon: 'Sprout', kicker: 'Heritage Lots', title: 'Quality Beans', desc: 'Sourced directly from generational micro-lot farmers across Ethiopia and Colombia. Ethical, seasonal and traceable.', foot: 'Fair Trade Direct' },
  { n: '02', icon: 'Timer', kicker: 'Small Batch', title: 'Freshly Prepared', desc: 'Roasted weekly in-house and dialled in every morning with refractometer precision.', foot: 'Dialled In Daily' },
  { n: '03', icon: 'Hand', kicker: 'Manual Mastery', title: 'Crafted With Care', desc: 'Baristas trained in slow pour-over, lever-machine pressure profiles and silky micro-texturing.', foot: 'Poured By Hand' },
  { n: '04', icon: 'Disc3', kicker: 'Atmosphere', title: 'A Place To Slow Down', desc: 'Vinyl on the turntable, warm wooden banquettes, low golden light and no rush to clear your seat.', foot: 'Vinyl Salon' },
]

export const hours = [
  ['Monday – Friday', '7:00 AM – 7:00 PM'],
  ['Saturday – Sunday', '8:00 AM – 8:00 PM'],
  ['Aperitivo & Gramophone', 'From 5:00 PM Daily'],
]

export const perks = [
  'Analog vinyl spinning all afternoon',
  'Pet-friendly terracotta courtyard',
  'Free Wi-Fi & power for contemplative workers',
]
