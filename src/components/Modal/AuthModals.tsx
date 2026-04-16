import { Modal, Box, TextField, Button } from "@mui/material";
import { useAuthStore } from "../../stores/useAuthStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  type LoginFormData,
  registrationSchema,
  type RegistrationFormData,
} from "./auth.schema";

export type AuthMode = "login" | "register" | null;

interface Props {
  mode: AuthMode;
  onClose: () => void;
}

export const AuthModals = ({ mode, onClose }: Props) => {
  const login = useAuthStore((state) => state.login);
  const register = useAuthStore((state) => state.register);

  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: loginErrors },
    reset: resetLogin,
    setError: setLoginError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const {
    register: registerRegistration,
    handleSubmit: handleSubmitRegistration,
    formState: { errors: registrationErrors },
    reset: resetRegister,
    setError: setRegisterError,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });

  const onLoginSubmit = (data: LoginFormData) => {
    const result = login(data.email, data.password);

    if (!result.success) {
      setLoginError("email", {
        type: "manual",
        message: result.message,
      });
      return;
    }

    resetLogin();
    onClose();
  };

  const onRegistrationSubmit = (data: RegistrationFormData) => {
    const result = register(data.email, data.password);

    if (!result.success) {
      setRegisterError("email", {
        type: "manual",
        message: result.message,
      });
      return;
    }

    resetRegister();
    onClose();
  };

  return (
    <Modal open={mode !== null} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 360,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 3,
        }}
      >
        {mode === "login" && (
          <form onSubmit={handleSubmitLogin(onLoginSubmit)}>
            <h2 className="text-center mb-4">Login</h2>
            <TextField
              fullWidth
              label="Email"
              {...registerLogin("email")}
              error={!!loginErrors.email}
              helperText={loginErrors.email?.message}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              {...registerLogin("password")}
              error={!!loginErrors.password}
              helperText={loginErrors.password?.message}
              sx={{ my: 3 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "#f07e20",
                "&:hover": {
                  backgroundColor: "#ffa734",
                },
              }}
            >
              Login
            </Button>
          </form>
        )}
        {mode === "register" && (
          <form onSubmit={handleSubmitRegistration(onRegistrationSubmit)}>
            <h2 className="text-center mb-4">Register</h2>
            <TextField
              fullWidth
              label="Email"
              {...registerRegistration("email")}
              error={!!registrationErrors.email}
              helperText={registrationErrors.email?.message}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              {...registerRegistration("password")}
              error={!!registrationErrors.password}
              helperText={registrationErrors.password?.message}
              sx={{ my: 3 }}
            />
            <TextField
              fullWidth
              label="Confirm password"
              type="password"
              {...registerRegistration("confirmPassword")}
              error={!!registrationErrors.confirmPassword}
              helperText={registrationErrors.confirmPassword?.message}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                backgroundColor: "#f07e20",
                "&:hover": {
                  backgroundColor: "#ffa734",
                },
              }}
            >
              Create account
            </Button>
          </form>
        )}
      </Box>
    </Modal>
  );
};
