module Anagram
  def self.find(word, list)
    result = [] of String

    list = list.map { |w| w.downcase } - [word]

    list.each do |item|
      result << item if word.size == item.size &&
                        word.downcase.chars.sort == item.downcase.chars.sort
    end
    result
  end
end
