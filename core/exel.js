// ===============================
// ALEX PSICULTOR - EXCEL CORE
// ===============================

function gerarBackupExcel(modoAdmin = false) {

    const db = obterBanco();

    let usuariosParaExportar = [];

    // Se for admin e quiser geral
    if (modoAdmin && usuarioLogado.tipo === "admin") {
        usuariosParaExportar = db.usuarios;
    } else {
        usuariosParaExportar = [usuarioLogado];
    }

    let dadosTanques = [];
    let dadosVendas = [];

    usuariosParaExportar.forEach(user => {

        user.tanques.forEach(t => {
            dadosTanques.push({
                Usuario: user.usuario,
                Tanque: t.nome,
                Peixes: t.quantidade,
                Peso_Medio: t.peso,
                Data: t.data
            });
        });

        user.vendas.forEach(v => {
            dadosVendas.push({
                Usuario: user.usuario,
                Data: v.data,
                Cliente: v.cliente,
                Tanque: v.tanque,
                Kg: v.kg,
                Valor_Kg: v.valorKg,
                Total: v.total
            });
        });

    });

    // Resumo automático
    let totalVendido = 0;
    let faturamento = 0;

    dadosVendas.forEach(v => {
        totalVendido += Number(v.Kg);
        faturamento += Number(v.Total);
    });

    const dadosResumo = [
        {
            Total_Kg_Vendido: totalVendido,
            Faturamento_Total: faturamento
        }
    ];

    // Criar workbook
    const wb = XLSX.utils.book_new();

    const wsTanques = XLSX.utils.json_to_sheet(dadosTanques);
    const wsVendas = XLSX.utils.json_to_sheet(dadosVendas);
    const wsResumo = XLSX.utils.json_to_sheet(dadosResumo);

    XLSX.utils.book_append_sheet(wb, wsTanques, "Tanques");
    XLSX.utils.book_append_sheet(wb, wsVendas, "Vendas");
    XLSX.utils.book_append_sheet(wb, wsResumo, "Resumo");

    // Nome automático com data e hora
    const agora = new Date();
    const dataFormatada = agora.toLocaleDateString().replace(/\//g, "-");
    const horaFormatada = agora.toLocaleTimeString().replace(/:/g, "-");

    const nomeArquivo = `Backup_Alex_Psicultor_${dataFormatada}_${horaFormatada}.xlsx`;

    XLSX.writeFile(wb, nomeArquivo);
}
