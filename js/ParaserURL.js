/**
 * Created by zhangwj on 2017/3/17.
 */
function ParaserURL() {
    /* 用途: 接收地直栏参数 取id=1 根据ID的值 */
    var urlinfo = window.location.href; //获取当前页面的url
    var len = urlinfo.length;//获取url的长度
    var offset = urlinfo.indexOf("?");//设置参数字符串开始的位置
    var  newsidinfo = urlinfo.substr(offset, len)//取出参数字符串 这里会获得类似“id=1”这样的字符串
    var newsids = newsidinfo.split("=");//对获得的参数字符串按照“=”进行分割
    var newsid = newsids[1];//得到参数值
    var newsname = newsids[0];//得到参数名字
    if(newsname === "?studyId") //带有studyId参数的调用
    {
        var study = {};
        study["studyId"]= newsid;
        //根据studyId 获取图像路径
        var Selectstudyid =  JSON.stringify([{"name":"StudyID", "value":study.studyId}]);
        //e.preventDefault();
        $.ajax({
            url: ServerConfig,
            processData: false,
            contentType:"text/plain",
            type: "POST",  // type should be POST
            data: Selectstudyid, // send the string directly
            success: function(response){

                //alert(response);
                DoShow(response);
            },
            error: function (jqXHR, exception) {
                var msg = '';
                if (jqXHR.status === 0) {
                    msg = 'Not connect.\n Verify Network.';
                } else if (jqXHR.status == 404) {
                    msg = 'Requested page not found. [404]';
                } else if (jqXHR.status == 500) {
                    msg = 'Internal Server Error [500].';
                } else if (exception === 'parsererror') {
                    msg = 'Requested JSON parse failed.';
                } else if (exception === 'timeout') {
                    msg = 'Time out error.';
                } else if (exception === 'abort') {
                    msg = 'Ajax request aborted.';
                } else {
                    msg = 'Uncaught Error.\n' + jqXHR.responseText;
                }
                alert(msg);
                //$('#post').html(msg);
            },
        });
        return false;

    }
}

function  DoShow(studyRaw) {

    var study = JSON.parse(studyRaw);
        // Add new tab for this study and switch to it
        // if the tab is open do nothing
        var NewTabId = "#x" + study.studyId;
        var IsTab = $(NewTabId);
        if (IsTab.length > 0)
        {
            return;
        }




        var studyTab = '<li><a href="#x' + study.studyId + '" data-toggle="tab">' + study.patientName + '<span class="close">&#10006;</span></a></li>';
        //var tabCount = $("#tabs").find('li').count;
        var tabCount2 = $("#tabs").find('li').length;
        var studyViewerCopy;
        //console.log("tabs is" + tabCount);
        console.log("tabs is" + tabCount2);
        if (tabCount2 === 1 || tabCount2 === undefined) { //if tabcount === 1 with no image tab add a tab


            $('#tabs').append(studyTab);

            // Add tab content by making a copy of the studyViewerTemplate element
            studyViewerCopy = studyViewerTemplate.clone();

            /*var viewportCopy = viewportTemplate.clone();
             studyViewerCopy.find('.imageViewer').append(viewportCopy);*/


            studyViewerCopy.attr("id", 'x' + study.studyId);
            // Make the viewer visible
            studyViewerCopy.removeClass('hidden');
            // Add section to the tab content
            studyViewerCopy.appendTo('#tabContent');
        }
        else // if tabcount === 2 or ther replace the image tab
        {
            //$('#tabs a:last').parent().remove(); //remove li of tab

            var tabContentId = $('#tabs a:last').attr("href");
            if (tabContentId !== '#studyList') {
                RemoveAtab(tabContentId);
                $('#studyViewerTemplate').empty();
            }
            console.log('tabId is ' + tabContentId);
            //$('#tabs a:last').remove();
            $('#tabs').append(studyTab);

            // Add tab content by making a copy of the studyViewerTemplate element
            studyViewerCopy = studyViewerTemplate.clone();

            studyViewerCopy.attr("id", 'x' + study.studyId);
            // Make the viewer visible
            studyViewerCopy.removeClass('hidden');
            // Add section to the tab content

            studyViewerCopy.appendTo('#tabContent');
        }

        // Show the new tab (which will be the last one since it was just added
        $('#tabs a:last').tab('show');




        // Toggle window resize (?)
        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            $(window).trigger('resize');
        });

        //添加一个关闭tab的按钮 zwj  20170306
        $(".close").click(function () {
            //alert("要关闭当前标签?");

            var tabContentId = $(this).parent().attr("href");
            //get studyID zwj 20170307
            var DelStudyId = tabContentId.substring(2, tabContentId.length);
            var stacklist = cornerstone.StudyIDStackList.GetStackID(DelStudyId);
            if (stacklist !== undefined) {
                cornerstone.imageCache.removeStudyImagePromise(stacklist.stacks);//.removeImagePromise(); //如何获取到图像的ID remove? 20170306 删除对应studyID的所有缓存图像
                cornerstone.StudyIDStackList.RemoveStackIDList(DelStudyId); // 删除对应studyID的ImageID
            }
            $(this).parent().parent().remove(); //remove li of tab
            $('#tabs a:last').tab('show');
            $(tabContentId).remove(); //remove respective tab content

        });

        // tab switch
        $("#tabs a").tab({
            beforeActivate: function () {
                alert("switching");
                $(this).show();
            },
            activate: function () {
                alert("switched");
                $(this).hide();
            }
        });

        // Now load the study.json
        loadStudy(studyViewerCopy, viewportTemplate, study);

}
ParaserURL();
