import path from "path";
import { Font } from "@react-pdf/renderer";

let registered = false;

function fontPath(...parts: string[]): string {
  return path.join(/* turbopackIgnore: true */ process.cwd(), ...parts);
}

/** Register Noto Sans (Latin) + Noto Sans Hebrew for PDF output. Idempotent. */
export function registerPdfFonts(): void {
  if (registered) return;

  Font.register({
    family: "CoachSans",
    fonts: [
      {
        src: fontPath(
          "node_modules/@fontsource/noto-sans/files/noto-sans-latin-400-normal.woff",
        ),
        fontWeight: 400,
      },
      {
        src: fontPath(
          "node_modules/@fontsource/noto-sans/files/noto-sans-latin-700-normal.woff",
        ),
        fontWeight: 700,
      },
    ],
  });

  Font.register({
    family: "CoachSansHebrew",
    fonts: [
      {
        src: fontPath(
          "node_modules/@fontsource/noto-sans-hebrew/files/noto-sans-hebrew-hebrew-400-normal.woff",
        ),
        fontWeight: 400,
      },
      {
        src: fontPath(
          "node_modules/@fontsource/noto-sans-hebrew/files/noto-sans-hebrew-hebrew-700-normal.woff",
        ),
        fontWeight: 700,
      },
    ],
  });

  registered = true;
}

/** Hebrew locale uses Noto Hebrew; PDF pages stay LTR (react-pdf bidi-safe). */
export function pdfFontFamilyForLocale(locale: string): string {
  return locale === "he" ? "CoachSansHebrew" : "CoachSans";
}
