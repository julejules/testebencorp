// um cliente informou que o sistema estava retornando clinicas próximas de 10km no raio de 30km e qundo selecionava o raio de 50km aparecia todas as clinicas de 10 e de 30 mais o de 50, analise o código, aplique a correção:

function saveNearClinics(clinics, localization) {
  let ids10 = [];
  let ids30 = [];
  let ids50 = [];

  clinics.forEach((hit) => {
    var clinic = null;
    clinic = br.com.bencorp.prestador.Clinica._get({ _id: hit.clinica_id });

    try {
      if (
        clinic.empresaPessoa &&
        clinic.empresaPessoa.addresses &&
        clinic.empresaPessoa.addresses.length > 0 &&
        clinic.empresaPessoa.addresses[0].coordinates
      ) {
        if (
          localization &&
          localization.coordinates &&
          clinic.empresaPessoa.addresses[0].coordinates
        ) {
          const distance = distanceInKM(
            localization.coordinates,
            clinic.empresaPessoa.addresses[0].coordinates,
          );

          if (distance <= 10) {
            ids10.push({
              codigoSoc: clinic.codigoNoSOC,
              id: clinic._id,
              tipoDeAtendimento:
                clinic.informacoesDeAtendimento.tipoDoAtendimento,
              pagamentoAntecipado:
                clinic.informacoesDeAtendimento.pagamentoAntecipado,
            });
          }

          if (distance <= 30) {
            ids30.push({
              codigoSoc: clinic.codigoNoSOC,
              id: clinic._id,
              tipoDeAtendimento:
                clinic.informacoesDeAtendimento.tipoDoAtendimento,
              pagamentoAntecipado:
                clinic.informacoesDeAtendimento.pagamentoAntecipado,
            });
          }

          if (distance <= 50) {
            ids50.push({
              codigoSoc: clinic.codigoNoSOC,
              id: clinic._id,
              tipoDeAtendimento:
                clinic.informacoesDeAtendimento.tipoDoAtendimento,
              pagamentoAntecipado:
                clinic.informacoesDeAtendimento.pagamentoAntecipado,
            });
          }
        }
      }
    } catch (e) {
      throw _utils.stringifyAsJson(e);
    }
  });

  pin.clinicasA10Km = ids10;
  pin.clinicasA30Km = ids30;
  pin.clinicasA50Km = ids50;

  return {
    clinicasA10Km: pin.clinicasA10Km,
    clinicasA30Km: pin.clinicasA30Km,
    clinicasA50Km: pin.clinicasA50Km,
  };
}

// o erro esta na lógica dos if

if (distance <= 10) {
  ids10.push({
    codigoSoc: clinic.codigoNoSOC,
    id: clinic._id,
    tipoDeAtendimento: clinic.informacoesDeAtendimento.tipoDoAtendimento,
    pagamentoAntecipado: clinic.informacoesDeAtendimento.pagamentoAntecipado,
  });
}

// uma clínica que está a menos de 10km entra nas 3, pois 9 é menor que 10, 20 e 50, o que não é o esperado, o esperado é que ela entre apenas na de 10km

// o correto seria:

if (distance <= 10) {
  ids10.push(clinicData);
} else if (distance > 10 && distance <= 30) {
  ids30.push(clinicData);
} else if (distance > 30 && distance <= 50) {
  ids50.push(clinicData);
}

// Assim nós especificamos dentro de qual distância a clínica deve se encaixar, limitando a entrada dela apenas em um dos arrays, o que corrige o problema.

//SUGESTÃO: para evitar repetição de código, eu criaria um objeto para armazenar as clínicas e depois usar uma função para adicionar as clínicas ao array correto com base na distância:

const clinicData = {
  codigoSoc: clinic.codigoNoSOC,
  id: clinic._id,
  tipoDeAtendimento: clinic.informacoesDeAtendimento.tipoDoAtendimento,
  pagamentoAntecipado: clinic.informacoesDeAtendimento.pagamentoAntecipado,
};
