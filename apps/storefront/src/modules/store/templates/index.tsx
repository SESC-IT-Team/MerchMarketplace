import { Suspense } from "react"

import { OptionValueIds } from "@lib/util/product-option-filters"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
  optionValueIds,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
  optionValueIds?: OptionValueIds
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <div
      className="content-container flex flex-col py-10 small:flex-row small:items-start small:py-16"
      data-testid="category-container"
    >
      <RefinementList sortBy={sort} />
      <div className="w-full">
        <div className="mb-8 flex items-end justify-between gap-4 border-b border-black/10 pb-5">
          <div>
            <span className="mb-2 block text-[10px] uppercase tracking-[0.14em] text-ui-fg-subtle">
              Каталог / 01
            </span>
            <h1
              className="text-3xl font-semibold uppercase tracking-[-0.04em] small:text-5xl"
              data-testid="store-page-title"
            >
              Все товары
            </h1>
          </div>
          <span className="hidden text-xs uppercase tracking-[0.1em] text-ui-fg-subtle small:block">
            SS / 25
          </span>
        </div>
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            countryCode={countryCode}
            optionValueIds={optionValueIds}
          />
        </Suspense>
      </div>
    </div>
  )
}

export default StoreTemplate
