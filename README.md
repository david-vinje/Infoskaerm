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

In case token expires, ask Hans for a new system token, and put it in a secret in the DevOps pipeline:
  1. Open pipeline `project-screen`
  2. Select `Edit`
  3. Select `Variables`
  4. Select `REACT_APP_TOKEN`
  5. Update the value of the secret with the new system token 

In case token is needed for the project, create a system variable. For MAC users: 
  1. `nano ~/.zprofile`
  2. Write `export REACT_APP_TOKEN="[token value from Hans/what is in the RPi]"`
  3. `source ~/.zprofile`

To update the agent in RPi:
  1. `cd TWagent && ./config.sh`
  2. Enter `Y` to accept Team Explorer Everywhere license agreement
  3. Enter server URL `https://dev.azure.com/trustworks/`
  4. Enter PAT (might need to contact Henrik/tech support)

To generate a new PAT
  1. Follow guide https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/personal-access-token-agent-registration?view=azure-devops
  2. Set the following rules:
    a. Expiration: 90 days
    b. Scope: Custom defined
    c. Only select rights to read. 