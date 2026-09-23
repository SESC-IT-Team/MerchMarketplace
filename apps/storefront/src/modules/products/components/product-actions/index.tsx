"use client"

import { addToCart } from "@lib/data/cart"
import { useIntersection } from "@lib/hooks/use-in-view"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@modules/common/components/ui"
import Divider from "@modules/common/components/divider"
import OptionSelect from "@modules/products/components/product-actions/option-select"
import { isEqual } from "lodash"
import { useParams, usePathname, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import ProductPrice from "../product-price"
import MobileActions from "./mobile-actions"
import { useRouter } from "next/navigation"

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  disabled?: boolean
}

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt) => {
    if (varopt.option_id) acc[varopt.option_id] = varopt.value
    return acc
  }, {})
}

export default function ProductActions({
  product,
  disabled,
}: ProductActionsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [options, setOptions] = useState<Record<string, string | undefined>>({})
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const countryCode = useParams().countryCode as string

  // If there is only 1 variant, preselect the options
  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = optionsAsKeymap(product.variants[0].options)
      setOptions(variantOptions ?? {})
    }
  }, [product.variants])

  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return
    }

    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  // update the options when a variant is selected
  const setOptionValue = (optionId: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [optionId]: value,
    }))
  }

  const colorOption = product.options?.find((option) =>
    option.title?.toLowerCase().includes("color")
  )

  //check if the selected options produce a valid variant
  const isValidVariant = useMemo(() => {
    return product.variants?.some((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    const value = isValidVariant ? selectedVariant?.id : null

    if (params.get("v_id") === value) {
      return
    }

    if (value) {
      params.set("v_id", value)
    } else {
      params.delete("v_id")
    }

    router.replace(pathname + "?" + params.toString())
  }, [selectedVariant, isValidVariant])

  // check if the selected variant is in stock
  const inStock = useMemo(() => {
    // If we don't manage inventory, we can always add to cart
    if (selectedVariant && !selectedVariant.manage_inventory) {
      return true
    }

    // If we allow back orders on the variant, we can add to cart
    if (selectedVariant?.allow_backorder) {
      return true
    }

    // If there is inventory available, we can add to cart
    if (
      selectedVariant?.manage_inventory &&
      (selectedVariant?.inventory_quantity || 0) > 0
    ) {
      return true
    }

    // Otherwise, we can't add to cart
    return false
  }, [selectedVariant])

  const actionsRef = useRef<HTMLDivElement>(null)

  const inView = useIntersection(actionsRef, "0px")

  // add the selected variant to the cart
  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return null

    setIsAdding(true)

    await addToCart({
      variantId: selectedVariant.id,
      quantity,
      countryCode,
    })

    setIsAdding(false)
  }

  return (
    <>
      <div className="flex flex-col gap-y-2" ref={actionsRef}>
        <div>
          {(product.variants?.length ?? 0) > 1 && (
            <div className="flex flex-wrap items-start gap-x-5 gap-y-4">
              {(product.options || []).map((option) => {
                const isColor = option.id === colorOption?.id

                return (
                  <div key={option.id} className="min-w-0 flex-1 basis-[145px]">
                    {isColor ? (
                      <div className="flex flex-col gap-y-3">
                        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.12em]">
                          <span>Цвет</span>
                          <span className="text-ui-fg-subtle">{options[option.id] || "Выберите"}</span>
                        </div>
                        <div className="flex flex-wrap gap-3" data-testid="product-color-options">
                          {(option.values ?? []).map((value) => {
                            const color = value.value?.toLowerCase() === "white" ? "#ffffff" : "#181818"

                            return (
                              <button
                                key={value.value}
                                type="button"
                                onClick={() => setOptionValue(option.id, value.value)}
                                disabled={!!disabled || isAdding}
                                className={`h-10 w-10 rounded-full border-2 p-1 transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 ${
                                  options[option.id] === value.value ? "border-[#2a9533]" : "border-transparent"
                                }`}
                                aria-label={`Цвет ${value.value}`}
                                aria-pressed={options[option.id] === value.value}
                              >
                                <span
                                  className="block h-full w-full rounded-full border border-black/20"
                                  style={{ backgroundColor: color }}
                                />
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    ) : (
                      <OptionSelect
                        option={option}
                        current={options[option.id]}
                        updateOption={setOptionValue}
                        title={option.title ?? ""}
                        data-testid="product-options"
                        disabled={!!disabled || isAdding}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-y border-black/10 py-4">
          <span className="text-[10px] uppercase tracking-[0.12em]">Количество</span>
          <div className="flex items-center border border-black/20">
            <button
              type="button"
              onClick={() => setQuantity((current) => Math.max(1, current - 1))}
              disabled={isAdding || quantity === 1}
              className="flex h-10 w-10 items-center justify-center text-lg disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Уменьшить количество"
            >
              -
            </button>
            <span className="flex h-10 w-10 items-center justify-center text-sm" aria-live="polite">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((current) => current + 1)}
              disabled={isAdding}
              className="flex h-10 w-10 items-center justify-center text-lg disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Увеличить количество"
            >
              +
            </button>
          </div>
        </div>

        <Button
          onClick={handleAddToCart}
          disabled={
            !inStock ||
            !selectedVariant ||
            !!disabled ||
            isAdding ||
            !isValidVariant
          }
          variant="primary"
          className="sunz-button w-full border-black bg-black text-white hover:bg-[#d8ff38] hover:text-black"
          isLoading={isAdding}
          data-testid="add-product-button"
        >
          {!selectedVariant
            ? "Выберите цвет и размер"
            : !inStock || !isValidVariant
            ? "Нет в наличии"
            : "Добавить в корзину"}
        </Button>
        <MobileActions
          product={product}
          variant={selectedVariant}
          options={options}
          updateOptions={setOptionValue}
          inStock={inStock}
          handleAddToCart={handleAddToCart}
          isAdding={isAdding}
          show={!inView}
          optionsDisabled={!!disabled || isAdding}
        />
      </div>
    </>
  )
}
