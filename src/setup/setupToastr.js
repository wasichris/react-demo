import toastr from 'toastr'
import 'toastr/toastr.scss'

// 程式進入點已 import {..} 'setup' 執行 setup.index
// 而 dynamic rxporter 會將該資料夾的所有組件載入執行後輸出
// 因此不必再次於其他地方執行此 setup 邏輯

// global toastr setting
toastr.options.closeButton = true
toastr.options.timeOut = 3000
toastr.options.progressBar = true
toastr.options.showMethod = 'slideDown'
