module Primes
  def self.sieve(limit)
    n = 2
    all = (2..limit).to_a
    double = all
    result = [] of Int32

    all.each do |n|
      result << n if double.includes? n

      double = double.map { |m| m % n == 0 ? nil : m }.compact
    end
    result
  end
end
