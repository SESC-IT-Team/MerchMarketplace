import { Heading, Text } from "@modules/common/components/ui"

import InteractiveLink from "@modules/common/components/interactive-link"

const EmptyCartMessage = () => {
  return (
    <div className="flex min-h-[55vh] flex-col items-start justify-center px-2 py-24" data-testid="empty-cart-message">
      <Heading
        level="h1"
        className="flex flex-row items-baseline gap-x-2 text-5xl font-semibold uppercase tracking-[-0.05em]"
      >
        Корзина
      </Heading>
      <Text className="text-base-regular mt-4 mb-6 max-w-[32rem]">
        В корзине пока ничего нет. Загляните в каталог и найдите свою вещь.
      </Text>
      <div>
        <InteractiveLink href="/store">Перейти в каталог</InteractiveLink>
      </div>
    </div>
  )
}

export default EmptyCartMessage
