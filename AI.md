## Initial Prompt:

```
I need you to write typescript code for the following application:
"USAFacts is interested in the galactic spending of long, long ago in a galaxy far, far away. There is a hope that the spend on starships has gone down over time, so it can focus on more important things like planetary population growth, but we are unsure.

Fortunately, SWAPI - The Star Wars API (https://swapi.info/) has been collecting this data and makes it readily and freely available for general consumption and should help us answer this question. Our timeline for spending can be identified by each of the films in the Star Wars Universe (1-6).
"

It should have a graphical user interface (GUI).
The application should consist of a backend which does the following: "Build a backend API that consumes the necessary data provided by SWAPI. While we could query the API directly in our front-end, we will want to extend the API in the future for our own needs and therefore need it." This backend should be written using the following technologies: NodeJS, Axios, and express server. It should be written in typescript and be completely and properly typed.

It should also have a frontend that does the following: "Build a front-end page that displays the spending trend as outlined above. We want a visual graph followed by some explanatory text that communicates the results. The visuals do not need to be overly fancy, but being clear and concise is valuable." The frontend should be written using the following technologies: React 17, NextJS for routing, TailwindCSS for styling, React-intl for localization and number formatting, Nivo for visualization, and MUI for components.

Functionality: There should be basic filtering ability to show the differences between any permutation of the movies, for example: episode 1 versus 2, episode 1 versus 4, and so on.

Layout: There should be a graph on the main page which displays a graph of spend on starships compared to the star wars movies as provided above.

Appearance: The GUI should have a clean and simple design. Please use well known star wars colors. Allow a light mode and a dark mode, where the light mode is Rebel Alliance colors and the dark mode is empire colors. There should be a button that allows switching between light and dark modes.

Localization: All text should be included in an en-US.ts file as keys that work with react-intl. In addition, attempt to make a separate localization file in Shyriiwook (the wookie language). You can store these files in the top level src folder in a folder called "i18n".

Build system: I'd like the build system for this code to use Turbo, and include Husky and lint-staged with ESLint standard, Prettier standard, and prevent eslint and prettier from colliding using plugins.

Tests: I'd like some basic unit tests for each component and any functions we provide with thorough coverage.

The code should be well-structured and use object-oriented programming principles. Include comments to explain the purpose of each part of the code. Include basic error handling. For example, showing no data available or empty data.

The code generated must be complete and runnable without requiring any external files or modifications. It should not need to generate images or load additional data files. Do not leave any parts of the code as placeholders (e.g., comments like # Implement this function). Generate the complete implementation for all features.

There should be a turbo command that runs just the back end, just the front end, or both with watchers.

In addition, let's make this code available to be run in a docker container for easy running at a later time.
```

##Second prompt:

```
Create a top level readme which contains documentation on how to run all of the code in the various apps and folders while also providing a detailed list of technologies used at the various layers, e.g. Back-end, front-end, build-system
```
