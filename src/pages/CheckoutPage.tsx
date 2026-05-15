import { useState } from "react";
import { PRODUCTS } from "@/data/products";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  cart: number[];
  onBack: () => void;
  onSuccess: () => void;
};

const DELIVERY_OPTIONS = [
  { id: "cdek", label: "СДЭК", desc: "3–5 дней", price: 350, icon: "Package" },
  { id: "post", label: "Почта России", desc: "5–14 дней", price: 200, icon: "Mail" },
  { id: "pickup", label: "Самовывоз", desc: "Москва, СПб", price: 0, icon: "MapPin" },
];

const PAYMENT_OPTIONS = [
  { id: "card", label: "Банковская карта", desc: "Visa, MasterCard, МИР", icon: "CreditCard" },
  { id: "sbp", label: "СБП", desc: "Оплата по QR-коду", icon: "Smartphone" },
  { id: "cash", label: "Наличными при получении", desc: "Только самовывоз", icon: "Banknote" },
];

type Step = "cart" | "delivery" | "payment" | "success";

export default function CheckoutPage({ cart, onBack, onSuccess }: Props) {
  const [step, setStep] = useState<Step>("cart");
  const [delivery, setDelivery] = useState("cdek");
  const [payment, setPayment] = useState("card");
  const [form, setForm] = useState({
    name: "", phone: "", email: "",
    city: "", address: "", zip: "",
    comment: "",
    cardNumber: "", cardExpiry: "", cardCvv: "", cardName: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const cartItems = PRODUCTS.filter((p) => cart.includes(p.id));
  const subtotal = cartItems.reduce((s, p) => s + p.price, 0);
  const deliveryCost = DELIVERY_OPTIONS.find((d) => d.id === delivery)?.price ?? 0;
  const total = subtotal + deliveryCost;
  const formatPrice = (n: number) => n.toLocaleString("ru-RU") + " ₽";

  const setField = (key: string, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  const validateStep = (s: Step) => {
    const e: Record<string, string> = {};
    if (s === "delivery") {
      if (!form.name.trim()) e.name = "Введите имя";
      if (!form.phone.trim()) e.phone = "Введите телефон";
      if (!form.email.trim()) e.email = "Введите email";
      if (delivery !== "pickup") {
        if (!form.city.trim()) e.city = "Введите город";
        if (!form.address.trim()) e.address = "Введите адрес";
      }
    }
    if (s === "payment" && payment === "card") {
      if (form.cardNumber.replace(/\s/g, "").length < 16) e.cardNumber = "Введите номер карты";
      if (!form.cardExpiry.trim()) e.cardExpiry = "Введите срок";
      if (form.cardCvv.length < 3) e.cardCvv = "CVV";
      if (!form.cardName.trim()) e.cardName = "Введите имя";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNextFromDelivery = () => {
    if (validateStep("delivery")) setStep("payment");
  };

  const handlePay = () => {
    if (!validateStep("payment")) return;
    setIsProcessing(true);
    setTimeout(() => { setIsProcessing(false); setStep("success"); }, 2000);
  };

  const STEPS = [
    { key: "cart", label: "Корзина", icon: "ShoppingCart" },
    { key: "delivery", label: "Доставка", icon: "Truck" },
    { key: "payment", label: "Оплата", icon: "CreditCard" },
  ];
  const stepIdx = STEPS.findIndex((s) => s.key === step);

  if (step === "success") {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="border-b border-border h-16 flex items-center px-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Icon name="Sparkles" size={16} className="text-primary-foreground" />
            </div>
            <span className="font-bold text-lg font-montserrat">Рукодар</span>
          </div>
        </header>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center max-w-md animate-fade-in">
            <div className="w-24 h-24 bg-primary/15 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="CheckCircle" size={48} className="text-primary" />
            </div>
            <h1 className="text-3xl font-black font-montserrat mb-3">Заказ оформлен!</h1>
            <p className="text-muted-foreground mb-2">
              Мы отправили подтверждение на <span className="text-foreground font-medium">{form.email || "вашу почту"}</span>
            </p>
            <p className="text-muted-foreground text-sm mb-8">
              Мастера уже начали работу. Ожидайте SMS с трек-номером отправления.
            </p>
            <div className="bg-card border border-border/50 rounded-2xl p-5 mb-8 text-left space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Получатель</span>
                <span className="font-medium">{form.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Доставка</span>
                <span className="font-medium">{DELIVERY_OPTIONS.find((d) => d.id === delivery)?.label}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Оплата</span>
                <span className="font-medium">{PAYMENT_OPTIONS.find((p) => p.id === payment)?.label}</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between font-bold">
                <span>Итого</span>
                <span className="text-primary">{formatPrice(total)}</span>
              </div>
            </div>
            <Button
              onClick={onSuccess}
              className="rounded-full px-10 h-12 font-bold bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Вернуться в каталог
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#141414]/95 backdrop-blur-md border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">
          <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <Icon name="ArrowLeft" size={20} />
            <span className="text-sm font-medium hidden sm:block">Назад</span>
          </button>
          <div className="flex items-center gap-2 mx-auto">
            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
              <Icon name="Sparkles" size={13} className="text-primary-foreground" />
            </div>
            <span className="font-bold font-montserrat">Рукодар</span>
          </div>
          <div className="w-16 hidden sm:block" />
        </div>
      </header>

      {/* Progress steps */}
      <div className="border-b border-border bg-[#141414]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-center gap-0">
            {STEPS.map((s, i) => (
              <div key={s.key} className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    i < stepIdx ? "bg-primary text-primary-foreground"
                    : i === stepIdx ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                    : "bg-secondary text-muted-foreground"
                  }`}>
                    {i < stepIdx ? <Icon name="Check" size={14} /> : <span>{i + 1}</span>}
                  </div>
                  <span className={`text-sm font-medium hidden sm:block ${i === stepIdx ? "text-foreground" : "text-muted-foreground"}`}>
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`w-12 sm:w-20 h-px mx-2 sm:mx-3 transition-all ${i < stepIdx ? "bg-primary" : "bg-border"}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: form */}
          <div className="lg:col-span-2 space-y-6">

            {/* STEP: Cart review */}
            {step === "cart" && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-black font-montserrat mb-5">Ваш заказ</h2>
                <div className="space-y-3">
                  {cartItems.map((p) => (
                    <div key={p.id} className="flex gap-4 bg-card border border-border/50 rounded-2xl p-4">
                      <img src={p.image} alt={p.name} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground mb-1">{p.seller}</p>
                        <p className="font-semibold text-sm leading-snug mb-2">{p.name}</p>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-base">{formatPrice(p.price)}</span>
                          {p.oldPrice && (
                            <span className="text-xs text-muted-foreground line-through">{formatPrice(p.oldPrice)}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="flex items-center gap-1">
                          <Icon name="Star" size={12} className="fill-yellow-400 text-yellow-400" />
                          <span className="text-xs">{p.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={() => setStep("delivery")}
                  className="w-full mt-6 h-12 rounded-full font-bold bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Перейти к доставке
                  <Icon name="ArrowRight" size={16} className="ml-2" />
                </Button>
              </div>
            )}

            {/* STEP: Delivery */}
            {step === "delivery" && (
              <div className="animate-fade-in space-y-6">
                <h2 className="text-xl font-black font-montserrat">Данные получателя</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Имя и фамилия" error={errors.name}>
                    <Input value={form.name} onChange={(e) => setField("name", e.target.value)}
                      placeholder="Иван Иванов"
                      className={inputCls(errors.name)} />
                  </Field>
                  <Field label="Телефон" error={errors.phone}>
                    <Input value={form.phone} onChange={(e) => setField("phone", e.target.value)}
                      placeholder="+7 999 123-45-67"
                      className={inputCls(errors.phone)} />
                  </Field>
                  <Field label="Email" error={errors.email} className="sm:col-span-2">
                    <Input value={form.email} onChange={(e) => setField("email", e.target.value)}
                      placeholder="ivan@example.com"
                      className={inputCls(errors.email)} />
                  </Field>
                </div>

                <div>
                  <h3 className="font-bold mb-3">Способ доставки</h3>
                  <div className="space-y-2">
                    {DELIVERY_OPTIONS.map((opt) => (
                      <label
                        key={opt.id}
                        className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                          delivery === opt.id ? "border-primary bg-primary/8" : "border-border/50 bg-card hover:border-border"
                        }`}
                      >
                        <input type="radio" name="delivery" value={opt.id} checked={delivery === opt.id}
                          onChange={() => setDelivery(opt.id)} className="sr-only" />
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                          delivery === opt.id ? "bg-primary/20" : "bg-secondary"
                        }`}>
                          <Icon name={opt.icon} size={18} className={delivery === opt.id ? "text-primary" : "text-muted-foreground"} />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-sm">{opt.label}</p>
                          <p className="text-xs text-muted-foreground">{opt.desc}</p>
                        </div>
                        <span className={`font-bold text-sm shrink-0 ${delivery === opt.id ? "text-primary" : "text-foreground"}`}>
                          {opt.price === 0 ? "Бесплатно" : formatPrice(opt.price)}
                        </span>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          delivery === opt.id ? "border-primary" : "border-muted-foreground"
                        }`}>
                          {delivery === opt.id && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {delivery !== "pickup" && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-in">
                    <Field label="Город" error={errors.city} className="sm:col-span-2">
                      <Input value={form.city} onChange={(e) => setField("city", e.target.value)}
                        placeholder="Москва"
                        className={inputCls(errors.city)} />
                    </Field>
                    <Field label="Индекс" error={errors.zip}>
                      <Input value={form.zip} onChange={(e) => setField("zip", e.target.value)}
                        placeholder="123456"
                        className={inputCls(errors.zip)} />
                    </Field>
                    <Field label="Адрес" error={errors.address} className="sm:col-span-3">
                      <Input value={form.address} onChange={(e) => setField("address", e.target.value)}
                        placeholder="ул. Ленина, д. 10, кв. 5"
                        className={inputCls(errors.address)} />
                    </Field>
                  </div>
                )}

                <Field label="Комментарий к заказу (необязательно)">
                  <textarea
                    value={form.comment}
                    onChange={(e) => setField("comment", e.target.value)}
                    placeholder="Позвоните перед доставкой..."
                    rows={3}
                    className="w-full bg-secondary border border-border rounded-xl p-3 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
                  />
                </Field>

                <Button
                  onClick={handleNextFromDelivery}
                  className="w-full h-12 rounded-full font-bold bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Перейти к оплате
                  <Icon name="ArrowRight" size={16} className="ml-2" />
                </Button>
              </div>
            )}

            {/* STEP: Payment */}
            {step === "payment" && (
              <div className="animate-fade-in space-y-6">
                <h2 className="text-xl font-black font-montserrat">Способ оплаты</h2>
                <div className="space-y-2">
                  {PAYMENT_OPTIONS.map((opt) => (
                    <label
                      key={opt.id}
                      className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                        payment === opt.id ? "border-primary bg-primary/8" : "border-border/50 bg-card hover:border-border"
                      }`}
                    >
                      <input type="radio" name="payment" value={opt.id} checked={payment === opt.id}
                        onChange={() => setPayment(opt.id)} className="sr-only" />
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                        payment === opt.id ? "bg-primary/20" : "bg-secondary"
                      }`}>
                        <Icon name={opt.icon} size={18} className={payment === opt.id ? "text-primary" : "text-muted-foreground"} />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{opt.label}</p>
                        <p className="text-xs text-muted-foreground">{opt.desc}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        payment === opt.id ? "border-primary" : "border-muted-foreground"
                      }`}>
                        {payment === opt.id && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                      </div>
                    </label>
                  ))}
                </div>

                {payment === "card" && (
                  <div className="bg-card border border-border/50 rounded-2xl p-5 space-y-4 animate-fade-in">
                    <Field label="Номер карты" error={errors.cardNumber}>
                      <Input
                        value={form.cardNumber}
                        onChange={(e) => {
                          const v = e.target.value.replace(/\D/g, "").slice(0, 16);
                          setField("cardNumber", v.replace(/(.{4})/g, "$1 ").trim());
                        }}
                        placeholder="0000 0000 0000 0000"
                        className={inputCls(errors.cardNumber)}
                      />
                    </Field>
                    <div className="grid grid-cols-3 gap-3">
                      <Field label="Срок" error={errors.cardExpiry} className="col-span-1">
                        <Input
                          value={form.cardExpiry}
                          onChange={(e) => {
                            let v = e.target.value.replace(/\D/g, "").slice(0, 4);
                            if (v.length > 2) v = v.slice(0, 2) + "/" + v.slice(2);
                            setField("cardExpiry", v);
                          }}
                          placeholder="MM/YY"
                          className={inputCls(errors.cardExpiry)}
                        />
                      </Field>
                      <Field label="CVV" error={errors.cardCvv} className="col-span-1">
                        <Input
                          value={form.cardCvv}
                          onChange={(e) => setField("cardCvv", e.target.value.replace(/\D/g, "").slice(0, 3))}
                          placeholder="123"
                          type="password"
                          className={inputCls(errors.cardCvv)}
                        />
                      </Field>
                      <div className="col-span-1 flex items-end pb-1">
                        <div className="w-full h-9 bg-secondary rounded-xl flex items-center justify-center gap-1">
                          <Icon name="Lock" size={12} className="text-muted-foreground" />
                          <span className="text-[10px] text-muted-foreground">Защищено</span>
                        </div>
                      </div>
                    </div>
                    <Field label="Имя на карте" error={errors.cardName}>
                      <Input
                        value={form.cardName}
                        onChange={(e) => setField("cardName", e.target.value.toUpperCase())}
                        placeholder="IVAN IVANOV"
                        className={inputCls(errors.cardName)}
                      />
                    </Field>
                  </div>
                )}

                {payment === "sbp" && (
                  <div className="bg-card border border-border/50 rounded-2xl p-6 text-center animate-fade-in">
                    <div className="w-32 h-32 bg-secondary rounded-2xl mx-auto mb-4 flex items-center justify-center">
                      <Icon name="QrCode" size={64} className="text-muted-foreground" />
                    </div>
                    <p className="font-semibold mb-1">QR-код для оплаты</p>
                    <p className="text-sm text-muted-foreground">Отсканируйте приложением банка</p>
                  </div>
                )}

                {payment === "cash" && (
                  <div className="bg-card border border-border/50 rounded-2xl p-5 flex gap-3 animate-fade-in">
                    <div className="w-10 h-10 bg-primary/15 rounded-full flex items-center justify-center shrink-0">
                      <Icon name="Info" size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm mb-1">Оплата при получении</p>
                      <p className="text-xs text-muted-foreground">Оплачивайте наличными или картой в пункте выдачи. Адрес и время пришлём на email после подтверждения заказа.</p>
                    </div>
                  </div>
                )}

                <Button
                  onClick={handlePay}
                  disabled={isProcessing}
                  className="w-full h-12 rounded-full font-bold bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-70"
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <Icon name="Loader" size={16} className="animate-spin" />
                      Обрабатываем...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Icon name="ShieldCheck" size={16} />
                      Оплатить {formatPrice(total)}
                    </span>
                  )}
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  Нажимая «Оплатить», вы соглашаетесь с условиями оферты и политикой конфиденциальности
                </p>
              </div>
            )}
          </div>

          {/* Right: order summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card border border-border/50 rounded-2xl p-5 space-y-4">
              <h3 className="font-bold font-montserrat">Итого</h3>
              <div className="space-y-2">
                {cartItems.map((p) => (
                  <div key={p.id} className="flex gap-3 items-center">
                    <img src={p.image} alt={p.name} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs leading-snug line-clamp-2 text-muted-foreground">{p.name}</p>
                    </div>
                    <span className="text-sm font-bold shrink-0">{formatPrice(p.price)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Товары ({cartItems.length})</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Доставка</span>
                  <span className={deliveryCost === 0 ? "text-primary font-medium" : ""}>
                    {deliveryCost === 0 ? "Бесплатно" : formatPrice(deliveryCost)}
                  </span>
                </div>
              </div>

              <div className="border-t border-border pt-3 flex justify-between font-black text-lg">
                <span>Итого</span>
                <span className="text-primary">{formatPrice(total)}</span>
              </div>

              <div className="space-y-2 pt-1">
                {[
                  { icon: "ShieldCheck", text: "Защита покупателя" },
                  { icon: "RefreshCw", text: "Возврат 14 дней" },
                  { icon: "Lock", text: "Безопасная оплата" },
                ].map((item) => (
                  <div key={item.icon} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Icon name={item.icon} size={13} className="text-primary shrink-0" />
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function inputCls(error?: string) {
  return `bg-secondary border rounded-xl h-10 text-sm focus-visible:ring-1 focus-visible:ring-primary ${
    error ? "border-red-500/60" : "border-border"
  }`;
}

function Field({
  label, error, children, className,
}: {
  label: string; error?: string; children: React.ReactNode; className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-xs font-medium text-muted-foreground mb-1.5">{label}</label>
      {children}
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  );
}
