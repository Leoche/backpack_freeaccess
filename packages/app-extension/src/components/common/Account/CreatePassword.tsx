import { useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import {
  Box,
  Button,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useCustomTheme } from "@coral-xyz/themes";
import {
  Header,
  SubtextParagraph,
  PrimaryButton,
  TextField,
  CheckboxForm,
} from "../../common";

const useStyles = makeStyles(() => ({
  passwordFieldRoot: {
    margin: 0,
    width: "100%",
    marginBottom: "12px",
  },
}));

enum PasswordError {
  TOO_SHORT,
  NO_MATCH,
}

export function CreatePassword({
  onNext,
}: {
  onNext: (password: string) => void;
}) {
  const classes = useStyles();
  const theme = useCustomTheme();
  const [checked, setChecked] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState<PasswordError | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  useEffect(() => {
    setError(null);
  }, [password, passwordConfirm]);

  const next = async () => {
    if (password.length < 8) {
      setError(PasswordError.TOO_SHORT);
      return;
    } else if (password !== passwordConfirm) {
      setError(PasswordError.NO_MATCH);
      return;
    }
    onNext(password);
  };

  const isNextDisabled = !checked;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          marginTop: "24px",
        }}
      >
        <Box
          sx={{
            marginLeft: "24px",
            marginRight: "24px",
          }}
        >
          <Header text="Create a password" />
          <SubtextParagraph style={{ marginTop: "8px", marginBottom: "40px" }}>
            It should be at least 8 characters.
            <br />
            You’ll need this to unlock Backpack.
          </SubtextParagraph>
        </Box>
        <Box
          sx={{
            marginLeft: "16px",
            marginRight: "16px",
          }}
        >
          <TextField
            inputProps={{ name: "password" }}
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            setValue={setPassword}
            rootClass={classes.passwordFieldRoot}
            isError={error === PasswordError.TOO_SHORT}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  disableRipple
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <TextField
            inputProps={{ name: "password-confirmation" }}
            placeholder="Confirm Password"
            type={showPasswordConfirm ? "text" : "password"}
            value={passwordConfirm}
            setValue={setPasswordConfirm}
            rootClass={classes.passwordFieldRoot}
            isError={error === PasswordError.NO_MATCH}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  disableRipple
                  onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                  onMouseDown={() =>
                    setShowPasswordConfirm(!showPasswordConfirm)
                  }
                >
                  {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {error !== null && (
            <Typography sx={{ color: theme.custom.colors.negative }}>
              {
                {
                  [PasswordError.TOO_SHORT]:
                    "Your password must be at least 8 characters.",
                  [PasswordError.NO_MATCH]: "Your passwords do not match.",
                }[error]
              }
            </Typography>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          marginLeft: "16px",
          marginRight: "16px",
          marginBottom: "16px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "30px",
          }}
        >
          <CheckboxForm
            checked={checked}
            setChecked={setChecked}
            label={
              <>
                I agree to the{" "}
                <span
                  onClick={() => window.open("https://backpack.app/terms")}
                  style={{ color: theme.custom.colors.brandColor }}
                >
                  terms of service
                </span>
              </>
            }
          />
        </Box>
        <PrimaryButton
          disabled={isNextDisabled}
          label="Next"
          onClick={next}
          buttonLabelStyle={{
            fontWeight: 600,
          }}
        />
      </Box>
    </Box>
  );
}
