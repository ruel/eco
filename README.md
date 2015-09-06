### eco

Eco is a crowdfunding platform that empowers [fundthefuture](http://fundthefuture.rachel.ruel.me/)

#### Dependencies

* Redis (for sessions)
* MySQL (recommended on production)
* Node.js
* npm

#### Deployment

* Clone the eco repository

```sh
$ git clone git@github.com:ruel/eco.git
```

* Change directory to the project directory

```sh
$ cd eco
```

* Install **npm** dependencies

```sh
$ npm install
```

* Run with a specified port

```sh
$ PORT=1339 node app.js
```

#### Notes

* The facebook credentials are embedded, and will look for `http://localhost:1339`, so it is recommended to run the app on port **1339*
* Paypal are skipped for now due to sandbox issues
