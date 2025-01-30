"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { PasswordInput } from "@/components/ui/password-input";
import { Input, Button, Flex } from "@chakra-ui/react";
import { Checkbox } from "@/components/ui/checkbox"
import { User } from "@/types/user";

interface IProps {
  currentUser?: User;
}

export const UserForm: React.FC<IProps> = ({ currentUser }) => {
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

  const onSubmit = (data: User) => {
    console.log("data", data);
    localStorage.setItem("email", currentUser?.email || "");
    console.log(localStorage.getItem("email") + "faz parte menina se prepara");
  };


  return (
    <Flex align="center" margin={5} justify="center">
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <h1>Seja Bem-Vindo de Volta!</h1>

        <Input
          className={errors?.password && "inputError"}
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
        {errors?.email?.type === "required" && <p>O email é obrigratorio!</p>}
        {errors?.email?.type === "pattern" && <p>Email invalido!</p>}

        <PasswordInput
          className={errors?.password && "inputError"}
          width={400}
          padding={3}
          placeholder="Insira sua senha"
          {...register("password", {
            required: true,
          })}
        />
        {errors?.password?.type === "required" && (
          <p>A senha é obrigatoria é obrigratorio!</p>
        )}

        <Checkbox
          {...register("checkPassword")}
          >Remenber Password
        </Checkbox>

        <Button
          width={"400px "}
          color={"white"}
          variant={"subtle"}
          backgroundColor={"#020c51"}
          onClick={() => handleSubmit(onSubmit)()}
        >
          Cadastrar
        </Button>
      </div>
    </Flex>
  );
};
