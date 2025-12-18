

import jsPDF from "jspdf";
import { previewBoletaPDF } from './previewPdf';
export const generateBoletasAllPDF = async (boletas, docente, membrete, fontSizeTitle, fontSize) => {
    const pdf = new jsPDF("p", "pt", "a4");

    for (let i = 0; i < boletas.length; i++) {
        const boleta = boletas[i];

        await previewBoletaPDF(pdf, boleta, docente, membrete, fontSizeTitle, fontSize);

        if (i < boletas.length - 1) {
            pdf.addPage();
        }
    }

    // Generamos el Blob final
    const blob = pdf.output("blob");

    return blob;
};
