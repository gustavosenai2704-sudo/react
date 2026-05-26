import AsyncStorage from "@react-native-async-storage/async-storage";

const CLIMAS_STORAGE_KEY = "@atividade:climas-local";

const climasPadrao = [
  {
    id_clima: 1,
    cidade: "Sao Paulo",
    estado: "SP",
    temperatura: "27",
    condicao: "Ensolarado",
    umidade: "61",
    vento: "12",
    data: "2026-05-26",
    observacao: "Ceu limpo durante a maior parte do dia.",
  },
  {
    id_clima: 2,
    cidade: "Rio de Janeiro",
    estado: "RJ",
    temperatura: "30",
    condicao: "Parcialmente nublado",
    umidade: "70",
    vento: "18",
    data: "2026-05-26",
    observacao: "Sensacao termica elevada no periodo da tarde.",
  },
];

export async function listarClimasLocal() {
  const climasSalvos = await AsyncStorage.getItem(CLIMAS_STORAGE_KEY);

  if (climasSalvos) {
    return JSON.parse(climasSalvos);
  }

  await AsyncStorage.setItem(CLIMAS_STORAGE_KEY, JSON.stringify(climasPadrao));
  return climasPadrao;
}

export async function inserirClimaLocal(clima) {
  const climas = await listarClimasLocal();
  const novoClima = {
    id_clima: Date.now(),
    ...clima,
  };
  const novaLista = [...climas, novoClima];

  await AsyncStorage.setItem(CLIMAS_STORAGE_KEY, JSON.stringify(novaLista));
  return novoClima;
}

export async function alterarClimaLocal(idClima, climaAlterado) {
  const climas = await listarClimasLocal();
  const novaLista = climas.map((clima) => {
    const idAtual = clima.id_clima || clima.id;
    return String(idAtual) === String(idClima)
      ? {
          ...clima,
          ...climaAlterado,
          id_clima: idAtual,
        }
      : clima;
  });

  await AsyncStorage.setItem(CLIMAS_STORAGE_KEY, JSON.stringify(novaLista));
  return novaLista.find((clima) => String(clima.id_clima || clima.id) === String(idClima));
}

export async function deletarClimaLocal(idClima) {
  const climas = await listarClimasLocal();
  const novaLista = climas.filter((clima) => String(clima.id_clima || clima.id) !== String(idClima));

  await AsyncStorage.setItem(CLIMAS_STORAGE_KEY, JSON.stringify(novaLista));
  return novaLista;
}
