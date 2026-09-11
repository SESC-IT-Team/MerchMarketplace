import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = () => {
  return (
    <section className="sunz-hero">
      <div className="sunz-hero__grain" aria-hidden="true" />
      <div className="content-container relative z-10 flex min-h-[620px] flex-col justify-between py-8 small:min-h-[720px] small:py-12">
        <div className="flex items-start justify-between gap-6 text-[11px] uppercase tracking-[0.12em] text-white/70">
          <span>Сунц УрФУ / 2025</span>
          <span className="hidden small:block">Екатеринбург, Россия</span>
        </div>
        <div className="max-w-5xl pb-4">
          <p className="mb-5 max-w-xs text-sm leading-5 text-white/75 small:text-base">
            Мерч места, где идеи становятся проектами.
          </p>
          <h1 className="max-w-4xl text-[clamp(4rem,13vw,11rem)] font-black uppercase leading-[0.8] tracking-[-0.06em] text-white">
            SUNZ
          </h1>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <LocalizedClientLink
              href="/store"
              className="sunz-button sunz-button--light"
            >
              Смотреть коллекцию
            </LocalizedClientLink>
            <span className="text-xs uppercase tracking-[0.12em] text-white/60">
              SS / 25
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
