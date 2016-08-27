module RnaComplement
  CONV = {"G" => "C", "C" => "G", "T" => "A", "A" => "U"}

  def self.of_dna(string)
    string.split(//).map { |char| CONV[char] }.join
  end
end
