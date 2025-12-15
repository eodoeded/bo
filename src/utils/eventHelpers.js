// Safe event handler utilities
// Prevents errors when event objects might be undefined or not actual events

/**
 * Safely calls stopPropagation on an event if it's a valid event object
 * @param {Event|undefined|null} e - The event object
 * @returns {boolean} - True if stopPropagation was called, false otherwise
 */
export function safeStopPropagation(e) {
    if (e && typeof e.stopPropagation === 'function') {
        e.stopPropagation();
        return true;
    }
    return false;
}

/**
 * Safely calls preventDefault on an event if it's a valid event object
 * @param {Event|undefined|null} e - The event object
 * @returns {boolean} - True if preventDefault was called, false otherwise
 */
export function safePreventDefault(e) {
    if (e && typeof e.preventDefault === 'function') {
        e.preventDefault();
        return true;
    }
    return false;
}

/**
 * Creates a safe event handler wrapper that ensures the handler receives a valid event
 * @param {Function} handler - The event handler function
 * @returns {Function} - A wrapped handler that checks for valid events
 */
export function safeEventHandler(handler) {
    return (e) => {
        if (!e || typeof e !== 'object') {
            console.warn('Event handler received invalid event object:', e);
            return;
        }
        return handler(e);
    };
}

