module Leap where
  import Prelude
  import Math ((%))

  isLeapYear :: Int -> Boolean
  isLeapYear year =
    if ((year `mod` 400 == 0) || ((year `mod` 4 == 0) && (year `mod` 100 /= 0)))
      then true
      else false
