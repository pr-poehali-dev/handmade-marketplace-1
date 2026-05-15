import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PRODUCTS, CATEGORIES, SORT_OPTIONS } from "@/data/products";
import ProductPage from "@/pages/ProductPage";
import CheckoutPage from "@/pages/CheckoutPage";

export default function Index() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sort, setSort] = useState("popular");
  const [cart, setCart] = useState<number[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [checkout, setCheckout] = useState(false);

  const filtered = PRODUCTS.filter((p) => {
    const matchCat = activeCategory === "all" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  }).sort((a, b) => {
    if (sort === "price_asc") return a.price - b.price;
    if (sort === "price_desc") return b.price - a.price;
    if (sort === "new") return b.id - a.id;
    return b.reviews - a.reviews;
  });

  const toggleCart = (id: number) => {
    setCart((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  const toggleWishlist = (id: number) => {
    setWishlist((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  const formatPrice = (n: number) => n.toLocaleString("ru-RU") + " ₽";

  if (checkout) {
    return (
      <CheckoutPage
        cart={cart}
        onBack={() => { setCheckout(false); setCartOpen(true); }}
        onSuccess={() => { setCheckout(false); setCart([]); setCartOpen(false); window.scrollTo({ top: 0 }); }}
      />
    );
  }

  if (selectedProduct !== null) {
    return (
      <ProductPage
        productId={selectedProduct}
        onBack={() => setSelectedProduct(null)}
        cart={cart}
        onToggleCart={toggleCart}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-[#141414]/95 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">
          <div className="flex items-center gap-2 mr-4 shrink-0">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Icon name="Sparkles" size={16} className="text-primary-foreground" />
            </div>
            <span className="font-bold text-lg tracking-tight font-montserrat">Рукодар</span>
          </div>

          <div className="flex-1 relative max-w-lg">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Найти товар, мастера..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-secondary border-0 rounded-full h-9 text-sm placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-primary"
            />
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full relative"
              onClick={() => setCartOpen(!cartOpen)}
            >
              <Icon name="ShoppingCart" size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Icon name="User" size={20} />
            </Button>
            <Button className="rounded-full h-9 px-5 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 hidden sm:flex">
              Продать
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://cdn.poehali.dev/projects/8cda554e-1afa-4bc5-856e-762f869bb997/files/a934ea07-4a5f-4d82-9371-72ce316b1ab2.jpg)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-background" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 animate-fade-in">
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Хендмэйд-маркетплейс</p>
          <h1 className="text-4xl sm:text-5xl font-black mb-4 leading-tight font-montserrat">
            Вещи с душой,<br />сделанные руками
          </h1>
          <p className="text-muted-foreground text-lg mb-8 max-w-md">
            Одежда, украшения, картины и музыкальные инструменты от талантливых мастеров России
          </p>
          <div className="flex gap-3 flex-wrap">
            <Button className="rounded-full px-8 h-12 text-base font-bold bg-primary text-primary-foreground hover:bg-primary/90">
              Смотреть каталог
            </Button>
            <Button
              variant="outline"
              className="rounded-full px-8 h-12 text-base font-semibold border-white/30 text-white bg-transparent hover:bg-white/10 hover:text-white"
            >
              Стать мастером
            </Button>
          </div>

          <div className="flex gap-10 mt-12">
            {[["12 000+", "товаров"], ["3 400+", "мастеров"], ["48 000+", "покупателей"]].map(([num, label]) => (
              <div key={label}>
                <div className="text-2xl font-black text-primary font-montserrat">{num}</div>
                <div className="text-sm text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
              }`}
            >
              <Icon name={cat.icon} size={15} />
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sort bar */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
          <p className="text-muted-foreground text-sm">
            Найдено <span className="text-foreground font-semibold">{filtered.length}</span> товаров
          </p>
          <div className="flex gap-1.5 flex-wrap">
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSort(opt.value)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  sort === opt.value
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products grid — 2 колонки, крупные карточки */}
        <div className="grid grid-cols-2 gap-4">
          {filtered.map((product, i) => (
            <div
              key={product.id}
              onClick={() => { setSelectedProduct(product.id); window.scrollTo({ top: 0 }); }}
              className="bg-card rounded-3xl overflow-hidden cursor-pointer border border-border/40 hover:border-primary/30 transition-all hover:-translate-y-1 duration-200"
              style={{ animation: `slideUp 0.4s ease ${i * 60}ms both` }}
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                {product.tag && (
                  <Badge className="absolute top-3 left-3 text-xs font-bold px-3 py-1 bg-primary text-primary-foreground border-0 rounded-full">
                    {product.tag}
                  </Badge>
                )}
                <button
                  onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center transition-all hover:bg-black/70"
                >
                  <Icon
                    name="Heart"
                    size={16}
                    className={wishlist.includes(product.id) ? "fill-red-500 text-red-500" : "text-white"}
                  />
                </button>
                {/* Gradient overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-4">
                  <div className="flex items-center gap-1 mb-1">
                    <Icon name="Star" size={11} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium text-white">{product.rating}</span>
                    <span className="text-xs text-white/60">({product.reviews})</span>
                  </div>
                  <p className="text-white font-bold text-sm leading-snug line-clamp-2">{product.name}</p>
                </div>
              </div>

              <div className="p-4">
                <p className="text-xs text-muted-foreground mb-3 truncate">{product.seller}</p>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-xl font-black text-foreground">{formatPrice(product.price)}</div>
                    {product.oldPrice && (
                      <div className="text-xs text-muted-foreground line-through">{formatPrice(product.oldPrice)}</div>
                    )}
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleCart(product.id); }}
                    className={`w-11 h-11 rounded-full flex items-center justify-center transition-all text-base font-bold ${
                      cart.includes(product.id)
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground"
                    }`}
                  >
                    <Icon name={cart.includes(product.id) ? "Check" : "Plus"} size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground animate-fade-in">
            <Icon name="SearchX" size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium">Ничего не найдено</p>
            <p className="text-sm mt-1">Попробуйте изменить фильтры или поисковый запрос</p>
          </div>
        )}
      </main>

      {/* Cart drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setCartOpen(false)}
          />
          <div className="relative w-full max-w-sm bg-[#181818] border-l border-border flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h2 className="font-bold text-lg font-montserrat">Корзина</h2>
              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setCartOpen(false)}>
                <Icon name="X" size={20} />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {cart.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground">
                  <Icon name="ShoppingCart" size={40} className="mx-auto mb-3 opacity-30" />
                  <p>Корзина пуста</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {PRODUCTS.filter((p) => cart.includes(p.id)).map((p) => (
                    <div key={p.id} className="flex gap-3 bg-secondary rounded-xl p-3">
                      <img src={p.image} alt={p.name} className="w-16 h-16 rounded-lg object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold line-clamp-2">{p.name}</p>
                        <p className="text-primary font-bold text-sm mt-1">{formatPrice(p.price)}</p>
                      </div>
                      <button
                        onClick={() => toggleCart(p.id)}
                        className="text-muted-foreground hover:text-foreground shrink-0 self-start mt-1"
                      >
                        <Icon name="X" size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-5 border-t border-border">
                <div className="flex justify-between mb-4">
                  <span className="text-muted-foreground">Итого</span>
                  <span className="font-bold text-lg">
                    {formatPrice(PRODUCTS.filter((p) => cart.includes(p.id)).reduce((s, p) => s + p.price, 0))}
                  </span>
                </div>
                <Button
                  onClick={() => { setCartOpen(false); setCheckout(true); window.scrollTo({ top: 0 }); }}
                  className="w-full rounded-full h-12 font-bold bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Оформить заказ
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 sm:grid-cols-4 gap-8">
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
                <Icon name="Sparkles" size={13} className="text-primary-foreground" />
              </div>
              <span className="font-bold font-montserrat">Рукодар</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Маркетплейс уникальных изделий ручной работы от мастеров со всей России
            </p>
          </div>
          {[
            { title: "Покупателям", links: ["Как купить", "Доставка", "Возврат", "Отзывы"] },
            { title: "Мастерам", links: ["Стать мастером", "Условия", "Комиссия", "Помощь"] },
            { title: "Компания", links: ["О нас", "Блог", "Контакты", "Партнёрам"] },
          ].map((col) => (
            <div key={col.title}>
              <p className="font-semibold text-sm mb-3">{col.title}</p>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 pt-6 border-t border-border text-xs text-muted-foreground flex flex-wrap justify-between gap-2">
          <span>© 2026 Рукодар. Все права защищены.</span>
          <div className="flex gap-3">
            <a href="#" className="hover:text-foreground transition-colors">Конфиденциальность</a>
            <a href="#" className="hover:text-foreground transition-colors">Оферта</a>
          </div>
        </div>
      </footer>
    </div>
  );
}