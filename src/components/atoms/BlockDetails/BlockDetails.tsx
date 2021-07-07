import { Block } from 'features/blocks/blocks.types';
import { paginateItems } from 'features/pagination/pagination.utils';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Col,
  Dropdown,
  DropdownButton,
  Pagination,
  Row,
  Table,
} from 'react-bootstrap';
import hexToDec from 'utils/hexToDec';
import styles from './BlockDetails.module.css';

const PER_PAGE_OPTIONS = [10, 25, 50, 100] as const;

export interface BlockDetailsProps {
  block: Block;
  latest?: boolean;
}

const BlockDetails: React.FC<BlockDetailsProps> = props => {
  const { block, latest } = props;

  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);

  const totalPagesCount = useMemo(
    () => Math.ceil(block.transactions.length / perPage),
    [block.transactions.length, perPage]
  );

  const blockNumberAsDec = useMemo(
    () => hexToDec(block.number),
    [block.number]
  );

  const paginatedTransactions = useMemo(
    () => paginateItems(block.transactions, perPage, page),
    [block.transactions, page, perPage]
  );

  const handlePaginationSelect = useCallback((perPage: string) => {
    setPerPage(Number(perPage));
  }, []);

  const handlePageChange = useCallback(
    (page: number) => () => setPage(page),
    []
  );

  /**
   * if we change perPage value we should start again from first page
   */
  useEffect(() => {
    setPage(1);
  }, [perPage]);

  /**
   * When perPage or page will have been changed, sliced items will have changed too,
   * so we should to scroll page to top.
   */
  useEffect(() => {
    window.scroll(0, 0);
  }, [paginatedTransactions]);

  return (
    <>
      {latest ? (
        <h1>Latest Block</h1>
      ) : (
        <h1>
          Block <span className='text-muted'>#{blockNumberAsDec}</span>
        </h1>
      )}
      <Table bordered hover>
        <tbody>
          <tr>
            <td>Number</td>
            <td>{blockNumberAsDec}</td>
          </tr>
          <tr>
            <td>Hash</td>
            <td>{block.hash}</td>
          </tr>
        </tbody>
      </Table>
      <h1>Transactions</h1>
      <Row>
        <Col>
          <Table className={styles.table} responsive='sm' bordered hover>
            <thead>
              <tr>
                <th>Txn Hash</th>
                <th>From</th>
                <th>To</th>
              </tr>
            </thead>
            <tbody>
              {block.transactions.length !== 0 &&
                paginatedTransactions.map(t => (
                  <tr key={t.hash}>
                    <td>
                      <span className='d-block text-truncate'>{t.hash}</span>
                    </td>
                    <td>
                      <span className='d-block text-truncate'>{t.from}</span>
                    </td>
                    <td>
                      <span className='d-block text-truncate'>{t.to}</span>
                    </td>
                  </tr>
                ))}
              {block.transactions.length === 0 && (
                <tr>
                  <td colSpan={3}>
                    <Alert variant='warning'>
                      There are no matching entries
                    </Alert>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
      {block.transactions.length !== 0 && (
        <Row className='pb-5 justify-content-between'>
          <Col xs='auto'>
            <div className='d-flex align-items-center'>
              Show
              <DropdownButton
                id='dropdown-item-button'
                className='mx-2'
                title={perPage}
                onSelect={handlePaginationSelect}
              >
                {PER_PAGE_OPTIONS.map(perPage => (
                  <Dropdown.Item key={perPage} eventKey={perPage} as='button'>
                    {perPage}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
              Records
            </div>
          </Col>
          <Col xs={'auto'}>
            <Pagination>
              <Pagination.First
                as={'span'}
                disabled={page === 1}
                onClick={handlePageChange(1)}
              >
                First
              </Pagination.First>
              <Pagination.Prev
                as={'span'}
                disabled={page - 1 === 0}
                onClick={handlePageChange(page - 1)}
              />
              <Pagination.Item as={'span'} disabled>
                Page {page} of {totalPagesCount}
              </Pagination.Item>
              <Pagination.Next
                as={'span'}
                disabled={page + 1 > totalPagesCount}
                onClick={handlePageChange(page + 1)}
              />
              <Pagination.Last
                as={'span'}
                disabled={page === totalPagesCount}
                onClick={handlePageChange(totalPagesCount)}
              >
                Last{' '}
              </Pagination.Last>
            </Pagination>
          </Col>
        </Row>
      )}
    </>
  );
};

export default BlockDetails;
