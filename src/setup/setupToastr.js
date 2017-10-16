import toastr from 'toastr'
import 'toastr/toastr.scss'

export default function () {
  // global toastr setting
  toastr.options.closeButton = true
  toastr.options.timeOut = 3000
  toastr.options.progressBar = true
  toastr.options.showMethod = 'slideDown'
}
