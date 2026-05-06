import BookingWizard from "@/components/booking/BookingWizard";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Book a Visit | Mindspan",
  description:
    "Schedule your first visit with a Mindspan neurologist. Choose your location, tell us about yourself, and our team will be in touch within one business day.",
  canonical: "/book-a-visit",
});

export default function BookAVisitPage() {
  return <BookingWizard />;
}
