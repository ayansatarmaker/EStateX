// ============================================================
// DATA
// ============================================================
const properties = [
  {
    id: 1,
    title: "Modern 3BHK Flat with City View",
    price: 450000,
    location: "Mumbai, Maharashtra",
    type: "Flat",
    beds: 3,
    baths: 2,
    sqft: 1450,
    featured: true,
    image: "🏢",
    tag: "Featured",
  },
  {
    id: 2,
    title: "Luxury Penthouse with Private Terrace",
    price: 1200000,
    location: "Delhi, NCR",
    type: "Penthouse",
    beds: 4,
    baths: 3,
    sqft: 2800,
    featured: true,
    image: "🏙️",
    tag: "Luxury",
  },
  {
    id: 3,
    title: "Spacious Bungalow with Garden",
    price: 850000,
    location: "Bangalore, Karnataka",
    type: "Bungalow",
    beds: 5,
    baths: 4,
    sqft: 3200,
    featured: true,
    image: "🏡",
    tag: "Featured",
  },
  {
    id: 4,
    title: "2BHK Flat in Prime Location",
    price: 320000,
    location: "Pune, Maharashtra",
    type: "Flat",
    beds: 2,
    baths: 2,
    sqft: 980,
    featured: false,
    image: "🏢",
    tag: "New",
  },
  {
    id: 5,
    title: "Beachfront Bungalow with Pool",
    price: 2100000,
    location: "Goa, India",
    type: "Bungalow",
    beds: 6,
    baths: 5,
    sqft: 4500,
    featured: false,
    image: "🏖️",
    tag: "Luxury",
  },
  {
    id: 6,
    title: "Elegant Penthouse in the Sky",
    price: 950000,
    location: "Hyderabad, Telangana",
    type: "Penthouse",
    beds: 3,
    baths: 3,
    sqft: 2100,
    featured: false,
    image: "🌆",
    tag: "Featured",
  },
];

// ============================================================
// RENDER PROPERTY CARDS
// ============================================================
function renderPropertyCards(containerId, data, limit) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const items = limit ? data.slice(0, limit) : data;
  if (items.length === 0) {
    container.innerHTML = `<div class="empty-state"><i class="fas fa-home"></i><h3>No properties found</h3><p>Try adjusting your filters.</p></div>`;
    return;
  }
  container.innerHTML = items
    .map(
      (p) => `
                <div class="property-card">
                    <div class="card-img">
                        <span style="font-size:3.2rem;opacity:0.6;">${p.image}</span>
                        ${p.tag ? `<span class="badge-tag ${p.tag === "Sold" ? "sold" : p.tag === "Featured" ? "featured" : ""}">${p.tag}</span>` : ""}
                        <button class="fav-btn" data-id="${p.id}" aria-label="Save property">
                            <i class="far fa-heart"></i>
                        </button>
                    </div>
                    <div class="card-body">
                        <div class="price">$${p.price.toLocaleString()} <small>${p.type}</small></div>
                        <div class="title">${p.title}</div>
                        <div class="location"><i class="fas fa-map-pin"></i> ${p.location}</div>
                        <div class="features">
                            <span><i class="fas fa-bed"></i> ${p.beds} Beds</span>
                            <span><i class="fas fa-bath"></i> ${p.baths} Baths</span>
                            <span><i class="fas fa-arrows-alt-h"></i> ${p.sqft} sqft</span>
                        </div>
                    </div>
                </div>
            `,
    )
    .join("");

  // Attach favourite events
  container.querySelectorAll(".fav-btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      const icon = this.querySelector("i");
      icon.classList.toggle("fas");
      icon.classList.toggle("far");
      this.classList.toggle("active");
      // In a real app, save to localStorage
    });
  });
}

// ============================================================
// HAMBURGER MENU
// ============================================================
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
      this.classList.toggle("active");
      navLinks.classList.toggle("open");
    });
    // Close on link click (mobile)
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("open");
      });
    });
  }

  // ============================================================
  // HEADER SCROLL EFFECT
  // ============================================================
  const header = document.getElementById("header");
  window.addEventListener("scroll", function () {
    if (header) {
      if (window.scrollY > 40) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }
  });

  // ============================================================
  // PAGE-SPECIFIC RENDERING
  // ============================================================
  const page =
    document.body.dataset.page ||
    window.location.pathname.split("/").pop().replace(".html", "");

  // Featured on index
  if (page === "index" || page === "") {
    const featured = properties.filter((p) => p.featured);
    renderPropertyCards("featuredGrid", featured, 3);
  }

  // Listings
  if (document.getElementById("allPropertiesGrid")) {
    renderPropertyCards("allPropertiesGrid", properties);
  }

  // Flat
  if (document.getElementById("flatGrid")) {
    const flats = properties.filter((p) => p.type === "Flat");
    renderPropertyCards("flatGrid", flats);
  }

  // Bungalow
  if (document.getElementById("bunglowGrid")) {
    const bungalows = properties.filter((p) => p.type === "Bungalow");
    renderPropertyCards("bunglowGrid", bungalows);
  }

  // Penthouse
  if (document.getElementById("penthouseGrid")) {
    const penthouses = properties.filter((p) => p.type === "Penthouse");
    renderPropertyCards("penthouseGrid", penthouses);
  }

  // Search results
  if (document.getElementById("searchResultsGrid")) {
    renderPropertyCards("searchResultsGrid", properties);
  }

  // Saved properties (show first two as example)
  if (document.getElementById("savedGrid")) {
    const saved = properties.slice(0, 2);
    renderPropertyCards("savedGrid", saved);
    if (saved.length === 0) {
      document.getElementById("savedGrid").innerHTML = `
                        <div class="empty-state" style="grid-column:1/-1;">
                            <i class="fas fa-heart"></i>
                            <h3>No saved properties yet</h3>
                            <p>Start saving your favourite properties by clicking the heart icon.</p>
                            <a href="listings.html" class="btn btn-primary mt-12" style="display:inline-flex;">Browse Listings</a>
                        </div>
                    `;
    }
  }

  // View property – show first property detail
  if (document.getElementById("viewPropertyDetail")) {
    const p = properties[0];
    const container = document.getElementById("viewPropertyDetail");
    container.innerHTML = `
                    <div class="property-detail">
                        <div class="detail-img">
                            <span style="font-size:5rem;opacity:0.5;">${p.image}</span>
                        </div>
                        <div class="detail-body">
                            <div class="price">$${p.price.toLocaleString()}</div>
                            <div class="title">${p.title}</div>
                            <div class="location"><i class="fas fa-map-pin"></i> ${p.location}</div>
                            <div class="detail-features">
                                <span><i class="fas fa-bed"></i> ${p.beds} Bedrooms</span>
                                <span><i class="fas fa-bath"></i> ${p.baths} Bathrooms</span>
                                <span><i class="fas fa-arrows-alt-h"></i> ${p.sqft} sqft</span>
                                <span><i class="fas fa-tag"></i> ${p.type}</span>
                            </div>
                            <div class="description">
                                <p>This stunning ${p.type.toLowerCase()} offers a perfect blend of modern luxury and comfort. 
                                Located in the heart of ${p.location.split(",")[0]}, this property features spacious interiors, 
                                premium finishes, and breathtaking views. Perfect for families and investors alike.</p>
                                <p style="margin-top:12px;">Contact us today to schedule a private viewing.</p>
                            </div>
                            <div class="btn-group">
                                <a href="contact.html" class="btn btn-primary"><i class="fas fa-phone"></i> Contact Agent</a>
                                <button class="btn btn-accent" id="savePropBtn"><i class="far fa-heart"></i> Save Property</button>
                            </div>
                        </div>
                    </div>
                `;
    // Save button on view page
    const saveBtn = document.getElementById("savePropBtn");
    if (saveBtn) {
      saveBtn.addEventListener("click", function () {
        const icon = this.querySelector("i");
        icon.classList.toggle("fas");
        icon.classList.toggle("far");
        this.classList.toggle("active");
        this.innerHTML = this.classList.contains("active")
          ? '<i class="fas fa-heart"></i> Saved'
          : '<i class="far fa-heart"></i> Save Property';
      });
    }
  }

  // ============================================================
  // SEARCH FUNCTIONALITY (on search page)
  // ============================================================
  const searchBtn = document.querySelector(".search-bar .btn-primary");
  if (searchBtn) {
    searchBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const locInput = document.querySelector(".search-bar input");
      const typeSelect = document.querySelector(".search-bar select");
      if (locInput && typeSelect) {
        // In a real app, filter and redirect
        window.location.href = "searchproperty.html";
      }
    });
  }

  console.log("🏠 EStateX — Premium Real Estate Platform");
  console.log("📦 Loaded " + properties.length + " properties");
});
