const db = new Dexie("AlexPsicultorDB");

db.version(1).stores({
  tanques: "++id, nome, especie, quantidade, pesoInicial, metaPeso, dataPovoamento",
  pesagens: "++id, tanqueId, data, pesoMedio",
  financeiro: "++id, tipo, descricao, valor, data, tanqueId",
  metas: "++id, tipo, valor"
});
