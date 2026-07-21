import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function NewsletterSection() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:py-24">
      <h2 className="font-editorial text-3xl text-primary sm:text-4xl">
        Antes de que te vayas
      </h2>
      <p className="mx-auto mt-3 max-w-md text-neutral/60">
        Un correo al mes con lo nuevo del catálogo. Nada de spam, lo
        prometemos.
      </p>
      <form className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
        <Input type="email" placeholder="tu@correo.com" required />
        <Button type="submit" size="md" className="shrink-0">
          Suscribirme
        </Button>
      </form>
    </section>
  );
}

export { NewsletterSection };
