http://localhost:8080/execute/java
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class Solution {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        List<Integer> squaredEvenNumbers = numbers.stream()
                .filter(n -> n % 2 == 0)
                .map(n -> n * n)
                .collect(Collectors.toList());
        System.out.println(squaredEvenNumbers); 
    }
}

http://localhost:8080/execute/python
def check_odd_or_even(number):
    if number % 2 == 0:
        print(f"{number} is even.")
    else:
        print(f"{number} is odd.")

# Example usage
num = 2
check_odd_or_even(num)


http://localhost:8080/execute/javascript
const number = 11;
if(number % 2 == 0) {
    console.log(number+" is even.");
}
else {
    console.log(number+" is odd.");
}
