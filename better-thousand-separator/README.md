# Better Thousand Separator

This is a thousand separator for React! This creates a user input field that only allow the users to type numbers, and their input will be formatted in real time! This is a better alternative to just using `ToLocaleString()` on inputfields. The different separators you can use are:


| Separator     | unformatted   | Formatted  |
| ------------- |:-------------:| ----------:|
| space         | 1234567       | 1 234 567  |
| period        | 1234567       | 1.234.567  |
| comma         | 1234567       | 1.234.567  |
| apostrophe    | 1234567       | 1'234'567  |
| indian-numbering-system | 1234567 | 12,34,567 |

 #### Example:

 ```` jsx
import SeparatorInput from 'better-thousand-separator'

function App() {

    return(
        <>
            <SeparatorInput separator='apostrophe'/>
        </>
    )
}

export default App;
````
Input:
````
1000000
````

Output:
````
1'000'000
````


 will give you an inputfield that separates every thousand with an apostrophe. 


## This thousand separator lets the user
- Copy and paste: <br>
clipboard = '123abc456def' <br>
will be pasted = '123456'

- delete a nuber anywhere in the inputfield without any problems.
- placing the cursor before a separator and pressing backspace will make the cursor delete the number after the separator.
- placing the cursor after a separator and pressing delete will make the cursor delete the number before the separator.
- Select any number and delete them, and type new numbers without any issues.

### The `<SeparatorInput />` also supports ID and ClassName




#### made by maklotin.