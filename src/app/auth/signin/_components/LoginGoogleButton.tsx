import { redirectLoginGoogle } from "@/app/_actions/auth";
import { Button } from "@geist-ui/core";
import GoogleIcon from "@mui/icons-material/Google";

export default function LoginGoogleButton({
  disabled,
}: {
  disabled?: boolean;
}) {
  const handleLoginGoogle = async () => {
    await redirectLoginGoogle();
  };

  return (
    <Button
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
      placeholder={undefined}
      icon={<GoogleIcon />}
      onClick={handleLoginGoogle}
      disabled={disabled}
    >
      Login With Google
    </Button>
  );
}
