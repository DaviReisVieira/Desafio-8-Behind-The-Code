const priorityList = [
  "SEGURANCA",
  "CONSUMO",
  "DESEMPENHO",
  "MANUTENCAO",
  "CONFORTO",
  "DESIGN",
  "ACESSORIOS",
];

const vehicleRecommendationList = {
  SEGURANCA: ["FIAT 500", "ARGO"],
  CONSUMO: ["TORO", "ARGO"],
  DESEMPENHO: ["CRONOS", "ARGO"],
  MANUTENCAO: ["ARGO", "CRONOS"],
  CONFORTO: ["CRONOS", "LINEA"],
  DESIGN: ["CRONOS", "ARGO"],
  ACESSORIOS: ["ARGO", "DUCATO"],
};

exports.mainClassifier = async function (car, transcriptionInformation) {
  var recommendedVehicle = "";
  var entityList = [];
  var classificationList = { recommendation: recommendedVehicle, entities: entityList };

  if (transcriptionInformation && transcriptionInformation.length) {
    transcriptionInformation.forEach((entityTranscription) => {
      var entity = {
        entity: entityTranscription.type,
        sentiment: entityTranscription.sentiment.score,
        mention: entityTranscription.text,
      };

      entityList.push(entity);
    });

    //Tira Duplicados
    //entityList = entityList.filter(
    //((set) => (f) => !set.has(f.entity) && set.add(f.entity))(new Set())
    //);

    entityList.sort(function (a, b) {
      if (a.sentiment > b.sentiment) {
        return 1;
      }
      if (a.sentiment < b.sentiment) {
        return -1;
      }
      return 0;
    });

    entityList.sort(function (a, b) {
      var subtractionValue = Math.abs(Math.abs(a.sentiment) - Math.abs(b.sentiment));
      if (subtractionValue < 0.1) {
        if (priorityList.indexOf(a.entity) < priorityList.indexOf(b.entity)) {
          return -1;
        }
      }
    });

    var entitySelected = entityList[0];

    if (entitySelected.sentiment < 0) {
      var vehiclePreList = vehicleRecommendationList[entitySelected.entity];
      if (entitySelected.entity != "MODELO") {
        if (car.toUpperCase() != vehiclePreList[0]) {
          recommendedVehicle = vehiclePreList[0];
        } else {
          recommendedVehicle = vehiclePreList[1];
        }
      }
    }

    classificationList = { recommendation: recommendedVehicle, entities: entityList };

    return classificationList;
  } else {
    return classificationList;
  }
};
