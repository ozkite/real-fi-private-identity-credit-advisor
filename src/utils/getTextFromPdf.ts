"use client";

import { pdfjs } from "react-pdf";

if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url,
  ).toString();
}

const getTextFromPdf = async (pdfArrayBuffer: ArrayBuffer) => {
  const pdf = pdfjs.getDocument(pdfArrayBuffer);

  return pdf.promise
    .then(async (pdf) => {
      const pages = pdf.numPages;
      if (pages > 100) {
        throw new Error("PDF has too many pages");
      }

      let text = "";
      for (let i = 1; i <= pages; i++) {
        const page = await pdf.getPage(i);
        const textContent = (await page.getTextContent()).items
          .map((item) => ("str" in item ? item.str : ""))
          .join(" ");
        text += textContent;
      }
      return text;
    })
    .finally(async () => {
      await pdf.destroy();
    });
};

export default getTextFromPdf;
