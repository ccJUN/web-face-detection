(function(){

    const c = document.getElementById("canvas");
    const ctx = c.getContext("2d");
    const video = document.getElementById("video")
    const imagecanvas = document.getElementById("imgcanvas")
    const giftDom = document.getElementById("gift")
    const giftwrapper = document.getElementById('gift-wrapper')
    const btnshow = document.getElementById('btnshow')
    //用canvas来绘制video
    function getScreen() {
        if(video.ended){
            return 0;
        }
        ctx.drawImage(video, 0, 0, 375, 812)
        window.requestAnimationFrame(getScreen)
        imagecanvas.src = c.toDataURL('image/jpeg')
        face(imagecanvas)
        //
    }
    getScreen()

    //
    function face(image){

        const faceDetector = new FaceDetector({
            fastMode: true,
            maxDetectedFaces: 1
        });
        faceDetector.detect(image).then(faces=>{
            if(faces[0].boundingBox){
                let DOMRectReadOnly = faces[0].boundingBox;
                console.log(faces[0].boundingBox.width);
                giftDom.style.cssText='width:'+DOMRectReadOnly.width+'px;height:'+DOMRectReadOnly.height+'px;left:'+DOMRectReadOnly.left+'px;top:'+DOMRectReadOnly.top+'px;';
            }
        })

    }
    btnshow.addEventListener('click',function(){
        giftwrapper.style.cssText="opacity:1";
        document.getElementById('glass').className = 'glass-animation glass';
    })

})(window,undefined);