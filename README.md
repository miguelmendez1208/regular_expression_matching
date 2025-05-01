# NFA state machine creation and validation. Typescript

## Intuition

NFA's are a pretty natural solution for regular expression problems, so I decided to try out solving this problem using my knowledge of state machines and basic computational theory. This problem was a lot harder than expected though, since there were a lot of edge cases, and the the epsilon transitions made the code pretty slow. After working through the edge cases I came up with this solution, where we're first looping through the p (pattern) string backwards to create a list of strings which will represent our state machine, and then calling our helper function which will solve this problem for us.

## Approach
First we loop through P to create our state machine which will be a list of strings. We loop through P backwards, so that if there's ever a * we add the character just previous of the * to the array, and we also make sure that, if there are two * state's in a row, we merge them. This will significantly boost the performance of the code as we reduce the exponential explosion in the case of multiple star states in a row. Our helper function works by keeping two pointers, one for s and one for the state machine p[]. It loops through s and checks the next state in p. It keeps track of the state in P with the variable j.

We'll find out of the state in P is a star state based on it's length, if its greater than a single character, we treat the logic differently; In the case of a star state, we immediately split states, and try to solve the subproblem of s[i],p[i+1], as we take an epsilon transition to the next state, in the case that the star state leads to a case of 0 matching letters. In our program this means that we call a copy of the helper function at the next state, skipping our current star state, if that one returns true, we early exit out of our parent function and return true. If it doesn't we carry on with the current star state. We then take the matching_letter, which is the character of the star state, and if it's not equivalent to the letter of s[i] or, if it the matching_letter isn't ".", we early exit out of the function and return false.

If the current state is not a star state, we can just check if it matches the letter of s[i], if it does we continue to the next state, if it doesn't we early exit out of the function and return false.

Once we finish looping through the entirety of string s, we then check to see if the rest of the strings in p[], are star states. We check this, by simply return whether or not p[j] has a length smaller than 2, if it does, then we have consumed all of the characters of s but not all the characters of P.

If J is at the end of p, meaning we've hit the accept state of our state machine, then we have consumed all the states and the function is true, else we return false, as we haven't hit our acceptance state.

## Complexity
### Time complexity:
Worst Case:
O(2 
(
 k)∗(n+m))

### Explanation:

k: Number of * operators in the pattern.

n: Length of the input string s.

m: Length of the pattern p.

Each * in the pattern can lead to two recursive branches (matching zero or more occurrences of the preceding character). In the worst case, this results in exponential time complexity.

The preprocessing step (merging consecutive * states) reduces redundant branches but does not eliminate the exponential nature of the recursion.

### Space complexity:
We keep an extra array here called "states" which is smaller than P and will keep track of our current position in the state machine. We also split the state machine, if we are current on a star state, and this can be very expensive on memory as when we split we create copies of s and p[].
### Space Complexity
Worst Case:
O((n+m) 
2
 )

### Explanation:

Recursive Call Stack: The depth of recursion depends on the length of s and p

String Slicing: Each recursive call creates new sliced copies of s and p

States Array: The preprocessed states array has

