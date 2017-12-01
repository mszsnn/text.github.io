/**
 * Created by ms on 2017/12/1.
 */

$(function () {
    let myScroll = new IScroll('#wrapper', {
        scrollX: true,
        scrollY: false,
    });

    function render(type,repaint=true,start=0){
        $.ajax({
            url:"https://api.jisuapi.com/news/get?channel="+type+"&start="+start+"&num=2&appkey=fe2a29e929bf5cc5",
            dataType:'jsonp',
            success:function(res){
                let arr=res.result.list;
                let str='';
                arr.forEach(val=>{
                    if(val.pic===''){
                        str+=`<li class="list noimg">
            <a href="${val.url}">
                <div>${val.title}</div>
            </a>
        </li>`;
                    }else{
                        str+=`<li class="list">
            <a href="${val.url}">
                <div class="left"><img src="${val.pic}" alt=""></div>
                <div class="con">${val.title}</div>
            </a>
        </li>`;

                    }
                })
                if(repaint){
                    $('.content').html(str);
                }else{
                    $('.content').html($('.content').html()+str);
                }

            }
        })
    }
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
            render($("#scroller li.active").text());
        }
    })

    $('#scroller').on('click','li',function () {
        if($(this).hasClass('active')){
            return;
        }
        $(this).siblings().removeClass('active').end().addClass('active');
        let text=$(this).html();
        render(text);
    })

    $('#add').click(function(){
        render($('#scroller li.active').html(),false,$(".content").children('li').length);
    })



})