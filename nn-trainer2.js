var convnetjs = require('convnetjs');
var fs = require('fs');


//load saved net from temp of available.
var jsonNet = null;
try{
    var content = fs.readFileSync('./temp/net.json', 'utf8');
    jsonNet = JSON.parse(content);
}
catch(err){
  console.error(err)
}



//setup net.
var net = new convnetjs.Net();
if(jsonNet){
    console.log('building net from file');
    net.fromJSON(jsonNet);
}
else {
  //here we are setting up the layers for our network.
  var layer_defs = [];
  layer_defs.push({type:'input', out_sx:1, out_sy:1, out_depth:3});
  layer_defs.push({type:'fc', num_neurons:20, activation:'sigmoid'});
  layer_defs.push({type:'fc', num_neurons:30, activation:'relu'});
  layer_defs.push({type:'fc', num_neurons:20, activation:'sigmoid'});
  layer_defs.push({type:'regression', num_neurons:1});
  net.makeLayers(layer_defs);
}

//solid, fatty, fiber
var foodInputs = [
    [0.1, 0.1, 10],
    [10, 0.1, 0.1],
    [0.1, 10.0, 0.1],
    [5, 5, 0.1],
    [5, 0.1, 5],
    [0.1, 5, 5],
    [5.0, 5.0, 5.0],
    [10,10,10]
]

//these targets will map to sounds we'll trigger.
var targets = [
    [.1],[.2],[.3],[.4],[.5],[.6],[.7],[.8]
]


var xvols = [];
for(var i =0; i < foodInputs.length;i++){
    xvols.push( new convnetjs.Vol(foodInputs[i]));
}

// train on this datapoint, saying [0.5, -1.3] should map to value 0.7:
// note that in this case we are passing it a list, because in general
// we may want to  regress multiple outputs and in this special case we
// used num_neurons:1 for the regression to only regress one.
var trainer = new convnetjs.SGDTrainer(net,
              {learning_rate:0.01, momentum:0.001, batch_size:10, l2_decay:0.001});

//var trainer = new convnetjs.Trainer(net, {method: 'adadelta', l2_decay: 0.001,
 //             batch_size: 10});

for(var i = 0; i < 1000000000; i++){
    for(var t = 0; t < xvols.length;t++){
        trainer.train(xvols[t], targets[t])
    }
    if(i%100000=== 0){

        var allPass =true;
        var toleranceOffset = 0.02;
        for(var t = 0; t < xvols.length; t++){
            var predicted_values1 = net.forward(xvols[t]);
            if(predicted_values1 < targets[t]-toleranceOffset || predicted_values1 > targets[t] + toleranceOffset){
                allPass = false;
            }
            console.log(t + ' predicted value: ' + predicted_values1.w[0]);
        }

        saveNet(net);

        if(allPass) break;

    }
}

function saveNet(net){
    var json = net.toJSON();
    // the entire object is now simply string. You can save this somewhere
    var str = JSON.stringify(json);

    fs.writeFileSync('./temp/net.json',str,'utf8',{flag:"w"});
    var dt = new Date();
    console.log(dt + " net.json updated");

}