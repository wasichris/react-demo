export default function (...nums) {
  var result = 0
  nums.forEach(function (number) {
    result += number
  })
  return result
}
