export interface Data {
      // name: string;
  // title: string;
  // department: string;
  // details: string;
  trip_type: string;
  total_amount: string;
  payment_type: string;
  tip_amount: string;
  tolls_amount: string;
  VendorID: string;
}
export interface GraphQLResponse {
  data: {
    green_tripdata_2017s: {
      items: Data[];
    };
  };
}