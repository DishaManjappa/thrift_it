import { Button } from "@/components/ui/button";

export default function CheckoutCancelPage() {
  return (
    <main className="grid min-h-[calc(100vh-73px)] place-items-center px-4">
      <section className="max-w-xl rounded-xl bg-white p-8 text-center shadow-soft">
        <h1 className="text-4xl font-black tracking-tight">Checkout canceled</h1>
        <p className="mt-3 font-semibold leading-7 text-ink/65">No payment was taken. Your cart is still ready when you are.</p>
        <Button href="/cart" className="mt-6">
          Return to cart
        </Button>
      </section>
    </main>
  );
}
