"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { PasswordInput } from "@/components/ui/password-input";
import { Input, Button, Flex } from "@chakra-ui/react";
import { Checkbox } from "@/components/ui/checkbox";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";

interface IProps {
  currentUser?: User | null;
  onAddItem: (user: User) => void;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserForm: React.FC<IProps> = ({ currentUser, onAddItem }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const handleAddUser = (data: User) => {
    onAddItem(data);
    console.log("Usuário cadastrado:", data);
  };

  const handleButtonClick = () => {
    handleSubmit(handleAddUser)();
    router.push('/nova-pagina');
  };

  return (
    <Flex align="center" margin={5} justify="center">
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h1>Seja Bem-Vindo de Volta!</h1>
        <Input
          className={errors?.email ? "inputError" : ""}
          placeholder="Insira seu Email"
          padding={3}
          maxLength={80}
          w={400}
          {...register("email", {
            required: true,
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Formato de email inválido",
            },
            onChange: (value) => {
              if (currentUser) {
                currentUser.email = value.target.value;
              }
            },
          })}
        />
        {errors?.email?.type === "required" && <p>O email é obrigatório!</p>}
        {errors?.email?.type === "pattern" && <p>Email inválido!</p>}

        <PasswordInput
          className={errors?.password ? "inputError" : ""}
          width={400}
          padding={3}
          placeholder="Insira sua senha"
          {...register("password", { required: true })}
        />
        {errors?.password?.type === "required" && <p>A senha é obrigatória!</p>}

        <Checkbox {...register("checkPassword")}>Remember Password</Checkbox>

        <Button
          width={"400px"}
          color={"white"}
          variant={"subtle"}
          backgroundColor={"#020c51"}
          onClick={handleButtonClick}
        >
          Cadastrar
        </Button>
      </div>
    </Flex>
  );
};