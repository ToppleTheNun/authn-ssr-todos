import { ArrowPath } from "~/components/Icons";

export default function Loading() {
  return (
    <div className="flex flex-1 justify-center items-center">
      <div
        className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
        role="status"
      >
        <ArrowPath className="animate-spin" />
      </div>
    </div>
  );
}
