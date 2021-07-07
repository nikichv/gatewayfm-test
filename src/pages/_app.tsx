import { NextPage } from 'next';
import { AppProps } from 'next/app';
import React from 'react';
import wrapper from 'store/index';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = ({ Component, pageProps }: AppProps) => {
  /**
   * Using layout to prevent re-renders on page change
   */
  const getLayout =
    (
      Component as NextPage & {
        getLayout: (page: JSX.Element) => JSX.Element;
      }
    ).getLayout || ((page: JSX.Element) => <>{page}</>);

  return <div id='app'>{getLayout(<Component {...pageProps} />)}</div>;
};

export function reportWebVitals(metric: unknown): void {
  if (process.env.NODE_ENV === 'production') {
    console.log(metric);
  }
}

export default wrapper.withRedux(App);
