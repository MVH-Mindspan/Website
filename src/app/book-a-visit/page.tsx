import type { Metadata } from "next";
import BookingWizard from "@/components/booking/BookingWizard";

export const metadata: Metadata = {
  title: "Book a Visit | Mindspan",
  description:
    "Schedule your first visit with a Mindspan neurologist. Choose your location, tell us about yourself, and our team will be in touch within one business day.",
};

export default function BookAVisitPage() {
  return <BookingWizard />;
}
