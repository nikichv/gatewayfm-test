import BlockDetails from 'components/atoms/BlockDetails';
import { getLayout } from 'components/layout/MainLayout';
import { useBlockById } from 'features/blocks/blocks.hooks';
import { getLatestBlockThunk } from 'features/blocks/blocks.thunks';
import { AppNextPage } from 'global';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React from 'react';
import wrapper from 'store/index';

const HomePage: AppNextPage = () => {
  const { block } = useBlockById('latest');

  return (
    <>
      <Head>
        <title>Ethereum Blocks - Latest</title>
      </Head>
      <BlockDetails block={block.entity} latest />
    </>
  );
};

HomePage.getLayout = getLayout;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(store => async () => {
    await store.dispatch(getLatestBlockThunk());

    return {
      props: {},
    };
  });

export default HomePage;
