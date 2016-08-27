module Bob
  def self.hey(string)
    return "Fine. Be that way!" if string.gsub(/ /, "") == ""
    if string == string.upcase && string.delete("A-Z") != string
      return "Whoa, chill out!"
    end
    return "Sure." if string[-1] == '?'
    "Whatever."
  end
end
