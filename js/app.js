/* Shared rendering + behaviour. Content comes from js/config.js */
(function () {
  "use strict";
  var S = window.SITE;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (v) { return String(v == null ? "" : v).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var tel = function (p) { return "tel:" + String(p).replace(/[^\d+]/g, ""); };
  var wa = function (text, num) { return "https://wa.me/" + (num || S.whatsapp) + (text ? "?text=" + encodeURIComponent(text) : ""); };
  var since = function () { return S.since || "[Year]"; };
  var brandName = function (id) { var b = S.brands.filter(function (x) { return x.id === id; })[0]; return b ? b.name : id; };
  var catName = function (id) { var c = S.categories.filter(function (x) { return x.id === id; })[0]; return c ? c.name : id; };
  var page = document.body.getAttribute("data-page") || "home";
  var mount = function (id, html) { var el = document.getElementById(id); if (el) el.innerHTML = html; return el; };

  var tyreSVG = '<svg viewBox="0 0 200 200" aria-hidden="true"><circle cx="100" cy="100" r="92" fill="#0e1520"/>' +
    '<g stroke="#2b3a52" stroke-width="6">' + (function () { var s = ""; for (var i = 0; i < 24; i++) { var a = i * 15 * Math.PI / 180; s += '<line x1="' + (100 + 80 * Math.cos(a)).toFixed(1) + '" y1="' + (100 + 80 * Math.sin(a)).toFixed(1) + '" x2="' + (100 + 92 * Math.cos(a)).toFixed(1) + '" y2="' + (100 + 92 * Math.sin(a)).toFixed(1) + '"/>'; } return s; })() + '</g>' +
    '<circle cx="100" cy="100" r="74" fill="none" stroke="#3a4a66" stroke-width="2"/><circle cx="100" cy="100" r="58" fill="#c9d3e3"/>' +
    '<circle cx="100" cy="100" r="50" fill="#e8eef8"/><g fill="#9fb0cc">' + [0, 72, 144, 216, 288].map(function (d) { return '<rect x="96" y="52" width="8" height="34" rx="4" transform="rotate(' + d + ' 100 100)"/>'; }).join("") + '</g>' +
    '<circle cx="100" cy="100" r="12" fill="#d4161c"/></svg>';

  var logoMark = function () { return S.logo ? '<img class="logo-img" src="' + esc(S.logo) + '" alt="" width="44" height="44">' : '<span class="logo-mark"><svg width="26" height="26" viewBox="0 0 200 200"><circle cx="100" cy="100" r="80" fill="none" stroke="#fff" stroke-width="28"/><circle cx="100" cy="100" r="22" fill="#d4161c"/></svg></span>'; };
  var photo = function (src, alt, cls) { return src ? '<img class="' + (cls || "photo-frame") + '" loading="lazy" src="' + esc(src) + '" alt="' + esc(alt) + '">' : ""; };

  /* ---------- SEO: LocalBusiness JSON-LD ---------- */
  function jsonLd() {
    var d = { "@context": "https://schema.org", "@type": "TireShop", name: S.name, url: S.siteUrl, telephone: S.phone, email: S.email,
      address: { "@type": "PostalAddress", streetAddress: S.address },
      sameAs: Object.keys(S.social).map(function (k) { return S.social[k]; }).filter(Boolean) };
    var s = document.createElement("script"); s.type = "application/ld+json"; s.textContent = JSON.stringify(d); document.head.appendChild(s);
  }
  if (S.analyticsId) {
    var g = document.createElement("script"); g.async = true; g.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(S.analyticsId); document.head.appendChild(g);
    window.dataLayer = window.dataLayer || []; window.gtag = function () { dataLayer.push(arguments); }; gtag("js", new Date()); gtag("config", S.analyticsId);
  }

  /* ---------- header / footer ---------- */
  var NAV = [["index.html", "Home", "home"], ["about.html", "About Us", "about"], ["brands.html", "Tyre Brands", "brands"], ["products.html", "Products", "products"], ["services.html", "Services", "services"], ["gallery.html", "Gallery", "gallery"], ["branches.html", "Branches", "branches"], ["contact.html", "Contact Us", "contact"]];
  function header() {
    var h = (S.demoMode ? '<div class="demo-ribbon">Demo website – all names, numbers, brands and products are placeholders until confirmed by the dealer.</div>' : "") +
      '<div class="topbar"><div class="container"><span>📍 ' + esc(S.address) + '</span><span><a href="' + tel(S.phone) + '">📞 ' + esc(S.phone) + '</a></span></div></div>' +
      '<header class="header"><div class="container"><a class="logo" href="index.html" aria-label="' + esc(S.name) + ' home">' + logoMark() + esc(S.name) + '</a>' +
      '<nav class="nav" id="nav" aria-label="Main">' + NAV.map(function (n) { return '<a href="' + n[0] + '"' + (n[2] === page ? ' aria-current="page"' : "") + ">" + n[1] + "</a>"; }).join("") + "</nav>" +
      '<div class="header-cta"><a class="btn btn-outline btn-sm" href="' + tel(S.phone) + '">Call Now</a><a class="btn btn-wa btn-sm" href="' + wa("Hi " + S.name + ", I have a tyre enquiry.") + '" target="_blank" rel="noopener">WhatsApp</a></div>' +
      '<button class="menu-btn" id="menuBtn" aria-label="Open menu" aria-expanded="false" aria-controls="nav"><span></span></button></div></header>';
    mount("site-header", h);
    var b = $("#menuBtn"), n = $("#nav");
    b.addEventListener("click", function () { var o = n.classList.toggle("open"); b.setAttribute("aria-expanded", o); });
  }
  function footer() {
    var soc = Object.keys(S.social).filter(function (k) { return S.social[k]; }).map(function (k) { return '<li><a href="' + esc(S.social[k]) + '" target="_blank" rel="noopener">' + k.charAt(0).toUpperCase() + k.slice(1) + "</a></li>"; }).join("");
    mount("site-footer", '<footer class="footer"><div class="container"><div class="grid"><div>' + (S.logo ? '<img class="logo-img" src="' + esc(S.logo) + '" alt="' + esc(S.name) + ' logo" width="64" height="64" loading="lazy" style="margin-bottom:.8rem">' : '') + '<h4>' + esc(S.legalName || S.name) + '</h4><p>' + esc(S.tagline) + '</p><p>' + esc(S.address) + '</p></div>' +
      '<div><h4>Explore</h4><ul>' + NAV.map(function (n) { return '<li><a href="' + n[0] + '">' + n[1] + "</a></li>"; }).join("") + '</ul></div>' +
      '<div><h4>Opening Hours</h4><ul>' + S.hours.map(function (x) { return "<li>" + esc(x.days) + "<br><b style='color:#fff'>" + esc(x.time) + "</b></li>"; }).join("") + '</ul></div>' +
      '<div><h4>Contact</h4><ul><li><a href="' + tel(S.phone) + '">' + esc(S.phone) + '</a></li><li><a href="mailto:' + esc(S.email) + '">' + esc(S.email) + '</a></li>' + soc + '</ul></div></div>' +
      '<div class="legal"><span>© ' + new Date().getFullYear() + " " + esc(S.name) + '. All rights reserved.</span><span>Brand names belong to their respective owners; listing does not imply authorised dealership unless stated.</span></div></div></footer>' +
      '<div class="mobile-bar"><a class="c" href="' + tel(S.phone) + '">📞 Call Now</a><a class="w" href="' + wa("Hi " + S.name + ", I have a tyre enquiry.") + '" target="_blank" rel="noopener">💬 WhatsApp</a></div>');
  }

  /* ---------- reusable blocks ---------- */
  var visibleBrands = function () { return S.brands.filter(function (b) { return b.show !== false; }); };
  var visibleProducts = function () { return S.products.filter(function (p) { return p.show !== false; }); };
  var STATUS = { in: ["In stock", "in"], order: ["On order", "order"], out: ["Out of stock", "out"] };
  function productCard(p) {
    var st = p.status && STATUS[p.status] ? '<span class="chip ' + STATUS[p.status][1] + '">' + STATUS[p.status][0] + "</span>" : "";
    var msg = "Hi " + S.name + ", I'm interested in " + brandName(p.brand) + " " + p.model + " (size " + p.size + "). Please share price & availability.";
    return '<article class="card"><div class="thumb">' + (p.image ? '<img loading="lazy" src="' + esc(p.image) + '" alt="' + esc(brandName(p.brand) + " " + p.model + " tyre") + '">' : tyreSVG) + "</div>" +
      '<div class="card-body"><div><span class="chip">' + esc(brandName(p.brand)) + "</span> " + st + "</div><h3>" + esc(p.model) + '</h3><div class="size">' + esc(p.size) + '</div><p class="muted small">' + esc(catName(p.cat)) + " · " + (p.price ? "₹" + Number(p.price).toLocaleString("en-IN") : "Enquire for price") + "</p>" +
      '<div class="btns"><a class="btn btn-wa btn-sm" target="_blank" rel="noopener" href="' + wa(msg) + '">WhatsApp Enquiry</a><button class="btn btn-outline btn-sm" data-detail="' + p.id + '">Details</button></div></div></article>';
  }
  function bindDetails(scope) {
    $$("[data-detail]", scope).forEach(function (b) {
      b.addEventListener("click", function () {
        var p = S.products.filter(function (x) { return String(x.id) === b.getAttribute("data-detail"); })[0]; if (!p) return;
        var m = $("#detailModal"); if (!m) { m = document.createElement("div"); m.id = "detailModal"; m.className = "modal"; m.setAttribute("role", "dialog"); m.setAttribute("aria-modal", "true"); document.body.appendChild(m); m.addEventListener("click", function (e) { if (e.target === m) m.classList.remove("open"); }); }
        var msg = "Hi " + S.name + ", I'm interested in " + brandName(p.brand) + " " + p.model + " (size " + p.size + "). Please share price & availability.";
        m.innerHTML = '<div class="sheet"><button class="x" aria-label="Close">×</button><div class="thumb" style="border-radius:12px;margin-bottom:1rem">' + (p.image ? '<img src="' + esc(p.image) + '" alt="' + esc(p.model) + '">' : tyreSVG) + "</div><span class='chip'>" + esc(brandName(p.brand)) + "</span><h3 style='margin-top:.5rem'>" + esc(p.model) + "</h3><p class='size'>" + esc(p.size) + "</p><p>" + esc(p.desc) + "</p><p class='muted small'>Category: " + esc(catName(p.cat)) + "<br>Price: " + (p.price ? "₹" + Number(p.price).toLocaleString("en-IN") : "Enquire for price") + "<br>Compatibility is confirmed by our team before purchase.</p><div class='btns' style='display:flex;gap:.6rem;flex-wrap:wrap'><a class='btn btn-wa' target='_blank' rel='noopener' href='" + wa(msg) + "'>WhatsApp Enquiry</a><a class='btn btn-navy' href='" + tel(S.phone) + "'>Call Now</a></div></div>";
        m.classList.add("open"); $(".x", m).addEventListener("click", function () { m.classList.remove("open"); }); $(".x", m).focus();
      });
    });
  }
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") $$(".modal.open,.lightbox.open").forEach(function (m) { m.classList.remove("open"); }); });

  function mapEmbed(q) { return '<iframe class="map" loading="lazy" title="Map showing ' + esc(q) + '" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=' + encodeURIComponent(q) + '&output=embed"></iframe>'; }
  var dirLink = function (q) { return "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(q); };

  /* ---------- page renderers ---------- */
  var R = {};
  R.home = function () {
    mount("hero", '<section class="hero"><div class="container"><div><span class="eyebrow">Multi-brand tyre dealer</span><h1>Your Trusted Tyre Partner Since ' + esc(since()) + '</h1><p class="lead">' + esc(S.tagline) + '</p><div class="btns"><a class="btn btn-primary" href="products.html">Explore Tyres</a><a class="btn btn-ghost" target="_blank" rel="noopener" href="' + wa("Hi " + S.name + ", I have a tyre enquiry.") + '">WhatsApp Us</a></div>' +
      '<div class="hero-badges">' + (S.badges || []).map(function (x) { return '<span><b>' + esc(x.b) + '</b>' + esc(x.t) + '</span>'; }).join("") + '</div></div><div class="hero-art">' + (S.heroImage ? '<img class="hero-photo" src="' + esc(S.heroImage) + '" alt="Inside the ' + esc(S.name) + ' showroom" width="765" height="1020">' : tyreSVG) + "</div></div></section>");
    mount("brandStrip", '<div class="section-head"><span class="eyebrow">Brands we stock</span><h2>Tyres from brands you trust</h2></div><div class="brand-strip">' + visibleBrands().map(function (b) { return '<a class="brand-pill" href="brands.html#' + esc(b.id) + '">' + esc(b.name) + "</a>"; }).join("") + "</div>");
    var f = visibleProducts().filter(function (p) { return p.featured; }).slice(0, 6);
    mount("featured", '<div class="section-head"><span class="eyebrow">Featured</span><h2>Popular tyres</h2><p>Tap WhatsApp Enquiry to ask about price and availability for your size.</p></div><div class="grid g3">' + f.map(productCard).join("") + '</div><p style="margin-top:1.5rem"><a class="btn btn-navy" href="products.html">View full catalogue</a></p>');
    bindDetails($("#featured"));
    mount("why", '<div class="section-head"><span class="eyebrow">Why choose us</span><h2>Service you can rely on</h2></div><div class="grid g4">' + S.why.map(function (w, i) { return '<div class="feature"><div class="ic">' + (i + 1) + "</div><h3>" + esc(w.t) + "</h3><p class='muted'>" + esc(w.d) + "</p></div>"; }).join("") + "</div>");
    mount("aboutPreview", '<div class="split"><div><span class="eyebrow">About us</span><h2>The story behind ' + esc(S.name) + '</h2>' + photo(S.storeImage, 'Inside a ' + S.name + ' Bridgestone Select Store') + '</div><div><p>' + esc(S.story) + '</p><a class="btn btn-outline" href="about.html">Read More</a></div></div>');
    if (S.testimonials.length) mount("testimonials", '<div class="section-head"><span class="eyebrow">Customer feedback</span><h2>What customers say</h2></div><div class="grid g3">' + S.testimonials.map(function (t) { return '<blockquote class="card quote"><div class="card-body"><p>“' + esc(t.text) + '”</p><footer>' + esc(t.name) + (t.vehicle ? " · " + esc(t.vehicle) : "") + "</footer></div></blockquote>"; }).join("") + "</div>");
    else { var t = $("#testimonials"); if (t) t.parentNode.removeChild(t); }
    var b = S.branches.filter(function (x) { return x.active !== false; })[0] || {};
    mount("contactStrip", '<div class="split"><div><span class="eyebrow">Visit us</span><h2>Find our showroom</h2><dl class="info"><dt>Address</dt><dd>' + esc(S.address) + "</dd><dt>Hours</dt><dd>" + S.hours.map(function (h) { return esc(h.days + ": " + h.time); }).join("<br>") + '</dd><dt>Phone</dt><dd><a href="' + tel(S.phone) + '">' + esc(S.phone) + '</a></dd></dl><p style="margin-top:1.2rem;display:flex;gap:.6rem;flex-wrap:wrap"><a class="btn btn-primary" target="_blank" rel="noopener" href="' + dirLink(b.mapQuery || S.mapQuery) + '">Get Directions</a><a class="btn btn-outline" href="contact.html">Contact Us</a></p></div><div>' + mapEmbed(S.mapQuery) + "</div></div>");
  };

  R.about = function () {
    mount("story", "<p style='font-size:1.1rem'>" + esc(S.story) + "</p>");
    mount("timeline", '<ol class="timeline">' + S.timeline.map(function (t) { return '<li><div class="yr">' + esc(t.year) + "</div><h3>" + esc(t.t) + "</h3><p class='muted'>" + esc(t.d) + "</p></li>"; }).join("") + "</ol>");
    mount("journeyImg", S.journeyImage ? '<figure class="journey"><img loading="lazy" src="' + esc(S.journeyImage) + '" alt="Infographic: ' + esc(S.legalName || S.name) + ' tyre business journey from 2019 to 2026" width="1218" height="1292"><figcaption class="small">Our journey at a glance – <a href="' + esc(S.journeyImage) + '" target="_blank" rel="noopener">open full-size image</a></figcaption></figure>' : "");
    var o = S.owner; mount("owner", '<div class="panel person"><div class="avatar lg">' + (o.photo ? '<img src="' + esc(o.photo) + '" alt="' + esc(o.name) + '">' : "Photo") + "</div><h3>" + esc(o.name) + '</h3><p class="muted">' + esc(o.role) + "</p><p>“" + esc(o.message) + "”</p></div>");
    if (S.team.length) mount("team", '<div class="section-head"><span class="eyebrow">Our team</span><h2>The people behind the counter</h2></div><div class="grid g4">' + S.team.map(function (m) { return '<div class="panel person"><div class="avatar">' + (m.photo ? '<img loading="lazy" src="' + esc(m.photo) + '" alt="' + esc(m.name) + '">' : "") + "</div><h3>" + esc(m.name) + '</h3><p class="muted">' + esc(m.role) + "</p></div>"; }).join("") + "</div>");
    else { var t = $("#team"); if (t) t.parentNode.removeChild(t); }
    if (S.achievements.length) mount("ach", '<div class="stats">' + S.achievements.map(function (a) { return "<div><b>" + esc(a.n) + "</b>" + esc(a.l) + "</div>"; }).join("") + "</div>");
    else { var a = $("#ach"); if (a) a.parentNode.removeChild(a); }
  };

  R.brands = function () {
    mount("brandList", visibleBrands().map(function (b) {
      var prods = visibleProducts().filter(function (p) { return p.brand === b.id; });
      return '<section class="section' + '" id="' + esc(b.id) + '" style="padding:1.6rem 0;border-bottom:1px solid var(--line)"><div class="split"><div class="brand-card">' + photo(b.image, b.name + ' tyres at ' + S.name) + '<h3>' + esc(b.name) + "</h3>" + (b.badge ? "<p><span class='chip ok-chip'>" + esc(b.badge) + "</span></p>" : "") + "<p class='muted'>" + esc(b.about) + "</p><p>" + (b.cats || []).map(function (c) { return '<span class="chip">' + esc(catName(c)) + "</span> "; }).join("") + '</p><a class="btn btn-wa btn-sm" target="_blank" rel="noopener" href="' + wa("Hi " + S.name + ", I'd like to enquire about " + b.name + " tyres.") + '">Enquire about ' + esc(b.name) + '</a> <a class="btn btn-outline btn-sm" href="products.html?brand=' + esc(b.id) + '">View products</a></div><div class="grid g2">' + (prods.length ? prods.slice(0, 2).map(productCard).join("") : "<p class='muted'>Models coming soon – enquire for availability.</p>") + "</div></div></section>";
    }).join(""));
    bindDetails($("#brandList"));
  };

  R.products = function () {
    var q = $("#q"), fb = $("#fb"), fc = $("#fc"), out = $("#plist"), cnt = $("#count");
    fb.innerHTML = '<option value="">All brands</option>' + visibleBrands().map(function (b) { return '<option value="' + esc(b.id) + '">' + esc(b.name) + "</option>"; }).join("");
    fc.innerHTML = '<option value="">All vehicle types</option>' + S.categories.map(function (c) { return '<option value="' + esc(c.id) + '">' + esc(c.name) + "</option>"; }).join("");
    var params = new URLSearchParams(location.search); if (params.get("brand")) fb.value = params.get("brand"); if (params.get("cat")) fc.value = params.get("cat");
    var norm = function (s) { return String(s).toLowerCase().replace(/[\s\/\-]/g, ""); };
    function draw() {
      var term = norm(q.value);
      var list = visibleProducts().filter(function (p) {
        if (fb.value && p.brand !== fb.value) return false; if (fc.value && p.cat !== fc.value) return false;
        return !term || norm(p.size + p.model + brandName(p.brand)).indexOf(term) > -1;
      });
      cnt.textContent = list.length + " tyre" + (list.length === 1 ? "" : "s") + " found";
      out.innerHTML = list.length ? list.map(productCard).join("") : '<div class="empty" style="grid-column:1/-1"><p><b>No exact match.</b></p><p>Tell us your tyre size or vehicle and we will check stock for you.</p><a class="btn btn-wa" target="_blank" rel="noopener" href="' + wa("Hi " + S.name + ", I'm looking for tyre size: " + (q.value || "(please advise)")) + '">Ask on WhatsApp</a></div>';
      bindDetails(out);
    }
    [q, fb, fc].forEach(function (el) { el.addEventListener("input", draw); }); $("#reset").addEventListener("click", function () { q.value = fb.value = fc.value = ""; draw(); });
    draw();
  };

  R.services = function () {
    mount("svcList", S.services.map(function (s) {
      return '<article class="card"><div class="thumb">' + (s.image ? '<img loading="lazy" src="' + esc(s.image) + '" alt="' + esc(s.t) + '">' : '<svg viewBox="0 0 64 64" fill="none" stroke="#2b313b" stroke-width="3" aria-hidden="true"><circle cx="32" cy="32" r="22"/><circle cx="32" cy="32" r="6"/><path d="M32 10v16M32 38v16M10 32h16M38 32h16"/></svg>') + '</div><div class="card-body"><h3>' + esc(s.t) + "</h3><p class='muted'>" + esc(s.d) + '</p><div class="btns"><a class="btn btn-wa btn-sm" target="_blank" rel="noopener" href="' + wa("Hi " + S.name + ", I'd like to book/enquire: " + s.t) + '">Enquire</a><a class="btn btn-outline btn-sm" href="' + tel(S.phone) + '">Call</a></div></div></article>';
    }).join(""));
  };

  R.gallery = function () {
    var g = $("#gal"); g.innerHTML = S.gallery.map(function (x, i) { return '<button data-i="' + i + '" aria-label="Open photo: ' + esc(x.caption) + '">' + (x.src ? '<img loading="lazy" src="' + esc(x.src) + '" alt="' + esc(x.caption) + '"' + (x.pos ? ' style="object-position:' + esc(x.pos) + '"' : '') + '>' : "Photo placeholder") + '<span class="cap">' + esc(x.caption) + "</span></button>"; }).join("");
    var lb = document.createElement("div"); lb.className = "lightbox"; lb.setAttribute("role", "dialog"); lb.setAttribute("aria-modal", "true"); document.body.appendChild(lb);
    function open(i) { var x = S.gallery[(i + S.gallery.length) % S.gallery.length]; lb.dataset.i = (i + S.gallery.length) % S.gallery.length; lb.innerHTML = '<button class="x" aria-label="Close">×</button><figure>' + (x.src ? '<img src="' + esc(x.src) + '" alt="' + esc(x.caption) + '">' : '<div class="lb-ph">Photo placeholder</div>') + "<figcaption style='margin-top:.8rem'>" + esc(x.caption) + "</figcaption><p><button class='btn btn-outline btn-sm' data-nav='-1'>← Prev</button> <button class='btn btn-outline btn-sm' data-nav='1'>Next →</button></p></figure>"; lb.classList.add("open"); }
    g.addEventListener("click", function (e) { var b = e.target.closest("button[data-i]"); if (b) open(+b.dataset.i); });
    lb.addEventListener("click", function (e) { if (e.target === lb || e.target.classList.contains("x")) lb.classList.remove("open"); var n = e.target.getAttribute("data-nav"); if (n) open(+lb.dataset.i + +n); });
  };

  R.branches = function () {
    mount("brList", (S.storeImage ? '<figure class="banner"><img loading="lazy" src="' + esc(S.storeImage) + '" alt="Inside a ' + esc(S.name) + ' Bridgestone Select Store"><figcaption class="small">Inside our Bridgestone Select Store</figcaption></figure>' : "") + S.branches.filter(function (b) { return b.active !== false; }).map(function (b) {
      return '<article class="panel"><div class="split"><div>' + (b.type ? '<span class="chip">' + esc(b.type) + '</span>' : "") + '<h3 style="margin-top:.5rem">' + esc(b.name) + "</h3><dl class='info'><dt>Address</dt><dd>" + esc(b.address) + "</dd><dt>Hours</dt><dd>" + esc(b.hours) + "</dd><dt>Phone</dt><dd><a href='" + tel(b.phone) + "'>" + esc(b.phone) + "</a></dd></dl><p style='display:flex;gap:.6rem;flex-wrap:wrap;margin-top:1.2rem'><a class='btn btn-primary btn-sm' target='_blank' rel='noopener' href='" + dirLink(b.mapQuery) + "'>Get Directions</a><a class='btn btn-wa btn-sm' target='_blank' rel='noopener' href='" + wa("Hi, I'd like to visit your " + b.name + " branch.", b.whatsapp) + "'>WhatsApp</a></p></div><div>" + mapEmbed(b.mapQuery) + "</div></div></article>";
    }).join('<div style="height:1.25rem"></div>'));
  };

  R.contact = function () {
    mount("cInfo", '<dl class="info"><dt>Business</dt><dd>' + esc(S.name) + "</dd><dt>Address</dt><dd>" + esc(S.address) + '</dd><dt>Phone</dt><dd><a href="' + tel(S.phone) + '">' + esc(S.phone) + '</a></dd><dt>WhatsApp</dt><dd><a target="_blank" rel="noopener" href="' + wa("Hi " + S.name) + '">Chat now</a></dd><dt>Email</dt><dd><a href="mailto:' + esc(S.email) + '">' + esc(S.email) + "</a></dd><dt>Hours</dt><dd>" + S.hours.map(function (h) { return esc(h.days + ": " + h.time); }).join("<br>") + "</dd></dl>");
    mount("cMap", mapEmbed(S.mapQuery) + '<p style="margin-top:.8rem"><a class="btn btn-outline btn-sm" target="_blank" rel="noopener" href="' + dirLink(S.mapQuery) + '">Get Directions</a></p>');
    var f = $("#enq"); if (!f) return;
    var vb = $("#fBrand"); vb.innerHTML = '<option value="">Any / not sure</option>' + visibleBrands().map(function (b) { return "<option>" + esc(b.name) + "</option>"; }).join("");
    var pp = new URLSearchParams(location.search); if (pp.get("size")) f.size.value = pp.get("size");
    var load = Date.now();
    function setErr(el, msg) { el.classList.toggle("bad", !!msg); var e = el.parentNode.querySelector(".err"); if (e) e.textContent = msg || ""; return !msg; }
    function validate() {
      var ok = true;
      ok = setErr(f.name, f.name.value.trim().length < 2 ? "Please enter your name." : "") && ok;
      ok = setErr(f.mobile, /^(?:\+?91[\s-]?)?[6-9]\d{9}$/.test(f.mobile.value.replace(/[\s-]/g, "").replace(/^0/, "")) ? "" : "Enter a valid 10-digit mobile number.") && ok;
      ok = setErr(f.vehicle, f.vehicle.value ? "" : "Select a vehicle type.") && ok;
      ok = setErr(f.consent, f.consent.checked ? "" : "Please accept the privacy notice.") && ok;
      return ok;
    }
    f.addEventListener("submit", function (e) {
      e.preventDefault(); var box = $("#formMsg"); box.className = ""; box.textContent = "";
      if (f.website.value) return;                                   // honeypot
      if (Date.now() - load < 2500) { box.className = "notice fail"; box.textContent = "Please take a moment to complete the form."; return; }
      var last = 0; try { last = +localStorage.getItem("enqLast") || 0; } catch (x) {}
      if (Date.now() - last < 30000) { box.className = "notice fail"; box.textContent = "Please wait a few seconds before sending another enquiry."; return; }
      if (!validate()) { box.className = "notice fail"; box.textContent = "Please fix the highlighted fields."; return; }
      var d = { name: f.name.value.trim(), mobile: f.mobile.value.trim(), vehicle: f.vehicle.value, brand: f.brand.value || "Any", size: f.size.value.trim() || "Not specified", message: f.message.value.trim() };
      var text = "New tyre enquiry – " + S.name + "\nName: " + d.name + "\nMobile: " + d.mobile + "\nVehicle: " + d.vehicle + "\nPreferred brand: " + d.brand + "\nTyre size: " + d.size + (d.message ? "\nMessage: " + d.message : "");
      try { localStorage.setItem("enqLast", Date.now()); } catch (x) {}
      function ok() { box.className = "notice ok"; box.innerHTML = "Thank you, " + esc(d.name) + "! We have received your enquiry and will contact you shortly."; f.reset(); }
      if (S.formEndpoint) {
        fetch(S.formEndpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(d) })
          .then(function (r) { if (!r.ok) throw 0; ok(); }).catch(function () { box.className = "notice fail"; box.innerHTML = "Sorry, we could not send your enquiry. Please <a href='" + tel(S.phone) + "'>call us</a> or use WhatsApp."; });
      } else { window.open(wa(text), "_blank", "noopener"); ok(); }
    });
    $("#viaMail").addEventListener("click", function (e) { if (!validate()) { e.preventDefault(); return; } e.preventDefault(); location.href = "mailto:" + S.email + "?subject=" + encodeURIComponent("Tyre enquiry – " + f.name.value) + "&body=" + encodeURIComponent("Name: " + f.name.value + "\nMobile: " + f.mobile.value + "\nVehicle: " + f.vehicle.value + "\nBrand: " + f.brand.value + "\nSize: " + f.size.value + "\n" + f.message.value); });
  };

  header(); footer(); jsonLd();
  if (R[page]) R[page]();
})();
