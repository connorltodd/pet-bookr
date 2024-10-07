import { useFormStatus } from "react-dom";

export default function FormButton({
  title,
  loadingMessage,
}: {
  title: string;
  loadingMessage: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button className="btn btn-primary" type="submit" disabled={pending}>
      {pending ? loadingMessage : title}
    </button>
  );
}
