from PIL import Image
from pathlib import Path
from pyzbar.pyzbar import decode
import os
import sys

nameImage = sys.argv[1]

#windows

# pathImage = str(Path(__file__)).split('/')
# pathImage = pathImage[0:len(pathImage)-3]
# pathImage = "/".join(pathImage)
# pathImage = f"{pathImage}/public/{nameImage}"

#linux

pathImage = os.path.abspath(f"../../public/{nameImage}")
textQR = decode(Image.open(pathImage))
print(textQR[0].data.decode("UTF-8"))