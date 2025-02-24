# DW Tech Test

 This is a user interface for the given Survey API. Made using Typescript, Tailwind and TRPC using [T3](https://create.t3.gg), the app lets users access and edit their Survey notes. Components are sourced from [Tailwind UI](https://tailwindui.com/components), though all have been adjusted for the app.
 
[View Live](https://dw-test.vercel.app/) 


## CLI setup:
Ensure you have Node installed, recommend v22.11.0
```sh
   git clone git@github.com:shellycs50/DW-Test.git
   cd DW-Test
   npm install
```
Set API_KEY variable in .env  

```sh
   npm run dev
```

## Assumptions

I have assumed that the point of this exercise is to create a responsive, functional user interface in the given time and that it was reasonable to plan ahead, to make the most of the 2-3 hour limit.


## If I had more time

### General Approach

- Given more time and a production context, I would be thinking much more about architecture and maintainability.

- For example, I would want to make and encorporate more reusable functions and components.. I'd like to have used global state, sessionStorage or an /[id] route to separate the form and display. 

### Specifics


- Client side validation of ID input only handles empty input cases. I would have liked to have got the client to run some basic validation with a regex (8 alphanum chars, dash, 4 alphanum chars) etc. 

- I decided to update the state cache when the user clicks update. In hindsight I'd rather this was done once the update succeeds. This way they still get warned when leaving after an unsuccessful request. 

- The backend logic needs a few more minutes. For example - if the APIs response to GET fails to parse, it's currently being caught by the catch and will return a generic unknown error message. I should be using safeParse and returning a message based on the result. 

- I'd like to have added a bit more style to the page like some background SVGs for some character.
