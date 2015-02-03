# Linguist

> Linguist allows you to talk to people around the world in different languages by translating your messages automatically for you.


## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> You can try linguist out here: http://linguist.azurewebsites.net.

From the home page:
1. Select your language from the sidebar
2. Create a username
3. Select the room you want to chat in. If no room is selected, default is lobby
4. Start chatting!

## Requirements

- Node 0.10.x
- MongoDB
- Microsoft Translator

## Development

### Installing Dependencies

1. Run npm and bower install

From within the root directory:

```sh
npm install -g bower
npm install
bower install
```

2. Acquire Microsoft Translator credentials (Client ID and Client secret) through Windows Azure. Guide available [here](http://blogs.msdn.com/b/translation/p/gettingstarted1.aspx).

3. Create a config.js file in /server/ with the following contents:

  ```sh
  var config = {};
  config.client_id = "FILL ME IN";
  config.client_secret = "FILL ME IN";
  config.localDevPath = 'mongodb://localhost:27017/linguist';
  module.exports = config;
  ```

### Tasks

gulp - Runs tests, builds public scripts, and serves site on local server port 3000, and watches for changes to files (server and public).

gulp scripts - Builds public scripts for deployment, placing result in /public/dist

gulp test-server - Server Test

gulp test-client - Client Test

### Roadmap

View the project roadmap [here](https://github.com/HumpbackSeahorses/HumpbackSeahorses/issues)

## Team
  - __Product Owner__: Jared Noble
  - __Scrum Master__: Dave Fedele
  - __Development Team Members__: Tyler Davis, Ryan Leung

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
