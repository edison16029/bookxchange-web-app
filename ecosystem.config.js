module.exports = {
    apps: [
      {
        name: 'bxc-web-app',
        script: 'npx',
        args: 'serve -s build -l 5000 -n',
        interpreter: 'none',
        env: {
          NODE_ENV: 'development',
        },
      },
    ],
  }