class Series
  def initialize(@string : String)
  end

  def largest_product(n)
    raise ArgumentError.new if n > @string.size || n < 0
    return 1 if n == 0

    array = @string.chars.map do |char|
      raise ArgumentError.new unless char.digit?
      num = UInt64.new(char.to_i)
    end

    result = [] of UInt64
    array[0..(-n)].each_with_index do |value, index|
      result << array[index..(index + n - 1)].reduce { |acc, i| acc * i }
    end

    result.max
  end
end
