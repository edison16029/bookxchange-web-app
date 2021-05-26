module.exports = {
    apps: [
      {
        name: 'bxc-web-app',
        script: 'npx',
        args: 'serve -s build -l 5000 -n',
        interpreter: 'none',
        env: {
          NODE_ENV: 'production',
          REACT_APP_SERVER:'13.233.89.150'
        },
      },
    ],
  }