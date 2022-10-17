const path = require('path');
const fs = require('fs');
const {v4:uuid4} = require('uuid')

module.exports =function(item){
    return new Promise((resolve)=>{
        let imgData=item.thumbUrl;
        let base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
        let dataBuffer = Buffer.from(base64Data, 'base64');
        const allowExtname = ['png', 'jpg', 'jpeg', 'webp', 'bmp'];//支持的图片格式;
        let extname = '';
        let filterResult=allowExtname.filter(item => {
            return imgData.includes(item)
        })
        extname='.'+filterResult[0];
        let targetPath = path.resolve(__dirname, '../image');
        let name=uuid4()+extname;
        fs.writeFileSync(`${targetPath}/${name}`,dataBuffer);
        resolve(name);
    })
}