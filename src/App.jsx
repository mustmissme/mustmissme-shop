// src/App.jsx
import React, { useEffect, useState } from "react";

/* ---------------- GOOGLE SHEET ---------------- */

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1oC3gLe7gQniz2_86zHzO1BcAU51lHUFLMwRTfVmBK4Q/gviz/tq?tqx=out:json";

// BASE BRANDS + หมวดหลักสำหรับแท็บหน้า BRANDS
const BASE_BRANDS = [
  { slug: "crying-center", name: "CRYING CENTER", logo: "/brands/crying-center.png", category: "CLOTHING" },
  { slug: "meihao-store", name: "MEIHAO STORE", logo: "/brands/meihao-store.png", category: "CLOTHING" },
  { slug: "neresum", name: "NERESUM", logo: "/brands/neresum.png", category: "CLOTHING" },
  { slug: "uncmhisex", name: "UNCMHISEX", logo: "/brands/uncmhisex.png", category: "CLOTHING" },
  { slug: "whoosis", name: "WHOOSIS", logo: "/brands/whoosis.png", category: "CLOTHING" },
  { slug: "young-stage", name: "YOUNG STAGE", logo: "/brands/young-stage.png", category: "CLOTHING" },
  { slug: "cgga-amass", name: "CGGA AMASS", logo: "/brands/cgga-amass.png", category: "CLOTHING" },
  { slug: "tgnsbrand", name: "TGNSBRAND", logo: "/brands/tgnsbrand.png", category: "CLOTHING" },
  { slug: "weekendhub", name: "WEEKENDHUB", logo: "/brands/weekendhub.png", category: "CLOTHING" },
  { slug: "iamnotbad", name: "IAMNOTBAD", logo: "/brands/iamnotbad.png", category: "CLOTHING" },
  { slug: "black-bb", name: "BLACK BB", logo: "/brands/black-bb.png", category: "CLOTHING" },
  { slug: "aonw-studio", name: "AONW STUDIO", logo: "/brands/aonw-studio.png", category: "CLOTHING" },
  { slug: "nely", name: "NELY", logo: "/brands/nely.png", category: "CLOTHING" },
  { slug: "oisis", name: "OISIS", logo: "/brands/oisis.png", category: "CLOTHING" },
  { slug: "tired-studio", name: "TIRED STUDIO", logo: "/brands/tired-studio.png", category: "CLOTHING" },
  { slug: "ezek-project", name: "EZEK PROJECT", logo: "/brands/ezek-project.png", category: "CLOTHING" },
  { slug: "1jinn-studio", name: "1JINN STUDIO", logo: "/brands/1jinn-studio.png", category: "CLOTHING" },
  { slug: "zizifei", name: "ZIZIFEI", logo: "/brands/zizifei.png", category: "CLOTHING" },
  { slug: "achork", name: "ACHORK", logo: "/brands/achork.png", category: "CLOTHING" },
  { slug: "blacklists", name: "BLACKLISTS", logo: "/brands/blacklists.png", category: "CLOTHING" },
  { slug: "ariseism", name: "ARISEISM", logo: "/brands/ariseism.png", category: "CLOTHING" },

  // SHOES
  { slug: "adidas", name: "ADIDAS", logo: "/brands/adidas.png", category: "SHOES" },
  { slug: "puma", name: "PUMA", logo: "/brands/puma.png", category: "SHOES" },
  { slug: "vans", name: "VANS", logo: "/brands/vans.png", category: "SHOES" },
  { slug: "jeep", name: "JEEP", logo: "/brands/jeep.png", category: "SHOES" },
  { slug: "cat&sofa", name: "CAT&SOFA", logo: "/brands/cat&sofa.png", category: "SHOES" },
  { slug: "devo-life", name: "DEVO LIFE", logo: "/brands/devo-life.png", category: "SHOES" },
  { slug: "lookun", name: "LOOKUN", logo: "/brands/lookun.png", category: "SHOES" },
  { slug: "masoomake", name: "MASOOMAKE", logo: "/brands/masoomake.png", category: "SHOES" },
  { slug: "mianmaomi", name: "MIANMAOMI", logo: "/brands/mianmaomi.png", category: "SHOES" },
  { slug: "oicircle", name: "OICIRCLE", logo: "/brands/oicircle.png", category: "SHOES" },
  { slug: "gukoo", name: "GUKOO", logo: "/brands/gukoo.png", category: "SHOES" },

  // BAG / ACCESSORIES / OTHER
  { slug: "lee", name: "LEE", logo: "/brands/lee.png", category: "BAG" },
  { slug: "jandress", name: "JANDRESS", logo: "/brands/jandress.png", category: "BAG" },
  { slug: "muva", name: "MUVA", logo: "/brands/muva.png", category: "BAG" },
  { slug: "smosmos", name: "SMOSMOS", logo: "/brands/smosmos.png", category: "BAG" },
  { slug: "toutou", name: "TOUTOU", logo: "/brands/toutou.png", category: "BAG" },
  { slug: "oogreenapple", name: "OOGREENAPPLE", logo: "/brands/oogreenapple.png", category: "BAG" },
  { slug: "rebbish-official", name: "REBBISH OFFICIAL", logo: "/brands/rebbish-official.png", category: "BAG" },
  { slug: "tipseven", name: "TIPSEVEN", logo: "/brands/tipseven.png", category: "ACCESSORIES" },
  { slug: "dickies", name: "DICKIES", logo: "/brands/dickies.png", category: "ACCESSORIES" },
  { slug: "fey-tiy-studio", name: "FEY TIY STUDIO", logo: "/brands/fey-tiy-studio.png", category: "ACCESSORIES" },
  { slug: "monchhichi", name: "MONCHHICHI", logo: "/brands/monchhichi.png", category: "ACCESSORIES" },
  { slug: "chichaboom", name: "CHICHABOOM", logo: "/brands/chichaboom.png", category: "ACCESSORIES" },
  { slug: "onionion", name: "ONIONION", logo: "/brands/onionion.png", category: "ACCESSORIES" },
  { slug: "sorgenti", name: "SORGENTI", logo: "/brands/sorgenti.png", category: "ACCESSORIES" },
  { slug: "marsh&mellow", name: "MARSH&MELLOW", logo: "/brands/marsh&mellow.png", category: "ACCESSORIES" },
  { slug: "tidecolor", name: "TIDECOLOR", logo: "/brands/tidecolor.png", category: "ACCESSORIES" },
  { slug: "lunier", name: "LUNIER", logo: "/brands/lunier.png", category: "ACCESSORIES" },
  { slug: "tbh", name: "TBH", logo: "/brands/tbh.png", category: "OTHER" },
  { slug: "martube", name: "MARTUBE", logo: "/brands/martube.png", category: "OTHER" },
  { slug: "jueves", name: "JUEVES", logo: "/brands/jueves.png", category: "OTHER" },
  { slug: "oops-day", name: "OOPS-DAY", logo: "/brands/oops-day.png", category: "OTHER" },
  { slug: "rolincube", name: "ROLINCUBE", logo: "/brands/rolincube.png", category: "OTHER" },

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
            brand_category: b.category || "OTHER", // ใช้สำหรับแท็บหน้า BRANDS
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
          const inStock = Number(c[9]?.v || 0); // INSTOCK

          if (!brandSlug || brandSlug === "brand_slug") return;
          if (!sku || !name) return;

          if (!brandsMap[brandSlug]) {
            // ถ้า brand ใหม่ที่ไม่ได้อยู่ใน BASE_BRANDS
            brandsMap[brandSlug] = {
              slug: brandSlug,
              name: brandName || brandSlug,
              logo: `/brands/${brandSlug}.png`,
              brand_category: "OTHER",
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

          let images = [];
if (imagesRaw) {
  images = imagesRaw
    .split(/\s*,\s*/)     // แยกด้วย comma
    .map((u) => u.trim())
    .filter(Boolean)
    .map((u) => {
      if (/^https?:\/\//i.test(u)) return u;
      return `/products-${brandSlug}/${u}`;  
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
              <BrandsGrid brands={brands} onSelectBrand={handleBrandClick} />
            )}
            {view === "brand" && activeBrand && (
              <BrandPage brand={activeBrand} />
            )}
            {view === "stock" && <StockPage brands={brands} />}
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
  return (
    <header className="site-header">
      {/* แถบบนพื้นเหลือง */}
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

      {/* แถบล่างพื้นชมพู */}
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
            onClick={onStock}
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
        mustmissme • ร้านพรีออเดอร์สินค้านำเข้าจากต่างประเทศ
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

  const categoryTabs = ["ALL", "CLOTHING", "SHOES", "BAG", "ACCESSORIES", "OTHER"];

  const brandFiltered = brands.filter((b) => {
    const matchCategory =
      brandCategory === "ALL" || b.brand_category === brandCategory;
    const text = (b.name || "").toLowerCase();
    return matchCategory && text.includes(searchText.toLowerCase());
  });

  return (
    <section className="brands-page">
      <h1 className="section-title">เลือกแบรนด์ที่อยากพรีออเดอร์</h1>

      <input
        className="search-input brand-search-input"
        placeholder="ค้นหาแบรนด์..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

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

      <div className="brands-grid">
        {brandFiltered.map((brand) => (
          <button
            key={brand.slug}
            type="button"
            className="brand-card"
            onClick={() => onSelectBrand(brand.slug)}
          >
            <div className="brand-card-inner">
              <div className="brand-logo-frame">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="brand-logo"
                />
              </div>
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
        _brand: brand.name,
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

/* ---------------- STOCK PAGE ---------------- */

function StockPage({ brands }) {
  const [search, setSearch] = useState("");

  const allProducts = brands.flatMap((brand) =>
    Object.entries(brand.categories).flatMap(([cat, list]) =>
      list.map((p) => ({
        ...p,
        _brand: brand.name,
        _category: cat,
      }))
    )
  );

  const stockProducts = allProducts.filter(
    (p) => Number(p.in_stock) > 0
  );

  const filtered = stockProducts.filter((p) => {
    const text = `${p.name} ${(p.details || []).join(" ")} ${p._brand}`.toLowerCase();
    return text.includes(search.toLowerCase());
  });

  return (
    <section className="stock-page">
      <h1 className="section-title">สินค้าพร้อมส่ง (STOCK)</h1>
      <p className="section-subtitle">รวมสินค้าที่มีสต็อกพร้อมส่ง</p>

      <div className="brand-search-wrapper">
        <input
          className="search-input brand-search-input"
          placeholder="ค้นหาสินค้าพร้อมส่ง..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <p className="status-text">
          ยังไม่ได้ตั้งค่าสินค้าพร้อมส่งในชีต
          (ใส่ค่า 1 ในคอลัมน์ INSTOCK แถวสินค้าที่ต้องการ)
        </p>
      ) : (
        <div className="products-grid">
          {filtered.map((p) => (
            <ProductCard key={`${p.sku}-stock`} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}

/* ---------------- PRODUCT CARD ---------------- */
import React, { useState } from "react";

function ProductCard({ product }) {
  const images = product.images || [];
  const [index, setIndex] = useState(0);

  const prev = () => {
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  };

  const next = () => {
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  };

  return (
    <article className="product-card">
      
      {/* --- IMAGE CAROUSEL --- */}
      <div className="carousel-container">
        {images.length > 0 ? (
          <>
<img
  src={`/products-${product.brand}/${product.brand}_${product.category}/${images[index]}`}
  alt={product.name}
  className="carousel-image"
/>

            {/* ปุ่มเลื่อนซ้ายขวา */}
            {images.length > 1 && (
              <>
                <button className="carousel-btn left" onClick={prev}>❮</button>
                <button className="carousel-btn right" onClick={next}>❯</button>
              </>
            )}

            {/* จุดบอก index */}
            <div className="carousel-dots">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={`dot ${i === index ? "active" : ""}`}
                  onClick={() => setIndex(i)}
                ></span>
              ))}
            </div>
          </>
        ) : (
          <div className="product-image placeholder">ไม่มีรูป</div>
        )}
      </div>

      {/* --- DETAIL --- */}
      <div className="product-body">
        {product._brand && <p className="product-brand">{product._brand}</p>}

        <h3 className="product-name">{product.name}</h3>

        <p className="product-price">฿{product.price.toLocaleString("th-TH")}</p>

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

export default ProductCard;

/* ---------------- CONTACT SECTION ---------------- */

function ContactSection() {
  return (
    <section className="contact-section">
      <h2 className="contact-title">ช่องทางติดต่อร้าน mustmissme</h2>
      <div className="contact-links">
        <a
          href={CONTACT_LINKS.instagram}
          target="_blank"
          rel="noreferrer"
          className="contact-link"
        >
          <span>Instagram : mustmissme.preorder</span>
        </a>
        <a
          href={CONTACT_LINKS.line}
          target="_blank"
          rel="noreferrer"
          className="contact-link"
        >
          <span>LINE : @mustmissme</span>
        </a>
        <a
          href={CONTACT_LINKS.tiktok}
          target="_blank"
          rel="noreferrer"
          className="contact-link"
        >
          <span>TikTok : mustmissme.preorder</span>
        </a>
        <a
          href={CONTACT_LINKS.shopee}
          target="_blank"
          rel="noreferrer"
          className="contact-link"
        >
          <span>Shopee : mustmissme</span>
        </a>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */

function Footer() {
  return (
    <footer className="site-footer">
      <p>
        © 2025 mustmissme · ร้านพรีออเดอร์สินค้านำเข้าจากต่างประเทศ ติดต่อร้านผ่านทาง LINE
      </p>
    </footer>
  );
}

export default App;
