/**
 * Created by ms on 2017/12/1.
 */

$(function () {
    let myScroll = new IScroll('#wrapper', {
        scrollX: true,
        scrollY: false,
    });



    $.ajax({
        url:'https://api.jisuapi.com/news/channel?appkey=fe2a29e929bf5cc5',
        dataType:'jsonp',
        success:function (res) {
            let arr=res.result;
            let str=''
            arr.forEach((val,index)=>{
                if(index==0){
                    str+=`<li class="active">${val}</li>`
                }else{
                    str+=`<li>${val}</li>`
                }

            })
            $('#scroller ul').html(str);
        }
    })
})