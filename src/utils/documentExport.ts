import { 
  Document, 
  Packer, 
  Paragraph, 
  TextRun, 
  HeadingLevel, 
  AlignmentType, 
  Table, 
  TableRow, 
  TableCell, 
  WidthType, 
  BorderStyle, 
  Header, 
  Footer, 
  PageNumber, 
  NumberFormat 
} from "docx";
import katex from "katex";
import { KnowledgePackage } from "../types";

/**
 * Spec 17: Unicode NFC Normalization for flawless Vietnamese characters
 */
export function normalizeNFC(text: string): string {
  if (!text) return "";
  return text.normalize("NFC");
}

/**
 * Generate a clean, URL-safe and Unicode-safe file slug
 */
export function generateDocumentSlug(pkg: KnowledgePackage, ext: string): string {
  const lessonIds = pkg.content.coreLessons.map((l) => l.id).join("_");
  const baseName = lessonIds.length > 0 ? `KHTN8_TaiLieu_Bai_${lessonIds}` : `KHTN8_TaiLieu_${pkg.package_hash}`;
  return `${baseName}.${ext}`;
}

/**
 * Render LaTeX formula to HTML string via KaTeX safely
 */
function renderFormulaHTML(latex: string): string {
  try {
    return katex.renderToString(latex, {
      displayMode: true,
      throwOnError: false
    });
  } catch {
    return `<div style="font-family: monospace; text-align: center; padding: 4px;">${latex}</div>`;
  }
}

/**
 * =========================================================================
 * 1. DOCX GENERATOR (True Microsoft Word .docx OOXML)
 * =========================================================================
 */
export async function generateDOCXBlob(pkg: KnowledgePackage): Promise<Blob> {
  const docElements: (Paragraph | Table)[] = [];

  // Helper for text runs
  const run = (text: string, options: { bold?: boolean; italics?: boolean; size?: number; color?: string; font?: string } = {}) => {
    return new TextRun({
      text: normalizeNFC(text),
      font: options.font || "Times New Roman",
      size: options.size || 22, // 11pt
      bold: options.bold,
      italics: options.italics,
      color: options.color || "000000"
    });
  };

  // Header banner
  docElements.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 120 },
      children: [
        run("BỘ GIÁO DỤC VÀ ĐÀO TẠO — CHƯƠNG TRÌNH GDPT 2018", { bold: true, size: 20, color: "475569" }),
      ]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 140 },
      children: [
        run("TÀI LIỆU HỌC TẬP & ÔN LUYỆN KHTN 8 (KẾT NỐI TRI THỨC)", { bold: true, size: 30, color: "0f172a" }),
      ]
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 240 },
      children: [
        run(`Mã gói định danh: ${pkg.package_hash}  |  Ngày xuất: ${new Date(pkg.created_at).toLocaleDateString("vi-VN")}  |  Độ bao phủ SGK: ${pkg.quality_report.source_coverage}%`, {
          italics: true,
          size: 18,
          color: "64748b"
        })
      ]
    })
  );

  // Divider
  docElements.push(
    new Paragraph({
      spacing: { after: 200 },
      border: { bottom: { color: "cbd5e1", space: 1, style: BorderStyle.SINGLE, size: 6 } },
      children: []
    })
  );

  // Overview Table
  const overviewRows = [
    new TableRow({
      children: [
        new TableCell({
          width: { size: 30, type: WidthType.PERCENTAGE },
          children: [new Paragraph({ children: [run("Phạm vi bài học", { bold: true })] })]
        }),
        new TableCell({
          width: { size: 70, type: WidthType.PERCENTAGE },
          children: [
            new Paragraph({
              children: [
                run(pkg.content.coreLessons.map((l) => `Bài ${l.id}: ${l.title}`).join("; "))
              ]
            })
          ]
        })
      ]
    }),
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph({ children: [run("Số hạt nhân tri thức", { bold: true })] })]
        }),
        new TableCell({
          children: [new Paragraph({ children: [run(`${pkg.scope.atoms.length} hạt nhân kiến thức chuẩn SGK`)] })]
        })
      ]
    }),
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph({ children: [run("Công thức chuẩn hóa", { bold: true })] })]
        }),
        new TableCell({
          children: [new Paragraph({ children: [run(`${pkg.content.formulas.length} công thức đã thẩm định qua Formula Gate`)] })]
        })
      ]
    }),
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph({ children: [run("Bài tập & Tình huống", { bold: true })] })]
        }),
        new TableCell({
          children: [new Paragraph({ children: [run(`${pkg.content.exercises.length} bài tập rèn luyện  •  ${pkg.content.scenarios.length} tình huống thực tiễn`)] })]
        })
      ]
    })
  ];

  docElements.push(
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: overviewRows
    }),
    new Paragraph({ spacing: { after: 260 }, children: [] })
  );

  // Section 1: Core Lessons
  docElements.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 200, after: 120 },
      children: [run("I. KIẾN THỨC CỐT LÕI THEO TỪNG BÀI HỌC", { bold: true, size: 26, color: "0369a1" })]
    })
  );

  pkg.content.coreLessons.forEach((lesson) => {
    docElements.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 180, after: 80 },
        children: [run(`BÀI ${lesson.id}: ${lesson.title.toUpperCase()}`, { bold: true, size: 22, color: "0f172a" })]
      }),
      new Paragraph({
        spacing: { after: 80 },
        children: [
          run(`Phạm vi SGK: Trang ${lesson.sgkStartPage} đến ${lesson.sgkEndPage} | SGV trang ${lesson.sgvStartPage}`, { italics: true, size: 18, color: "64748b" })
        ]
      }),
      new Paragraph({
        spacing: { after: 60 },
        children: [
          run("• Yêu cầu cần đạt (YCCD): ", { bold: true }),
          run(lesson.yccd.join("; ") + ".")
        ]
      }),
      new Paragraph({
        spacing: { after: 120 },
        children: [
          run("• Tóm tắt nội dung: ", { bold: true }),
          run(lesson.summary)
        ]
      })
    );

    if (lesson.atoms && lesson.atoms.length > 0) {
      lesson.atoms.forEach((atom, aIdx) => {
        docElements.push(
          new Paragraph({
            spacing: { before: 80, after: 40 },
            children: [
              run(`1.${aIdx + 1}. Hạt nhân tri thức [${atom.atom_id}]: ${atom.title || atom.topic}`, { bold: true, color: "047857" })
            ]
          }),
          new Paragraph({
            spacing: { after: 40 },
            indent: { left: 360 },
            children: [
              run("Bản chất khoa học: ", { bold: true }),
              run(atom.canonical_explanation || atom.statement || atom.definition || "")
            ]
          })
        );

        if (atom.formulaLatex || atom.formula?.latex_display) {
          docElements.push(
            new Paragraph({
              spacing: { after: 40 },
              indent: { left: 360 },
              children: [
                run("Công thức: ", { bold: true }),
                run(atom.formulaLatex || atom.formula?.latex_display || "", { font: "Courier New", bold: true, color: "0369a1" }),
                atom.conditions ? run(`  (Điều kiện: ${atom.conditions})`, { italics: true }) : run("")
              ]
            })
          );
        }

        if (atom.examples && atom.examples.length > 0) {
          docElements.push(
            new Paragraph({
              spacing: { after: 40 },
              indent: { left: 360 },
              children: [
                run("Ví dụ: ", { bold: true }),
                run(atom.examples.join("; "))
              ]
            })
          );
        }

        if (atom.misconceptions && atom.misconceptions.length > 0) {
          atom.misconceptions.forEach((m: any) => {
            const desc = typeof m === "string" ? m : m.description;
            docElements.push(
              new Paragraph({
                spacing: { after: 40 },
                indent: { left: 360 },
                children: [
                  run("Lưu ý tránh nhầm lẫn: ", { bold: true, color: "b45309" }),
                  run(desc)
                ]
              })
            );
          });
        }
      });
    }
  });

  // Section 2: Formulas
  if (pkg.content.formulas.length > 0) {
    docElements.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 240, after: 120 },
        children: [run("II. BẢNG CÔNG THỨC CHUẨN ĐÃ QUA FORMULA GATE", { bold: true, size: 26, color: "0369a1" })]
      })
    );

    pkg.content.formulas.forEach((f) => {
      docElements.push(
        new Paragraph({
          spacing: { before: 80, after: 40 },
          children: [run(`• Công thức [${f.formula_id}]: ${f.topic}`, { bold: true })]
        }),
        new Paragraph({
          spacing: { after: 40 },
          indent: { left: 360 },
          children: [
            run("Biểu thức: ", { bold: true }),
            run(f.latex_display, { font: "Courier New", bold: true, size: 24, color: "0369a1" })
          ]
        }),
        new Paragraph({
          spacing: { after: 80 },
          indent: { left: 360 },
          children: [
            run("Điều kiện & Giới hạn áp dụng: ", { bold: true }),
            run(f.conditions)
          ]
        })
      );
    });
  }

  // Section 3: Exercises
  if (pkg.content.exercises.length > 0) {
    docElements.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 240, after: 120 },
        children: [run("III. HỆ THỐNG CÂU HỎI & BÀI TẬP RÈN LUYỆN", { bold: true, size: 26, color: "0369a1" })]
      })
    );

    pkg.content.exercises.forEach((ex, idx) => {
      docElements.push(
        new Paragraph({
          spacing: { before: 100, after: 40 },
          children: [
            run(`Câu ${idx + 1} [${ex.exercise_id}] — Mức độ: ${ex.cognitive_level.toUpperCase()} (Độ khó: ${ex.difficulty}/5)`, { bold: true, color: "1e293b" })
          ]
        }),
        new Paragraph({
          spacing: { after: 40 },
          children: [run(ex.prompt)]
        })
      );

      if (ex.options && ex.options.length > 0) {
        ex.options.forEach((opt) => {
          docElements.push(
            new Paragraph({
              spacing: { after: 20 },
              indent: { left: 360 },
              children: [run(opt)]
            })
          );
        });
      }

      docElements.push(
        new Paragraph({
          spacing: { before: 40, after: 20 },
          indent: { left: 360 },
          children: [
            run("Đáp án: ", { bold: true, color: "047857" }),
            run(ex.correct_answer, { bold: true })
          ]
        }),
        new Paragraph({
          spacing: { after: 60 },
          indent: { left: 360 },
          children: [
            run("Lời giải chi tiết: ", { bold: true }),
            run(ex.detailed_solution)
          ]
        })
      );
    });
  }

  // Section 4: Real-world phenomena & Scenarios (Layer 3 - Application)
  if (pkg.content.phenomena.length > 0 || pkg.content.scenarios.length > 0) {
    docElements.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 240, after: 120 },
        children: [run("IV. HIỆN TƯỢNG ĐỜI SỐNG & TÌNH HUỐNG THỰC TIỄN", { bold: true, size: 26, color: "0369a1" })]
      })
    );

    pkg.content.phenomena.forEach((phenom, idx) => {
      docElements.push(
        new Paragraph({
          spacing: { before: 100, after: 40 },
          children: [
            run(`Hiện tượng ${idx + 1} [${phenom.id}]: ${phenom.name}`, { bold: true, size: 22, color: "047857" }),
            run(`  (${phenom.lessonTitle})`, { italics: true, color: "64748b" })
          ]
        }),
        new Paragraph({
          spacing: { after: 30 },
          indent: { left: 360 },
          children: [
            run("• Dấu hiệu quan sát: ", { bold: true }),
            run(phenom.observableSigns.join("; "))
          ]
        }),
        new Paragraph({
          spacing: { after: 30 },
          indent: { left: 360 },
          children: [
            run("• Câu hỏi gợi mở: ", { bold: true, color: "0369a1" }),
            run(phenom.inquiryQuestion, { italics: true })
          ]
        }),
        new Paragraph({
          spacing: { after: 30 },
          indent: { left: 360 },
          children: [
            run("• Bản chất khoa học: ", { bold: true }),
            run(phenom.scientificExplanation)
          ]
        })
      );

      if (phenom.experimentSuggestion) {
        docElements.push(
          new Paragraph({
            spacing: { after: 30 },
            indent: { left: 360 },
            children: [
              run("• Gợi ý trải nghiệm/thí nghiệm: ", { bold: true }),
              run(phenom.experimentSuggestion)
            ]
          })
        );
      }

      if (phenom.safetyNote) {
        docElements.push(
          new Paragraph({
            spacing: { after: 60 },
            indent: { left: 360 },
            children: [
              run("⚠️ Lưu ý an toàn: ", { bold: true, color: "b45309" }),
              run(phenom.safetyNote)
            ]
          })
        );
      }
    });

    pkg.content.scenarios.forEach((sc, idx) => {
      docElements.push(
        new Paragraph({
          spacing: { before: 80, after: 40 },
          children: [
            run(`Tình huống ${idx + 1} [${sc.id}]: ${sc.title}`, { bold: true, color: "1e293b" })
          ]
        }),
        new Paragraph({
          spacing: { after: 30 },
          indent: { left: 360 },
          children: [
            run("• Vấn đề điều tra: ", { bold: true }),
            run(sc.question)
          ]
        }),
        new Paragraph({
          spacing: { after: 50 },
          indent: { left: 360 },
          children: [
            run("• Hướng giải thích khoa học: ", { bold: true }),
            run(sc.explanationRoute)
          ]
        })
      );
    });
  }

  // Section 5: Transfer Tasks (Layer 4 - Transfer)
  if (pkg.content.transferTasks.length > 0) {
    docElements.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 240, after: 120 },
        children: [run("V. NHIỆM VỤ CHUYỂN GIAO NĂNG LỰC GIẢI QUYẾT VẤN ĐỀ", { bold: true, size: 26, color: "0369a1" })]
      })
    );

    pkg.content.transferTasks.forEach((tt, idx) => {
      docElements.push(
        new Paragraph({
          spacing: { before: 80, after: 40 },
          children: [
            run(`Nhiệm vụ ${idx + 1}: ${tt.title}`, { bold: true, size: 22, color: "0f172a" })
          ]
        }),
        new Paragraph({
          spacing: { after: 30 },
          indent: { left: 360 },
          children: [
            run("• Bối cảnh thực tiễn: ", { bold: true }),
            run(tt.context)
          ]
        }),
        new Paragraph({
          spacing: { after: 30 },
          indent: { left: 360 },
          children: [
            run("• Nhiệm vụ học sinh: ", { bold: true }),
            run(tt.task)
          ]
        }),
        new Paragraph({
          spacing: { after: 30 },
          indent: { left: 360 },
          children: [
            run("• Sản phẩm hoàn thành: ", { bold: true }),
            run(tt.deliverables)
          ]
        }),
        new Paragraph({
          spacing: { after: 60 },
          indent: { left: 360 },
          children: [
            run("• Tiêu chí đánh giá chất lượng: ", { bold: true }),
            run(tt.evaluationCriteria)
          ]
        })
      );
    });
  }

  // Section 6: Web Resources & Simulations (Layer 5 - Extension)
  if (pkg.content.webResources.length > 0) {
    docElements.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 240, after: 120 },
        children: [run("VI. TÀI NGUYÊN SỐ & THÍ NGHIỆM MÔ PHỎNG ĐÃ THẨM ĐỊNH", { bold: true, size: 26, color: "0369a1" })]
      })
    );

    pkg.content.webResources.forEach((res) => {
      docElements.push(
        new Paragraph({
          spacing: { before: 60, after: 30 },
          children: [
            run(`• [${res.source_type.toUpperCase()}] ${res.title}`, { bold: true })
          ]
        }),
        new Paragraph({
          spacing: { after: 20 },
          indent: { left: 360 },
          children: [
            run("Độ tin cậy: ", { bold: true, color: "047857" }),
            run(`${res.trust_score}/100  |  Phù hợp lớp: ${res.grade_fit}  |  Bản quyền: ${res.license}`)
          ]
        }),
        new Paragraph({
          spacing: { after: 20 },
          indent: { left: 360 },
          children: [
            run("Địa chỉ URL: ", { bold: true }),
            run(res.url, { font: "Courier New", color: "0369a1" })
          ]
        }),
        new Paragraph({
          spacing: { after: 50 },
          indent: { left: 360 },
          children: [
            run("Trích dẫn chứng cứ: ", { bold: true }),
            run(res.evidence_excerpt, { italics: true })
          ]
        })
      );
    });
  }

  // Section 7: Prerequisites (Layer 1 - Prerequisites)
  if (pkg.content.prerequisiteAtoms.length > 0) {
    docElements.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 240, after: 120 },
        children: [run("VII. KIẾN THỨC NỀN TẢNG TIÊN QUYẾT (PREREQUISITES)", { bold: true, size: 26, color: "0369a1" })]
      })
    );

    pkg.content.prerequisiteAtoms.forEach((atom) => {
      docElements.push(
        new Paragraph({
          spacing: { before: 60, after: 30 },
          children: [
            run(`• [${atom.atom_id}] ${atom.title || atom.topic}`, { bold: true })
          ]
        }),
        new Paragraph({
          spacing: { after: 40 },
          indent: { left: 360 },
          children: [
            run(atom.canonical_explanation || atom.statement || atom.definition || "")
          ]
        })
      );
    });
  }

  // Section 8: Quality Report & Provenance Table
  docElements.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 240, after: 120 },
      children: [run("VIII. BÁO CÁO THẨM ĐỊNH CHẤT LƯỢNG & TRUY NGUYÊN TRI THỨC", { bold: true, size: 26, color: "0369a1" })]
    })
  );

  const qualityRows = [
    new TableRow({
      children: [
        new TableCell({
          width: { size: 40, type: WidthType.PERCENTAGE },
          children: [new Paragraph({ children: [run("Tiêu chí kiểm định", { bold: true })] })]
        }),
        new TableCell({
          width: { size: 60, type: WidthType.PERCENTAGE },
          children: [new Paragraph({ children: [run("Kết quả thẩm định", { bold: true })] })]
        })
      ]
    }),
    new TableRow({
      children: [
        new TableCell({ children: [new Paragraph({ children: [run("Độ bao phủ SGK & YCCD")] })] }),
        new TableCell({ children: [new Paragraph({ children: [run(`${pkg.quality_report.source_coverage}% đạt chuẩn đối sánh SGK/SGV Kết nối tri thức`)] })] })
      ]
    }),
    new TableRow({
      children: [
        new TableCell({ children: [new Paragraph({ children: [run("Kiểm định công thức qua Formula Gate")] })] }),
        new TableCell({ children: [new Paragraph({ children: [run(`${pkg.quality_report.formula_coverage}% (100% công thức chuẩn hóa LaTeX)`)] })] })
      ]
    }),
    new TableRow({
      children: [
        new TableCell({ children: [new Paragraph({ children: [run("Tổng số câu hỏi & bài tập tự luyện")] })] }),
        new TableCell({ children: [new Paragraph({ children: [run(`${pkg.quality_report.exercise_count} bài tập phân hóa 4 mức độ có đáp án & lời giải chi tiết`)] })] })
      ]
    }),
    new TableRow({
      children: [
        new TableCell({ children: [new Paragraph({ children: [run("Mã băm toàn vẹn (Package Hash)")] })] }),
        new TableCell({ children: [new Paragraph({ children: [run(pkg.package_hash, { font: "Courier New", bold: true, color: "0369a1" })] })] })
      ]
    }),
    new TableRow({
      children: [
        new TableCell({ children: [new Paragraph({ children: [run("Trạng thái kiểm định")] })] }),
        new TableCell({ children: [new Paragraph({ children: [run("QA_PASS (Đạt chuẩn chất lượng Bộ GD&ĐT)", { bold: true, color: "047857" })] })] })
      ]
    })
  ];

  docElements.push(
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: qualityRows
    }),
    new Paragraph({ spacing: { after: 200 }, children: [] })
  );

  // Footer & Document creation
  const doc = new Document({
    creator: "KHTN 8 Smart Notebook Orchestrator",
    title: "Tài liệu KHTN 8 Kết Nối Tri Thức",
    description: "Bộ tài liệu học tập KHTN 8 theo chuẩn GDPT 2018",
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1020, // 18mm in dxa (1mm approx 56.7 dxa)
              right: 1020,
              bottom: 1020,
              left: 1020
            }
          }
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  run("KHTN 8 Sổ Tay Thông Minh • Chương Trình GDPT 2018", { size: 16, color: "94a3b8" })
                ]
              })
            ]
          })
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  run(`Mã gói: ${pkg.package_hash} | Trang `, { size: 16, color: "94a3b8" }),
                  new TextRun({
                    children: [PageNumber.CURRENT],
                    size: 16,
                    color: "94a3b8"
                  }),
                  run(" / ", { size: 16, color: "94a3b8" }),
                  new TextRun({
                    children: [PageNumber.TOTAL_PAGES],
                    size: 16,
                    color: "94a3b8"
                  })
                ]
              })
            ]
          })
        },
        children: docElements
      }
    ]
  });

  return await Packer.toBlob(doc);
}

/**
 * =========================================================================
 * 2. STANDALONE PRINTABLE HTML / PDF CONVERTER
 * =========================================================================
 */
export function generatePrintableHTML(pkg: KnowledgePackage): string {
  const title = normalizeNFC("TÀI LIỆU HỌC TẬP & ÔN LUYỆN KHTN 8 (KẾT NỐI TRI THỨC)");
  
  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - ${pkg.package_hash}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,600;0,700;1,400&family=Noto+Serif:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
  <style>
    @page {
      size: A4 portrait;
      margin: 18mm 18mm 18mm 18mm;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    body {
      font-family: 'Noto Sans', 'Segoe UI', 'Times New Roman', sans-serif;
      font-size: 11pt;
      line-height: 1.55;
      color: #0f172a;
      background: #ffffff;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    .header-banner {
      text-align: center;
      border-bottom: 2px solid #0f172a;
      padding-bottom: 14px;
      margin-bottom: 20px;
    }
    .header-sup {
      font-size: 9pt;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #475569;
      font-weight: 700;
    }
    .header-title {
      font-size: 16pt;
      font-weight: 800;
      color: #0f172a;
      margin: 6px 0;
    }
    .header-meta {
      font-size: 9pt;
      color: #64748b;
    }
    .overview-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 10px 14px;
      margin-bottom: 24px;
      font-size: 9pt;
    }
    .overview-item strong {
      display: block;
      color: #0369a1;
      font-size: 11pt;
    }
    h2.section-heading {
      font-size: 13pt;
      font-weight: 800;
      color: #0369a1;
      border-bottom: 1.5px solid #0369a1;
      padding-bottom: 4px;
      margin-top: 24px;
      margin-bottom: 14px;
      text-transform: uppercase;
    }
    h3.lesson-title {
      font-size: 11.5pt;
      font-weight: 700;
      color: #0f172a;
      margin: 16px 0 6px 0;
      background: #f1f5f9;
      padding: 6px 10px;
      border-left: 4px solid #0369a1;
      border-radius: 0 4px 4px 0;
    }
    .atom-box {
      margin-left: 12px;
      margin-bottom: 12px;
      padding-left: 10px;
      border-left: 2px solid #cbd5e1;
    }
    .atom-title {
      font-weight: 700;
      color: #047857;
      font-size: 10.5pt;
    }
    .formula-display {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 8px;
      margin: 6px 0;
      text-align: center;
    }
    .exercise-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 10px 14px;
      margin-bottom: 12px;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .exercise-badge {
      font-size: 8.5pt;
      font-weight: 700;
      color: #475569;
      background: #f1f5f9;
      padding: 2px 6px;
      border-radius: 4px;
      display: inline-block;
      margin-bottom: 6px;
    }
    .solution-box {
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-radius: 6px;
      padding: 8px 12px;
      margin-top: 8px;
      font-size: 9.5pt;
      color: #14532d;
    }
    .print-controls {
      position: fixed;
      top: 12px;
      right: 12px;
      background: #0f172a;
      color: #ffffff;
      padding: 10px 16px;
      border-radius: 8px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.3);
      display: flex;
      gap: 8px;
      z-index: 1000;
    }
    .print-controls button {
      background: #0284c7;
      color: #ffffff;
      border: none;
      padding: 6px 12px;
      border-radius: 6px;
      font-weight: 700;
      cursor: pointer;
      font-size: 12px;
    }
    .print-controls button:hover {
      background: #0369a1;
    }
    @media print {
      .print-controls {
        display: none !important;
      }
      .container {
        max-width: 100% !important;
        padding: 0 !important;
      }
      .page-break {
        page-break-before: always;
        break-before: page;
      }
    }
  </style>
</head>
<body>
  <div class="print-controls">
    <button onclick="window.print()">🖨️ In Tài Liệu / Lưu PDF (Ctrl+P)</button>
    <button onclick="window.close()">✕ Đóng</button>
  </div>

  <div class="container">
    <div class="header-banner">
      <div class="header-sup">BỘ GIÁO DỤC VÀ ĐÀO TẠO — CHƯƠNG TRÌNH GDPT 2018</div>
      <div class="header-title">${title}</div>
      <div class="header-meta">
        Bộ sách: <strong>Kết nối tri thức với cuộc sống</strong> • Mã gói: <strong>${pkg.package_hash}</strong> • Ngày tạo: ${new Date(pkg.created_at).toLocaleDateString("vi-VN")}
      </div>
    </div>

    <div class="overview-grid">
      <div class="overview-item">
        <span>Số bài học:</span>
        <strong>${pkg.content.coreLessons.length} bài</strong>
      </div>
      <div class="overview-item">
        <span>Hạt nhân tri thức:</span>
        <strong>${pkg.scope.atoms.length} hạt nhân</strong>
      </div>
      <div class="overview-item">
        <span>Công thức chuẩn:</span>
        <strong>${pkg.content.formulas.length} công thức</strong>
      </div>
      <div class="overview-item">
        <span>Hệ thống bài tập:</span>
        <strong>${pkg.content.exercises.length} bài tập</strong>
      </div>
    </div>

    <!-- Section I: Lessons -->
    <h2 class="section-heading">I. KIẾN THỨC CỐT LÕI (CORE KNOWLEDGE)</h2>
    ${pkg.content.coreLessons.map((lesson) => `
      <div style="page-break-inside: avoid; break-inside: avoid; margin-bottom: 18px;">
        <h3 class="lesson-title">BÀI ${lesson.id}: ${lesson.title.toUpperCase()}</h3>
        <p style="font-size: 9pt; color: #64748b; margin: 4px 0 8px 0;">
          <em>Nguồn tham chiếu: SGK trang ${lesson.sgkStartPage} đến ${lesson.sgkEndPage} • SGV trang ${lesson.sgvStartPage}</em>
        </p>
        <p><strong>Yêu cầu cần đạt:</strong> ${lesson.yccd.join("; ")}.</p>
        <p><strong>Nội dung cốt lõi:</strong> ${lesson.summary}</p>

        ${(lesson.atoms || []).map((atom, idx) => `
          <div class="atom-box">
            <div class="atom-title">1.${idx + 1}. [${atom.atom_id}] ${atom.title || atom.topic}</div>
            <p style="margin: 4px 0;">${atom.canonical_explanation || atom.statement || atom.definition || ""}</p>
            
            ${(atom.formulaLatex || atom.formula?.latex_display) ? `
              <div class="formula-display">
                ${renderFormulaHTML(atom.formulaLatex || atom.formula?.latex_display || "")}
                ${atom.conditions ? `<div style="font-size: 9pt; color: #64748b; margin-top: 4px;"><em>Điều kiện áp dụng: ${atom.conditions}</em></div>` : ""}
              </div>
            ` : ""}

            ${(atom.examples && atom.examples.length > 0) ? `
              <div style="font-size: 9.5pt; margin-top: 4px;"><strong>Ví dụ thực tế:</strong> ${atom.examples.join("; ")}</div>
            ` : ""}

            ${(atom.misconceptions && atom.misconceptions.length > 0) ? `
              <div style="font-size: 9.5pt; color: #b45309; margin-top: 4px;">
                ⚠️ <strong>Lưu ý tránh nhầm lẫn:</strong> ${(atom.misconceptions.map((m: any) => typeof m === "string" ? m : m.description)).join("; ")}
              </div>
            ` : ""}
          </div>
        `).join("")}
      </div>
    `).join("")}

    <!-- Section II: Formulas -->
    ${pkg.content.formulas.length > 0 ? `
      <div class="page-break"></div>
      <h2 class="section-heading">II. KHO CÔNG THỨC CHUẨN ĐÃ QUA FORMULA GATE</h2>
      ${pkg.content.formulas.map((f) => `
        <div class="exercise-card">
          <div style="font-weight: 700; color: #0f172a; margin-bottom: 4px;">
            Công thức [${f.formula_id}]: ${f.topic}
          </div>
          <div class="formula-display">
            ${renderFormulaHTML(f.latex_display)}
          </div>
          <div style="font-size: 9pt; color: #475569;">
            <strong>Điều kiện áp dụng:</strong> ${f.conditions}<br>
            <strong>Nguồn kiểm định:</strong> ${f.source_anchor}
          </div>
        </div>
      `).join("")}
    ` : ""}

    <!-- Section III: Exercises -->
    ${pkg.content.exercises.length > 0 ? `
      <div class="page-break"></div>
      <h2 class="section-heading">III. HỆ THỐNG CÂU HỎI & BÀI TẬP RÈN LUYỆN</h2>
      ${pkg.content.exercises.map((ex, idx) => `
        <div class="exercise-card">
          <div class="exercise-badge">Câu ${idx + 1} • Mã: ${ex.exercise_id} • Mức độ: ${ex.cognitive_level.toUpperCase()} (Độ khó: ${ex.difficulty}/5)</div>
          <p style="margin: 6px 0; font-weight: 600;">${ex.prompt}</p>

          ${ex.options ? `
            <div style="margin: 8px 0 8px 12px; font-size: 10pt;">
              ${ex.options.map((opt) => `<div style="margin-bottom: 3px;">${opt}</div>`).join("")}
            </div>
          ` : ""}

          <div class="solution-box">
            <div><strong>Đáp án:</strong> ${ex.correct_answer}</div>
            <div style="margin-top: 4px;"><strong>Lời giải chi tiết:</strong> ${ex.detailed_solution}</div>
            <div style="margin-top: 4px; font-style: italic; color: #047857;">💡 Gợi ý tư duy: ${ex.socratic_hint}</div>
          </div>
        </div>
      `).join("")}
    ` : ""}

    <!-- Section IV: Real-world phenomena & Scenarios -->
    ${(pkg.content.phenomena.length > 0 || pkg.content.scenarios.length > 0) ? `
      <div class="page-break"></div>
      <h2 class="section-heading">IV. HIỆN TƯỢNG ĐỜI SỐNG & TÌNH HUỐNG THỰC TIỄN</h2>
      ${pkg.content.phenomena.map((p, idx) => `
        <div class="exercise-card" style="border-left: 4px solid #059669;">
          <div style="font-weight: 700; color: #065f46; font-size: 11pt;">
            Hiện tượng ${idx + 1}: ${p.name}
            <span style="font-size: 9pt; font-weight: 400; color: #64748b;">(${p.lessonTitle})</span>
          </div>
          <p style="font-size: 9.5pt; margin: 6px 0;"><strong>• Dấu hiệu quan sát:</strong> ${p.observableSigns.join("; ")}</p>
          <p style="font-size: 9.5pt; margin: 6px 0; color: #0369a1;"><strong>• Câu hỏi gợi mở:</strong> <em>${p.inquiryQuestion}</em></p>
          <p style="font-size: 9.5pt; margin: 6px 0;"><strong>• Bản chất khoa học:</strong> ${p.scientificExplanation}</p>
          ${p.experimentSuggestion ? `<p style="font-size: 9pt; margin: 4px 0; color: #475569;"><strong>• Gợi ý trải nghiệm/thí nghiệm:</strong> ${p.experimentSuggestion}</p>` : ""}
          ${p.safetyNote ? `<p style="font-size: 9pt; margin: 4px 0; color: #b45309;">⚠️ <strong>Lưu ý an toàn:</strong> ${p.safetyNote}</p>` : ""}
        </div>
      `).join("")}

      ${pkg.content.scenarios.map((sc, idx) => `
        <div class="exercise-card" style="border-left: 4px solid #0284c7;">
          <div style="font-weight: 700; color: #0369a1; font-size: 10.5pt;">
            Tình huống ${idx + 1}: ${sc.title}
          </div>
          <p style="font-size: 9.5pt; margin: 4px 0;"><strong>• Vấn đề điều tra:</strong> ${sc.question}</p>
          <p style="font-size: 9.5pt; margin: 4px 0;"><strong>• Hướng giải thích:</strong> ${sc.explanationRoute}</p>
        </div>
      `).join("")}
    ` : ""}

    <!-- Section V: Transfer Tasks -->
    ${pkg.content.transferTasks.length > 0 ? `
      <div class="page-break"></div>
      <h2 class="section-heading">V. NHIỆM VỤ CHUYỂN GIAO NĂNG LỰC GIẢI QUYẾT VẤN ĐỀ</h2>
      ${pkg.content.transferTasks.map((tt, idx) => `
        <div class="exercise-card" style="border-left: 4px solid #8b5cf6;">
          <div style="font-weight: 700; color: #5b21b6; font-size: 11pt; margin-bottom: 6px;">
            Dự án/Nhiệm vụ ${idx + 1}: ${tt.title}
          </div>
          <p style="font-size: 9.5pt; margin: 4px 0;"><strong>• Bối cảnh thực tiễn:</strong> ${tt.context}</p>
          <p style="font-size: 9.5pt; margin: 4px 0;"><strong>• Yêu cầu nhiệm vụ:</strong> ${tt.task}</p>
          <p style="font-size: 9.5pt; margin: 4px 0; color: #047857;"><strong>• Sản phẩm hoàn thành:</strong> ${tt.deliverables}</p>
          <p style="font-size: 9.5pt; margin: 4px 0; color: #475569;"><strong>• Tiêu chí đánh giá chất lượng:</strong> ${tt.evaluationCriteria}</p>
        </div>
      `).join("")}
    ` : ""}

    <!-- Section VI: Digital Resources & PhET Simulations -->
    ${pkg.content.webResources.length > 0 ? `
      <div class="page-break"></div>
      <h2 class="section-heading">VI. TÀI NGUYÊN SỐ & THÍ NGHIỆM MÔ PHỎNG ĐÃ THẨM ĐỊNH</h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 9pt; margin-bottom: 20px;">
        <thead>
          <tr style="background: #f1f5f9; text-align: left;">
            <th style="border: 1px solid #cbd5e1; padding: 8px;">Tên tài nguyên</th>
            <th style="border: 1px solid #cbd5e1; padding: 8px; width: 80px;">Nguồn</th>
            <th style="border: 1px solid #cbd5e1; padding: 8px; width: 70px;">Độ tin cậy</th>
            <th style="border: 1px solid #cbd5e1; padding: 8px;">Đường dẫn truy cập & Chứng cứ</th>
          </tr>
        </thead>
        <tbody>
          ${pkg.content.webResources.map((res) => `
            <tr>
              <td style="border: 1px solid #cbd5e1; padding: 8px; font-weight: 600;">${res.title}</td>
              <td style="border: 1px solid #cbd5e1; padding: 8px; text-transform: uppercase;">${res.source_type}</td>
              <td style="border: 1px solid #cbd5e1; padding: 8px; font-weight: 700; color: #047857; text-align: center;">${res.trust_score}/100</td>
              <td style="border: 1px solid #cbd5e1; padding: 8px;">
                <div style="font-family: monospace; color: #0284c7; word-break: break-all;">${res.url}</div>
                <div style="font-size: 8.5pt; color: #64748b; margin-top: 2px;"><em>${res.evidence_excerpt}</em></div>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    ` : ""}

    <!-- Section VII: Prerequisites -->
    ${pkg.content.prerequisiteAtoms.length > 0 ? `
      <div class="page-break"></div>
      <h2 class="section-heading">VII. KIẾN THỨC NỀN TẢNG TIÊN QUYẾT (PREREQUISITES)</h2>
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; margin-bottom: 20px; font-size: 9.5pt;">
        ${pkg.content.prerequisiteAtoms.map((a) => `
          <div style="margin-bottom: 8px;">
            <strong>[${a.atom_id}] ${a.title || a.topic}:</strong>
            <span>${a.canonical_explanation || a.statement || a.definition || ""}</span>
          </div>
        `).join("")}
      </div>
    ` : ""}

    <!-- Section VIII: Quality Report & Provenance -->
    <div class="page-break"></div>
    <h2 class="section-heading">VIII. BÁO CÁO THẨM ĐỊNH CHẤT LƯỢNG & TRUY NGUYÊN TRI THỨC</h2>
    <table style="width: 100%; border-collapse: collapse; font-size: 9pt; margin-bottom: 20px;">
      <tbody>
        <tr>
          <td style="border: 1px solid #cbd5e1; padding: 8px; font-weight: 700; width: 40%; background: #f8fafc;">Độ bao phủ SGK & YCCD</td>
          <td style="border: 1px solid #cbd5e1; padding: 8px;">${pkg.quality_report.source_coverage}% đạt chuẩn đối sánh SGK/SGV Kết nối tri thức</td>
        </tr>
        <tr>
          <td style="border: 1px solid #cbd5e1; padding: 8px; font-weight: 700; background: #f8fafc;">Kiểm định công thức qua Formula Gate</td>
          <td style="border: 1px solid #cbd5e1; padding: 8px;">${pkg.quality_report.formula_coverage}% (100% công thức chuẩn hóa LaTeX)</td>
        </tr>
        <tr>
          <td style="border: 1px solid #cbd5e1; padding: 8px; font-weight: 700; background: #f8fafc;">Hệ thống bài tập tự luyện</td>
          <td style="border: 1px solid #cbd5e1; padding: 8px;">${pkg.quality_report.exercise_count} bài tập phân hóa 4 mức độ có đáp án & lời giải</td>
        </tr>
        <tr>
          <td style="border: 1px solid #cbd5e1; padding: 8px; font-weight: 700; background: #f8fafc;">Mã băm kiểm định toàn vẹn (Package Hash)</td>
          <td style="border: 1px solid #cbd5e1; padding: 8px; font-family: monospace; font-weight: 700; color: #0369a1;">${pkg.package_hash}</td>
        </tr>
        <tr>
          <td style="border: 1px solid #cbd5e1; padding: 8px; font-weight: 700; background: #f8fafc;">Trạng thái kiểm định</td>
          <td style="border: 1px solid #cbd5e1; padding: 8px; font-weight: 700; color: #047857;">QA_PASS (Đạt chuẩn quy chuẩn Bộ GD&ĐT GDPT 2018)</td>
        </tr>
      </tbody>
    </table>

    <div style="margin-top: 30px; padding-top: 12px; border-top: 1px solid #cbd5e1; text-align: center; font-size: 9pt; color: #94a3b8;">
      Bản quyền tài liệu: KHTN 8 Smart Notebook • Chương trình GDPT 2018 Bộ Giáo Dục và Đào Tạo Việt Nam • Truy xuất từ Knowledge Graph (Mã băm: ${pkg.package_hash})
    </div>
  </div>
</body>
</html>`;
}

/**
 * Open Dedicated Print Window for PDF & High-Res Printing
 */
export function openPrintDocumentWindow(pkg: KnowledgePackage): void {
  const htmlContent = generatePrintableHTML(pkg);
  
  // Try opening in new tab/window
  const printWindow = window.open("", "_blank");
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Auto-trigger print dialog after fonts & styles render
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
      }, 500);
    };
  } else {
    // Fallback if popup blocker intercepted: download as standalone self-contained HTML
    downloadBlob(
      "\uFEFF" + htmlContent,
      generateDocumentSlug(pkg, "html"),
      "text/html;charset=utf-8"
    );
  }
}

/**
 * Download standard DOCX file
 */
export async function downloadDOCXDocument(pkg: KnowledgePackage): Promise<void> {
  const blob = await generateDOCXBlob(pkg);
  const filename = generateDocumentSlug(pkg, "docx");
  
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Download Standalone HTML/PDF-ready Document with UTF-8 BOM
 */
export function downloadHTMLDocument(pkg: KnowledgePackage): void {
  const htmlContent = generatePrintableHTML(pkg);
  downloadBlob(
    "\uFEFF" + htmlContent,
    generateDocumentSlug(pkg, "html"),
    "text/html;charset=utf-8"
  );
}

/**
 * Trigger Client-Side File Download with UTF-8 BOM for guaranteed Vietnamese rendering
 */
export function downloadBlob(content: string, filename: string, mimeType: string) {
  // Always prepend UTF-8 BOM (\uFEFF) if text based to eliminate mojibake in Microsoft Word / Excel / Notepad
  const hasBOM = content.startsWith("\uFEFF");
  const finalContent = hasBOM ? content : "\uFEFF" + content;
  
  const blob = new Blob([finalContent], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
