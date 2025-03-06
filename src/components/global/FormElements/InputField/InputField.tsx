import {
  Button,
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FieldValues, RegisterOptions, useFormContext } from "react-hook-form";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const InputField: React.FC<
  InputProps & {
    formControlProps?: FormControlProps;
    label?: string;
    name: string;
    registerOptions?: RegisterOptions<FieldValues>;
    type: React.HTMLInputTypeAttribute;
    placeholder?: string;
    tag?: string;
  }
> = ({
  label,
  formControlProps,
  name,
  registerOptions,
  type,
  placeholder,
  tag,
  ...rest
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const [show, setShow] = useState<boolean>(false);
  const handleClick = () => setShow(!show);
  return (
    <FormControl isInvalid={!!errors[name]} {...formControlProps}>
      {label && (
        <FormLabel>
          {label}
          {tag && (
            <Text color="red.500" ml="1" as="span">
              {tag}
            </Text>
          )}
        </FormLabel>
      )}
      <InputGroup>
        <Input
          h="56px"
          flex="1"
          borderRadius="12px"
          border="1px solid #ffffff26"
          bg="#2f32417f"
          color="#fff"
          fontWeight="medium"
          fontSize="lg"
          {...(type === "password"
            ? { type: show ? "text" : "password" }
            : { type })}
          appearance="none"
          w="full"
          placeholder={placeholder}
          {...rest}
          {...register(name, { ...registerOptions })}
        />
        {type === "password" && (
          <InputRightElement width="2rem" h="full">
            <IconButton
              p="0"
              variant="unstyled"
              bg="transparent"
              color="white"
              aria-label="Password Visibility"
              h="1.75rem"
              size="sm"
              fontSize="1rem"
              onClick={handleClick}
              icon={show ? <BsEye /> : <BsEyeSlash />}
            />
          </InputRightElement>
        )}
      </InputGroup>
      {/* <FormErrorMessage fontSize="sm">
        {!!errors[name] && !!errors[name]?.message && (
          <>{errors[name]?.message}</>
        )}
      </FormErrorMessage> */}
    </FormControl>
  );
};

export default InputField;
