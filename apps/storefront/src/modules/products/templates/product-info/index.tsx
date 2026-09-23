import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@modules/common/components/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductPrice from "@modules/products/components/product-price"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div id="product-info" className="border-b border-black/10 pb-6">
      <div className="flex flex-col gap-y-3">
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="text-[10px] uppercase tracking-[0.14em] text-ui-fg-subtle hover:text-ui-fg-base"
          >
            {product.collection.title}
          </LocalizedClientLink>
        )}
        <Heading
          level="h2"
          className="max-w-[560px] text-3xl font-bold uppercase leading-[0.98] tracking-[-0.02em] text-ui-fg-base small:text-5xl"
          data-testid="product-title"
        >
          {product.title}
        </Heading>
        <ProductPrice product={product} />
      </div>
    </div>
  )
}

export default ProductInfo
