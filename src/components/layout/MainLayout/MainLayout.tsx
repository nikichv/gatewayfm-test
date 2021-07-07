import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import Paths from 'src/router/paths';

const MainLayout: React.FC = ({ children }) => {
  const router = useRouter();

  const [validated, setValidated] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleInputChange = useCallback(
    e => setSearchQuery(e.target.value),
    []
  );

  const handleSubmit = useCallback(
    async event => {
      const form = event.currentTarget;

      event.preventDefault();
      event.stopPropagation();

      if (form.checkValidity()) {
        setValidated(false);
        setSearchQuery('Loading');
        await router.push({
          pathname: Paths.Block,
          query: { id: searchQuery },
        });
        setSearchQuery('');
      } else {
        setValidated(true);
      }
    },
    [router, searchQuery]
  );

  return (
    <>
      <Container className='py-5'>
        <Row>
          <Col xs={12} md={6}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Row className='align-items-end'>
                <Form.Group as={Col} controlId='blockNumber'>
                  <Form.Label>The Ethereum Blockchain Explorer</Form.Label>
                  <Form.Control
                    type='text'
                    name='block'
                    placeholder='Enter block number to search'
                    pattern='[0-9]*'
                    value={searchQuery}
                    onChange={handleInputChange}
                    required
                  />
                  <Form.Control.Feedback type='invalid'>
                    Block number must contains only digits
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Button type='submit' className='mb-3'>
                Search
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <Container>{children}</Container>
    </>
  );
};

export const getLayout: (page: NextPage) => JSX.Element = page => (
  <MainLayout>{page}</MainLayout>
);

export default MainLayout;
