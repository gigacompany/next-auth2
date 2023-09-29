export default function Card({ data, label, icon }) {
  return (
    <div className="rounded-3xl dark:bg-defaultdark bg-white dark:text-white py-6 px-7.5 shadow flex flex-col md:flex-row md:items-center md:justify-between">
      <div className="h-10 w-10 text-2xl rounded-full bg-default dark:bg-black flex items-center justify-center bg-meta-2 text-purple">
        {icon}
      </div>
      <div className="md:ml-4 flex-grow">
        <div>
          <span className="text-sm font-medium">{label}</span>
        </div>
        <div className="text-title-md font-bold mt-2">
          {data}
        </div>
      </div>
    </div>
  );
}









