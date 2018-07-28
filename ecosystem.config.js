module.exports = {
  apps: [{
    name: 'behindkitchendoors',
    script: './index.js'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-18-206-255-5.compute-1.amazonaws.com',
      key: '~/.ssh/myApp.pem',
      ref: 'origin/master',
      repo: 'git@github.com:anvasquez08/Behind-Kitchen-Doors',
      path: '/home/ubuntu/behindKitchenDoors',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}