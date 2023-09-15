# Better Thousand Separator

This is a thousand separator for React! This creates a user input field that only allow the users to type numbers, and their input will be formatted in real time! This is a better alternative to just using `ToLocaleString()` on inputfields. The different separators you can use are:


| Separator     | unformatted   | Formatted  |
| ------------- |:-------------:| ----------:|
| space         | 1234567       | 1 234 567  |
| period        | 1234567       | 1.234.567  |
| comma         | 1234567       | 1,234,567  |
| apostrophe    | 1234567       | 1'234'567  |
| lakh          | 1234567 | 12,34,567 |

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

## Important:
When you change the separator from one to another, you have to refresh the site or clear the inputfield to make the SeparatorInput work. Otherwise the input will say `NaN`.

The `lakh` is also a bit jank at the moment. Writing works fine but backspace might be a bit buggy at times.

## This thousand separator allows the user to:
- Copy and paste: <br>
clipboard = '123abc456def' <br>
will be pasted = '123456'

- delete a nuber anywhere in the inputfield without any problems.
- placing the cursor before a separator and pressing backspace will make the cursor delete the number after the separator.
- placing the cursor after a separator and pressing delete will make the cursor delete the number before the separator.
- Select any number and delete them, and type new numbers without any issues.
- Use arrowkeys to move the cursor and either delete or write new numbers without any problems.

### The `<SeparatorInput />` also supports ID and ClassName.


## v1.1.0
- Uses BigInt instead of Number, allowing users to create bigger numbers.
- Ctrl + X works.
- Renamed `indian-numbering-system` to `lakh`.

`August 25th, 2023`

## v1.0.5 and older:
Mostly just setting up the package and making it work.

`August 25th, 2023`

<br>

#### made by maklotin.