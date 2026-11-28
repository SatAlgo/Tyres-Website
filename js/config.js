/* ============================================================
   DEALER CONFIGURATION  –  edit ONLY this file to re-skin the
   site for a different tyre dealer. Everything marked [CONFIRM]
   is placeholder demo content and must be verified with the owner
   before launch. Do not publish unverified claims.
   ============================================================ */
window.SITE = {
  demoMode: true,                       // shows "demo content" ribbon; set false at launch
  name: "VK Tyres",                     // shop name shown in header/footer
  legalName: "VK Tyres & Auto Service",
  logo: "img/logo.png",                 // round logo (header, footer, favicon)
  heroImage: "img/store-interior.jpg",  // photo shown in the home-page hero
  storeImage: "img/store-interior.jpg", // used on Home (about preview) & Branches banner
  tagline: "Premium Tyres, Trusted Brands & Professional Service.",
  since: 2019,                          // first tyre shop opened 11 September 2019
  phone: "+91 90000 00000",             // [CONFIRM]
  whatsapp: "919000000000",             // [CONFIRM] country code + number, digits only
  email: "info@example.com",            // [CONFIRM]
  address: "Dighi–Magazine Chowk, Dhanore & Lohegaon, Pune – 3 outlets (confirm full postal address)",
  mapQuery: "VK Tyres Dighi Magazine Chowk Pune",   // [CONFIRM] replace with exact map pin
  hours: [                              // [CONFIRM]
    { days: "Monday – Saturday", time: "9:30 AM – 8:00 PM" },
    { days: "Sunday", time: "Closed / by appointment" }
  ],
  social: { facebook: "", instagram: "", youtube: "", googleBusiness: "" },
  formEndpoint: "",                     // optional: Formspree/Getform/etc. URL. Empty => WhatsApp hand-off
  analyticsId: "",                      // optional: GA4 id e.g. "G-XXXXXXX"
  siteUrl: "https://www.example.com",   // [CONFIRM] final domain (used for SEO/structured data)

  badges: [                             // 3 short trust badges shown in the home hero
    { b: "B Shop Mega Dealer", t: "Bridgestone partner" },
    { b: "3 outlets", t: "across Pune" },
    { b: "Since 2019", t: "serving customers" }
  ],

  why: [  // keep to 4–6 VERIFIED benefits
    { t: "Bridgestone Mega Dealer", d: "Official Bridgestone B Shop Mega Dealer partner since August 2022." },
    { t: "Three convenient outlets", d: "Dhanore, Dighi–Magazine Chowk and Lohegaon – visit whichever is closest." },
    { t: "Multi-brand choice", d: "Our Lohegaon store stocks multiple tyre brands so you can compare." },
    { t: "Car & two-wheeler tyres", d: "From Bridgestone car & SUV tyres to authorised TVS two-wheeler tyres." },
    { t: "Honest guidance", d: "Get advice on the right tyre for your vehicle and budget." },
    { t: "Easy enquiries", d: "Call or WhatsApp us your tyre size and get a quick reply." }
  ],

  // Only list brands the dealer ACTUALLY stocks. Examples below are for layout testing only.
  // Only list brands the dealer ACTUALLY stocks. Brands with show:false are hidden – switch to true once confirmed.
  brands: [
    { id: "bridgestone", name: "Bridgestone", show: true, badge: "B Shop Mega Dealer · 2 Select Stores", image: "img/tyre-rack.jpg",
      about: "We are a Bridgestone B Shop Mega Dealer (since August 2022) and run two Bridgestone Select Stores. Turanza, Potenza, Dueler, Sturdo and Ecopia ranges are on display at our outlets.", cats: ["car", "suv"] },
    { id: "tvs", name: "TVS", show: true, badge: "Authorised Distributor · Two-Wheeler Tyres", image: "img/tvs-two-wheeler.jpg",
      about: "VK Tyres is an authorised distributor for TVS two-wheeler tyres (2026). Ask us for your bike or scooter size.", cats: ["two"] },
    { id: "mrf",         name: "MRF",         show: false, about: "Brand description. [CONFIRM stocked]", cats: ["car", "suv", "two", "cv"] },
    { id: "ceat",        name: "CEAT",        show: false, about: "Brand description. [CONFIRM stocked]", cats: ["car", "two", "cv"] },
    { id: "michelin",    name: "Michelin",    show: false, about: "Brand description. [CONFIRM stocked]", cats: ["car", "suv"] },
    { id: "apollo",      name: "Apollo",      show: false, about: "Brand description. [CONFIRM stocked]", cats: ["car", "suv", "cv", "agri"] },
    { id: "jk",          name: "JK Tyre",     show: false, about: "Brand description. [CONFIRM stocked]", cats: ["car", "suv", "cv"] },
    { id: "goodyear",    name: "Goodyear",    show: false, about: "Brand description. [CONFIRM stocked]", cats: ["car", "suv"] }
  ],

  categories: [
    { id: "car",  name: "Passenger Cars" },
    { id: "suv",  name: "SUV / MUV" },
    { id: "cv",   name: "Commercial Vehicles" },
    { id: "two",  name: "Two-Wheelers" },
    { id: "agri", name: "Agriculture" }
  ],

  // Products: ranges visible in your showroom photos. Add exact sizes/prices per tyre when you have them.
  // price: number (₹) or null => "Enquire for price".  status: "in" | "out" | "order" (omit if you cannot keep it accurate)
  products: [
    { id: 1, brand: "bridgestone", model: "Turanza",  size: "Various sizes", cat: "car", desc: "Comfort-oriented touring tyre range for passenger cars. Share your tyre size and we will confirm fitment and availability.", price: null, featured: true,  show: true, image: "img/tyre-rack.jpg" },
    { id: 2, brand: "bridgestone", model: "Dueler",   size: "Various sizes", cat: "suv", desc: "Bridgestone Dueler range for SUVs and utility vehicles, including all-terrain patterns. Ask us which pattern suits your vehicle.", price: null, featured: true,  show: true, image: "img/ageless-display.jpg" },
    { id: 3, brand: "bridgestone", model: "Potenza",  size: "Various sizes", cat: "car", desc: "Performance-focused tyre range for drivers who want sharper handling. Enquire for sizes in stock.", price: null, featured: true,  show: true, image: "img/potenza.jpg" },
    { id: 4, brand: "bridgestone", model: "Sturdo",   size: "Various sizes", cat: "car", desc: "Everyday tyre range built for durability on Indian roads. Enquire for your size.", price: null, featured: true,  show: true, image: "img/sturdo.jpg" },
    { id: 5, brand: "bridgestone", model: "Ecopia",   size: "Various sizes", cat: "car", desc: "Eco-focused tyre range designed for lower rolling resistance. Enquire for your size.", price: null, featured: false, show: true, image: "img/ecopia.jpg" },
    { id: 6, brand: "tvs",         model: "Two-Wheeler Tyres", size: "Various sizes", cat: "two", desc: "Authorised TVS two-wheeler tyres for motorcycles and scooters. Tell us your bike model and we will match the size.", price: null, featured: true, show: true, image: "img/tvs-two-wheeler.jpg" }
  ],

  // Include only services the outlet really provides. Remove any that do not apply.
  services: [
    { t: "Tyre Replacement & Fitting", d: "Fitting of new tyres on your vehicle.", image: "img/svc-fitting.jpg" },
    { t: "Wheel Balancing",            d: "Smoother ride and even tyre wear.", image: "img/svc-balancing.jpg" },
    { t: "Wheel Alignment",            d: "Correct alignment for handling and tyre life. [CONFIRM equipment]", image: "img/svc-alignment.jpg" },
    { t: "Tubeless Tyre Repair",       d: "Repair of eligible tubeless tyres.", image: "img/svc-tubeless-repair.jpg" },
    { t: "Puncture Repair",            d: "Quick puncture fixing.", image: "img/svc-puncture.jpg" },
    { t: "Nitrogen Filling",           d: "Nitrogen inflation. [CONFIRM offered]", image: "img/svc-nitrogen.jpg" }
  ],

  // About page – facts must come from the owner and be approved before publishing.
  story: "VK Tyres & Auto Service opened its first tyre shop on 11 September 2019. In 2022 we launched an exclusive tyre dealership and became a Bridgestone B Shop Mega Dealer. Today we serve customers from two Bridgestone Select Stores (Charholi Khurd–Dhanore and Dighi–Magazine Chowk) and a multi-brand tyre store in Lohegaon, and in 2026 we became an authorised distributor for TVS two-wheeler tyres. Our goal is to keep growing, serving and evolving with valuable customers like you.",
  timeline: [
    { year: "11 September 2019", t: "First tyre shop opened",        d: "We opened our first tyre shop, marking the beginning of our journey." },
    { year: "February 2022",     t: "Exclusive Tyre Dealership",     d: "Launched an exclusive tyre dealership, expanding our services and product range." },
    { year: "August 2022",       t: "Bridgestone B Shop Mega Dealer",d: "Partnered with Bridgestone and became a B Shop Mega Dealer, elevating our offerings." },
    { year: "October 2023",      t: "Second outlet – Charholi Khurd–Dhanore", d: "Opened as a Bridgestone Select Store." },
    { year: "January 2025",      t: "Third branch – Dighi–Magazine Chowk",    d: "Launched as a Bridgestone Select Store (our 2nd Select outlet)." },
    { year: "2026",              t: "Multi-brand store – Lohegaon",  d: "Opened a multi-brand tyre store in Lohegaon." },
    { year: "2026",              t: "TVS Two-Wheeler Tyres",         d: "Became an authorised distributor for TVS two-wheeler tyres." }
  ],
  journeyImage: "img/journey.jpg",      // full infographic shown under the timeline
  owner: { name: "Our Founder", role: "Founder & Owner, VK Tyres", message: "Our goal is to grow continuously, serving and evolving with valuable customers like you.", photo: "img/owner.jpg" }, // [CONFIRM] add the owner's name
  team: [ /* { name:"Name", role:"Role", photo:"img/team1.jpg" }  – only with consent */ ],
  achievements: [ { n: "2019", l: "First shop opened" }, { n: "3", l: "Outlets in Pune" }, { n: "2", l: "Bridgestone Select Stores" } ],
  testimonials: [ /* ONLY genuine, permitted reviews: { name:"A. Customer", text:"…", vehicle:"Swift" } */ ],

  // Gallery: authentic photos only. src empty => labelled placeholder tile.
  gallery: [
    { src: "img/store-interior.jpg",   caption: "Inside our Bridgestone Select Store" },
    { src: "img/tyre-rack.jpg",        caption: "Bridgestone Turanza & Potenza display", pos: "center 68%" },
    { src: "img/ageless-display.jpg",  caption: "Dueler & Sturdo range – Ageless Performance", pos: "center" },
    { src: "img/journey.jpg",          caption: "Our tyre business journey, 2019 – 2026", pos: "top" }
  ],

  // [CONFIRM] exact street addresses, phone numbers and hours for each outlet
  branches: [
    { name: "Charholi Khurd–Dhanore", type: "Bridgestone Select Store", address: "Charholi Khurd – Dhanore, Pune (confirm full address)", phone: "+91 90000 00000", whatsapp: "919000000000",
      hours: "Mon–Sat 9:30 AM – 8:00 PM", mapQuery: "VK Tyres Charholi Khurd Dhanore Pune", active: true },
    { name: "Dighi–Magazine Chowk", type: "Bridgestone Select Store", address: "Dighi – Magazine Chowk, Pune (confirm full address)", phone: "+91 90000 00000", whatsapp: "919000000000",
      hours: "Mon–Sat 9:30 AM – 8:00 PM", mapQuery: "VK Tyres Dighi Magazine Chowk Pune", active: true },
    { name: "Lohegaon", type: "Multi-Brand Tyre Store", address: "Lohegaon, Pune (confirm full address)", phone: "+91 90000 00000", whatsapp: "919000000000",
      hours: "Mon–Sat 9:30 AM – 8:00 PM", mapQuery: "VK Tyres Lohegaon Pune", active: true }
  ]
};
