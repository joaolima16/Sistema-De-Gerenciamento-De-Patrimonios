module.exports = (req,file,cb)=>{
    const typesImage = [
        'image/png',
        'image/jpeg',
        'image/jpg',
        'image/webp'
    ];
    if(file.mimetype.split('/')[1] === 'vnd.openxmlformats-officedocument.spreadsheetml.sheet'|| typesImage.includes(file.mimetype)) cb(null,true);
    else cb(new Error('[ERROR] This is not an excel file'), false);
}