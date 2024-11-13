"use client";
import { Flex, Text, Button } from "@chakra-ui/react";
import Link from "next/link";
export default function HomePage() {
  return (
    <Flex
      h="100vh"
      justify={"center"}
      alignItems={"center"}
      direction={"column"}
    >
      <Text color="white" fontSize={"4xl"} fontWeight={"semibold"}>
        Welcome to Todo!!!!!
      </Text>
      <Flex justifyContent={"center"} gap="4">
        <Button>
          <Link href="/signup">Signup</Link>
        </Button>
        <Button>
          <Link href="/login">login</Link>
        </Button>
      </Flex>
    </Flex>
  );
}
