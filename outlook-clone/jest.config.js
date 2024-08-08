module.exports = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.js'
  },
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
  },
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
    "!**/dist/**",
    "!src/**/*.d.ts", 
  ],
  coveragePathIgnorePatterns: [
    "<rootDir>/src/app/layout.tsx", "<rootDir>/src/app/page.tsx"
  ],
  coverageReporters: ['text', 'cobertura', 'text-summary'],
  coverageThreshold: {
    global: {
      branches: 92,
      functions: 92,
      lines: 92,
      statements: 92,
    },
  },
};
