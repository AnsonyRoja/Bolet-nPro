import { TableLayoutType, Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType, BorderStyle, ImageRun } from "docx";

const fetchImageAsArrayBuffer = async (url) => {
    const response = await fetch(url);
    return await response.arrayBuffer();
};



export const generateBoletaWord = async (boleta, docente, membretePath, fontSizeTitle, fontSize) => {
    const imgBuffer = await fetchImageAsArrayBuffer(membretePath);

    const doc = new Document({
        sections: [
            {
                properties: {
                    page: {
                        margin: {
                            top: 720,
                            bottom: 720,
                            left: 720,
                            right: 720,
                        },
                    }
                },
                children: [
                    new Table({
                        rows: [
                            new TableRow({

                                children: [
                                    new TableCell({
                                        children: [
                                            // ================= MEMBRETE =================
                                            new Paragraph({
                                                children: [
                                                    new ImageRun({
                                                        data: imgBuffer,
                                                        transformation: { width: 580, height: 30 },
                                                    }),
                                                ],
                                                alignment: AlignmentType.CENTER,
                                            }),
                                            new Paragraph({ text: "" }),

                                            // ================= ENCABEZADO =================
                                            new Paragraph({
                                                children: [
                                                    new TextRun({ text: "REPÚBLICA BOLIVARIANA DE VENEZUELA", bold: true, size: fontSizeTitle }),
                                                ],
                                                alignment: AlignmentType.CENTER,
                                            }),
                                            new Paragraph({
                                                children: [
                                                    new TextRun({ text: "MINISTERIO DEL PODER POPULAR PARA LA EDUCACIÓN", bold: true, size: fontSizeTitle }),
                                                ],
                                                alignment: AlignmentType.CENTER,
                                            }),
                                            new Paragraph({
                                                children: [
                                                    new TextRun({ text: 'UNIDAD EDUCATIVA COLEGIO PRIVADO "LATINOAMÉRICA"', bold: true, size: fontSizeTitle }),
                                                ],
                                                alignment: AlignmentType.CENTER,
                                            }),
                                            new Paragraph({ text: "" }),

                                            new Paragraph({
                                                children: [
                                                    new TextRun({ text: "BOLETÍN INFORMATIVO 1er MOMENTO PEDAGÓGICO", bold: true, size: fontSizeTitle }),
                                                ],
                                                alignment: AlignmentType.CENTER,
                                            }),
                                            new Paragraph({
                                                children: [
                                                    new TextRun({ text: "EDUCACIÓN PRIMARIA", bold: true, size: fontSizeTitle }),
                                                ],
                                                alignment: AlignmentType.CENTER,
                                            }),

                                            // ================= REPRESENTANTE =================
                                            new Paragraph({
                                                children: [
                                                    new TextRun({ text: "NOMBRES Y APELLIDOS DEL REPRESENTANTE: ", bold: true, size: fontSizeTitle }),
                                                    new TextRun({ text: boleta.representante, underline: {}, size: fontSize }),
                                                ],
                                            }),

                                            // ================= ESTUDIANTE =================
                                            new Paragraph({
                                                children: [
                                                    new TextRun({ text: "NOMBRES Y APELLIDOS DEL ESTUDIANTE: ", bold: true, size: fontSizeTitle }),
                                                    new TextRun({ text: boleta.estudiante, underline: {}, size: fontSize }),
                                                    new TextRun({ text: "   EDAD: ", bold: true, size: fontSizeTitle }),
                                                    new TextRun({ text: boleta.edad.toString(), underline: {}, size: fontSize }),
                                                ],
                                            }),

                                            // ================= CÉDULA, GRADO, SECCIÓN =================
                                            new Paragraph({
                                                children: [
                                                    new TextRun({ text: "CÉDULA ESCOLAR: ", bold: true, size: fontSizeTitle }),
                                                    new TextRun({ text: boleta.cedulaEscolar, underline: {}, size: fontSize }),
                                                    new TextRun({ text: "   GRADO: ", bold: true, size: fontSizeTitle }),
                                                    new TextRun({ text: docente.grado, underline: {}, size: fontSize }),
                                                    new TextRun({ text: "   SECCIÓN: ", bold: true, size: fontSizeTitle }),
                                                    new TextRun({ text: docente.seccion, underline: {}, size: fontSize }),
                                                ],
                                            }),

                                            // ================= DOCENTE y AÑO ESCOLAR =================
                                            new Paragraph({
                                                children: [
                                                    new TextRun({ text: "DOCENTE: ", bold: true, size: fontSizeTitle }),
                                                    new TextRun({ text: docente.nombre, underline: {}, size: fontSize }),
                                                    new TextRun({ text: "   AÑO ESCOLAR: ", bold: true, size: fontSizeTitle }),
                                                    new TextRun({ text: docente.anoEscolar, underline: {}, size: fontSize }),
                                                ],
                                            }),
                                            new Table({
                                                width: { size: 100, type: WidthType.PERCENTAGE },
                                                rows: [
                                                    new TableRow({
                                                        children: [
                                                            new TableCell({
                                                                children: [
                                                                    new Paragraph({
                                                                        children: [
                                                                            new TextRun({ text: "ASPECTOS A EVALUAR", bold: true, size: fontSizeTitle })
                                                                        ],
                                                                        alignment: AlignmentType.CENTER
                                                                    })
                                                                ],
                                                                margins: { top: 100, bottom: 100, left: 100, right: 100 },
                                                                borders: {
                                                                    top: { style: BorderStyle.SINGLE },
                                                                    bottom: { style: BorderStyle.SINGLE },
                                                                    left: { style: BorderStyle.SINGLE },
                                                                    right: { style: BorderStyle.SINGLE }
                                                                }
                                                            }),
                                                            new TableCell({
                                                                children: [
                                                                    new Paragraph({
                                                                        children: [
                                                                            new TextRun({ text: "JUICIO VALORATIVO", bold: true, size: fontSizeTitle })
                                                                        ],
                                                                        alignment: AlignmentType.CENTER
                                                                    })
                                                                ],
                                                                margins: { top: 100, bottom: 100, left: 100, right: 100 },
                                                                borders: {
                                                                    top: { style: BorderStyle.SINGLE },
                                                                    bottom: { style: BorderStyle.SINGLE },
                                                                    left: { style: BorderStyle.SINGLE },
                                                                    right: { style: BorderStyle.SINGLE }
                                                                }
                                                            }),
                                                        ],
                                                    }),
                                                    ...[
                                                        { aspecto: "SER – CONVIVIR", valor: boleta.serConvivir },
                                                        { aspecto: "CONOCER – HACER", valor: boleta.conocerHacer },
                                                        { aspecto: "ÁREAS DE FORMACIÓN", valor: null, colSpan: 2 },
                                                        { aspecto: "LENGUAJE, COMUNICACIÓN Y LITERATURA", valor: boleta.lenguaje },
                                                        { aspecto: "MATEMÁTICA", valor: boleta.matematica },
                                                        { aspecto: "CIENCIAS NATURALES", valor: boleta.cienciasNaturales },
                                                        { aspecto: "CIENCIAS SOCIALES", valor: boleta.cienciasSociales },
                                                        { aspecto: "IDENTIDAD Y ORIENTACIÓN VOCACIONAL", valor: boleta.identidad },
                                                    ].map(item => new TableRow({
                                                        children: item.colSpan === 2
                                                            ? [new TableCell({
                                                                children: [
                                                                    new Paragraph({
                                                                        children: [
                                                                            new TextRun({ text: item.aspecto, bold: true, size: fontSizeTitle })
                                                                        ],
                                                                        alignment: AlignmentType.JUSTIFIED
                                                                    })
                                                                ],
                                                                columnSpan: 2,
                                                                margins: { top: 100, bottom: 100, left: 200, right: 200 },
                                                                borders: {
                                                                    top: { style: BorderStyle.SINGLE },
                                                                    bottom: { style: BorderStyle.SINGLE },
                                                                    left: { style: BorderStyle.SINGLE },
                                                                    right: { style: BorderStyle.SINGLE }
                                                                }
                                                            })]
                                                            : [
                                                                new TableCell({
                                                                    children: [
                                                                        new Paragraph({
                                                                            children: [
                                                                                new TextRun({ text: item.aspecto, bold: true, size: fontSizeTitle })
                                                                            ],
                                                                            alignment: AlignmentType.JUSTIFIED
                                                                        })
                                                                    ],
                                                                    margins: { top: 100, bottom: 100, left: 200, right: 200 },
                                                                    borders: {
                                                                        top: { style: BorderStyle.SINGLE },
                                                                        bottom: { style: BorderStyle.SINGLE },
                                                                        left: { style: BorderStyle.SINGLE },
                                                                        right: { style: BorderStyle.SINGLE }
                                                                    }
                                                                }),
                                                                new TableCell({
                                                                    children: [
                                                                        new Paragraph({
                                                                            children: [
                                                                                new TextRun({ text: item.valor || "", size: fontSize })
                                                                            ],
                                                                            alignment: AlignmentType.JUSTIFIED
                                                                        })
                                                                    ],
                                                                    margins: { top: 100, bottom: 100, left: 200, right: 200 },
                                                                    borders: {
                                                                        top: { style: BorderStyle.SINGLE },
                                                                        bottom: { style: BorderStyle.SINGLE },
                                                                        left: { style: BorderStyle.SINGLE },
                                                                        right: { style: BorderStyle.SINGLE }
                                                                    }
                                                                })
                                                            ],
                                                    })),
                                                ]
                                            })




                                        ],

                                        borders: {
                                            top: { style: BorderStyle.SINGLE, size: 12, color: "D4AF37" },
                                            bottom: { style: BorderStyle.SINGLE, size: 12, color: "D4AF37" },
                                            left: { style: BorderStyle.SINGLE, size: 12, color: "D4AF37" },
                                            right: { style: BorderStyle.SINGLE, size: 12, color: "D4AF37" },
                                        },
                                        margins: {
                                            top: 200,
                                            bottom: 200,
                                            left: 300,
                                            right: 300,
                                        },
                                    }),
                                ],
                            }),


                        ],
                        width: {
                            size: 100,
                            type: WidthType.PERCENTAGE,
                        },
                        alignment: AlignmentType.CENTER,

                    }),



                ],
            },
        ],
    });

    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    window.open(url);
    return blob;
};

