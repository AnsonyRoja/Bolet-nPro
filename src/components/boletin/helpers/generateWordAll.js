

import { fetchImageAsArrayBuffer } from "./generateWord";
import { buildBoletaSections } from "./buildBoletaSection";
import { Packer, Document } from "docx";
import starImg from '../../../assets/star.png';

export const generateBoletaAllWord = async (boletas, docente, membretePath, fontSizeTitle, fontSize) => {

    const imgBuffer = await fetchImageAsArrayBuffer(membretePath);
    const imgStar = await fetchImageAsArrayBuffer(starImg);

    const doc = new Document({
        sections: [],
    });

    boletas.forEach((boleta) => {
        const sections = buildBoletaSections(
            boleta,
            docente,
            imgBuffer,
            fontSizeTitle,
            fontSize,
            imgStar
        );


        sections.forEach(section => doc.addSection(section));
    });

    const blob = await Packer.toBlob(doc);

    return blob;


}