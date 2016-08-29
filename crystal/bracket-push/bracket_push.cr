module Brackets
  def self.are_valid?(string)
    brackets = [] of Char

    string.each_char do |char|
      case char
      when '(', '{', '['
        brackets << char
      when ')'
        return false unless brackets.pop? == '('
      when '}'
        return false unless brackets.pop? == '{'
      when ']'
        return false unless brackets.pop? == '['
      end
    end

    brackets.empty?
  end
end
