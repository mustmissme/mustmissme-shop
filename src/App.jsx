// src/App.jsx
import React, { useEffect, useState } from "react";

// ---------------- GOOGLE SHEET ----------------
const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1oC3gLe7gQniz2_86zHzO1BcAU51lHUFLMwRTfVmBK4Q/gviz/tq?tqx=out:json";

// ---------------- BASE BRANDS ----------------
// เพิ่ม field category เพื่อใช้กรองตามหมวดบนหน้า BRANDS
// หมวดที่ใช้: CLOTHING, SHOSES, BAG, ACCESSORIES, OTHER
const BASE_BRANDS = [
  { slug: "crying-center",  name: "CRYING CENTER",      logo: "/brands/crying-center.png",   category: "CLOTHING" },
  { slug: "meihao-store",   name: "MEIHAO STORE",       logo: "/brands/meihao-store.png",    category: "CLOTHING" },
  { slug: "neresum",        name: "NERESUM",            logo: "/brands/neresum.png",         category: "CLOTHING" },
  { slug: "uncmhisex",      name: "UNCMHISEX",          logo: "/brands/uncmhisex.png",       category: "CLOTHING" },
  { slug: "whoosis",        name: "WHOOSIS",            logo: "/brands/whoosis.png",         category: "CLOTHING" },
  { slug: "young-stage",    name: "YOUNG STAGE",        logo: "/brands/young-stage.png",     category: "CLOTHING" },
  { slug: "cgga-amass",     name: "CGGA AMASS",         logo: "/brands/cgga-amass.png",      category: "CLOTHING" },
  { slug: "tgnsbrand",      name: "TGNSBRAND",          logo: "/brands/tgnsbrand.png",       category: "CLOTHING" },
  { slug: "weekendhub",     name: "WEEKENDHUB",         logo: "/brands/weekendhub.png",      category: "CLOTHING" },
  { slug: "iamnotbad",      name: "IAMNOTBAD",          logo: "/brands/iamnotbad.png",       category: "CLOTHING" },
  { slug: "black-bb",       name: "BLACK BB",           logo: "/brands/black-bb.png",        category: "CLOTHING" },
  { slug: "oisis",          name: "OISIS",              logo: "/brands/oisis.png",           category: "CLOTHING" },
  { slug: "tired-studio",   name: "TIRED STUDIO",       logo: "/brands/tired-studio.png",    category: "CLOTHING" },
  { slug: "ezek-project",   name: "EZEK PROJECT",       logo: "/brands/ezek-project.png",    category: "CLOTHING" },
  { slug: "1jinn-studio",   name: "1JINN STUDIO",       logo: "/brands/1jinn-studio.png",    category: "CLOTHING" },
  { slug: "zizifei",        name: "ZIZIFEI",            logo: "/brands/zizifei.png",         category: "CLOTHING" },
  { slug: "tipseven",       name: "TIPSEVEN",           logo: "/brands/tipseven.png",        category: "CLOTHING" },
  { slug: "achork",         name: "ACHORK",             logo: "/brands/achork.png",          category: "CLOTHING" },
  { slug: "blacklist",      name: "BLACKLIST",          logo: "/brands/blacklist.png",       category: "CLOTHING" },

  // หมวด SHOES
  { slug: "adidas",         name: "ADIDAS",             logo: "/brands/adidas.png",          category: "SHOSES" },
  { slug: "puma",           name: "PUMA",               logo: "/brands/puma.png",            category: "SHOSES" },

  // BAG / ACCESSORIES / OTHER ปรับได้ตามใจเลย
  { slug: "cat&sofa",       name: "CAT&SOFA",           logo: "/brands/cat&sofa.png",        category: "BAG" },
  { slug: "devo-life",      name: "DEVO LIFE",          logo: "/brands/devo-life.png",       category: "OTHER" },
  { slug: "lookun",         name: "LOOKUN",             logo: "/brands/lookun.png",          category: "OTHER" },
  { slug: "masoomake",      name: "MASOOMAKE",          logo: "/brands/masoomake.png",       category: "CLOTHING" },
  { slug: "mianmaoami",     name: "MIANMAOMI",          logo: "/brands/mianmaoami.png",      category: "CLOTHING" },
  { slug: "oicircle",       name: "OICIRCLE",           logo: "/brands/oicircle.png",        category: "ACCESSORIES" },
  { slug: "jeep",           name: "JEEP",               logo: "/brands/jeep.png",            category: "OTHER" },
  { slug: "jandress",       name: "JANDRESS",           logo: "/brands/jandress.png",        category: "CLOTHING" },
  { slug: "muva",           name: "MUVA",               logo: "/brands/muva.png",            category: "CLOTHING" },
  { slug: "smosmos",        name: "SMOSMOS",            logo: "/brands/smosmos.png",         category: "CLOTHING" },
  { slug: "toutou",         name: "TOUTOU",             logo: "/brands/toutou.png",          category: "CLOTHING" },
  { slug: "oogreenapple",   name: "OOGREENAPPLE",       logo: "/brands/oogreenapple.png",    category: "OTHER" },
  { slug: "rebbish-official", name: "REBBISH OFFICIAL", logo: "/brands/rebbish-official.png",category: "CLOTHING" },
  { slug: "dickies",        name: "DICKIES",            logo: "/brands/dickies.png",         category: "CLOTHING" },
  { slug: "fey-tiy-studio", name: "FEY TIY STUDIO",     logo: "/brands/fey-tiy-studio.png",  category: "CLOTHING" },
  { slug: "monchhichi",     name: "MONCHHICHI",         logo: "/brands/monchhichi.png",      category: "OTHER" },
  { slug: "chichaboom",     name: "CHICHABOOM",         logo: "/brands/chichaboom.png",      category: "CLOTHING" },
  { slug: "onionion",       name: "ONIONION",           logo: "/brands/onionion.png",        category: "CLOTHING" },
  { slug: "sorgenti",       name: "SORGENTI",           logo: "/brands/sorgenti.png",        category: "CLOTHING" },
  { slug: "marsh&mellow",   name: "MARSH&MELLOW",       logo: "/brands/marsh&mellow.png",    category: "CLOTHING" },
  { slug: "tidecolor",      name: "TIDECOLOR",          logo: "/brands/tidecolor.png",       category: "CLOTHING" },
  { slug: "tbh",            name: "TBH",                logo: "/brands/tbh.png",             category: "CLOTHING" },
  { slug: "jueves",         name: "JUEVES",             logo: "/brands/jueves.png",          category: "CLOTHING" },
];

// ช่องทางติดต่อ
const CONTACT_LINKS = {
  instagram:
    "https://www.instagram.com/mustmissme.preorder?igsh=MTZlbHZndTNmN3QwbA%3D%3D&utm_source=qr",
  tiktok:
    "https://www.tiktok.com/@mustmissme?_t=ZS-8zYkNa7Cxmq&_r=1",
  shopee:
    "https://shopee.co.th/reviewwwwwwwwww?uls_trackid=547g3fct004i&utm_campaign=-&utm_content=-&utm_medium=affiliates&utm_source=an_15359450009&utm_term=dz7vodofwim5",
  line:
    "https://line.me/R/ti/p/@078vlxgl?ts=09091148&oat_content=url",
};

// parse <br> เป็น array
function parseDetails(raw) {
  if (!raw) return [];
  return raw
    .split(/<br\s*\/?>/i)
    .map((s) =>
      s.replace(/&nbsp;/gi, " ").replace(/<\/?b>/gi, "").trim()
    )
    .filter(Boolean);
}

/* ---------------- MAIN APP ---------------- */

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [view, setView] = useState("home"); // 'home' | 'brands' | 'brand'
  const [activeBrandSlug, setActiveBrandSlug] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError("");

    fetch(SHEET_URL)
      .then((res) => res.text())
      .then((text) => {
        const jsonText = text.substring(
          text.indexOf("{"),
          text.lastIndexOf("}") + 1
        );
        const gviz = JSON.parse(jsonText);
        const rows = gviz.table?.rows || [];

        const brandsMap = {};
        BASE_BRANDS.forEach((b) => {
          brandsMap[b.slug] = {
            slug: b.slug,
            name: b.name,
            logo: b.logo,
            category: b.category || "OTHER",
            line_link: CONTACT_LINKS.line,
            categories: {
              HOODIE: [],
              SWEATER: [],
              TOPS: [],
              BOTTOMS: [],
              JEANS: [],
              BAG: [],
              SHOES: [],
              ACCESSORIES: [],
              OTHER: [],
            },
          };
        });

        rows.forEach((row) => {
          const c = row.c || [];

          const brandSlug = (c[0]?.v || "").trim(); // A
          const brandName = (c[1]?.v || "").trim(); // B
          const categoryRaw = (c[2]?.v || "").trim(); // C
          const sku = (c[3]?.v || "").trim(); // D
          const name = (c[4]?.v || "").trim(); // E
          const price = Number(c[5]?.v || 0); // F
          const detailsRaw = (c[6]?.v || "").trim(); // G
          const imgUrlRaw = (c[8]?.v || "").trim(); // I = imageUrl
          const orderLinkRaw = (c[9]?.v || "").trim(); // J

          if (!brandSlug || brandSlug === "brand_slug") return;

          if (!brandsMap[brandSlug]) {
            // ถ้า brand ใหม่ที่ไม่ได้อยู่ใน BASE_BRANDS
            brandsMap[brandSlug] = {
              slug: brandSlug,
              name: brandName || brandSlug,
              logo: `/brands/${brandSlug}.png`,
              category: "OTHER",
              line_link: CONTACT_LINKS.line,
              categories: {
                HOODIE: [],
                SWEATER: [],
                TOPS: [],
                BOTTOMS: [],
                JEANS: [],
                BAG: [],
                SHOES: [],
                ACCESSORIES: [],
                OTHER: [],
              },
            };
          }

          if (!sku || !name) return;

          const category = (categoryRaw || "TOPS").toUpperCase();
          const catKey = brandsMap[brandSlug].categories[category]
            ? category
            : "TOPS";

          let images = [];
          if (imgUrlRaw) {
            images = imgUrlRaw
              .split(/\s*,\s*/)
              .map((u) => u.trim())
              .filter(Boolean);
          }

          brandsMap[brandSlug].categories[catKey].push({
            sku,
            name,
            price,
            details: parseDetails(detailsRaw),
            images,
            order_link: orderLinkRaw || CONTACT_LINKS.line,
          });
        });

        setData({ brands: Object.values(brandsMap) });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("โหลดข้อมูลไม่สำเร็จ");
        setLoading(false);
      });
  }, []);

  const brands = data?.brands || [];
  const activeBrand =
    view === "brand"
      ? brands.find((b) => b.slug === activeBrandSlug)
      : null;

  const handleBrandClick = (slug) => {
    setActiveBrandSlug(slug);
    setView("brand");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app">
      <Header
        onHome={() => {
          setView("home");
          setActiveBrandSlug(null);
        }}
        onBrands={() => {
          setView("brands");
          setActiveBrandSlug(null);
        }}
        currentView={view}
      />

      <main className="page">
        {loading && <p className="status-text">กำลังโหลดสินค้า...</p>}
        {error && !loading && (
          <p className="status-text status-error">{error}</p>
        )}

        {!loading && !error && (
          <>
            {view === "home" && (
              <HomeSection onShopNow={() => setView("brands")} />
            )}
            {view === "brands" && (
              <BrandsGrid brands={brands} onSelectBrand={handleBrandClick} />
            )}
            {view === "brand" && activeBrand && (
              <BrandPage brand={activeBrand} />
            )}
          </>
        )}
      </main>

      <ContactSection />
      <Footer />
    </div>
  );
}

/* ---------------- HEADER ---------------- */

function Header({ onHome, onBrands, currentView }) {
  const goContact = () => {
    window.open(CONTACT_LINKS.line, "_blank");
  };

  return (
    <header className="site-header">
      {/* แถบบนพื้นหลังเหลือง */}
      <div className="header-top">
        <div className="header-top-inner">
          {/* โลโก้กลาง */}
          <div className="header-top-logo" onClick={onHome}>
            <img
              src="/logo.png"
              alt="must missme logo"
              className="logo-image"
            />
            <div className="logo-text">
              <span className="logo-main">must missme</span>
              <span className="logo-sub">preorder • import</span>
            </div>
          </div>

          {/* social ด้านขวา – PNG icons */}
          <div className="header-top-social">
            <a
              href={CONTACT_LINKS.instagram}
              className="social-circle"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="/instagram.png"
                alt="Instagram"
                className="social-icon"
              />
            </a>

            <a
              href={CONTACT_LINKS.tiktok}
              className="social-circle"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="/tiktok.png"
                alt="TikTok"
                className="social-icon"
              />
            </a>

            <a
              href={CONTACT_LINKS.shopee}
              className="social-circle"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="/shopee.png"
                alt="Shopee"
                className="social-icon"
              />
            </a>
          </div>
        </div>
      </div>

      {/* แถบล่างพื้นหลังชมพู – เมนู */}
      <div className="header-navbar">
        <nav className="header-nav-inner">
          <button
            type="button"
            className={`nav-item ${
              currentView === "home" ? "nav-item--active" : ""
            }`}
            onClick={onHome}
          >
            HOMEPAGE
          </button>
          <button
            type="button"
            className={`nav-item ${
              currentView === "brands" || currentView === "brand"
                ? "nav-item--active"
                : ""
            }`}
            onClick={onBrands}
          >
            BRANDS
          </button>
          <button
            type="button"
            className="nav-item"
            onClick={goContact}
          >
            CONTACT
          </button>
        </nav>
      </div>
    </header>
  );
}

/* ---------------- HOME ---------------- */

function HomeSection({ onShopNow }) {
  return (
    <section className="home-section">
      <div className="hero-card">
        <img src="/hero.png" alt="hero" className="hero-image" />
      </div>
      <p className="home-intro">
        must missme • ร้านพรีออเดอร์สินค้านำเข้าจากต่างประเทศ
      </p>
      <button
        type="button"
        className="primary-btn"
        onClick={onShopNow}
      >
        ดูแบรนด์ทั้งหมด
      </button>
    </section>
  );
}

/* ---------------- BRANDS GRID (หน้า BRANDS) ---------------- */

function BrandsGrid({ brands, onSelectBrand }) {
  const [brandCategory, setBrandCategory] = useState("ALL");
  const [searchText, setSearchText] = useState("");

  const categoryTabs = ["ALL", "CLOTHING", "SHOSES", "BAG", "ACCESSORIES", "OTHER"];

  const brandFiltered = brands.filter((b) => {
    const matchCategory =
      brandCategory === "ALL" || b.category === brandCategory;
    const text = (b.name || "").toLowerCase();
    return matchCategory && text.includes(searchText.toLowerCase());
  });

  return (
    <section className="brands-page">
      <h1 className="section-title">เลือกแบรนด์ที่อยากพรีออเดอร์</h1>

      {/* แถบหมวด CLOTHING / SHOSES / BAG / ACCESSORIES / OTHER */}
      <div className="brand-categories">
        {categoryTabs.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`brand-cat-btn ${
              brandCategory === cat ? "brand-cat-btn--active" : ""
            }`}
            onClick={() => setBrandCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ช่องค้นหาแบรนด์ */}
      <input
        className="search-input brand-search-input"
        placeholder="ค้นหาแบรนด์..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <div className="brands-grid">
        {brandFiltered.map((brand) => (
          <button
            key={brand.slug}
            type="button"
            className="brand-card"
            onClick={() => onSelectBrand(brand.slug)}
          >
            <div className="brand-card-inner">
              <img
                src={brand.logo}
                alt={brand.name}
                className="brand-logo"
              />
              <span className="brand-name">{brand.name}</span>
            </div>
          </button>
        ))}

        {brandFiltered.length === 0 && (
          <p className="status-text">ไม่พบแบรนด์ที่ค้นหา</p>
        )}
      </div>
    </section>
  );
}

/* ---------------- BRAND PAGE (หน้าแบรนด์ด้านใน) ---------------- */

function BrandPage({ brand }) {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [search, setSearch] = useState("");

  const categoriesOrder = [
    "ALL",
    "HOODIE",
    "SWEATER",
    "TOPS",
    "BOTTOMS",
    "JEANS",
    "BAG",
    "SHOES",
    "ACCESSORIES",
    "OTHER",
  ];

  const allProducts = Object.entries(brand.categories).flatMap(
    ([cat, list]) =>
      list.map((p) => ({
        ...p,
        _category: cat,
      }))
  );

  const productsFiltered = allProducts.filter((p) => {
    const matchCategory =
      activeCategory === "ALL" || p._category === activeCategory;
    const text = `${p.name} ${(p.details || []).join(" ")}`.toLowerCase();
    return matchCategory && text.includes(search.toLowerCase());
  });

  return (
    <section className="brand-page">
      <div className="brand-header">
        <img
          src={brand.logo}
          alt={brand.name}
          className="brand-logo-big"
        />
        <h1 className="brand-title">{brand.name}</h1>
        <a
          className="brand-line-link"
          href={brand.line_link}
          target="_blank"
          rel="noreferrer"
        >
          สั่งซื้อผ่าน LINE
        </a>
      </div>

      <div className="brand-layout">
        <aside className="sidebar">
          {categoriesOrder.map((cat) => (
            <button
              key={cat}
              className={`sidebar-item ${
                activeCategory === cat ? "is-active" : ""
              }`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat === "ALL" ? "ทั้งหมด" : cat}
            </button>
          ))}
        </aside>

        <div className="brand-content">
          <input
            className="search-input"
            placeholder="ค้นหาในแบรนด์นี้..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="products-grid">
            {productsFiltered.map((p) => (
              <ProductCard key={p.sku} product={p} />
            ))}

            {productsFiltered.length === 0 && (
              <p className="status-text">ไม่มีสินค้าในหมวดนี้</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- PRODUCT CARD ---------------- */

function ProductCard({ product }) {
  const images = product.images || [];
  const [index] = useState(0);

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        {images.length ? (
          <img
            src={images[index]}
            alt={product.name}
            className="product-image"
          />
        ) : (
          <div className="product-image placeholder">ไม่มีรูป</div>
        )}
      </div>

      <div className="product-body">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">
          ฿{product.price.toLocaleString("th-TH")}
        </p>

        <ul className="product-details">
          {product.details?.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>

        <a
          className="primary-btn full-width"
          href={product.order_link}
          target="_blank"
          rel="noreferrer"
        >
          สั่งซื้อผ่าน LINE
        </a>
      </div>
    </article>
  );
}

/* ---------------- CONTACT SECTION ---------------- */

function ContactSection() {
  return (
    <section className="contact-section">
      <h2 className="contact-title">ช่องทางติดต่อร้าน must missme</h2>
      <div className="contact-links">
        <a
          href={CONTACT_LINKS.instagram}
          target="_blank"
          rel="noreferrer"
          className="contact-link"
        >
          <span>@mustmissme.preorder</span>
        </a>
        <a
          href={CONTACT_LINKS.line}
          target="_blank"
          rel="noreferrer"
          className="contact-link"
        >
          <span>LINE : @078vlxgl</span>
        </a>
        <a
          href={CONTACT_LINKS.tiktok}
          target="_blank"
          rel="noreferrer"
          className="contact-link"
        >
          <span>TikTok : mustmissme</span>
        </a>
        <a
          href={CONTACT_LINKS.shopee}
          target="_blank"
          rel="noreferrer"
          className="contact-link"
        >
          <span>Shopee : reviewwwwwwwwww</span>
        </a>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */

function Footer() {
  return (
    <footer className="site-footer">
      <p>© 2025 must missme · ติดต่อร้านผ่าน LINE / IG / TikTok / Shopee</p>
    </footer>
  );
}

export default App;
