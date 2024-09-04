import { getLoginGoogleUri } from "@/app/_actions/auth";
import { Button } from "@geist-ui/core";
import GoogleIcon from "@mui/icons-material/Google";

export default function LoginGoogleButton({
  disabled,
}: {
  disabled?: boolean;
}) {
  const handleLoginGoogle = async () => {
    const uri = await getLoginGoogleUri();
    window.location.href = uri;
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
