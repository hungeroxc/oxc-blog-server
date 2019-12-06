/* eslint-disable @typescript-eslint/camelcase */
module.exports = {
    apps: [
        {
            name: 'prod',
            script: './dist/src/index.js',
            env: {
                NODE_ENV: 'prod'
            },
            env_qa: {
                NODE_ENV: 'qa'
            }
        }
    ]
}
