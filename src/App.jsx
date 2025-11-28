// src/App.jsx
import React, { useEffect, useState } from "react";

/* ---------------- GOOGLE SHEET ---------------- */

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1oC3gLe7gQniz2_86zHzO1BcAU51lHUFLMwRTfVmBK4Q/gviz/tq?tqx=out:json";

// รายการแบรนด์พื้นฐาน (โลโก้ใน public/brands)
const BASE_BRANDS = [
  { slug: "crying-center", name: "CRYING CENTER", logo: "/brands/crying-center.png" },
  { slug: "meihao-store", name: "MEIHAO STORE", logo: "/brands/meihao-store.png" },
  { slug: "neresum", name: "NERESUM", logo: "/brands/neresum.png" },
  { slug: "uncmhisex", name: "UNCMHISEX", logo: "/brands/uncmhisex.png" },
  { slug: "whoosis", name: "WHOOSIS", logo: "/brands/whoosis.png" },
  { slug: "young-stage", name: "YOUNG STAGE", logo: "/brands/young-stage.png" },
  { slug: "cgga-amass", name: "CGGA AMASS", logo: "/brands/cgga-amass.png" },
  { slug: "tgnsbrand", name: "TGNSBRAND", logo: "/brands/tgnsbrand.png" },
  { slug: "weekendhub", name: "WEEKENDHUB", logo: "/brands/weekendhub.png" },
  { slug: "iamnotbad", name: "IAMNOTBAD", logo: "/brands/iamnotbad.png" },
  { slug: "black-bb", name: "BLACK BB", logo: "/brands/black-bb.png" },
  { slug: "aonw-studio", name: "AONW STUDIO", logo: "/brands/aonw-studio.png" },
  { slug: "nely", name: "NELY", logo: "/brands/nely.png" },
  { slug: "oisis", name: "OISIS", logo: "/brands/oisis.png" },
  { slug: "tired-studio", name: "TIRED STUDIO", logo: "/brands/tired-studio.png" },
  { slug: "ezek-project", name: "EZEK PROJECT", logo: "/brands/ezek-project.png" },
  { slug: "1jinn-studio", name: "1JINN STUDIO", logo: "/brands/1jinn-studio.png" },
  { slug: "zizifei", name: "ZIZIFEI", logo: "/brands/zizifei.png" },
  { slug: "tipseven", name: "TIPSEVEN", logo: "/brands/tipseven.png" },
  { slug: "achork", name: "ACHORK", logo: "/brands/achork.png" },
  { slug: "blacklist", name: "BLACKLIST", logo: "/brands/blacklist.png" },
  { slug: "cbx-lab", name: "CBX LAB", logo: "/brands/cbx-lab.png" },
  { slug: "adidas", name: "ADIDAS", logo: "/brands/adidas.png" },
  { slug: "puma", name: "PUMA", logo: "/brands/puma.png" },
  { slug: "vans", name: "VANS", logo: "/brands/vans.png" },
  { slug: "jeep", name: "JEEP", logo: "/brands/jeep.png" },
  { slug: "cat&sofa", name: "CAT&SOFA", logo: "/brands/cat&sofa.png" },
  { slug: "devo-life", name: "DEVO LIFE", logo: "/brands/devo-life.png" },
  { slug: "lookun", name: "LOOKUN", logo: "/brands/lookun.png" },
  { slug: "masoomake", name: "MASOOMAKE", logo: "/brands/masoomake.png" },
  { slug: "mianmaomi", name: "MIANMAOMI", logo: "/brands/mianmaomi.png" },
  { slug: "old-order", name: "OLD ORDER", logo: "/brands/old-order.png" },
  { slug: "oicircle", name: "OICIRCLE", logo: "/brands/oicircle.png" },
  { slug: "gukoo", name: "GUKOO", logo: "/brands/gukoo.png" },
  { slug: "ecoday", name: "ECODAY", logo: "/brands/ecoday.png" },
  { slug: "jandress", name: "JANDRESS", logo: "/brands/jandress.png" },
  { slug: "lee", name: "LEE", logo: "/brands/lee.png" },
  { slug: "muva", name: "MUVA", logo: "/brands/muva.png" },
  { slug: "smosmos", name: "SMOSMOS", logo: "/brands/smosmos.png" },
  { slug: "toutou", name: "TOUTOU", logo: "/brands/toutou.png" },
  { slug: "oogreenapple", name: "OOGREENAPPLE", logo: "/brands/oogreenapple.png" },
  { slug: "rebbish-official", name: "REBBISH OFFICIAL", logo: "/brands/rebbish-official.png" },
  { slug: "dickies", name: "DICKIES", logo: "/brands/dickies.png" },
  { slug: "fey-tiy-studio", name: "FEY TIY STUDIO", logo: "/brands/fey-tiy-studio.png" },
  { slug: "monchhichi", name: "MONCHHICHI", logo: "/brands/monchhichi.png" },
  { slug: "chichaboom", name: "CHICHABOOM", logo: "/brands/chichaboom.png" },
  { slug: "onionion", name: "ONIONION", logo: "/brands/onionion.png" },
  { slug: "sorgenti", name: "SORGENTI", logo: "/brands/sorgenti.png" },
  { slug: "marsh&mellow", name: "MARSH&MELLOW", logo: "/brands/marsh&mellow.png" },
  { slug: "tidecolor", name: "TIDECOLOR", logo: "/brands/tidecolor.png" },
  { slug: "tbh", name: "TBH", logo: "/brands/tbh.png" },
  { slug: "martube", name: "MARTUBE", logo: "/brands/martube.png" },
  { slug: "jueves", name: "JUEVES", logo: "/brands/jueves.png" },
  { slug: "oops-day", name: "OOPS-DAY", logo: "/brands/oops-day.png" },
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

// ตัด <br> ใน details
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
  const [view, setView] = useState("home"); // 'home' | 'brands' | 'brand' | 'stock'
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

        // ตั้งค่าแบรนด์พื้นฐาน
        BASE_BRANDS.forEach((b) => {
          brandsMap[b.slug] = {
            slug: b.slug,
            name: b.name,
            logo: b.logo,
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

          const brandSlug = (c[0]?.v || "").trim();
          const brandName = (c[1]?.v || "").trim();
          const categoryRaw = (c[2]?.v || "").trim();
          const sku = (c[3]?.v || "").trim();
          const name = (c[4]?.v || "").trim();
          const price = Number(c[5]?.v || 0);
          const detailsRaw = (c[6]?.v || "").trim();
          const imagesRaw = (c[7]?.v || "").trim();
          const orderLinkRaw = (c[8]?.v || "").trim();
          const inStock = Number(c[9]?.v || 0); // คอลัมน์ INSTOCK

          if (!brandSlug || brandSlug === "brand_slug") return;
          if (!sku || !name) return;

          if (!brandsMap[brandSlug]) {
            brandsMap[brandSlug] = {
              slug: brandSlug,
              name: brandName || brandSlug,
              logo: `/brands/${brandSlug}.png`,
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

          const categoryUpper = (categoryRaw || "TOPS").toUpperCase();
          const catKey = brandsMap[brandSlug].categories[categoryUpper]
            ? categoryUpper
            : "OTHER";

          // แปลง images เป็น URL
          let images = [];
          if (imagesRaw) {
            images = imagesRaw
              .split(/\s*,\s*/)
              .map((u) => u.trim())
              .filter(Boolean)
              .map((u) => {
                if (/^https?:\/\//i.test(u)) return u;
                const catLower = catKey.toLowerCase();
                const folderName = `${brandSlug}_${catLower}`;
                return `/products:${brandSlug}/${folderName}/${u}`;
              });
          }

          brandsMap[brandSlug].categories[catKey].push({
            sku,
            name,
            price,
            details: parseDetails(detailsRaw),
            images,
            order_link: orderLinkRaw || CONTACT_LINKS.line,
            in_stock: inStock,
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
        onStock={() => {
          setView("stock");
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
              <BrandsGrid
                brands={brands}
                onSelectBrand={handleBrandClick}
              />
            )}
            {view === "brand" && activeBrand && (
              <BrandPage brand={activeBrand} />
            )}
            {view === "stock" && (
              <StockPage brands={brands} />
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

function Header({ onHome, onBrands, onStock, currentView }) {
  const goStock = onStock;

  return (
    <header className="site-header">
      <div className="header-top">
        <div className="header-top-inner">
          <div className="header-top-logo" onClick={onHome}>
            <img
              src="/logo.png"
              alt="mustmissme logo"
              className="logo-image"
            />
          </div>

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
            className={`nav-item ${
              currentView === "stock" ? "nav-item--active" : ""
            }`}
            onClick={goStock}
          >
            STOCK
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

/* ---------------- BRANDS GRID + SEARCH ---------------- */

function BrandsGrid({ brands, onSelectBrand }) {
  const [search, setSearch] = useState("");

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="brands-page">
      <h1 className="section-title">เลือกแบรนด์ที่อยากพรีออเดอร์</h1>

      <div className="brand-search-wrapper">
        <input
          className="search-input"
          placeholder="ค้นหาแบรนด์..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="brands-grid">
        {filteredBrands.map((brand) => (
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

        {filteredBrands.length === 0 && (
          <p className="no-result">ไม่พบแบรนด์นี้</p>
        )}
      </div>
    </section>
  );
}

/* ---------------- BRAND PAGE ---------------- */

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
              {cat === "ALL"
                ? "ทั้งหมด"
                : cat === "OTHER"
                ? "OTHER"
                : cat}
            </button>
          ))}
        </aside>

        <div className="brand-content">
          <input
            className="search-input"
            placeholder="ค้นหาในแบรนด์นี้..."
            value={search}
            onChange={(e) => setSearch(e
