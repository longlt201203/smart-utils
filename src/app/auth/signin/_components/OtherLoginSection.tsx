import LoginGoogleButton from "./LoginGoogleButton";

export default function OtherLoginSection({
  disabled,
}: {
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-col gap-4">
      <LoginGoogleButton disabled={disabled} />
    </div>
  );
}
