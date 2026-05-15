import { useState } from "react";
import { PRODUCTS } from "@/data/products";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Props = {
  productId: number;
  onBack: () => void;
  cart: number[];
  onToggleCart: (id: number) => void;
};

export default function ProductPage({ productId, onBack, cart, onToggleCart }: Props) {
  const product = PRODUCTS.find((p) => p.id === productId);
  const [activeImg, setActiveImg] = useState(0);
  const [wishlist, setWishlist] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messageSent, setMessageSent] = useState(false);
  const [activeTab, setActiveTab] = useState<"desc" | "specs" | "reviews">("desc");

  if (!product) return null;

  const inCart = cart.includes(product.id);
  const formatPrice = (n: number) => n.toLocaleString("ru-RU") + " ₽";
  const similar = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessageSent(true);
      setTimeout(() => { setMessageOpen(false); setMessageSent(false); setMessage(""); }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground animate-fade-in">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-[#141414]/95 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name="ArrowLeft" size={20} />
            <span className="text-sm font-medium">Каталог</span>
          </button>
          <div className="w-px h-5 bg-border mx-1" />
          <span className="text-sm text-muted-foreground truncate max-w-xs">{product.name}</span>
          <div className="ml-auto flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full relative"
              onClick={() => onToggleCart(product.id)}
            >
              <Icon name="ShoppingCart" size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Product top section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-14">
          {/* Images */}
          <div className="space-y-3">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-card">
              <img
                src={product.images?.[activeImg] ?? product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.tag && (
                <Badge className="absolute top-4 left-4 text-xs font-bold px-3 py-1 bg-primary text-primary-foreground border-0 rounded-full">
                  {product.tag}
                </Badge>
              )}
              <button
                onClick={() => setWishlist((v) => !v)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-all"
              >
                <Icon
                  name="Heart"
                  size={18}
                  className={wishlist ? "fill-red-500 text-red-500" : "text-white"}
                />
              </button>
            </div>
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImg === i ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map((s) => (
                  <Icon
                    key={s}
                    name="Star"
                    size={14}
                    className={s <= Math.round(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted"}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold">{product.rating}</span>
              <span className="text-sm text-muted-foreground">({product.reviews} отзывов)</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black font-montserrat mb-4 leading-tight">{product.name}</h1>

            <div className="flex items-end gap-3 mb-6">
              <span className="text-3xl font-black text-foreground">{formatPrice(product.price)}</span>
              {product.oldPrice && (
                <div className="mb-1">
                  <span className="text-muted-foreground line-through text-lg">{formatPrice(product.oldPrice)}</span>
                  <span className="ml-2 text-sm font-bold text-primary">
                    −{Math.round((1 - product.price / product.oldPrice) * 100)}%
                  </span>
                </div>
              )}
            </div>

            {/* CTA */}
            <div className="flex gap-3 mb-6">
              <Button
                onClick={() => onToggleCart(product.id)}
                className={`flex-1 h-12 rounded-full font-bold text-base transition-all ${
                  inCart
                    ? "bg-secondary text-foreground hover:bg-secondary/80"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
              >
                <Icon name={inCart ? "Check" : "ShoppingCart"} size={18} className="mr-2" />
                {inCart ? "В корзине" : "В корзину"}
              </Button>
              <Button
                variant="outline"
                className="h-12 px-5 rounded-full border-border hover:bg-secondary"
                onClick={() => setMessageOpen(true)}
              >
                <Icon name="MessageCircle" size={18} className="mr-2" />
                Написать
              </Button>
            </div>

            {/* Delivery info */}
            <div className="bg-card border border-border/50 rounded-2xl p-4 space-y-3 mb-6">
              {[
                { icon: "Truck", text: "Доставка по России 3–7 дней", sub: "СДЭК, Почта России, самовывоз" },
                { icon: "ShieldCheck", text: "Гарантия подлинности", sub: "Проверено командой Рукодар" },
                { icon: "RefreshCw", text: "Возврат в течение 14 дней", sub: "Если товар не подошёл" },
              ].map((item) => (
                <div key={item.icon} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon name={item.icon} size={15} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{item.text}</p>
                    <p className="text-xs text-muted-foreground">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Seller */}
            <div className="flex items-center gap-3 bg-card border border-border/50 rounded-2xl p-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-lg font-bold text-primary shrink-0">
                {product.seller[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm">{product.seller}</p>
                <p className="text-xs text-muted-foreground">
                  Мастер с {product.sellerSince} · {product.sellerSales} продаж
                </p>
              </div>
              <button
                onClick={() => setMessageOpen(true)}
                className="text-xs text-primary font-semibold hover:underline shrink-0"
              >
                Профиль
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-10">
          <div className="flex gap-1 border-b border-border mb-6">
            {([
              { key: "desc", label: "Описание" },
              { key: "specs", label: "Характеристики" },
              { key: "reviews", label: `Отзывы (${product.reviews})` },
            ] as const).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-3 text-sm font-semibold transition-all border-b-2 -mb-px ${
                  activeTab === tab.key
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "desc" && (
            <p className="text-muted-foreground leading-relaxed max-w-2xl animate-fade-in">
              {product.description}
            </p>
          )}

          {activeTab === "specs" && (
            <div className="max-w-lg animate-fade-in">
              {product.specs?.map((spec, i) => (
                <div
                  key={i}
                  className={`flex justify-between py-3 text-sm ${i < (product.specs?.length ?? 0) - 1 ? "border-b border-border" : ""}`}
                >
                  <span className="text-muted-foreground">{spec.label}</span>
                  <span className="font-medium text-right">{spec.value}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-4 max-w-2xl animate-fade-in">
              {product.reviewsList?.map((rev, i) => (
                <div key={i} className="bg-card border border-border/50 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold">
                        {rev.author[0]}
                      </div>
                      <span className="font-semibold text-sm">{rev.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map((s) => (
                        <Icon key={s} name="Star" size={12} className={s <= rev.rating ? "fill-yellow-400 text-yellow-400" : "text-muted"} />
                      ))}
                      <span className="text-xs text-muted-foreground ml-1">{rev.date}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{rev.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Similar products */}
        {similar.length > 0 && (
          <div>
            <h2 className="text-xl font-black font-montserrat mb-5">Похожие товары</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {similar.map((p) => (
                <div
                  key={p.id}
                  onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className="bg-card rounded-2xl overflow-hidden cursor-pointer border border-border/40 hover:border-primary/40 transition-all hover:-translate-y-1 duration-200"
                >
                  <div className="aspect-square overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-muted-foreground mb-1 truncate">{p.seller}</p>
                    <p className="text-sm font-semibold line-clamp-2 mb-2">{p.name}</p>
                    <p className="text-sm font-bold">{formatPrice(p.price)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Message modal */}
      {messageOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setMessageOpen(false)} />
          <div className="relative bg-[#1a1a1a] border border-border rounded-2xl p-6 w-full max-w-md animate-scale-in">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-bold text-lg font-montserrat">Написать мастеру</h3>
                <p className="text-sm text-muted-foreground">{product.seller}</p>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setMessageOpen(false)}>
                <Icon name="X" size={18} />
              </Button>
            </div>

            {messageSent ? (
              <div className="text-center py-8 animate-fade-in">
                <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name="CheckCircle" size={28} className="text-primary" />
                </div>
                <p className="font-semibold">Сообщение отправлено!</p>
                <p className="text-sm text-muted-foreground mt-1">Мастер ответит в течение суток</p>
              </div>
            ) : (
              <>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Здравствуйте! Хочу уточнить про размер..."
                  rows={4}
                  className="w-full bg-secondary border border-border rounded-xl p-3 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground mb-4"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="w-full h-11 rounded-full font-bold bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40"
                >
                  <Icon name="Send" size={16} className="mr-2" />
                  Отправить
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
