# pomodoro-demo-for-testing
This is a simple, functional Pomodoro Clock built with modern web technologies. The project was created to demonstrate core React concepts and the principles of integration testing.

# Technologies Used for Testing

**Vitest**: test runner and framework

**JSDOM**: simulate a browser environment

***React Testing Library*** (@testing-library/react): provides essential functions like render (to draw our component in the JSDOM environment) and fireEvent (to simulate user actions like clicks).

**Jest DOM**(@testing-library/jest-dom): adds helpful, matchers to our tests like .toBeInTheDocument()

# Step-by-Step Testing Setup Procedure
After the initial Pomodoro application components were created, the following steps were taken to establish the testing environment.

**1. Installation of Testing Dependencies:**

```
npm install --save-dev vitest jsdom @testing-library/react @testing-library/jest-dom
```

**2. Configuration of Vite**

Next, we needed to tell Vite how to use Vitest. This was done by modifying the vite.config.js file and adding a test object to the configuration.


```export default defineConfig({
  plugins: [react()],
  // This 'test' object was added
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
})
```


**3. Creation of the Global Setup File**

As configured in the previous step, we created a new file at src/setupTests.js. Its  purpose is to import the jest-dom matchers, making them available globally to all of our test files.

src/setupTests.js:
```
import '@testing-library/jest-dom';
```

**4. Adding the Test Script**

To provide a simple, standardized command for running our tests, we added a "test" script to the scripts section of our package.json file.

```
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "test": "vitest"  // This line was added
},
```

Running ```npm test``` now successfully executes the entire test suite using the configured tools.

# Test File (App.test.jsx)
Our test suite for the main App component verifies the application's core features by simulating user interactions. Each test focuses on a specific piece of functionality.

**Test 1: Initial Render**

> Purpose: To confirm that the app loads correctly with its default state.
> 
> Checks: Verifies the timer displays "25:00" and the "Session" label is visible right away.

**Test 2: Start/Pause Toggling**

> Purpose: To ensure the main control button works as expected.
> 
> Checks: Simulates a user clicking "Start" and confirms the button text changes to "Pause". It then clicks again and verifies the text returns to "Start".

**Test 3: Reset Functionality**

> Purpose: To guarantee the reset button returns the app to its original state.
> 
> Checks: The test first changes the session length to alter the state. Then, it simulates a click on the "Reset" button and asserts that the timer correctly returns to the default "25:00".

**Test 4: Length Controls**

> Purpose: To verify that users can adjust the session and break timers.
> 
> Checks: Simulates clicks on the "+" buttons for both session and break lengths and confirms that their respective displays update correctly.
