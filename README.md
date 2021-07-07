## How to build

Run `yarn dev` and after that `yarn build` in parallel,
so the app can fetch its first data to cache.

Once `yarn build` is done stop `yarn dev` and run `yarn start`, then open [http://localhost:3000](http://localhost:3000).

## Features

* SSR-ready and SEO-friendly;
* Fully covered by TypeScript;
* Using feature-folders clean architecture;
* Loads page blazing fast as we utilize NextJS getStaticProps to get initial data;
* Includes input validations;
* Includes pagination for transactions table;
* Proxying API requests.
