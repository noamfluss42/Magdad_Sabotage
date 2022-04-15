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


export interface TableColumn {
  name: string;
  attribute: string;
  sortable: boolean;
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
  min_date: string;
  max_date: string;
}
