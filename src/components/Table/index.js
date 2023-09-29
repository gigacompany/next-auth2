'use client'
import React, { useEffect, useState } from 'react';


const DataTable = () => {
  const [data, setData] = useState([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [filteredData, setFilteredData] = useState([]);
  const [showNotFound, setShowNotFound] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSender, setSelectedSender] = useState('All');
  const [recipientFilter, setRecipientFilter] = useState('');

  // const recordsPerPage = 10;
  const [recordsPerPage, setRecordsPerPage] = useState(10); // Default to 10 records per page


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/transaction');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData[0]?.hits?.hits || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  function applyFilters() {
    if (fromDate && toDate) {
      const fromDateObj = new Date(fromDate);
      const toDateObj = new Date(toDate);
  
      const filtered = data.filter((item) => {
        const itemDate = new Date(item._source.timeLogged);
  
        const statusMatch =
          statusFilter === 'All' ||
          (statusFilter === 'bounced' && item._source.type === 'b') ||
          (statusFilter === 'delivered' && item._source.type === 'd');
  
        const senderMatch = selectedSender === 'All' || item._source.orig === selectedSender;
  
        // Filter by recipient
        const recipientMatch = recipientFilter === '' || item._source.rcpt.includes(recipientFilter);
  
        return (
          statusMatch &&
          senderMatch &&
          recipientMatch &&
          ((itemDate >= fromDateObj && itemDate <= toDateObj) ||
            itemDate.toDateString() === fromDateObj.toDateString())
        );
      });
  
      setFilteredData(filtered);
      setShowNotFound(filtered.length === 0);
    } else {
      setFilteredData([]);
      setShowNotFound(false);
    }
  }
  



  //pagination function
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = filteredData.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  const handleChangeRecordsPerPage = (event) => {
    setRecordsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  return (
    <>
      <div className="bg-white rounded-3xl dark:bg-defaultdark dark:text-white ">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className=" rounded-lg divide-y divide-graylight dark:divide-graylight">
              <div>
                <div className="py-4 gap-2 px-4 grid grid-cols-3">
                  <div className='flex flex-grow gap-2 pt-2 '>
                    <label className=' font-bold'>From:</label>
                    <input className='border border-graylight bg-white dark:bg-defaultdark dark:text-white rounded-xl focus:outline-none focus:shadow-outline'
                      type="datetime-local"
                      onChange={(e) => setFromDate(e.target.value)}
                    />
                  </div>
                  <div className='flex flex-grow gap-2 pt-2'>
                    <label className='font-bold'>To:</label>
                    <input className='border border-graylight bg-white dark:bg-defaultdark rounded-xl focus:outline-none focus:shadow-outline'
                      type="datetime-local"
                      onChange={(e) => setToDate(e.target.value)}
                    />
                  </div>
                  <div className='flex flex-grow gap-2 pt-2'>
                    <label className='font-bold'>Status: </label>
                    <select
                      className='border border-graylight rounded-xl bg-white dark:bg-defaultdark focus:outline-none focus:shadow-outline'
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value='All'>All</option>
                      <option value='bounced'>Bounced</option>
                      <option value='delivered'>Delivered</option>
                    </select>
                  </div>
                </div>
                <div className="py-4 gap-2 px-4 grid grid-cols-3">
                  <div className='flex flex-grow gap-2 pt-2 '>
                    <label className='font-bold '>Sender: </label>
                    <select
                      className='border border-graylight rounded-xl bg-white dark:bg-defaultdark focus:outline-none focus:shadow-outline'
                      value={selectedSender}
                      onChange={(e) => setSelectedSender(e.target.value)}
                    >
                      <option value='All'>All</option>
                      <option value='enetadvicemailing@hdfcbank.net'>enetadvicemailing@hdfcbank.net</option>
                      <option value='payoutreport@hdfcbank.com'>payoutreport@hdfcbank.com</option>
                    </select>
                  </div>

                  <div className='flex flex-grow gap-2 pt-2'>
                    <label className='font-bold'>Recipient:</label>
                    <input
                      className='focus:outline-none border rounded-xl border-graylight bg-white dark:bg-defaultdark'
                      value={recipientFilter}
                      onChange={(e) => setRecipientFilter(e.target.value)}
                    />
                  </div>
                  <div className='flex flex-grow gap-2 '>
                    <button className='bg-purple hover:bg-purple2 text-white font-bold py-1 px-2 rounded-xl' onClick={applyFilters}>Search</button>
                  </div>
                  {/* <div className='flex text-left gap-2 bg-purple hover:bg-purple2 text-white font-bold py-1 px-2 rounded-xl '>
                    <button>Export csv</button>
                  </div> */}
                </div>
              </div>
              <div className="overflow-hidden">

                <div className="bg-gradient-to-r from-cyan-300 to-cyan-500 h-px mb-6"></div>
                {showNotFound ? (
                  <p className="px-6 py-4 text-center text-red-500 font-bold">Data not found</p>
                ) : (
                  <table className="min-w-full divide-y divide-graylight dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-bold uppercase">Sender</th>
                        <th className="px-6 py-3 text-left text-xs font-bold  uppercase">Recipient</th>
                        <th className="px-6 py-3 text-left text-xs font-bold  uppercase">Time Logged</th>
                        <th className="px-6 py-3 text-right text-xs font-bold  uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody >
                      {records.map((item) => (
                        <tr key={item._id}>

                          <td className="px-6 py-4 whitespace-nowrap text-sm">{item._source.orig}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm ">{item._source.rcpt}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm ">{item._source.timeLogged}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                            {item._source.type === 'b' ? 'bounced' : item._source.type === 'd' ? 'delivered' : ''}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
              <div className="py-1 px-4">
                <nav className="flex items-center space-x-2 justify-between">
                  <div>
                    <button
                      className={`${currentPage === 1 ? 'cursor-not-allowed' : 'items-center gap-2 font-medium rounded-md'}`}
                      onClick={() => changePage(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <span aria-hidden="true">«</span>
                    </button>

                    {pageNumbers.map((pageNumber) => (
                      <button
                        key={pageNumber}
                        className={`w-10 h-10 ${currentPage === pageNumber ? 'bg-purple text-white' : 'hover:text-purple'} p-4 inline-flex items-center text-sm font-medium rounded-full`}
                        onClick={() => changePage(pageNumber)}
                      >
                        {pageNumber}
                      </button>
                    ))}

                    <button
                      className={`${currentPage === totalPages ? 'cursor-not-allowed' : 'hover:text-purple'} p-4 inline-flex items-center gap-2 font-medium rounded-md`}
                      onClick={() => changePage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      <span aria-hidden="true">»</span>
                    </button>
                  </div>

                  {/* Dropdown for selecting records per page */}
                  <div className="py-2 px-4">
                    <label className="font-bold">Records Per Page:</label>
                    <select
                      className="border border-graylight rounded-xl bg-white dark:bg-defaultdark focus:outline-none focus:shadow-outline"
                      value={recordsPerPage}
                      onChange={handleChangeRecordsPerPage}
                    >
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={filteredData.length}>All</option>
                    </select>
                  </div>
                </nav>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DataTable;