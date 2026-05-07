const mes = document.querySelector("#mes");
const dia = document.querySelector("#dia");
const ano = document.querySelector("#ano");
const botaoConverter = document.querySelector("#converter");
const resultado = document.querySelector("#resultado");

function converterData(mes, dia, ano) {
  if (!mes || !dia || !ano) {
    return {
      erro: true,
      mensagem: "Erro: preencha mês, dia e ano",
      dataPorExtenso: null,
      dataBanco: null,
    };
  }
  const mesesPorExtenso = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  const mesNumero = Number(mes);
  const diaNumero = Number(dia);
  const anoNumero = Number(ano);

  if (
    Number.isNaN(mesNumero) ||
    Number.isNaN(diaNumero) ||
    Number.isNaN(anoNumero)
  ) {
    return {
      erro: true,
      mensagem: "Erro: mês, dia e ano devem ser números",
      dataPorExtenso: null,
      dataBanco: null,
    };
  }

  if (mesNumero < 1 || mesNumero > 12) {
    return {
      erro: true,
      mensagem: "Mês inválido. Use um valor entre 1 e 12.",
      dataPorExtenso: null,
      dataBanco: null,
    };
  }

  if (diaNumero < 1 || diaNumero > 31) {
    return {
      erro: true,
      mensagem: "Dia inválido. Use um valor entre 1 e 31.",
      dataPorExtenso: null,
      dataBanco: null,
    };
  }

  const dataValida = new Date(anoNumero, mesNumero - 1, diaNumero);
  if (
    dataValida.getFullYear() !== anoNumero ||
    dataValida.getMonth() !== mesNumero - 1 ||
    dataValida.getDate() !== diaNumero
  ) {
    return {
      erro: true,
      mensagem: "Data inválida.",
      dataPorExtenso: null,
      dataBanco: null,
    };
  }

  const mesPorExtenso = mesesPorExtenso[mesNumero - 1];
  const mesFormatado = String(mesNumero).padStart(2, "0");
  const diaFormatado = String(diaNumero).padStart(2, "0");

  return {
    erro: false,
    mensagem: "Data convertida com sucesso",
    dataPorExtenso: `${diaNumero} de ${mesPorExtenso} de ${anoNumero}`,
    dataBanco: `${mesFormatado}/${diaFormatado}/${anoNumero}`,
  };
}

botaoConverter.addEventListener("click", function () {
  const dataConvertida = converterData(mes.value, dia.value, ano.value);

  if (dataConvertida.erro) {
    resultado.textContent = dataConvertida.mensagem;
    console.error(dataConvertida.mensagem);
    return;
  }

  resultado.textContent = `${dataConvertida.mensagem}: ${dataConvertida.dataPorExtenso}`;

  console.log("Mensagem:", dataConvertida.mensagem);
  console.log("Data para exibir:", dataConvertida.dataPorExtenso);
  console.log("Data para salvar no banco:", dataConvertida.dataBanco);
});
