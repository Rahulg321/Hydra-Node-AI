export default function EndTimeExamComponent({
  remainingTime,
}: {
  remainingTime: string;
}) {
  return (
    <div className={`rounded-lg bg-orange-700 p-4 text-center text-white`}>
      <div>
        <h5>Time Left</h5>
        <h4 className="transducer-font mt-2 tracking-wider">{remainingTime}</h4>
      </div>
    </div>
  );
}
