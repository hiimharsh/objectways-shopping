import { useEffect, useState } from "react";
import { Image } from "@chakra-ui/image";
import { Container, Box, Heading, Text, Flex } from "@chakra-ui/layout";
import Constants from "../lib/constants";
import { Button } from "@chakra-ui/button";

const Cart = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        console.log('call');
        fetchCartProducts();
    }, [])

    const fetchCartProducts = async () => {
        try {
            const cartresponse = await fetch(`${Constants.API_BASE_URL}/cartproducts`);
            const cartdata = await cartresponse.json();
    
            if (cartdata.status === 'success') setProducts(cartdata.message);
            else console.error(cartdata.message);
        } catch (err) {
            console.error(err);
        }
    }
    
    const removeFromCart = async (product: any) => {
        const options: any = {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                product: product
            })
        }
        const response = await fetch(`${Constants.API_BASE_URL}/removeFromCart`, options);
        const data = await response.json();

        if (data.status === 'success') {
            let allProducts: any = Array.from(products);
            allProducts = allProducts.filter((prod: any) => prod._id.toString() !== product._id.toString());
            setProducts(allProducts);
        } else console.error(data.message);
    }

    return (
        <>
            <Container maxW="100%" my="10" px="10">
                {
                    products && products.length ? products.filter((product: any) => product.Title).map((product: any, index) => (
                        <Box w="100%" key={index} mb="6" borderWidth="1px" borderRadius="lg" overflow="hidden" px="4">
                            <Flex alignItems="center" justifyContent="flex-start" width="100%" height="100%">
                                <Flex>
                                    <Image width="240px" maxWidth="240px" src={product['Image Src']} alt={product.title} />
                                </Flex>
                                <Flex>
                                    <Box p="6">
                                        <Heading size="md">{product.Title}</Heading>
                                        <Text mt="2">{product.Body}</Text>
                                        <Button mt="4" colorScheme="red" size="md" onClick={() => removeFromCart(product)}>Remove from Cart</Button>
                                    </Box>
                                </Flex>
                            </Flex>
                        </Box>
                    )) : <Heading size="md">No products in the cart</Heading>
                }
            </Container>
        </>
    )
}

export default Cart;