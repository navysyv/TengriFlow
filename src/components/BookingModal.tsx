import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { Check } from "lucide-react";

interface BookingModalProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  placeName: string;
}

export function BookingModal({ open, onOpenChange, placeName }: BookingModalProps) {
  const { t } = useI18n();
  const [date, setDate] = useState("");
  const [people, setPeople] = useState(2);
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    setConfirmed(true);
    setTimeout(() => {
      setConfirmed(false);
      onOpenChange(false);
      setDate("");
      setPeople(2);
    }, 1800);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">{t("book.title")}</DialogTitle>
          <p className="text-sm text-muted-foreground">{placeName}</p>
        </DialogHeader>

        {confirmed ? (
          <div className="flex flex-col items-center py-10 gap-3">
            <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center">
              <Check className="h-8 w-8 text-primary-foreground" strokeWidth={3} />
            </div>
            <p className="font-semibold text-lg">{t("book.success")}</p>
          </div>
        ) : (
          <div className="space-y-5 py-2">
            <div className="space-y-2">
              <Label>{t("book.date")}</Label>
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="rounded-xl h-12" />
            </div>
            <div className="space-y-2">
              <Label>{t("book.people")}</Label>
              <div className="flex items-center gap-3">
                <Button type="button" variant="outline" size="icon" className="rounded-full h-10 w-10" onClick={() => setPeople(Math.max(1, people - 1))}>−</Button>
                <span className="flex-1 text-center text-2xl font-bold">{people}</span>
                <Button type="button" variant="outline" size="icon" className="rounded-full h-10 w-10" onClick={() => setPeople(people + 1)}>+</Button>
              </div>
            </div>
            <Button onClick={handleConfirm} className="w-full h-12 rounded-full bg-primary hover:bg-primary/90 text-base font-semibold">
              {t("book.confirm")}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
