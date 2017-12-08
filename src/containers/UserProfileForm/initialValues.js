import { get } from 'lodash'

export default (state) => {
  // get initial form value from redux state
  const {
    account,
    email,
    address,
    city,
    state: addressState,
    zip,
    hasJob,
    weekdays = [],
    skills,
    sex } = get(state, 'profile.userProfile', {})

  return {
    account,
    email,
    address,
    city,
    state: addressState,
    zip,
    hasJob,
    weekdays,
    skills,
    sex
  }
}
