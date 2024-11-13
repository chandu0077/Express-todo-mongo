"use client";
import React from "react";
import {
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
} from "@chakra-ui/react";
import { todoForm } from "@/utilis/forms/todoForm";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect } from "react";

interface Props {
  getUserTodos: Function;
  editTodoData: any;
  editingTodo: boolean;
  setEditingTodo: Function;
}

const EditTodo: React.FC<Props> = ({
  getUserTodos,
  editTodoData,
  editingTodo,
  setEditingTodo,
}) => {
  const values = editTodoData[0];
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    handleSubmit,
    setValue,
    getValues,
    formState: {},
    watch,
  } = useForm({
    resolver: yupResolver(todoForm),
    criteriaMode: "firstError",
    values: values,
    mode: "onChange",
    reValidateMode: "onChange",
  });

  type ITodoForm = yup.InferType<typeof todoForm>;

  const onSubmit = (data: ITodoForm) => {
    const accessToken = localStorage.getItem("token");

    const dataToPost = {
      title: data.title,
    };
    axios
      .patch(`http://localhost:5000/api/todos/${data._id}`, dataToPost, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": accessToken,
        },
      })
      .then(function (response) {
        console.log("after update", response);

        setEditingTodo(false);
        getUserTodos();
        onClose();
      })
      .catch(function (error) {
        setEditingTodo(false);
        console.log(error);
      });
  };

  const handleOnClose = () => {
    setEditingTodo(false);
    onClose();
  };

  useEffect(() => {
    if (editingTodo) {
      onOpen();
    }
  }, [editingTodo]);

  const name = watch("title");

  return (
    <>
      <Modal onClose={handleOnClose} size={"lg"} isOpen={isOpen}>
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
              Edit Todo
            </Text>
            <ModalCloseButton />
          </Box>
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  border="1px solid lightgrey"
                  borderRadius="14px"
                  p="6"
                  placeholder="Title...."
                  value={getValues(`title`)}
                  onChange={(e) => {
                    setValue("title", e.target.value, {
                      shouldValidate: true,
                    });
                  }}
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
                Update
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditTodo;
