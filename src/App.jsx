import React, { useEffect, useState } from "react";

// ---------------- GOOGLE SHEET ----------------

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1oC3gLe7gQniz2_86zHzO1BcAU51lHUFLMwRTfVmBK4Q/gviz/tq?tqx=out:json";

// รายการแบรนด์พื้นฐาน (จากไฟล์ CSV)
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
  { slug: "oisis", name: "OISIS", logo: "/brands/oisis.png" },
  { slug: "tired-studio", name: "TIRED STUDIO", logo: "/brands/tired-studio.png" },
  { slug: "ezek-project", name: "EZEK PROJECT", logo: "/brands/ezek-project.png" },
  { slug: "1jinn-studio", name: "1JINN STUDIO", logo: "/brands/1jinn-studio.png" },
  { slug: "zizifei", name: "ZIZIFEI", logo: "/brands/zizifei.png" },
  { slug: "tipseven", name: "TIPSEVEN", logo: "/brands/tipseven.png" },
  { slug: "achork", name: "ACHORK", logo: "/brands/achork.png" },
  { slug: "blacklist", name: "BLACKLIST", logo: "/brands/blacklist.png" },
  { slug: "adidas", name: "ADIDAS", logo: "/brands/adidas.png" },
  { slug: "puma", name: "PUMA", logo: "/brands/puma.png" },
  { slug: "cat&sofa", name: "CAT&SOFA", logo: "/brands/cat&sofa.png" },
  { slug: "devo-life", name: "DEVO LIFE", logo: "/brands/devo-life.png" },
  { slug: "lookun", name: "LOOKUN", logo: "/brands/lookun.png" },
  { slug: "masoomake", name: "MASOOMAKE", logo: "/brands/masoomake.png" },
  { slug: "mianmaoami", name: "MIANMAOMI", logo: "/brands/mianmaoami.png" },
  { slug: "oicircle", name: "OICIRCLE", logo: "/brands/oicircle.png" },
  { slug: "jeep", name: "JEEP", logo: "/brands/jeep.png" },
  { slug: "jandress", name: "JANDRESS", logo: "/brands/jandress.png" },
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
  { slug: "jueves", name: "JUEVES", logo: "/brands/jueves.png" },
];

// แปลงลิงก์ Google Drive → รูป
function driveToImage(url) {
  if (!url) return "";
  const m = url.match(/\/d\/([^/]+)/);
  if (m) {
    const id = m[1];
    return `https://drive.google.com/uc?export=view&id=${id}`;
  }
  return url;
}

// แปลง detail ที่มี <br> เป็น array
function parseDetails(raw) {
  if (!raw) return [];
  return raw
    .split(/<br\s*\/?>/i)
    .map((s) =>
      s
        .replace(/&nbsp;/gi, " ")
        .replace(/<\/?b>/gi, "")
        .trim()
    )
    .filter(Boolean);
}

/* ---------------- MAIN APP ---------------- */

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [view, setView] = useState("home"); // "home" | "brands" | "brand"
  const [activeBrandSlug, setActiveBrandSlug] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError("");

    fetch(SHEET_URL)
      .then((res) => {
        if (!res.ok) throw new Error("โหลดข้อมูลจาก Google Sheets ไม่ได้");
        return res.text();
      })
      .then((text) => {
        const jsonText = text.substring(
          text.indexOf("{"),
          text.lastIndexOf("}") + 1
        );
        const gviz = JSON.parse(jsonText);
        const rows = gviz.table?.rows || [];

        // 1) สร้าง brandsMap จาก BASE_BRANDS (ให้โชว์ทุกแบรนด์)
        const brandsMap = {};
        BASE_BRANDS.forEach((b) => {
          brandsMap[b.slug] = {
            slug: b.slug,
            name: b.name,
            logo: b.logo,
            line_link: "https://lin.ee/cuUJ8Zr",
            categories: {
              HOODIE: [],
              SWEATER: [],
              TOPS: [],
              BOTTOMS: [],
              JEANS: [],
              BAG: [],
              ACCESSORIES: [],
            },
          };
        });

        // 2) เติมสินค้าให้แต่ละแบรนด์จาก Google Sheets
        rows.forEach((row) => {
          const c = row.c || [];

          const brandSlug = (c[0]?.v || "").trim();
          const brandNameFromSheet = (c[1]?.v || "").trim();
          const categoryRaw = (c[2]?.v || "").trim();
          const sku = (c[3]?.v || "").trim();
          const name = (c[4]?.v || "").trim();
          const price = Number(c[5]?.v || 0);
          const detailsRaw = (c[6]?.v || "").trim();

          // ตัด header row
          if (!brandSlug || brandSlug === "brand_slug") return;

          // ถ้า brand ยังไม่มีใน BASE_BRANDS แต่มีในชีต → สร้างใหม่
          if (!brandsMap[brandSlug]) {
            brandsMap[brandSlug] = {
              slug: brandSlug,
              name: brandNameFromSheet || brandSlug,
              logo: `/brands/${brandSlug}.png`,
              line_link: "https://lin.ee/cuUJ8Zr",
              categories: {
                HOODIE: [],
                SWEATER: [],
                TOPS: [],
                BOTTOMS: [],
                JEANS: [],
                BAG: [],
                ACCESSORIES: [],
              },
            };
          }

          // ถ้าไม่มี sku หรือ ชื่อสินค้า ให้ถือว่าเป็นแถวข้อมูลแบรนด์เฉย ๆ
          if (!sku || !name) return;

          const category = (categoryRaw || "TOPS").toUpperCase();
          const img1 = driveToImage((c[7]?.v || "").trim());
          const img2 = driveToImage((c[8]?.v || "").trim());
          const img3 = driveToImage((c[9]?.v || "").trim());
          const images = [img1, img2, img3].filter(Boolean);
          const details = parseDetails(detailsRaw);

          const brand = brandsMap[brandSlug];
          const catKey = brand.categories[category] ? category : "TOPS";

          brand.categories[catKey].push({
            sku,
            name,
            price,
            details,
            images,
            order_link: "https://lin.ee/cuUJ8Zr",
          });
        });

        const result = {
          brands: Object.values(brandsMap),
        };

        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || "เกิดข้อผิดพลาด");
        setLoading(false);
      });
  }, []);

  const brands = data?.brands || [];

  const handleBrandClick = (slug) => {
    setActiveBrandSlug(slug);
    setView("brand");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const activeBrand =
    view === "brand"
      ? brands.find((b) => b.slug === activeBrandSlug)
      : null;

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

      <AnnouncementBar />

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

            {view === "brand" && !activeBrand && (
              <p className="status-text status-error">ไม่พบแบรนด์ที่เลือก</p>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

/* ---------------- HEADER ---------------- */

function Header({ onHome, onBrands, currentView }) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="logo-wrap" onClick={onHome}>
          <img src="/logo.png" alt="must missme logo" className="logo-image" />
          <div className="logo-text">
            <span className="logo-main">must missme</span>
            <span className="logo-sub">preorder • import</span>
          </div>
        </div>

        <nav className="nav-links">
          <button
            type="button"
            className={`nav-link ${currentView === "home" ? "is-active" : ""}`}
            onClick={onHome}
          >
            HOME
          </button>
          <button
            type="button"
            className={`nav-link ${currentView !== "home" ? "is-active" : ""}`}
            onClick={onBrands}
          >
            BRANDS
          </button>
        </nav>

        <div className="social-links">
          <a
            className="pill-btn"
            href="https://www.instagram.com/mustmissme.preorder?igsh=bmRncWlrdnNhcXY0"
            target="_blank"
            rel="noreferrer"
          >
            IG
          </a>
          <a
            className="pill-btn"
            href="https://www.tiktok.com/@mustmissme?_r=1&_t=ZS-91U9jIh3gcK"
            target="_blank"
            rel="noreferrer"
          >
            TikTok
          </a>
          <a
            className="pill-btn"
            href="https://lin.ee/cuUJ8Zr"
            target="_blank"
            rel="noreferrer"
          >
            LINE
          </a>
          <a
            className="pill-btn"
            href="https://s.shopee.co.th/AA7aJvl9qD"
            target="_blank"
            rel="noreferrer"
          >
            Shopee
          </a>
        </div>
      </div>
    </header>
  );
}

/* ---------------- ANNOUNCEMENT ---------------- */

function AnnouncementBar() {
  return (
    <div className="announcement">
      <p>
        ⚠ พร้อมออเดอร์: สินค้าเข้าประมาณ 10–20 วันหลังปิดรอบ · ส่งฟรีเมื่อยอด ≥
        ฿1,500
      </p>
    </div>
  );
}

/* ---------------- HOME ---------------- */

function HomeSection({ onShopNow }) {
  return (
    <section className="home-section">
      <div className="hero-card">
        <img src="/hero.png" alt="must missme hero" className="hero-image" />
      </div>
      <p className="home-intro">
        must missme • ร้านพรีออเดอร์สินค้านำเข้าจากต่างประเทศ
        สั่งซื้อผ่าน LINE ได้เลย
      </p>
      <button type="button" className="primary-btn" onClick={onShopNow}>
        ดูแบรนด์ทั้งหมด
      </button>
    </section>
  );
}

/* ---------------- BRANDS GRID ---------------- */

function BrandsGrid({ brands, onSelectBrand }) {
  return (
    <section className="brands-page">
      <h1 className="section-title">เลือกแบรนด์ที่อยากพรีออเดอร์</h1>
      <div className="brands-grid">
        {brands.map((brand) => (
          <button
            key={brand.slug}
            type="button"
            className="brand-card"
            onClick={() => onSelectBrand(brand.slug)}
          >
            <div className="brand-card-inner">
              <img src={brand.logo} alt={brand.name} className="brand-logo" />
              <span className="brand-name">{brand.name}</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

/* ---------------- BRAND PAGE ---------------- */

function BrandPage({ brand }) {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [search, setSearch] = useState("");

  const categoryOrder = [
    "ALL",
    "HOODIE",
    "SWEATER",
    "TOPS",
    "BOTTOMS",
    "JEANS",
    "BAG",
    "ACCESSORIES",
  ];

  const allProducts = Object.entries(brand.categories || {}).flatMap(
    ([categoryName, products]) =>
      (products || []).map((p) => ({
        ...p,
        _category: categoryName,
      }))
  );

  const productsFiltered = allProducts.filter((p) => {
    const matchCategory =
      activeCategory === "ALL" || p._category === activeCategory;
    const text = (p.name || "") + " " + (p.details || []).join(" ");
    const matchSearch = text.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <section className="brand-page">
      <div className="brand-header">
        <div className="brand-header-left">
          <div className="brand-logo-big-wrap">
            <img
              src={brand.logo}
              alt={brand.name}
              className="brand-logo-big"
            />
          </div>
          <div>
            <h1 className="brand-title">{brand.name}</h1>
            {brand.line_link && (
              <a
                className="brand-line-link"
                href={brand.line_link}
                target="_blank"
                rel="noreferrer"
              >
                สั่งซื้อผ่าน LINE ร้าน must missme
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="brand-layout">
        <aside className="sidebar">
          <p className="sidebar-title">หมวดหมู่</p>
          <div className="sidebar-list">
            {categoryOrder.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`sidebar-item ${
                  activeCategory === cat ? "is-active" : ""
                }`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat === "ALL" ? "ทั้งหมด" : cat}
              </button>
            ))}
          </div>
        </aside>

        <div className="brand-content">
          <div className="brand-content-top">
            <input
              className="search-input"
              placeholder="ค้นหาในแบรนด์นี้..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {brand.line_link && (
              <a
                className="primary-btn order-line-btn"
                href={brand.line_link}
                target="_blank"
                rel="noreferrer"
              >
                สั่งซื้อผ่าน LINE
              </a>
            )}
          </div>

          <div className="products-grid">
            {productsFiltered.map((p) => (
              <ProductCard key={p.sku} product={p} />
            ))}
            {productsFiltered.length === 0 && (
              <p className="status-text">
                ยังไม่มีสินค้าของแบรนด์นี้ใน Google Sheets
              </p>
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
  const [index, setIndex] = useState(0);

  const showPrev = (e) => {
    e.stopPropagation();
    if (!images.length) return;
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const showNext = (e) => {
    e.stopPropagation();
    if (!images.length) return;
    setIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        {images.length > 0 ? (
          <>
            <img
              src={images[index]}
              alt={product.name}
              className="product-image"
            />
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  className="carousel-btn prev"
                  onClick={showPrev}
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="carousel-btn next"
                  onClick={showNext}
                >
                  ›
                </button>
                <div className="carousel-dots">
                  {images.map((_, i) => (
                    <span
                      key={i}
                      className={`dot ${i === index ? "is-active" : ""}`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="product-image placeholder">ไม่มีรูป</div>
        )}
      </div>

      <div className="product-body">
        <p className="product-tag">PREORDER · 10–20 วัน</p>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">
          ฿{product.price?.toLocaleString?.("th-TH") ?? product.price}
        </p>
        <ul className="product-details">
          {product.details?.map((d, idx) => (
            <li key={idx}>{d}</li>
          ))}
        </ul>
        {product.order_link && (
          <a
            className="primary-btn full-width"
            href={product.order_link}
            target="_blank"
            rel="noreferrer"
          >
            สั่งซื้อผ่าน LINE
          </a>
        )}
      </div>
    </article>
  );
}

/* ---------------- FOOTER ---------------- */

function Footer() {
  return (
    <footer className="site-footer">
      <p>
        © 2025 must missme · ร้านพรีออเดอร์สินค้านำเข้าจากต่างประเทศ · ติดต่อผ่าน
        LINE
      </p>
    </footer>
  );
}

export default App;
