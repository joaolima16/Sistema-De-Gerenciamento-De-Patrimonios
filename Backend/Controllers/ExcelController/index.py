from config_tratament import Config_Tratament as ct
from openpyxl import Workbook, load_workbook
from json_tratament import JSON_Tratament as jt
from pathlib import Path

class Excel_Tratament:
    def main(self):
        objectConfig = ct.configsObject(None)
        excelSheet = Excel_Tratament.__getExcelFile(objectConfig['file_name'])
        
        columnReference = Excel_Tratament.__getColumnReference(excelSheet, objectConfig["column_codes"], objectConfig["initial_line"])
        allCodes = Excel_Tratament.__getRowsData(excelSheet, columnReference, objectConfig['initial_line'])
        
        columnReference = Excel_Tratament.__getColumnReference(excelSheet, objectConfig["column_names"], objectConfig["initial_line"])
        allNames = Excel_Tratament.__getRowsData(excelSheet, columnReference, objectConfig['initial_line'])

        finalData = Excel_Tratament.__formationData(allCodes,allNames)
        
        print(jt.createJSON(None, finalData))

    def __formationData(codeArr, nameArr):
        arrFinal = []
        for i in range(len(codeArr)):
            arrFinal.append({'code':codeArr[i],'name':nameArr[i]})
        return arrFinal
    
    def __getColumnReference(sheet, columnCodes, initialLine):
        index = 0
        while True:
            letterColumn = chr(65+index)
            columnName = f"{letterColumn}{initialLine}"
            if(sheet[columnName].value == columnCodes):
                return columnName 
            index += 1
    
    def __getRowsData(sheet, columnReference, initialLine):
        arrCodes = []
        index = int(initialLine) + 1
        while True:
            rowData = sheet[f"{columnReference[0:len(columnReference)-1]}{index}"] 
            if( rowData.value == None): return arrCodes
            arrCodes.append(str(rowData.value))
            index += 1
    
    def __getExcelFile(fileName):
        pathExcel = str(Path(__file__)).split("/")
        pathExcel = fileName
        # pathExcel = pathExcel[0:len(pathExcel)-1]
        # pathExcel = "/".join(pathExcel)
        # pathExcel = f"{pathExcel}/{fileName}"
        wb = load_workbook(pathExcel, data_only=True)
        return wb.active

Excel_Tratament.main(None)