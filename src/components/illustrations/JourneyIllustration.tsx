"use client";

import { IllustrationAssess } from "./IllustrationAssess";
import { IllustrationReport } from "./IllustrationReport";
import { IllustrationMeet } from "./IllustrationMeet";
import { IllustrationProtocol } from "./IllustrationProtocol";

export type JourneyIllustrationKind = "assess" | "report" | "meet" | "protocol";

export function JourneyIllustration({ kind }: { kind: JourneyIllustrationKind }) {
  switch (kind) {
    case "assess":
      return <IllustrationAssess />;
    case "report":
      return <IllustrationReport />;
    case "meet":
      return <IllustrationMeet />;
    case "protocol":
      return <IllustrationProtocol />;
  }
}
