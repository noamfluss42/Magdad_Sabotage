export interface Exhibit {
  bag_number: string;
  case_id: string;
  exhibit_description: string;
  exhibit_packaging: string;
  exhibit_mark: string;
}

export interface Case {
  reference_type: string;
  event_type: string;
  district: string;
  area: string;
  station: string;
  investigation_unit: string;
  internal_number: string;
  internal_number_year: string;
  reference_number: string;
  event_date: string;
  received_date: string;
  sign_date: string;
  event_location: string;
  event_description: string;
  sender_name: string;
  sender_rank: string;
  sender_serial_number: string;
  lab_name: string;
}
