import { renderTopicPdfBuffer } from "../app/lib/pdf/renderPdf";

async function main(): Promise<void> {
  for (const id of ["defense", "shooting", "transition", "ballMovement"] as const) {
    const b = await renderTopicPdfBuffer(id, "he");
    console.log("ok", id, b.length);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
