// 侧边栏收缩
$(function(){
    $('.sidebar-btn').click(function(){
        if($('.sidebar').width() === 220){
            $('.sidebar').stop().animate({width:52},400,'linear');
            $('.content').stop().animate({'margin-left':52},400,'linear');
            $('.nav-list-f').stop().animate({'background-position-x':20},200,'linear',function(){
                $(this).find('h3').css('height',44);
            });
            $('.nav-list-f ul li').stop().animate({'background-position-x':24},200,'linear');
            $('.jt').hide();
        }else{
            $('.sidebar').stop().animate({width:220},400,'linear');
            $('.content').stop().animate({'margin-left':220},400,'linear');
            $('.nav-list-f').stop().animate({'background-position-x':38},200,'linear');
            $('.nav-list-f ul li').stop().animate({'background-position-x':69},200,'linear');
            $('.jt').show();
        }
    })
})



// 手风琴
$(function(){
     $('.nav-list-g').click(function(){
        var str = $(this).next('.slide-content').css('display');
        $(this).addClass('active').parent().siblings('dl').find('.nav-list-g').removeClass('active');
        $(this).next('.slide-content').removeClass('slidedown');
        if(str == 'none'){
            $(this).next('div').slideDown();
            $(this).parent().siblings('dl').find('.slide-content').slideUp();
        }else{
            $(this).next('div').css('display',str);
            $(this).next('div').slideUp();
        }
    });

    $('.nav-list-f h3').click(function(){
        var str = $(this).next('ul').css('display');
        $(this).parent().toggleClass('show');
        $(this).next('ul').css('display',str).removeClass('slidedown');
        if($(this).next('ul').length>0 ){
            $(this).next('ul').toggle('slow');
        }
    });
   
});



