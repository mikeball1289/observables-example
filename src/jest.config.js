// Currently using Jest v23.x because of a performance regression in later versions https://github.com/facebook/jest/issues/6783
// probably going to be fixed in v25

module.exports = {
    preset: 'jest-preset-angular',
    rootDir: './',
    roots: ['./app'],
    setupFilesAfterEnv: ['<rootDir>/setupJest.ts'],
    testURL: 'http://localhost/',
    testMatch: ['<rootDir>/**/*.spec.ts'],
    globals: {
        'ts-jest': {
            tsConfig: './tsconfig.spec.json'
        },
        '__TRANSFORM_HTML__': true
    },
    transform: {
        "^.+\\.(ts|js|html)$": "../node_modules/jest-preset-angular/preprocessor.js"
    },
    snapshotSerializers: [
        "../node_modules/jest-preset-angular/AngularSnapshotSerializer.js",
        "../node_modules/jest-preset-angular/HTMLCommentSerializer.js"
    ]
}
