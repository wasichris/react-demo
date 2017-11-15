import { storage } from 'services'

export default {
  account: storage.account,
  password: '',
  isRemberAccount: !!storage.account
}
