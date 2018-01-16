import { isString, isObject, each } from 'lodash'
import invariant from 'invariant'
import modelModule from 'models'

// validate model
function checkModel (model) {
  const { namespace, state, reducers, takeEverySagas } = model
  invariant(isString(namespace), `app.addModel: namespace (${namespace}) should be string.`)
  invariant(isObject(state), `app.addModel: state (${state}) should be object.`)
  invariant(isObject(reducers), `app.addModel: reducers (${reducers}) should be object.`)
  if (takeEverySagas) invariant(isObject(takeEverySagas), `app.addModel: takeEverySagas (${takeEverySagas}) should be object.`)
  return model
}

// get and validate all models
var models = []
each(modelModule, (value, key) => models.push(checkModel(value)))

export default models
