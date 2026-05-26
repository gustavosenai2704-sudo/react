const numeroRegex = /^\d+([.,]\d+)?$/;
const dataRegex = /^\d{4}-\d{2}-\d{2}$/;

export function normalizarNumero(valor) {
  return valor.trim().replace(",", ".");
}

export function validarDadosClima(values) {
  if (Object.values(values).some((value) => value === "")) {
    return "Favor preencher todos os campos.";
  }

  if (values.estado.length !== 2) {
    return "Digite o estado com 2 letras. Exemplo: SP.";
  }

  if (!numeroRegex.test(values.temperatura)) {
    return "Digite a temperatura somente com numeros. Exemplo: 30.";
  }

  if (!numeroRegex.test(values.umidade)) {
    return "Digite a umidade somente com numeros. Exemplo: 60.";
  }

  if (!numeroRegex.test(values.vento)) {
    return "Digite o vento somente com numeros. Exemplo: 12.";
  }

  if (!dataRegex.test(values.data)) {
    return "Digite a data no formato aaaa-mm-dd. Exemplo: 2026-05-26.";
  }

  const data = new Date(`${values.data}T00:00:00`);

  if (Number.isNaN(data.getTime())) {
    return "Digite uma data valida.";
  }

  return null;
}
