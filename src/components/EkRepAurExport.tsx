"use client"
import { forwardRef } from "react"
import EkRepAurCardBase from "./EkRepAurCardBase"

const EkRepAurExport = forwardRef(
  ({ bgUrl, workout, day }: any, ref: any) => {
    if (!bgUrl) return null

    return (
      <div className="fixed -left-[9999px] top-0">
        <div ref={ref}>
          <EkRepAurCardBase
            bgUrl={bgUrl}
            workout={workout}
            day={day}
            size="export"
          />
        </div>
      </div>
    )
  }
)

export default EkRepAurExport
