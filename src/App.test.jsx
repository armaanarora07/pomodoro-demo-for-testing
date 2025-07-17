import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// Test Suite for the main App component
describe('Pomodoro App', () => {

  // Test 1: Check if the app renders correctly on initial load
  test('renders with default values', () => {
    render(<App />);
    
    // Check if the initial session label is visible
    expect(screen.getByText('Session')).toBeInTheDocument();
    
    // Check if the default timer displays 25:00
    expect(screen.getByText('25:00')).toBeInTheDocument();
    
    // Check if the default session and break lengths are correct
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  // Test 2: Check if the Start/Pause button works
  test('toggles the timer between start and pause', () => {
    render(<App />);
    
    // Find the start button
    const startPauseButton = screen.getByText('Start');
    
    // Click to start the timer
    fireEvent.click(startPauseButton);
    
    // The button text should now be "Pause"
    expect(screen.getByText('Pause')).toBeInTheDocument();
    
    // Click again to pause the timer
    fireEvent.click(startPauseButton);
    
    // The button text should go back to "Start"
    expect(screen.getByText('Start')).toBeInTheDocument();
  });

  // Test 3: Check if the Reset button works
  test('resets the timer to its default state', () => {
    render(<App />);

    // Find the + button for the session and click it to change the state
    const incrementSessionButton = screen.getAllByText('+')[0]; 
    fireEvent.click(incrementSessionButton);

    // Verify the state has changed (Session length is now 26)
    expect(screen.getByText('26:00')).toBeInTheDocument();

    // Now, find and click the reset button
    const resetButton = screen.getByText('Reset');
    fireEvent.click(resetButton);

    // Verify that everything is back to its default state
    expect(screen.getByText('Session')).toBeInTheDocument();
    expect(screen.getByText('25:00')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
  });

  // Test 4: Check if session and break length controls work
  test('allows changing session and break lengths when timer is not active', () => {
    render(<App />);

    // Get all buttons with "+" text content. The first is for Session, the second is for Break.
    const incrementButtons = screen.getAllByText('+');
    fireEvent.click(incrementButtons[0]); // Increment session
    fireEvent.click(incrementButtons[1]); // Increment break

    // Check that the displayed lengths and the timer have updated
    expect(screen.getAllByText('26')[0]).toBeInTheDocument(); // Session length display
    expect(screen.getByText('6')).toBeInTheDocument();       // Break length display
    expect(screen.getByText('26:00')).toBeInTheDocument();   // Timer display
  });
});