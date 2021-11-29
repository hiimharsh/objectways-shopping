import { Divider, Heading, Flex, Link, Text, Container } from '@chakra-ui/react';
import Routes from './routes'
import './App.scss';

function App() {
  return (
    <div className="App">
      <header>
        <Container height="10" maxW="100%" my="4" px="10">
          <Flex alignItems="center" justifyContent="space-between" width="100%" height="100%">
            <Flex>
              <Heading as="h4" size="lg">Shopping</Heading>
            </Flex>
            <Flex justifyContent="flex-end">
              <div className="nav-link">
                <Link href="/home">
                  <Text fontSize="2xl">Home</Text>
                </Link>
              </div>
              <div className="nav-link">
                <Link href="/cart">
                  <Text fontSize="2xl">Cart</Text>
                </Link>
              </div>
            </Flex>
          </Flex>
        </Container>
      </header>
      <Divider />
      <Routes />
    </div>
  );
}

export default App;
