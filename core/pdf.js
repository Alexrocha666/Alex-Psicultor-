// ===============================
// ALEX PSICULTOR - PDF CORE
// ===============================

function gerarNotaPDF(venda) {

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const dataAtual = new Date().toLocaleDateString();

    doc.setFontSize(18);
    doc.text("ALEX PSICULTOR", 20, 20);

    doc.setFontSize(12);
    doc.text(`Data: ${dataAtual}`, 20, 30);
    doc.text(`Vendedor: ${usuarioLogado.usuario}`, 20, 40);

    doc.line(20, 45, 190, 45);

    doc.text(`Cliente: ${venda.cliente}`, 20, 55);
    doc.text(`Tanque: ${venda.tanque}`, 20, 65);
    doc.text(`Quantidade (Kg): ${venda.kg}`, 20, 75);
    doc.text(`Valor por Kg: R$ ${venda.valorKg}`, 20, 85);

    doc.setFontSize(14);
    doc.text(`TOTAL: R$ ${venda.total}`, 20, 100);

    doc.line(20, 110, 190, 110);

    doc.setFontSize(10);
    doc.text("Documento interno - Nota de Venda Simples", 20, 120);

    const numeroNota = Date.now();
    const nomeArquivo = `Nota_Alex_Psicultor_${numeroNota}.pdf`;

    doc.save(nomeArquivo);
}
