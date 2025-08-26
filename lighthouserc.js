// lighthouserc.js -- NEW FILE

module.exports = {
  ci: {
    collect: {
      // This tells Lighthouse to start a local server and test against that
      startServerCommand: 'npm run start',
      url: ['http://localhost:3000'],
      numberOfRuns: 2, // Run twice to get more stable numbers
    },
    assert: {
      // This sets the performance "budget". The build will fail if any of these
      // scores drop below the specified value. Start with reasonable numbers
      // and increase them as you optimize further.
      assertions: {
        'categories:performance': ['warn', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 1 }],
      },
    },
    upload: {
      target: 'temporary-public-storage', // Uploads report to a temporary URL
    },
  },
};