import constantService from './constantService'

var baseUrl = constantService.apiUrl

export default {

  getUser: function () {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Object.assign({}, {
          email: 'andresmijares@gmail.com',
          repository: 'https://github.com/andresmijares/distributed-async-react-redux-saga'
        }))
      }, 500)
    }).then(res => res)
  },
  getDeparture: function (user) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Object.assign({}, {
          userID: user.email,
          flightID: 'AR1973',
          date: '10/27/2016 16:00PM'
        }))
      }, 2500)
    }).then(res => res)
  },
  getFlight: function (flightID) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Object.assign({}, {
          id: flightID,
          pilot: 'Jhonny Bravo',
          plane: {
            make: 'Boeing 747 RC',
            model: 'TA-889'
          },
          state: 'onTime'
        }))
      }, 4500)
    }).then(res => res)
  },
  getForecast: function (date) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Object.assign({}, {
          date: date,
          forecast: 'rain'
        }))
      }, 2000)
    }).then(res => res)
  }

}
