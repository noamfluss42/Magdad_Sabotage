export interface Exhibit {
  internal_number: string;
  exhibit_number: string;
  location: string;
  description: string;
  amount: string;
  destination: string;
  explosive: string;
  explosive_weight: string;
  tnt_equivalent: string;
  received_date: string;
  handled_date: string;
  investigator_name: string;
  lab_name: string;
  result: string;
}

// export interface Case {
//   reference_type: string;
//   event_type: string;
//   district: string;
//   area: string;
//   station: string;
//   investigation_unit: string;
//   internal_number: string;
//   internal_number_year: string;
//   reference_number: string;
//   event_date: string;
//   received_date: string;
//   sign_date: string;
//   event_location: string;
//   event_description: string;
//   sender_name: string;
//   sender_rank: string;
//   sender_serial_number: string;
//   lab_name: string;
//   weapon_name: string;
//   explosive_device_material: string;
//   explosive_device_means: string;
//   weapon_options: string;
//   explosive_device_operating_system: string;
//   weapon_mark: string;
//   explosive_device_spray: string;
//   weapon_color: string;
//   explosive_device_camouflage: string;
//   weapon_additional_characteristics: string;
// }
export interface Case {
  internal_number: string;
  received_or_go: string;
  lab_name: string;
  event_characteristic: string;
  event_date: string;
  received_date: string;
  event_type: string;
  pele_number: string;
  district: string;
  investigation_unit: string;
  explosion_or_disarm: string;
  reference_number: string;
  status: string;
  sender_name: string;
  event_location: string;
  event_description: string;

  weapon_name: string;
  explosive_device_material: string;
  explosive_device_means: string;
  weapon_options: string;
  explosive_device_operating_system: string;
  weapon_mark: string;
  explosive_device_spray: string;
  weapon_color: string;
  explosive_device_camouflage: string;
  weapon_additional_characteristics: string;
}

export interface Sample {
  internal_number: string;
  exhibit_number: string;
  sample_id: string;
  what_sampled: string;
  where_sampled: string;
  transferred_to_lab: string;
  sending_date: string;
  receiving_date: string;
  packaging: string;
  results: string;
  notes: string;
  date: string;
  unit_name: string;
  reference: string;
  investigator_name: string;
  phone_num: string;
  bag_num: string;
}

export interface TableColumn {
  name: string;
  attribute: any;
  sortable: boolean;
  onClick?: any;
}

export interface ResultCaseTable {
  case_id: string;
  lab_name: string;
  event_description: string;
  internal_number: string;
  min_date: string;
  max_date: string;
}

export interface CaseSearch {
  internal_number: string;
  received_or_go: string;
  lab_name: string;
  event_characteristic: string;
  event_date: string;
  received_date: string;
  event_type: string;
  pele_number: string;
  district: string;
  investigation_unit: string;
  explosion_or_disarm: string;
  reference_number: string;
  status: string;
  sender_name: string;
  event_location: string;
  event_description: string;
}
