import { FormFieldBase } from "../utils/form-field-base";
import { DropdownField } from '../utils/field-dropdown';
import { TextboxField } from "../utils/field-textbox";
//!TODO: move fields here.!

export class Fields
{
  public static readonly DropdownFields: FormFieldBase<string>[] = [
    new DropdownField({
      key: 'referenceType',
      label: 'סוג סימוכין',
      options: [
        {key: "פלא", value: "פלא"},
      ]}),





    new DropdownField({
      key: 'district',
      label: 'מחוז',
      options: [
        {key: "מחוז צפון", value: "מחוז צפון"},
        {key: "מחוז חוף", value: "מחוז חוף"},
        {key: "מחוז מחוז", value: "מחוז מרכז"},
        {key: "מחוז תל אביב", value: "מחוז תל אביב"},
        {key: "מחוז ירושלים", value: "מחוז ירושלים"},
        {key: ' מחוז ש"י ', value: 'מחוז ש"י'},
        {key: ' מחוז דרום ', value: 'מחוז דרום'},
      ]
    }),
    // need data
    new DropdownField({
      key: 'area',
      label: 'מרחב',
      options: [
        {key: "מרחב צפון", value: "מרחב צפון"},


      ]}),
    new DropdownField({
      key: 'station',
      label: 'תחנה',
      options: [
        {key: "בין שאן", value: "בין שאן"},
        {key: "טבריה", value: "טבריה"},
        {key: "כנא", value: "כנא"},
        {key: "מגדל העמק", value: "מגדל העמק"},
        {key: "נצרת", value: "נצרת"},
        {key: " נצרת עילית", value: "נצרת עילית"},
        {key: " עפולה", value: "עפולה"},
        {key: " שפרעם", value: "שפרעם"},
  ]})];

  /*
  במחוז צפון ישנם שלושה מרחבים: כינרת, עמקים וגליל. | במחוז דרום ישנם שלושה מרחבים: לכיש, נגב ואילת. | במחוז מרכז ישנם שלושה מרחבים: שרון, שפלה ונתב"ג. | במחוז ת"א ישנם ארבעה מרחבים: ירקון, דן, איילון ויפתח. | במחוז ש"י ישנם שני מרחבים: חברון ושומרון. | במחוז ירושלים ישנם שלושה מרחבים: דוד, קדם וציון. | במחוז חוף יש שני מרחבים: אשר ומנשה.
  */
  public static readonly TextboxFields: FormFieldBase<string>[] = [
    new TextboxField({
      key: 'internalNumber',
      label: 'מספר פנימי',
      required: true,
      type:'text'
    }),
    

    new TextboxField({
      key:"referenceNumber",
      label:"מספר סימוכין",
      required:true,
      type:'text',
    }),
    
    
    
    
    new TextboxField({
      key: 'eventDate',
      label: 'תאריך אירוע',
      required: true,
      type: 'text'
    }),
    new TextboxField({
      key: 'ReceivedDate',
      label : 'תאריך קבלה',
      required: true,
      type:'text'
    }),
    new TextboxField({
      key: 'signDate',
      label : 'תאריך קבלה',
      required: true,
      type:'text'
    }),
    new TextboxField({
      key: "eventLocation",
      label: "מקום האירוע",
      required: true,
      type: 'text'
    }),
    new TextboxField({
      key: "eventDescription",
      label: "תיאור האירוע",
      required: true,
      type: 'text'
    })
  ];
}