module Pangram
  def self.pangram?(str)
    ('a'..'z').each do |char|
      return false unless str.includes?(char) || str.includes?(char.upcase)
    end
    return true
  end
end
