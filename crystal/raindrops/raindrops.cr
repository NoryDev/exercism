module Raindrops
  def self.drops(n)
    result = ""
    result += "Pling" if n % 3 == 0
    result += "Plang" if n % 5 == 0
    result += "Plong" if n % 7 == 0
    result = "#{n}" if result == ""
    result
  end
end
