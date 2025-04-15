"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

import { WidgetGrid } from "@/app/widgets/_components/widget-grid";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SeriesSearch } from "@/app/widgets/_components/series-serach";
import { H4 } from "@/components/ui/typography";

export default function WidgetsPage() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex min-h-screen w-full flex-col p-2">
      <WidgetGrid className="h-full w-full" />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            className="fixed right-4 bottom-4"
            size="icon"
            variant="outline"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle asChild>
              <H4>Search for Data by Text</H4>
            </DialogTitle>
          </DialogHeader>
          <SeriesSearch setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
