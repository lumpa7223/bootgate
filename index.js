const si = require('systeminformation')
const defaultGateway = require('default-gateway')
const { execSync } = require('child_process')

defaultGateway.v4().then(result => {
    let fsubnet = result.gateway.split('.').slice(0, 3)
    fsubnet.push('254')
    let gate = fsubnet.join('.')

    execSync(`route change -p 0.0.0.0 MASK 0.0.0.0 ${gate} METRIC 1`, {
        encoding: 'utf8'
    }, (err, stdout, stderr) => {
        if (err) {
            // node couldn't execute the command
            return;
        }
    })
}).catch((e) => {
    console.log(e)
})