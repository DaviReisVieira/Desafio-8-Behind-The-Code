const SpeechToTextV1 = require("ibm-watson/speech-to-text/v1");
const { IamAuthenticator } = require("ibm-watson/auth");

const speechToText = new SpeechToTextV1({
  authenticator: new IamAuthenticator({
    apikey: process.env.STT_APIKEY,
  }),
  serviceUrl: process.env.STT_SERVICE_URL,
});

exports.speechToTextFunction = async function (audio) {
  const recognizeParams = {
    audio: audio.buffer,
    contentType: "audio/flac",
    model: "pt-BR_BroadbandModel",
    wordAlternativesThreshold: 0.9,
    keywords: [
      "confortável",
      "carro",
      "veículo",
      "multimedia",
      "acessórios",
      "conforto",
      "consumo",
      "consumo",
      "desempenho",
      "design",
      "manutenção",
      "modelo",
      "segurança",
    ],
    keywordsThreshold: 0.6,
  };

  return speechToText
    .recognize(recognizeParams)
    .then((speechRecognitionResults) => {
      return JSON.stringify(
        speechRecognitionResults.result.results[0].alternatives[0].transcript,
        null,
        2
      );
    })
    .catch((err) => {
      console.log("error:", err);
    });
};
