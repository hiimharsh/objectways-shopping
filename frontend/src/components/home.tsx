import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Input } from "@chakra-ui/react";
import { Container, Box, Heading, Text, SimpleGrid } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import Constants from "../lib/constants";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [allSearchProducts, setAllSearchProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, [])

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${Constants.API_BASE_URL}/products`);
            let productdata = await response.json();

            const cartresponse = await fetch(`${Constants.API_BASE_URL}/cartproducts`);
            const cartdata = await cartresponse.json();
    
            if (productdata.status === 'success' && cartdata.status === 'success') {
                let cartProductIds = cartdata.message.map((cproduct: any) => cproduct._id.toString());
                productdata.message = productdata.message.map((product: any) => {
                    if (cartProductIds.indexOf(product._id.toString()) > -1) product.iscart = true;
                    else product.iscart = false;
                    return product;
                });
                setProducts(productdata.message);
                setAllSearchProducts(productdata.message);
            } else console.error(productdata.message);
        } catch (err) {
            console.error(err);
        }
    }

    const addToCart = async (product: any) => {
        try {
            const options: any = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    product: product
                })
            }
            const response = await fetch(`${Constants.API_BASE_URL}/addToCart`, options);
            const data = await response.json();
            if (data.status === 'success') {
                let allProducts: any = Array.from(allSearchProducts);
                allProducts = allProducts.map((prod: any) => {
                    if (prod._id.toString() === product._id.toString()) prod.iscart = true;
                    return prod;
                });
                setProducts(allProducts);
                setAllSearchProducts(allProducts);
            } else console.error(data.message);
        } catch (err) {
            console.error(err);
        }
    }

    const removeFromCart = async (product: any) => {
        try {
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
                let allProducts: any = Array.from(allSearchProducts);
                allProducts = allProducts.map((prod: any) => {
                    if (prod._id.toString() === product._id.toString()) prod.iscart = false;
                    return prod;
                });
                setProducts(allProducts);
                setAllSearchProducts(allProducts);
            } else console.error(data.message);
        } catch (err) {
            console.error(err);
        }
    }

    const searchProducts = (text: string) => {
        if (text !== '') {
            let allProducts = Array.from(products);
            allProducts = allProducts.filter((product: any) => product['Title'].toLowerCase().includes(text) || product['Variant SKU'].toLowerCase().includes(text));
            setAllSearchProducts(allProducts);
        } else setAllSearchProducts(Array.from(products));
    }

    return (
        <>
            <Container my="10" px="10">
                <Input type="text" size="md" placeholder="Search products by Title or SKU" onChange={e => searchProducts(e.target.value)} />
            </Container>
            <Container maxW="100%" my="10" px="10">
                <SimpleGrid columns={[1, 2, null, 3, 4]} spacing="40px">
                {
                    allSearchProducts.filter((product: any) => product.Title).map((product: any, index) => (
                        <Box key={index} maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
                            <Image src={product['Image Src']} alt={product.title} />
                            <Box p="6">
                                <Heading size="md">{product.Title}</Heading>
                                <Text mt="2">{product.Body}</Text>
                                {
                                    !product.iscart ?
                                    <Button mt="4" colorScheme="teal" size="md" onClick={() => addToCart(product)}>Add to Cart</Button> :
                                    <Button mt="4" colorScheme="red" size="md" onClick={() => removeFromCart(product)}>Remove from Cart</Button>
                                }
                            </Box>
                        </Box>
                    ))
                }
                </SimpleGrid>
            </Container>
        </>
    )
}

export default Home;