import { Box } from "@chakra-ui/react";
import HomePage from "@/components/HomePage";

export default function Home() {
  return (
    <Box width="full" height="auto" overflow={"hidden"} maxW="1240px" mx="auto">
      <HomePage />
    </Box>
  );
}
