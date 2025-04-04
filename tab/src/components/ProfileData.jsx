import React, { useEffect } from "react";
 import ListGroup from 'react-bootstrap/ListGroup'; 
 import Table from 'react-bootstrap/Table';
 /**
  * Renders information about the user obtained from MS Graph 
  * @param props
  */
 export const ProfileData = (props) => {
   const holidays = props.graphqlData.data.green_tripdata_2017s.items;
   useEffect(() => {
     console.log("Holidays data: ", holidays);
   }
   , [holidays]);
   return (
     <Table striped bordered hover responsive>
     <thead>
       <tr>
         <th>trip_type</th>
         <th>total_amount</th>
         <th>payment_type</th>
         <th>tip_amount</th>
         <th>tolls_amount</th>
         <th>Vendor</th>
       </tr>
     </thead>
     <tbody>
       {holidays.map((item,i) => (
       <tr key={i}>
         <td>{item.trip_type}</td>
         <td>{item.total_amount}</td>
         <td>{item.payment_type}</td>
         <td>{item.trip_type}</td>
         <td>{item.tolls_amount}</td>
         <td>{item.VendorID}</td>
       </tr>
       ))}
       </tbody>
     </Table>
 )};