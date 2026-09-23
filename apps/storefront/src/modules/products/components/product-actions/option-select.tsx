import { HttpTypes } from "@medusajs/types"
import { clx } from "@modules/common/components/ui"
import React from "react"

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption
  current: string | undefined
  updateOption: (title: string, value: string) => void
  title: string
  disabled: boolean
  "data-testid"?: string
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  "data-testid": dataTestId,
  disabled,
}) => {
  const filteredOptions = (option.values ?? []).map((v) => v.value)

  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.12em]">
        <span>{title}</span>
        <span className="text-ui-fg-subtle">{current || "Выберите"}</span>
      </div>
      <div
        className="flex flex-wrap gap-3"
        data-testid={dataTestId}
      >
        {filteredOptions.map((v) => {
          return (
            <button
              onClick={() => updateOption(option.id, v)}
              key={v}
              className={clx(
                "flex h-11 min-w-11 items-center justify-center rounded-[15px] border bg-white px-3 text-xs uppercase transition-colors hover:border-[#2a9533] disabled:cursor-not-allowed disabled:opacity-50",
                {
                  "border-[#2a9533] font-semibold text-[#2a9533]": v === current,
                  "border-black/20 text-[#181818]": v !== current,
                }
              )}
              disabled={disabled}
              data-testid="option-button"
            >
              {v}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default OptionSelect
