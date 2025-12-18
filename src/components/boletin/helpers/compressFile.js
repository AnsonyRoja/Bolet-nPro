import JSZip from "jszip";
import { saveAs } from 'file-saver';
import { generateBoletaPDF } from "./generatePdf";
import { generateBoletaWord } from "./generateWord";
import { fetchImageAsArrayBuffer } from "./generateWord";
import imgStar from '../../../assets/star.png';

export const downloadBoletaZip = async (boleta, docente, membrete, fontSizeTitle, fontSize) => {
    const zip = new JSZip();
    const starImg = await fetchImageAsArrayBuffer(imgStar);

    // PDF desde HTML

    const pdfBlob = await generateBoletaPDF(boleta, docente, membrete, fontSizeTitle, fontSize);




    // Word desde boleta
    const wordBlob = await generateBoletaWord(boleta, docente, membrete, fontSizeTitle, fontSize, starImg);

    // Agregar archivos al ZIP
    zip.file(`Boleta_${boleta.estudiante}.pdf`, pdfBlob);
    zip.file(`Boleta_${boleta.estudiante}.docx`, wordBlob);

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, `Boleta_${boleta.estudiante}.zip`);
};
