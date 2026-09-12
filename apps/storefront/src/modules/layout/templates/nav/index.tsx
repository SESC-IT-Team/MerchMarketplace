import { Suspense } from "react"

import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

export default async function Nav() {
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative mx-auto border-b border-black/10 bg-[#f3f1eb] duration-200">
        <nav className="content-container flex min-h-[72px] w-full items-center justify-between gap-5 text-[11px] uppercase tracking-[0.08em] text-[#171717]">
          <div className="flex h-full flex-1 basis-0 items-center">
            <div className="h-full">
              <SideMenu regions={regions} locales={locales} currentLocale={currentLocale} />
            </div>
            <LocalizedClientLink
              href="/"
              className="ml-6 text-base font-black tracking-[-0.04em] hover:text-black/60"
              data-testid="nav-store-link"
            >
              SUNZ URFU
            </LocalizedClientLink>
          </div>

          <div className="hidden items-center gap-8 small:flex">
            <LocalizedClientLink className="hover:text-black/60" href="/store">
              Каталог
            </LocalizedClientLink>
            <LocalizedClientLink className="hover:text-black/60" href="/#about">
              О СУНЦ УрФУ
            </LocalizedClientLink>
            <LocalizedClientLink className="hover:text-black/60" href="/#audience">
              Для кого
            </LocalizedClientLink>
          </div>

          <div className="flex h-full flex-1 basis-0 items-center justify-end gap-3">
            <LocalizedClientLink
              href="/cart"
              className="hidden min-h-10 items-center bg-[#d8ff38] px-4 font-semibold hover:bg-black hover:text-white small:inline-flex"
            >
              Оформить заказ
            </LocalizedClientLink>
            <div className="hidden items-center gap-x-6 small:flex">
              <LocalizedClientLink
                className="hover:text-ui-fg-base"
                href="/account"
                data-testid="nav-account-link"
              >
                Войти
              </LocalizedClientLink>
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-ui-fg-base flex gap-2"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Корзина (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
