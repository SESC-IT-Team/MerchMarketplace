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
      className="content-container flex flex-col gap-8 bg-[#ededed] py-8 small:gap-12 small:py-16"
      data-testid="category-container"
    >
      <RefinementList sortBy={sort} />
      <div className="w-full">
        <div className="mb-10 flex flex-col gap-6 border-b border-[#181818]/15 pb-8 small:flex-row small:items-end small:justify-between">
          <div>
            <span className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#2a9533]">
              СУНЦ УрФУ / мерч
            </span>
            <h1
              className="font-sans text-4xl font-bold uppercase leading-[0.95] tracking-[-0.03em] text-[#181818] small:text-7xl"
              data-testid="store-page-title"
            >
              Весь каталог
            </h1>
            <p className="mt-5 max-w-md text-sm leading-6 text-[#181818]/65">
              Одежда и вещи с характером сообщества СУНЦ УрФУ.
            </p>
          </div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#181818]/55 small:block">
            Коллекция 01 / 16 позиций
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
