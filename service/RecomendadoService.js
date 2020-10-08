"use strict";

var logicalClassifier = require("../utils/logicalClassifier");
var sttGoogle = require("../utils/speechToTextGoogle");
var nluIBM = require("../utils/naturalLanguageUnderstanding");

/**
 * Analisa críticas contidas em um arquivo de áudio ou em um texto e recomenda um carro da FCA dependendo das críticas.
 *
 *
 * car String Nome do carro sobre o qual o comentário ou crítica é feito.
 * text String Texto contendo uma crítica ou comentário sobre um carro. (optional)
 * audio File Áudio em formato FLAC contendo uma crítica ou comentário sobre um carro. (optional)
 * returns Result
 **/
exports.apiRecommendPOST = function (car, text, audio) {
  return new Promise(async function (resolve, reject) {
    var transcriptionInformation = [];

    if (audio) {
      var audioTranscript = await sttGoogle.speechToTextFunction(audio);
      transcriptionInformation = await nluIBM.nluClassifier(audioTranscript);
    } else if (text) {
      transcriptionInformation = await nluIBM.nluClassifier(text);
    }

    var classificationList = await logicalClassifier.mainClassifier(car, transcriptionInformation);

    resolve(classificationList);
  });
};
