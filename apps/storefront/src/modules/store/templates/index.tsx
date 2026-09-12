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
      className="content-container flex flex-col py-8 small:flex-row small:items-start small:py-16"
      data-testid="category-container"
    >
      <RefinementList sortBy={sort} />
      <div className="w-full">
        <div className="mb-10 flex flex-col gap-6 border-b border-black/10 pb-6 small:flex-row small:items-end small:justify-between">
          <div>
            <span className="mb-3 block text-[10px] uppercase tracking-[0.14em] text-black/55">
              Каталог / коллекция 01
            </span>
            <h1
              className="text-4xl font-semibold uppercase leading-[0.9] tracking-[-0.05em] small:text-7xl"
              data-testid="store-page-title"
            >
              Мерч СУНЦ
            </h1>
            <p className="mt-5 max-w-md text-sm leading-5 text-black/60">
              Одежда и вещи с характером сообщества СУНЦ УрФУ.
            </p>
          </div>
          <span className="text-[10px] uppercase tracking-[0.14em] text-black/55 small:block">
            SS / 25 · Екатеринбург
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
