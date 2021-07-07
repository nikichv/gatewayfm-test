import BlockDetails from 'components/atoms/BlockDetails';
import { getLayout } from 'components/layout/MainLayout';
import { useBlockById } from 'features/blocks/blocks.hooks';
import { getBlockByIdThunk } from 'features/blocks/blocks.thunks';
import { BlockId } from 'features/blocks/blocks.types';
import { AppNextPage } from 'global';
import Head from 'next/head';
import React from 'react';
import { GetStaticPaths } from 'next';
import { Col, Row } from 'react-bootstrap';
import wrapper from 'store/index';
import hexToDec from 'utils/hexToDec';

export interface BlockPageProps {
  id: BlockId;
}

const BlockPage: AppNextPage<BlockPageProps> = props => {
  const { id } = props;

  const { block } = useBlockById(id);

  return block.entity ? (
    <>
      <Head>
        <title>Ethereum Blocks #{hexToDec(block.entity.number)}</title>
      </Head>
      <BlockDetails block={block.entity} />
    </>
  ) : (
    <>
      <Head>
        <title>Search not found</title>
      </Head>
      <Row className='justify-content-center py-5'>
        <Col xs={'auto'}>
          <h1>Search not found</h1>
          <p>
            Oops! The search string you entered was: {block.id} <br />
            Sorry! This is an invalid search string.
          </p>
        </Col>
      </Row>
    </>
  );
};

BlockPage.getLayout = getLayout;

export const getStaticProps = wrapper.getStaticProps<BlockPageProps>(
  store =>
    async ({ params }) => {
      const { id } = params as { id: BlockId };
      await store.dispatch(getBlockByIdThunk({ params: { id } }));

      return {
        props: {
          id,
        },
        revalidate: 1,
      };
    }
);

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export default BlockPage;
