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
      <header className="relative mx-auto border-b border-black/10 bg-[#ededed] duration-200">
        <nav className="content-container flex min-h-[84px] w-full items-center justify-between gap-5 text-[11px] font-medium uppercase tracking-[0.08em] text-[#181818]">
          <div className="flex h-full min-w-0 flex-1 basis-0 items-center">
            <div className="h-full small:hidden">
              <SideMenu regions={regions} locales={locales} currentLocale={currentLocale} />
            </div>
            <LocalizedClientLink
              href="/"
              className="ml-0 flex flex-col text-[15px] font-black leading-[0.8] tracking-[0.02em] hover:opacity-70"
              data-testid="nav-store-link"
              aria-label="SUNZ УрФУ, на главную"
            >
              <span>SUNZ</span>
              <span className="mt-1 text-[8px] font-semibold tracking-[0.22em]">УРФУ</span>
            </LocalizedClientLink>
          </div>

          <div className="hidden items-center gap-7 small:flex">
            <LocalizedClientLink className="transition-opacity hover:opacity-55" href="/store">
              Каталог
            </LocalizedClientLink>
            <LocalizedClientLink className="transition-opacity hover:opacity-55" href="/#about">
              О СУНЦ УрФУ
            </LocalizedClientLink>
            <LocalizedClientLink className="transition-opacity hover:opacity-55" href="/#audience">
              Для кого
            </LocalizedClientLink>
            <LocalizedClientLink className="transition-opacity hover:opacity-55" href="/#contacts">
              Контакты
            </LocalizedClientLink>
          </div>

          <div className="flex h-full flex-1 basis-0 items-center justify-end gap-4">
            <div className="hidden items-center gap-x-5 small:flex">
              <LocalizedClientLink
                className="transition-opacity hover:opacity-55"
                href="/account"
                data-testid="nav-account-link"
              >
                Войти
              </LocalizedClientLink>
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="flex min-h-10 items-center transition-opacity hover:opacity-55"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Корзина (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
            <LocalizedClientLink
              href="/cart"
              className="hidden min-h-[45px] items-center justify-center rounded-[12px] bg-[#2a9533] px-5 font-semibold text-white transition-colors hover:bg-[#237d2b] small:inline-flex"
              data-testid="nav-checkout-link"
            >
              Оформить заказ
            </LocalizedClientLink>
          </div>
        </nav>
      </header>
    </div>
  )
}
