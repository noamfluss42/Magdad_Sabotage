'''
In order to edit word (docx) documents I've used python-docx package.
python-docx parse docx file into a nested tree of the file elements.
in our case we have a few paragraphs and a table, each paragraphs contains
one or more runs which hold the text.
The indexs in the following code have been chosen by trying and guessing
each set of indexs that is in use holds a different editable field.
'''

import docx
import io
from docx.oxml.shared import OxmlElement
import os

CHECKBOX_PATH = './w:fldChar/w:ffData/w:checkBox' # the XPath for the checkbox


def generate_docx(args):
    dir_path = os.path.dirname(os.path.realpath(__file__))
    doc = docx.Document(dir_path+'/template.docx') #get  directory of template docx
    doc.paragraphs[0].runs[0].text = args["lab_name"]
    doc.paragraphs[1].runs[0].text = args["date_created"].split('/')[2]
    doc.paragraphs[1].runs[4].text = args["date_created"].split('/')[1]
    doc.paragraphs[1].runs[8].text = args["date_created"].split('/')[0]
    doc.paragraphs[2].runs[2].text = args["phone_number"]
    doc.paragraphs[3].runs[3].text = args["internal_number_year"]
    doc.paragraphs[3].runs[7].text = args["internal_number"]
    doc.paragraphs[5].runs[1].text = args["recipient"]
    # This segement handle the checkboxes
    if args["urgency"] == 'normal':
        doc.tables[0].rows[0].cells[0].paragraphs[1].runs[0]._r.xpath(CHECKBOX_PATH)[0].insert(2,
                                                                                               OxmlElement('w:checked'))
    if args["urgency"] == 'urgent':
        doc.tables[0].rows[0].cells[0].paragraphs[2].runs[0]._r.xpath(CHECKBOX_PATH)[0].insert(2,
                                                                                               OxmlElement('w:checked'))
    if args["urgency"] == 'urgent_arrest':
        doc.tables[0].rows[0].cells[0].paragraphs[3].runs[0]._r.xpath(CHECKBOX_PATH)[0].insert(2,
                                                                                               OxmlElement('w:checked'))
    if 'biological' in args["hazards"]:
        doc.tables[0].rows[0].cells[1].paragraphs[1].runs[0]._r.xpath(CHECKBOX_PATH)[0].insert(2,
                                                                                               OxmlElement('w:checked'))
    if 'toxic' in args["hazards"]:
        doc.tables[0].rows[0].cells[1].paragraphs[2].runs[0]._r.xpath(CHECKBOX_PATH)[0].insert(2,
                                                                                               OxmlElement('w:checked'))
    if 'sharp' in args["hazards"]:
        doc.tables[0].rows[0].cells[1].paragraphs[3].runs[0]._r.xpath(CHECKBOX_PATH)[0].insert(2,
                                                                                                OxmlElement('w:checked'))
    if args["exhibits"] == 'normal':
        doc.tables[0].rows[0].cells[2].paragraphs[1].runs[0]._r.xpath(CHECKBOX_PATH)[0].insert(2,
                                                                                               OxmlElement('w:checked'))
    if args["exhibits"] == 'additional':
        doc.tables[0].rows[0].cells[2].paragraphs[2].runs[0]._r.xpath(CHECKBOX_PATH)[0].insert(2,
                                                                                               OxmlElement('w:checked'))
    if args["exhibits"] == 'returning':
        doc.tables[0].rows[0].cells[2].paragraphs[3].runs[0]._r.xpath(CHECKBOX_PATH)[0].insert(2,
                                                                                               OxmlElement('w:checked'))
    doc.tables[0].rows[1].cells[0].paragraphs[0].runs[2].text = args["investigating_unit"]
    doc.tables[0].rows[1].cells[0].paragraphs[0].runs[4].text = args["reference_type"]
    doc.tables[0].rows[1].cells[0].paragraphs[0].runs[7].text = args["reference_number"]
    doc.tables[0].rows[1].cells[0].paragraphs[1].runs[1].text = args["bag_number"]
    doc.tables[0].rows[1].cells[0].paragraphs[3].runs[0].text = args["exhibit_description"]
    doc.tables[0].rows[1].cells[0].paragraphs[5].runs[0].text = args["exhibit_packaging"]
    doc.tables[0].rows[1].cells[0].paragraphs[7].runs[0].text = args["exhibit_mark"]
    doc.tables[0].rows[1].cells[0].paragraphs[9].runs[0].text = args["event_description"]
    doc.tables[0].rows[1].cells[0].paragraphs[11].runs[0].text = args["testing_essence"]
    doc.tables[0].rows[1].cells[0].paragraphs[13].runs[0].text = args["notes"]
    doc.tables[0].rows[1].cells[0].paragraphs[14].runs[1].text = args["sender_name"]
    doc.tables[0].rows[1].cells[0].paragraphs[14].runs[3].text = args["sender_rank"]
    doc.tables[0].rows[1].cells[0].paragraphs[14].runs[5].text = args["sender_serial_number"]
    # save the file to a buffer that will be sent to the frontend.
    buffer = io.BytesIO() 
    doc.save(buffer)
    buffer.seek(0) 
    return buffer