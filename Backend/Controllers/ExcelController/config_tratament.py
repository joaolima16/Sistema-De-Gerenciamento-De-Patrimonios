from encodings import utf_8
from pathlib import Path
import json
class Config_Tratament:
    def configsObject(self):
        # Windows

        # pathConfig = str(Path(__file__)).split("\\")
        # pathConfig = pathConfig[0:len(pathConfig)-1]
        # pathConfig = "\\".join(pathConfig)
        
        #Linux
         
        pathConfig = str(Path(__file__)).split("/")
        pathConfig = pathConfig[0:len(pathConfig)-1]
        pathConfig = "/".join(pathConfig)

        pathConfig = f"{pathConfig}\\excel_config.json"
        file = open(pathConfig,'r', encoding='utf-8')
        return json.load(file)