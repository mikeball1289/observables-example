Object.defineProperty(window, 'CSS', { value: null });

Object.defineProperty(document, 'doctype', {
    value: '<!DOCTYPE html>'
});

Object.defineProperty(window, 'getComputedStyle', {
    value: () =>
    {
        return {
            display: 'none',
            appearance: ['-webkit-appearance'],
            getPropertyValue: (prop) =>
            {
                return '';
            }
        };
    }
});

/**
 * ISSUE: https://github.com/angular/material2/issues/7101
 * Workaround for JSDOM missing transform property
 */
Object.defineProperty(document.body.style, 'transform', {
    value: () =>
    {
        return {
            enumerable: true,
            configurable: true,
        };
    },
});

Object.defineProperty(window, 'matchMedia', {
    value: () => ({ matches: true })
});

// Avoid console warns about window.crypto not being present, and falling back on Math.Random() when generating GUIDs
var nodeCrypto = require('crypto');
Object.defineProperty(window, 'crypto', {
    value: {
        getRandomValues: (buffer) => nodeCrypto.randomFillSync(buffer)
    }
});

// Workaround for failing to load @markpieszak/ng-application-insights package
Object.defineProperty(window, 'define', { value: () => { } });

// const storageMock = () =>
// {
//     let storage = {};
//     return {
//         getItem: key => key in storage ? storage[key] : null,
//         setItem: (key, value) => storage[key] = value || '',
//         removeItem: key => delete storage[key],
//         clear: () => storage = {},
//     };
// };

// Object.defineProperty(window, 'localStorage', { value: storageMock() });
// Object.defineProperty(window, 'sessionStorage', { value: storageMock() });
