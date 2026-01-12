"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog"
import { Button } from "./ui/button"

interface EkRepAurModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function EkRepAurModal({ open, onOpenChange }: EkRepAurModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            #EkRepAur
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground leading-relaxed mt-2">
            This is not a post. This is a promise.
            <br /><br />
            <strong>#EkRepAur</strong> is a movement where lifters share the work they actually did —
            the sets, the reps, the discipline.
            <br /><br />
            Upload your workout. Mark your effort. Share your grind.
            One rep stronger. Together.
          </DialogDescription>
        </DialogHeader>

        <div className="pt-4 flex justify-end gap-2">
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button disabled>
            Feature Coming Soon
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
