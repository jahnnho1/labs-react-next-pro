export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      <div className="text-gray-900 font-bold mt-4 text-xl">Loading...</div>
    </div>
  );
}
