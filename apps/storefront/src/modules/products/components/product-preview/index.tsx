import { Text } from "@modules/common/components/ui"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

export default async function ProductPreview({
  product,
  isFeatured,
  region: _region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  // const pricedProduct = await listProducts({
  //   regionId: region.id,
  //   queryParams: { id: [product.id!] },
  // }).then(({ response }) => response.products[0])

  // if (!pricedProduct) {
  //   return null
  // }

  const { cheapestPrice } = getProductPrice({
    product,
  })

  return (
    <LocalizedClientLink
      href={`/products/${product.handle}`}
      className="group block"
    >
      <article
        data-testid="product-wrapper"
        className="sunz-product-card flex h-full flex-col"
      >
        <Thumbnail
          thumbnail={product.thumbnail}
          images={product.images}
          size="full"
          isFeatured={isFeatured}
          className="aspect-[356/334] rounded-[20px] bg-white p-0 shadow-none"
        />
        <div className="mt-4 flex flex-1 flex-col">
          <Text
            className="max-w-[92%] text-xl font-bold uppercase leading-[1.08] tracking-[-0.02em] text-[#181818]"
            data-testid="product-title"
          >
            {product.title}
          </Text>
          <div className="mt-3 text-2xl font-medium leading-7 text-[#181818]">
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2">
            <span className="flex min-h-10 items-center justify-center rounded-[17px] border border-[#2a9533] px-2 text-center text-[11px] font-semibold uppercase leading-4 text-[#2a9533] transition-colors group-hover:bg-[#2a9533] group-hover:text-white">
              Перейти в каталог
            </span>
            <span className="flex min-h-10 items-center justify-center rounded-[17px] bg-[#2a9533] px-2 text-center text-[11px] font-semibold uppercase leading-4 text-white transition-colors group-hover:bg-[#247b2c]">
              В корзину
            </span>
          </div>
        </div>
      </article>
    </LocalizedClientLink>
  )
}
