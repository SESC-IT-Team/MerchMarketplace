import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"
import MedusaCTA from "@modules/layout/components/medusa-cta"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative w-full bg-[#f3f1eb] small:min-h-screen">
      <div className="h-16 border-b border-black/15 bg-[#f3f1eb]">
        <nav className="flex h-full items-center content-container justify-between">
          <LocalizedClientLink
            href="/cart"
            className="text-small-semi text-ui-fg-base flex items-center gap-x-2 uppercase flex-1 basis-0"
            data-testid="back-to-cart-link"
          >
            <ChevronDown className="rotate-90" size={16} />
              <span className="mt-px hidden text-xs uppercase tracking-[0.1em] text-ui-fg-subtle hover:text-ui-fg-base small:block">
              Вернуться в корзину
            </span>
              <span className="mt-px block text-xs uppercase tracking-[0.1em] text-ui-fg-subtle hover:text-ui-fg-base small:hidden">
              Назад
            </span>
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/"
            className="txt-compact-xlarge-plus text-ui-fg-subtle hover:text-ui-fg-base uppercase"
            data-testid="store-link"
          >
            SUNZ URFU
          </LocalizedClientLink>
          <div className="flex-1 basis-0" />
        </nav>
      </div>
      <div className="relative" data-testid="checkout-container">{children}</div>
      <div className="flex w-full items-center justify-center py-4">
        <MedusaCTA />
      </div>
    </div>
  )
}
