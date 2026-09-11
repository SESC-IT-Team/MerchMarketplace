import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import { Text } from "@modules/common/components/ui"

import InteractiveLink from "@modules/common/components/interactive-link"
import ProductPreview from "@modules/products/components/product-preview"

export default async function ProductRail({
  collection,
  region,
}: {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
}) {
  const {
    response: { products: pricedProducts },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      collection_id: collection.id,
      fields: "*variants.calculated_price",
    },
  })

  if (!pricedProducts) {
    return null
  }

  return (
    <div className="content-container border-b border-black/10 py-16 small:py-24">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <span className="mb-2 block text-[10px] uppercase tracking-[0.14em] text-ui-fg-subtle">
            Подборка
          </span>
          <Text className="text-2xl font-semibold uppercase tracking-[-0.03em] small:text-4xl">
            {collection.title}
          </Text>
        </div>
        <InteractiveLink href={`/collections/${collection.handle}`}>
          Смотреть все
        </InteractiveLink>
      </div>
      <ul className="grid grid-cols-2 gap-x-3 gap-y-12 small:grid-cols-3 small:gap-x-6 small:gap-y-20">
        {pricedProducts &&
          pricedProducts.map((product) => (
            <li key={product.id}>
              <ProductPreview product={product} region={region} isFeatured />
            </li>
          ))}
      </ul>
    </div>
  )
}
