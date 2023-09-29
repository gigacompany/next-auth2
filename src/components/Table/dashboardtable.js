import React, { useEffect, useState } from 'react';
import { BsFillCheckCircleFill, BsFillExclamationCircleFill, BsThreeDots } from 'react-icons/bs';
import MenuButton from '../buttons/menubutton';
const DTable = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/data');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        const limitedData = jsonData[0]?.hits?.hits?.slice(0, 7) || [];
        setData(limitedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="bg-white w-full table rounded-3xl md:col-span-1 shadow lg:w-[49rem] relative">
      {/* Three Dots Icon */}
      <div className="absolute top-2 right-2 z-10 rounded-full bg-default dark:bg-black">
                <MenuButton />
              </div>
      <h2 className="text-gray-500 text-lg font-semibold p-2 pl-4 pt-4">Transaction Table</h2>
      <div className="overflow-x-auto">
        <table className="w-full lg:w-[50rem] table text-sm">
          <thead>
            <tr className="text-sm leading-normal">
              <th className="py-2 px-6 border-b font-semibold text-base text-graylight">SENDER</th>
              <th className="py-2 px-4 border-b font-semibold text-base text-graylight">RECIPIENT</th>
              <th className="py-2 px-4 border-b font-semibold text-base text-graylight">BOUNCE CATEGORY</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td className="py-2 px-4 font-semibold text-center flex items-center">{item._source.orig}</td>
                <td className="py-2 px-2 font-semibold text-center items-center">{item._source.rcpt}</td>
                <td className="py-2 px-2 font-semibold text-center flex items-center">
                  {item._source.bounceCat === 'success' ? (
                    <>
                      <BsFillCheckCircleFill className="text-success mr-2" />
                      <span>Delivered</span>
                    </>
                  ) : item._source.bounceCat === 'bad-mailbox' ? (
                    <>
                      <BsFillExclamationCircleFill className="text-danger mr-2" />
                      <span>Bounced</span>
                    </>
                  ) : (
                    item._source.bounceCat
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default DTable;










