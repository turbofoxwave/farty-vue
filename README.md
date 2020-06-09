# farty-vue
Farty Vue is a fun neural network usage experiment in which a neural network is trained on a desired classification space to map food attributes to a Fart Component type index.
As food items are clicked to feed Patrick his gut will start digesting the food items adding to his conceptual digestive system's levels of solid, fatty and fibrous food matter. Once the Gut threshold is reached  fart components are packed into a sequence in a small time window. Once enough components are packed in or a time release limit is reached the series of fart components will be release (played)

Currently this should run on Chrome for (PC/Mac) without issue.
[Check it out here](https://farty-vue.herokuapp.com)


## What I've learned from this experiment
* Validating the classification domain is problematic without also creating some tooling to review how a broad set of data to classify is being mapped.
  This is important to ensure the expected behavior is produced from the ANN. For this app a simple approach would be to create some unit tests that validate the classification mapping of sample food items.

## Key Technologies Used
* [Vue](https://vuejs.org/v2/guide)
* [Vuetify](https://v15.vuetifyjs.com/en)
* [Phaser 3](https://phaser.io)
* [convnetjs](https://cs.stanford.edu/people/karpathy/convnetjs)

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

## Known issues
* audio no longer functions on IOS 13
* does not run offline

## Future Features
* Build out Fart Component type buckets with additional fart effects of the type. This will add some diversity when the same fart component type is generated consecutively
* switch log level buttons to filter on saved log messages instead of culling log messages of a higher level.

## Todo
* scrub function to ensure return types are in place
* create unit tests to validate Generated ANN has desired classification mapping of food items -> fart component types
* minimize project deps
* update deps