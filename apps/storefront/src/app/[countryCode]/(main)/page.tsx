import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Мерч Сунц УрФУ",
  description: "Одежда и вещи с характером Сунц УрФУ.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero />
      <section id="about" className="content-container grid gap-8 border-b border-black/10 py-16 small:grid-cols-[1fr_2fr] small:py-24">
        <p className="text-[10px] uppercase tracking-[0.14em] text-black/55">
          О СУНЦ УрФУ / 01
        </p>
        <div className="max-w-3xl">
          <h2 className="text-3xl font-semibold uppercase leading-[0.95] tracking-[-0.04em] small:text-6xl">
            Вещи для тех, кто делает больше.
          </h2>
          <p className="mt-8 max-w-xl text-base leading-6 text-black/65 small:text-lg">
            Мерч СУНЦ УрФУ объединяет людей, идеи и город. Выбирайте вещи, которые
            остаются с вами после звонка и за пределами кампуса.
          </p>
        </div>
      </section>
      <div className="py-4 small:py-8">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
      <section id="audience" className="bg-[#d8ff38]">
        <div className="content-container grid gap-8 py-16 small:grid-cols-[1fr_2fr] small:py-24">
          <p className="text-[10px] uppercase tracking-[0.14em]">Для кого / 02</p>
          <div>
            <h2 className="max-w-3xl text-3xl font-semibold uppercase leading-[0.95] tracking-[-0.04em] small:text-6xl">
              Для учеников. Для педагогов. Для сообщества.
            </h2>
            <LocalizedClientLink
              href="/store"
              className="sunz-button mt-10 border-black bg-black text-white hover:bg-white hover:text-black"
            >
              В каталог
            </LocalizedClientLink>
          </div>
        </div>
      </section>
    </>
  )
}
