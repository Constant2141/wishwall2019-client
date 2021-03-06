const compress = (file,callback)=>{//压缩图片
    let fileObj = file;
    let reader = new FileReader()
    reader.readAsDataURL(fileObj) //转base64
    reader.onload = function(e) {
         let image = new Image() //新建一个img标签（还没嵌入DOM节点)
        image.src = e.target.result
        image.onload = function () {
            let canvas = document.createElement('canvas'), // 新建canvas
                context = canvas.getContext('2d'),
                imageWidth = image.width / 2,    //压缩后图片的大小
                imageHeight = image.height / 2,
                data = ''
            canvas.width = imageWidth
            canvas.height = imageHeight
            context.drawImage(image, 0, 0, imageWidth, imageHeight)
            data = canvas.toDataURL('image/jpeg') // 输出压缩后的base64
            let arr = data.split(','), mime = arr[0].match(/:(.*?);/)[1], // 转成blob
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            let files = new window.File([new Blob([u8arr], {type: mime})], file.name, {type: 'image/jpeg'}) // 转成file
            callback(files) // 回调
        }
    }
}

module.exports = {
    compress
}