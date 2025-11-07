import React, { useEffect, useMemo, useState } from "react";

const CATEGORY_KEYS = [
  "HOODIE",
  "SWEATER",
  "TOPS",
  "BOTTOMS",
  "JEANS",
  "BAG",
  "ACCESSORIES"
];

function formatTHB(n) {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0
  }).format(n);
}

function toThaiLabel(cat) {
  switch (cat) {
    case "HOODIE":
      return "Hoodie";
    case "SWEATER":
      return "Sweater";
    case "TOPS":
      return "Tops";
    case "BOTTOMS":
      return "Bottoms";
    case "JEANS":
      return "Jeans";
    case "BAG":
      return "Bag";
    case "ACCESSORIES":
      return "Accessories";
    default:
      return cat;
  }
}

export default function App() {
  const [view, setView] = useState("home"); // home | brands | brand
  const [brands, setBrands] = useState([]);
  const [activeBrand, setActiveBrand] = useState(null);
  const [activeCat, setActiveCat] = useState("ALL");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => {
        setBrands(data.brands || []);
      })
      .catch((err) => {
        console.error("โหลด products.json ไม่ได้", err);
      });
  }, []);

  const goHome = () => {
    setView("home");
    setActiveBrand(null);
    setActiveCat("ALL");
    setSearch("");
  };

  const goBrands = () => {
    setView("brands");
    setActiveBrand(null);
    setActiveCat("ALL");
    setSearch("");
  };

  const openBrand = (slug) => {
    const b = brands.find((x) => x.slug === slug);
    if (!b) return;
    setActiveBrand(b);
    setActiveCat("ALL");
    setSearch("");
    setView("brand");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const brandProducts = useMemo(() => {
    if (!activeBrand) return [];
    const cats = activeBrand.categories || {};
    let list = [];

    CATEGORY_KEYS.forEach((key) => {
      const items = cats[key] || [];
      items.forEach((p) => {
        list.push({ ...p, category: key });
      });
    });

    if (activeCat !== "ALL") {
      list = list.filter((p) => p.category === activeCat);
    }

    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter((p) => {
        const text =
          (p.name || "") +
          " " +
          (p.sku || "") +
          " " +
          (Array.isArray(p.details) ? p.details.join(" ") : "");
        return text.toLowerCase().includes(q);
      });
    }

    return list;
  }, [activeBrand, activeCat, search]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FFF7CC",
        fontFamily: "'Prompt', system-ui, -apple-system, BlinkMacSystemFont"
      }}
    >
      {/* HEADER */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          backdropFilter: "blur(10px)",
          background: "rgba(255,247,204,0.98)",
          borderBottom: "1px solid #ffd4e5"
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "10px 16px",
            display: "flex",
            alignItems: "center",
            gap: "24px"
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer"
            }}
            onClick={goHome}
          >
            <img
              src="/logo.png"
              alt="must missme"
              style={{ height: 40, width: "auto" }}
            />
            <div style={{ lineHeight: 1 }}>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 20,
                  color: "#ff4f9a"
                }}
              >
                must missme
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "#ff7bb5"
                }}
              >
                preorder • import
              </div>
            </div>
          </div>

          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "18px",
              fontSize: 14,
              fontWeight: 600
            }}
          >
            <span
              onClick={goHome}
              style={{
                cursor: "pointer",
                color: view === "home" ? "#ff4f9a" : "#ff7bb5",
                textDecoration: view === "home" ? "underline" : "none"
              }}
            >
              HOME
            </span>
            <span
              onClick={goBrands}
              style={{
                cursor: "pointer",
                color:
                  view === "brands" || view === "brand"
                    ? "#ff4f9a"
                    : "#ff7bb5",
                textDecoration:
                  view === "brands" || view === "brand"
                    ? "underline"
                    : "none",
                marginLeft: "6px"
              }}
            >
              BRANDS
            </span>
          </nav>

          <div style={{ flex: 1 }} />

          <div
            style={{
              display: "flex",
              gap: 6,
              fontSize: 11
            }}
          >
            <SocialChip
              label="IG"
              href="https://www.instagram.com/mustmissme.preorder"
            />
            <SocialChip
              label="TikTok"
              href="https://www.tiktok.com/@mustmissme"
            />
            <SocialChip label="LINE" href="https://lin.ee/cuUJ8Zr" />
            <SocialChip
              label="Shopee"
              href="https://s.shopee.co.th/AA7aJvl9qD"
            />
          </div>
        </div>

        <div
          style={{
            background: "#ffe0f0",
            borderTop: "1px solid #ffd4e5",
            borderBottom: "1px solid #ffd4e5",
            fontSize: 13,
            color: "#ff4f9a",
            textAlign: "center",
            padding: "6px 10px"
          }}
        >
          ⚠️ พรีออเดอร์: สินค้าเข้าประมาณ 10–20 วันหลังปิดรอบ · ส่งฟรีเมื่อยอด ≥{" "}
          {formatTHB(1500)}
        </div>
      </header>

      {/* CONTENT */}
      {view === "home" && <HomeHero />}

      {view === "brands" && (
        <BrandsGrid brands={brands} onOpenBrand={openBrand} />
      )}

      {view === "brand" && activeBrand && (
        <BrandPage
          brand={activeBrand}
          activeCat={activeCat}
          setActiveCat={setActiveCat}
          search={search}
          setSearch={setSearch}
          products={brandProducts}
        />
      )}

      {/* FOOTER */}
      <footer
        style={{
          marginTop: 40,
          padding: "18px 10px 26px",
          fontSize: 12,
          color: "#ff4f9a",
          textAlign: "center",
          borderTop: "1px solid #ffe0f0",
          background: "rgba(255,247,204,0.96)"
        }}
      >
        © {new Date().getFullYear()} must missme • ร้านพรีออเดอร์สินค้านำเข้าจากต่างประเทศ •
        ติดต่อผ่าน{" "}
        <a
          href="https://lin.ee/cuUJ8Zr"
          target="_blank"
          rel="noreferrer"
          style={{ color: "#ff4f9a", textDecoration: "underline" }}
        >
          LINE
        </a>
      </footer>
    </div>
  );
}

/* ---------- Components ---------- */

function SocialChip({ label, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{
        padding: "4px 10px",
        borderRadius: 999,
        border: "1px solid #ffd4e5",
        color: "#ff4f9a",
        textDecoration: "none",
        background: "#fff7ff"
      }}
    >
      {label}
    </a>
  );
}

function HomeHero() {
  return (
    <main
      style={{
        maxWidth: "1200px",
        margin: "18px auto 40px",
        padding: "0 16px"
      }}
    >
      <div
        style={{
          overflow: "hidden",
          borderRadius: 24,
          border: "1px solid #ffe0f0",
          background: "#fff"
        }}
      >
        <img
          src="/hero.png"
          alt="must missme preorder"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>
    </main>
  );
}

function BrandsGrid({ brands, onOpenBrand }) {
  return (
    <main
      style={{
        maxWidth: "1200px",
        margin: "24px auto 40px",
        padding: "0 16px"
      }}
    >
      <h2
        style={{
          fontSize: 20,
          fontWeight: 700,
          color: "#ff4f9a",
          marginBottom: 16
        }}
      >
        เลือกแบรนด์ที่อยากพรีออเดอร์
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(160px, 1fr))",
          gap: 16
        }}
      >
        {brands.map((b) => (
          <div
            key={b.slug}
            onClick={() => onOpenBrand(b.slug)}
            style={{
              cursor: "pointer",
              padding: "16px 10px",
              borderRadius: 18,
              background: "#fff7ff",
              border: "1px solid #ffd4e5",
              textAlign: "center",
              transition: "all 0.18s ease",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8
            }}
          >
            {b.logo && (
              <img
                src={b.logo}
                alt={b.name}
                style={{
                  maxWidth: 96,
                  maxHeight: 64,
                  objectFit: "contain",
                  marginBottom: 6
                }}
              />
            )}
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#ff4f9a"
              }}
            >
              {b.name}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

function BrandPage({
  brand,
  activeCat,
  setActiveCat,
  search,
  setSearch,
  products
}) {
  return (
    <main
      style={{
        maxWidth: "1200px",
        margin: "24px auto 40px",
        padding: "0 16px"
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 18
        }}
      >
        {brand.logo && (
          <img
            src={brand.logo}
            alt={brand.name}
            style={{
              width: 70,
              height: 70,
              objectFit: "contain",
              borderRadius: 14,
              background: "#ffffff",
              border: "1px solid #ffd4e5",
              padding: 8
            }}
          />
        )}
        <div>
          <h1
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#ff4f9a",
              margin: 0,
              textTransform: "uppercase"
            }}
          >
            {brand.name}
          </h1>
          {brand.line_link && (
            <a
              href={brand.line_link}
              target="_blank"
              rel="noreferrer"
              style={{
                fontSize: 12,
                color: "#ff4f9a",
                textDecoration: "underline"
              }}
            >
              สั่งซื้อผ่าน LINE ร้าน must missme
            </a>
          )}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "240px 1fr",
          gap: 20,
          alignItems: "flex-start"
        }}
      >
        {/* Category sidebar */}
        <aside
          style={{
            padding: 16,
            borderRadius: 18,
            background: "#fff7ff",
            border: "1px solid #ffd4e5",
            fontSize: 13
          }}
        >
          <div
            style={{
              fontWeight: 700,
              color: "#ff4f9a",
              marginBottom: 10
            }}
          >
            หมวดหมู่
          </div>
          <button
            onClick={() => setActiveCat("ALL")}
            style={catButtonStyle(activeCat === "ALL")}
          >
            ทั้งหมด
          </button>
          {CATEGORY_KEYS.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              style={catButtonStyle(activeCat === cat)}
            >
              {toThaiLabel(cat)}
            </button>
          ))}
        </aside>

        {/* Products */}
        <section>
          <div
            style={{
              marginBottom: 14,
              display: "flex",
              gap: 10,
              alignItems: "center"
            }}
          >
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ค้นหาในแบรนด์นี้..."
              style={{
                flex: 1,
                padding: "9px 12px",
                borderRadius: 999,
                border: "1px solid #ffd4e5",
                fontSize: 13
              }}
            />
            {brand.line_link && (
              <a
                href={brand.line_link}
                target="_blank"
                rel="noreferrer"
                style={{
                  padding: "9px 18px",
                  borderRadius: 999,
                  border: "none",
                  background: "#ff4f9a",
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: 600,
                  textDecoration: "none",
                  whiteSpace: "nowrap"
                }}
              >
                สั่งซื้อผ่าน LINE
              </a>
            )}
          </div>

          {products.length === 0 ? (
            <div
              style={{
                fontSize: 13,
                color: "#ff7bb5",
                paddingTop: 10
              }}
            >
              ยังไม่มีสินค้าภายใต้หมวดนี้ในระบบ ลองเลือกหมวดอื่น
              หรือติดต่อแอดมินทาง LINE ได้เลยค่ะ
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(230px, 1fr))",
                gap: 16
              }}
            >
              {products.map((p) => (
                <ProductCard
                  key={p.sku || p.name}
                  product={p}
                  brandLine={brand.line_link}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function ProductCard({ product, brandLine }) {
  const images = Array.isArray(product.images)
    ? product.images
    : product.image
    ? [product.image]
    : [];

  const [index, setIndex] = useState(0);

  const hasImages = images.length > 0;

  const go = (dir) => {
    if (!hasImages) return;
    setIndex((prev) => {
      const next = prev + dir;
      if (next < 0) return images.length - 1;
      if (next >= images.length) return 0;
      return next;
    });
  };

  return (
    <div
      style={{
        borderRadius: 18,
        background: "#fff7ff",
        border: "1px solid #ffd4e5",
        padding: 10,
        display: "flex",
        flexDirection: "column",
        gap: 8
      }}
    >
      {/* รูป + สไลด์ */}
      <div
        style={{
          position: "relative",
          borderRadius: 14,
          background: "#ffe6f2",
          height: 190,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden"
        }}
      >
        {hasImages ? (
          <img
            src={images[index]}
            alt={product.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />
        ) : (
          <span
            style={{
              fontSize: 11,
              color: "#ff9fcb"
            }}
          >
            เพิ่มรูปใน products.json
          </span>
        )}

        {images.length > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              style={slideArrowStyle("left")}
            >
              ‹
            </button>
            <button
              onClick={() => go(1)}
              style={slideArrowStyle("right")}
            >
              ›
            </button>
            <div
              style={{
                position: "absolute",
                bottom: 6,
                left: 0,
                right: 0,
                display: "flex",
                justifyContent: "center",
                gap: 4
              }}
            >
              {images.map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background:
                      i === index ? "#ff4f9a" : "#ffd4e5"
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div
        style={{
          fontSize: 10,
          color: "#ff4f9a",
          fontWeight: 600
        }}
      >
        PREORDER · 10–20 วัน
      </div>
      <div
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: "#ff4f9a"
        }}
      >
        {product.name}
      </div>
      <div
        style={{
          fontSize: 12,
          color: "#ff7bb5",
          fontWeight: 600
        }}
      >
        {formatTHB(product.price)}
      </div>

      {Array.isArray(product.details) && product.details.length > 0 && (
        <ul
          style={{
            paddingLeft: 16,
            margin: "2px 0 4px",
            fontSize: 10,
            color: "#ff7bb5"
          }}
        >
          {product.details.map((d, i) => (
            <li key={i}>{d}</li>
          ))}
        </ul>
      )}

      <div style={{ marginTop: 6 }}>
        <a
          href={product.order_link || brandLine}
          target="_blank"
          rel="noreferrer"
          style={{
            display: "block",
            width: "100%",
            textAlign: "center",
            padding: "8px 0",
            borderRadius: 999,
            background: "#ff4f9a",
            color: "#fff",
            fontSize: 12,
            fontWeight: 600,
            textDecoration: "none"
          }}
        >
          สั่งซื้อผ่าน LINE
        </a>
      </div>
    </div>
  );
}

function slideArrowStyle(side) {
  return {
    position: "absolute",
    top: "50%",
    [side]: 6,
    transform: "translateY(-50%)",
    width: 22,
    height: 22,
    borderRadius: "50%",
    border: "none",
    background: "rgba(255,255,255,0.9)",
    color: "#ff4f9a",
    fontSize: 16,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0
  };
}

function catButtonStyle(active) {
  return {
    display: "block",
    width: "100%",
    textAlign: "left",
    padding: "7px 10px",
    marginBottom: 6,
    borderRadius: 999,
    border: "none",
    fontSize: 12,
    cursor: "pointer",
    background: active ? "#ff4f9a" : "#ffffff",
    color: active ? "#ffffff" : "#ff4f9a",
    boxShadow: active ? "0 2px 6px rgba(0,0,0,0.08)" : "none"
  };
}
