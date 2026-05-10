import { Suspense } from "react";
import { TvScreen } from "./TvScreen";

export const dynamic = "force-static";

export default function TvPage() {
  return (
    <Suspense fallback={null}>
      <TvScreen />
    </Suspense>
  );
}
