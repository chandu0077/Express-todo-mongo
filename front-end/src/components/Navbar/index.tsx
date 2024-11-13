"use client";
import React from "react";
import {
  Flex,
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  FormControl,
  FormLabel,
  Input,
  Icon,
  Tooltip,
} from "@chakra-ui/react";
import { todoForm } from "@/utilis/forms/todoForm";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { IoLogOut } from "react-icons/io5";

interface Props {
  getUserTodos: Function;
}

const Navbar: React.FC<Props> = ({ getUserTodos }) => {
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    reset,
    formState: {},
  } = useForm({
    resolver: yupResolver(todoForm),
    criteriaMode: "firstError",
    mode: "onChange",
    reValidateMode: "onChange",
  });

  type ITodoForm = yup.InferType<typeof todoForm>;

  const onSubmit = (data: ITodoForm) => {
    const accessToken = localStorage.getItem("token");

    axios
      .post("http://localhost:5000/api/todos/", data, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": accessToken,
        },
      })
      .then(function (response: any) {
        reset();
        getUserTodos();
        onClose();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    router.replace("/");
  };

  return (
    <>
      <Box className="glass" w="full" h="80px">
        <Flex
          justifyContent="space-between"
          alignItems="center"
          w="80%"
          h="full"
          mx="auto"
        >
          <Text color="white" fontSize={"2xl"} fontWeight={"semibold"}>
            Todo do do du du....
          </Text>
          <Flex alignItems={"center"} h="fit-content" gap="6">
            <Button onClick={onOpen}>Create Todo</Button>
            <Tooltip hasArrow label="Logout" bg="gray.300" color="black">
              <Button
                bgColor={"transparent"}
                _hover={{
                  bgColor: "transparent",
                }}
                cursor={"pointer"}
                onClick={logout}
              >
                <Icon as={IoLogOut} color="white" zIndex={50} boxSize="6" />
              </Button>
            </Tooltip>
          </Flex>
        </Flex>
      </Box>
      <Modal onClose={onClose} size={"lg"} isOpen={isOpen}>
        <ModalOverlay
          bg="none"
          backdropFilter="auto"
          backdropInvert="80%"
          backdropBlur="2px"
        />
        <ModalContent
          p="8"
          mx="auto"
          mt="10%"
          backgroundColor={"white"}
          borderRadius={"20px"}
          width="50%"
        >
          <Box display={"flex"} justifyContent={"space-between"} w="100%">
            <Text
              width="300px"
              display={"block"}
              fontSize={"24px"}
              fontWeight={700}
            >
              Create a Todo
            </Text>
            <ModalCloseButton />
          </Box>
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl>
                <FormLabel>Task</FormLabel>
                <Input
                  border="1px solid lightgrey"
                  borderRadius="14px"
                  p="6"
                  placeholder="Task...."
                  {...register("title")}
                />
              </FormControl>

              <Button
                mt="4"
                backgroundColor="black"
                color="white"
                px="12"
                py="6"
                borderRadius="14px"
                type="submit"
              >
                Add
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Navbar;
