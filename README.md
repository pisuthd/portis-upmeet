# Upmeet App
> Meetup clone app using React Typescript and Portis Web3 Wallet

LIVE DEMO : https://thirsty-hoover-a1d69f.netlify.com/#/

This application is inspired by Kickback App that the attendees will need to reserve a spot by deposit a small amount of ETH, the pain point is that many time the event comprise of no shown people that brought the organizer put unnecessary effort into preparing beverages and so-on, the app will spread out a deposit from no shown to all attendee who come equally.

This is an experiment version thus many parts are undone, aim to explore an opportunity on gas relay feature from Portis.

![](header.png)

## Installation

```sh
yarn install
yarn start
```

Then please deploy the solidity contracts with your favourite tool, don't forget to put the contract address into constant.tsx as it needed.


## Features

* Current Version
    * Create an event
    * RSVP for events without paying a fee
    * Sponsoring dapp fee
* Future
    * Pay a deposit back when event is finished
    * Cancel event

