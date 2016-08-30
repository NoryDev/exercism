module Atbash
  def self.encode(string)
    stripped = string.downcase.gsub(/[^a-z0-9]+/, "")
    result = [] of Char
    stripped.each_char_with_index do |char, index|
      result << ' ' if index.divisible_by?(5) && index != 0

      if char.alpha?
        result << ('a'.ord + ('z'.ord - char.ord)).unsafe_chr
      else
        result << char
      end
    end

    result.join
  end
end
