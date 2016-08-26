class Hamming
  def self.compute(control, test)
    raise ArgumentError.new unless control.size == test.size

    diff = 0
    control.each_char_with_index do |letter, index|
      diff += 1 if control[index] != test[index]
    end
    diff
  end
end
