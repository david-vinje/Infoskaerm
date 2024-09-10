# Getting Started
# 

Checkout the [TW intranet API](https://api.trustworks.dk/q/swagger-ui/#/Public%20Resource)

Generate a token, and put it in a `REACT_APP_TOKEN` variable in an `.env` file in the root folder /screen: `REACT_APP_TOKEN=[your-token]`

Run locally: `cd screen && npm install && npm start`

Checkout the [Azure DevOps pipeline status](https://dev.azure.com/davidvinje/info-screen/_build?definitionId=2&_a=summary)

Edit the [Azure DevOps pipeline script and variables](https://dev.azure.com/davidvinje/info-screen/_apps/hub/ms.vss-build-web.ci-designer-hub?pipelineId=2&branch=main)

SSH into the Raspberry Pi: `ssh trustworks@192.168.1.231`

Path to Raspberry Pi autostart script: `/etc/xdg/lxsession/LXDE-pi/autostart`