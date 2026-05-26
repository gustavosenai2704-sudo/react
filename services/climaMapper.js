export function normalizarClimaDoBanco(item) {
  if (!item) {
    return {};
  }

  return {
    ...item,
    id_clima: item.id_clima || item.id,
    cidade: item.cidade || item.Cidade || "",
    estado: item.estado || item.Estado || item.uf || item.UF || "",
    temperatura: item.temperatura ?? item.Temperatura ?? "",
    condicao: item.condicao || item.descricao || item.Descricao || "",
    umidade: item.umidade ?? item.Umidade ?? "",
    vento: item.vento ?? item.velocidade_vento ?? item.Velocidade_vento ?? "",
    data: item.data || item.Data || item.created_at?.slice(0, 10) || "",
    observacao: item.observacao || item.comentario || item.Comentario || "",
  };
}

export function montarPayloadClima(token, values, idClima) {
  return {
    token,
    ...(idClima ? { id_clima: idClima, id: idClima } : {}),
    ...values,
    Cidade: values.cidade,
    Temperatura: values.temperatura,
    Descricao: values.condicao,
    Umidade: values.umidade,
    Velocidade_vento: values.vento,
    Comentario: values.observacao,
    descricao: values.condicao,
    velocidade_vento: values.vento,
    comentario: values.observacao,
  };
}
