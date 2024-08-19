import { BadgeCheck, CircleX } from "lucide-react";

export function SuccessCard({ success }: { success?: string }) {
  return (
    <div>
      {success ? (
        <div className="flex items-center gap-2 rounded-md border border-green-600 bg-green-200 p-2">
          <div className="p-2 text-green-800">
            <BadgeCheck />
          </div>
          <div>
            <span className="text-sm text-green-800">{success}</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function ErrorCard({ urlError }: { urlError?: string }) {
  return (
    <div>
      {urlError ? (
        <div className="flex items-center gap-2 rounded-md border border-red-600 bg-red-200 p-2">
          <div className="p-2 text-red-800">
            <CircleX />
          </div>
          <div>
            <span className="text-sm text-red-800">{urlError}</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
