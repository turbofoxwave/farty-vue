/** What we are shooting for here is to use an ANN to classify which food types generate which fart types. It is experimental
 * and has the challenage of having an ANN which correctly approximates the desired function for seperating classifications.
 * The desire is to have just enough training to create reasonable classification groups which expectedly / semi expectedly border.
 * Overtraining will likely cause tight clustering with poor boundry distributions eg  all clusters are expected but the deviding spaces space only a limited
 * number of the total number of classifications.. In the case of this design it would cause a lack of fart sound devirsity and kill
 * the observably behavior that food combinations elsicit different fart sound combinations.
 *
 * In this draft I am hope for unexpected food -> fart classification mappings, having diversity is the most critical quality I need.
 * Later improved tooling and test to increase the ability to train without overtraining an
 *

 * We'll have 3 attribute levels in a food (solid, fatty, fiber), then convert those into a classification.
 * That classification is then used as a hash to determine the audio file index to play.
 *
 * for reference:
   https://cs.stanford.edu/people/karpathy/convnetjs/docs.html
 */


const convnetjs = require('convnetjs');
const fs = require('fs');

let jsonNet = null;
let net = new convnetjs.Net();

//build net from saved file or construct a fresh one.
//this will allow us to resume training from some saved point.
jsonNet = loadNetFromFile('./temp/net.json')
if (jsonNet) {
  console.log('building net from file');
  net.fromJSON(jsonNet);
}
else {
  let layer_defs = [];
  layer_defs.push({ type: 'input', out_sx: 1, out_sy: 1, out_depth: 3 });
  layer_defs.push({ type: 'fc', num_neurons: 20, activation: 'sigmoid' });
  layer_defs.push({ type: 'fc', num_neurons: 30, activation: 'relu' });
  layer_defs.push({ type: 'fc', num_neurons: 20, activation: 'sigmoid' });
  layer_defs.push({ type: 'regression', num_neurons: 1 });

  net.makeLayers(layer_defs);

}

//food attributes as inputs. Each input array represents: solid, fatty, fiber of a food
let foodAttributeInputs = [
  //map to .1
  [5, 0.1, 0.1],
  [10, 0.1, 0.1],
  [20, 0.1, 0.1],

  //map to .2
  [0.1, 5.0, 0.1],
  [0.1, 10.0, 0.1],
  [0.1, 20.0, 0.1],

  //map to .3
  [0.1, 0.1, 5],
  [0.1, 0.1, 10],
  [0.1, 0.1, 20],

  //map to .4
  [5, 5, 0.1],
  [10, 10, 0.1],
  [20, 20, 0.1],

  //map to .5
  [5, 0.1, 5],
  [10, 0.1, 10],
  [20, 0.1, 20],

  //map to .6
  [0.1, 5, 5],
  [0.1, 10, 10],
  [0.1, 20, 20],

  //map to .7
  [20, 20, 20]
]

//for each food set
let targets = [
  [.1], [.1], [.1],
  [.2], [.2], [.2],
  [.3], [.3], [.3],
  [.4], [.4], [.4],
  [.5], [.5], [.5],
  [.6], [.6], [.6],
  [.7]
]

let xvols = [];
for (let i = 0; i < foodAttributeInputs.length; i++) {
  xvols.push(new convnetjs.Vol(foodAttributeInputs[i]));
}


//these trainers are pulled from docs for experimentation

// let trainer = new convnetjs.Trainer(net, {
//   method: 'sgd', learning_rate: 0.01,
//   l2_decay: 0.001, momentum: 0.9, batch_size: 100,
//   l1_decay: 0.001
// });

let trainer = new convnetjs.SGDTrainer(net,
  {learning_rate:0.01, momentum:0.9, batch_size:100, l2_decay:0.001});

//
// let trainer = new convnetjs.Trainer(net, {method: 'adadelta', l2_decay: 0.001,
//             batch_size: 10});

// The training loop. For every iteration we train on all inputs then
const trainingLength = 100000
const checkFrequency = 10000
const toleranceOffset = 0.02;

for (let i = 0; i < trainingLength; i++) {
  //train on all food inpout volumes -> target sets
  for (let t = 0; t < xvols.length; t++) {
    trainer.train(xvols[t], targets[t])
  }

  //Check if we are withing an expected tolerance of accuracy.
  //When we check we'll create a save point.
  if (i % checkFrequency === 0) {

    let allPass = true;

    for (let t = 0; t < xvols.length; t++) {
      let predicted_values1 = net.forward(xvols[t]);
      if (predicted_values1 < targets[t] - toleranceOffset || predicted_values1 > targets[t] + toleranceOffset) {
        allPass = false;
      }
      console.log(t + ' predicted value: ' + predicted_values1.w[0]);
    }

    saveNet(net);

    if (allPass) break;

  }
}

process.exit(0)

////////////////////////////////////////////////////////////////////////
function saveNet (net) {
  let json = net.toJSON();

  let str = JSON.stringify(json);
  fs.writeFileSync('./temp/net.json', str, 'utf8', { flag: "w" });

  let dt = new Date();
  console.log(dt + " net.json updated");

}

/**
 * Load a json net file for use with convnetjs
 * If the a json net can't be loaded undefined is returned.
 * @param {string} filePath - path to net json to load
 * @return {Object} jsonNet - neural net data object used to initialize convnet
 */
function loadNetFromFile (filePath) {
  try {
    let jsonNet;
    let content = fs.readFileSync(filePath, 'utf8');

    if (content) {
      jsonNet = JSON.parse(content);
    }

    return jsonNet;

  } catch (err) {
    console.error(err);
    return;
  }

}