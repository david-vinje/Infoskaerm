# Getting Started
# 

Checkout the [TW intranet API](https://api.trustworks.dk/q/swagger-ui/#/Public%20Resource)

Get token from the raspi, and put it in a `REACT_APP_TOKEN` variable in an `.env` file in the root folder /screen: `REACT_APP_TOKEN=[your-token]`

To find the token, SSH into the Raspberry Pi: 
  1. `ssh trustworks@192.168.1.231`
  2. `cat ~/.bash_profile`

To run locally:
  1. `cd screen`
  2. `npm install`
  3. `npm start`

Checkout the [Azure DevOps pipeline status](https://dev.azure.com/davidvinje/info-screen/_build?definitionId=2&_a=summary)

Edit the [Azure DevOps pipeline script and variables](https://dev.azure.com/davidvinje/info-screen/_apps/hub/ms.vss-build-web.ci-designer-hub?pipelineId=2&branch=main)


Path to Raspberry Pi autostart script: `/etc/xdg/lxsession/LXDE-pi/autostart`

In case token expires, ask Hans for a new system token, and put it in .bash_profile:
  1. `nano ~/.bash_profile`
  2. `source ~/.bash_profile`