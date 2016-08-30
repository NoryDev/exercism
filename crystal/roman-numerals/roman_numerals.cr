struct Int
  def to_roman
    n = self
    roman = ""

    roman += "M" * (n / 1000)
    n = n % 1000

    if n < 900
      roman += "D" * (n / 500)
      n = n % 500
    else
      roman += "CM"
      n = n - 900
    end

    if n < 400
      roman += "C" * (n / 100)
      n = n % 100
    else
      roman += "CD"
      n = n - 400
    end

    if n < 90
      roman += "L" * (n / 50)
      n = n % 50
    else
      roman += "XC"
      n = n - 90
    end

    if n < 40
      roman += "X" * (n / 10)
      n = n % 10
    else
      roman += "XL"
      n = n - 40
    end

    if n < 9
      roman += "V" * (n / 5)
      n = n % 5
    else
      roman += "IX"
      n = n - 9
    end

    if n < 4
      roman += "I" * (n / 1)
    else
      roman += "IV"
    end

    roman
  end
end
