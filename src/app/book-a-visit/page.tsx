import BookingWizard from "@/components/booking/BookingWizard";
import { bookingPage } from "@/content/pages/booking";

export const metadata = bookingPage.metadata;

export default function BookAVisitPage() {
  return <BookingWizard />;
}
