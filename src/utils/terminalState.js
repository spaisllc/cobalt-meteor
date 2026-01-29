// Simple state management for the terminal
export const TerminalState = {
    IDLE: 'IDLE',
    TYPING: 'TYPING',
    AWAITING_NAME: 'AWAITING_NAME',
    AWAITING_COMMAND: 'AWAITING_COMMAND',
    SHOWING_CARDS: 'SHOWING_CARDS',
    CARD_EXPANDED: 'CARD_EXPANDED',
};

let currentState = TerminalState.IDLE;
let userName = localStorage.getItem('spais_username') || '';
const listeners = [];

export const getTerminalState = () => currentState;
export const getUserName = () => userName;

export const setTerminalState = (newState) => {
    currentState = newState;
    notifyListeners();
};

export const setUserName = (name) => {
    userName = name;
    localStorage.setItem('spais_username', name);
};

export const subscribeToState = (callback) => {
    listeners.push(callback);
};

const notifyListeners = () => {
    listeners.forEach(cb => cb(currentState));
};
