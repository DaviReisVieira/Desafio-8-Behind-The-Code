const NaturalLanguageUnderstandingV1 = require("ibm-watson/natural-language-understanding/v1");
const { IamAuthenticator } = require("ibm-watson/auth");

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: "2020-08-01",
  authenticator: new IamAuthenticator({
    apikey: process.env.NLU_APIKEY,
  }),
  serviceUrl: process.env.NLU_SERVICE_URL,
});

exports.nluClassifier = async function (text) {
  const analyzeParams = {
    features: {
      entities: {
        model: process.env.NLU_WKS,
        sentiment: true,
      },
    },
    text: text,
  };

  return naturalLanguageUnderstanding
    .analyze(analyzeParams)
    .then((analysisResults) => {
      return analysisResults.result.entities;
    })
    .catch((err) => {
      console.log("error:", err);
    });
};
