import { Button, Input, Loading, Spinner } from "@geist-ui/core";
import PersonIcon from "@mui/icons-material/Person";
import PasswordIcon from "@mui/icons-material/Password";

export default function SignInForm({ isLogingIn }: { isLogingIn?: boolean }) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <Input
        crossOrigin={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        scale={4 / 3}
        placeholder="Username"
        width="100%"
        icon={<PersonIcon />}
        disabled={isLogingIn}
      />
      <Input.Password
        crossOrigin={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        scale={4 / 3}
        placeholder="Password"
        width="100%"
        icon={<PasswordIcon />}
        disabled={isLogingIn}
      />
      <Button
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        placeholder={undefined}
        type="secondary"
        disabled={isLogingIn}
      >
        {isLogingIn ? "Loging in..." : "Sign In"}
      </Button>
    </div>
  );
}
