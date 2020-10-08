const sttKeywords = [
  "confortável",
  "carro",
  "veículo",
  "multimídia",
  "acessórios",
  "conforto",
  "consumo",
  "desejar",
  "desempenho",
  "design",
  "manutenção",
  "modelo",
  "segurança",
  "Ar condicionado",
  "Banco",
  "TORO",
  "DUCATO",
  "FIORINO",
  "CRONOS",
  "FIAT 500",
  "MAREA",
  "LINEA",
  "ARGO",
  "RENEGADE",
];

exports.speechToTextFunction = async function (audioReceived) {
  const speech = require("@google-cloud/speech");

  const client = new speech.SpeechClient();

  const audio = {
    content: audioReceived.buffer,
  };
  const config = {
    encoding: "FLAC",
    sampleRateHertz: 48000,
    languageCode: "pt-BR",
    audioChannelCount: 2,
    SpeechRecognitionAlternative: [
      {
        words: sttKeywords,
      },
    ],
  };

  const request = {
    audio: audio,
    config: config,
  };

  // Detects speech in the audio file. This creates a recognition job that you
  // can wait for now, or get its result later.
  const [operation] = await client.longRunningRecognize(request);
  // Get a Promise representation of the final result of the job
  const [response] = await operation.promise();
  const transcription = response.results
    .map((result) => result.alternatives[0].transcript)
    .join("\n");

  return transcription;
};
