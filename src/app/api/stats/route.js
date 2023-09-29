// import { NextResponse } from 'next/server';
// import axios from 'axios';

// export async function POST(request) {
//   const url = 'https://api-dash.powerelay.softcell.com/v1/stats/top-senders';
//   console.log(url, "urllllllll");
//  const authorizationHeader = request.headers.get('Authorization');
//   console.log(authorizationHeader,"authorizationHeader")
//   const requestData = await request.json();
//   console.log(requestData, "front end object");
//   try {
//     const response = await axios.get(url, {
//         headers: {
//             'Cookie': `access_token=${authorizationHeader}`,
//             'Content-Type': 'application/json',
//         },
//         data: JSON.stringify(requestData)
//     });
//     console.log(response);
//     return NextResponse.json(response.data);
// } catch (error) {
//     console.log('error', error);
// }
// }