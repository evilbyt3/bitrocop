
# 👾 BiTroCop


<!-- ABOUT THE PROJECT -->
## About The Project


Crypto asset tracking Discord bot. Currently supports the following commands:
- `/openorders`: display info about current open orders of spot wallet
- `/wallover`: get an overview of your asset holdings *(i.e spot, savings)*
  - [binance doesn't support staking](https://dev.binance.vision/t/earn-locked-staking/1453) through the API currently
- `/orderstatus`: shows current prices for coins you have open orders for + the status of your placements *(negative or positive %)*


<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [Nodejs](https://nodejs.org/en/)
* [Discord.js](https://discord.js.org/)
* [Binance API](https://binance-docs.github.io/apidocs/spot/en/#get-redemption-record-user_data)
* [node-binance-api](https://github.com/jaggedsoft/node-binance-api)
* [embed-table](https://github.com/TreeFarmer/embed-table)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```
* Binance API: in order to make use of this script you need to have a [Binance](https://accounts.binance.com/en/register?ref=56142400) account. To generate your API key go under [Profile > API Management](https://www.binance.com/en/my/settings/api-management) and create one
* Discord server: to get the bot up & running on your server, admin priviliges are required. So you need to own it

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/vlagh3/bitrocop.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Enter your Binance API in `config.js`
   ```js
   {
      "BinKey": "<binance key>",
      "BSecret": "<binance secret>"
   }
   ```
4. For dev purposes you'll also need your [Discord app](https://discord.com/developers/applications) clientId, token & channelId *(i.e guildId)*. See [Setting up a bot app](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)
  ```js 
  {
    "clientId": "<id>",
    "guildId": "<channelId>", // right click channel  & Copy Id
    "token": "<botToken>"
  }
  ```
5. [Generate bot invite link](https://discordjs.guide/preparations/adding-your-bot-to-servers.html#bot-invite-links)
6. Start it: `node bot.js`

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [ ] `/price?symbol` cmd to quickly retrieve cryptocurrency values
- [ ] `/earnoptions` cmd to list all the available [Binance Savings]() options *(fixed or flexible)*
- [ ] `/order?symbol` cmd to get more information about a specific order
- [ ] add support for other platforms *(e.g coinloan, midas)*
- [ ] use in conjuction with [webhooks]() in order to send notifications about
  - [ ] a change in the order status
  - [ ] new coin listings on Binance
  - [ ] when Elon tweets about a currency *(since that's a thing now)*

See the [open issues](https://github.com/vlagh3/bitrocop/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>




<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [This amazing guide from Discord.js](https://discordjs.guide/preparations/adding-your-bot-to-servers.html#bot-invite-links)
* [Discohook for letting me testing styles](https://discohook.org/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/vlagh3/bitrocop.svg?style=for-the-badge
[contributors-url]: https://github.com/vlagh3/bitrocop/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/vlagh3/bitrocop.svg?style=for-the-badge
[forks-url]: https://github.com/vlagh3/bitrocop/network/members
[stars-shield]: https://img.shields.io/github/stars/vlagh3/bitrocop.svg?style=for-the-badge
[stars-url]: https://github.com/vlagh3/bitrocop/stargazers
[issues-shield]: https://img.shields.io/github/issues/vlagh3/bitrocop.svg?style=for-the-badge
[issues-url]: https://github.com/vlagh3/bitrocop/issues
[product-screenshot]: images/screenshot.png
