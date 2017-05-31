// Load in HTML templates

var viewportTemplate; // the viewport template
loadTemplate("templates/viewport.html", function(element) {
    viewportTemplate = element;
});

var studyViewerTemplate; // the study viewer template
loadTemplate("templates/studyViewer.html", function(element) {
    studyViewerTemplate = element;
});

// var windowsWith; //for resize windows public variable zwj 20170308
// var windowsHeight;//for resize windows public variable zwj 20170308

//Get study list from the response json
function ShowStudyList(data) {
  //解析返回的json字符串
  var myJsonString = JSON.parse(data);
  //先清空tbody的查询结果
$('#studyListData').html("");
  myJsonString.studyList.forEach(function (study) {

    // Create one table row for each study in the manifest
    var studyRow = '<tr><td>' +
        study.patientName + '</td><td>' +
        study.patientId + '</td><td>' +
        study.studyDate + '</td><td>' +
        study.modality + '</td><td>' +
        study.studyId + '</td><td>' +
        study.numImages + '</td><td>' +
        '</tr>';

    // Append the row to the study list
    var studyRowElement = $(studyRow).appendTo('#studyListData');

    // On study list row click
    $(studyRowElement).click(function () {

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
    });
  });
}
// Get study list from JSON manifest
// $.getJSON('studyList.json', function(data) {
//   data.studyList.forEach(function(study) {
//
//     // Create one table row for each study in the manifest
//     var studyRow = '<tr><td>' +
//     study.patientName + '</td><td>' +
//     study.patientId + '</td><td>' +
//     study.studyDate + '</td><td>' +
//     study.modality + '</td><td>' +
//     study.studyDescription + '</td><td>' +
//     study.numImages + '</td><td>' +
//     '</tr>';
//
//     // Append the row to the study list
//     var studyRowElement = $(studyRow).appendTo('#studyListData');
//
//     // On study list row click
//     $(studyRowElement).click(function() {
//
//       // Add new tab for this study and switch to it
//       var studyTab = '<li><a href="#x' + study.patientId + '" data-toggle="tab">' + study.patientName + '</a></li>';
//       $('#tabs').append(studyTab);
//
//       // Add tab content by making a copy of the studyViewerTemplate element
//       var studyViewerCopy = studyViewerTemplate.clone();
//
//       /*var viewportCopy = viewportTemplate.clone();
//       studyViewerCopy.find('.imageViewer').append(viewportCopy);*/
//
//
//       studyViewerCopy.attr("id", 'x' + study.patientId);
//       // Make the viewer visible
//       studyViewerCopy.removeClass('hidden');
//       // Add section to the tab content
//       studyViewerCopy.appendTo('#tabContent');
//
//       // Show the new tab (which will be the last one since it was just added
//       $('#tabs a:last').tab('show');
//
//       // Toggle window resize (?)
//       $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
//         $(window).trigger('resize');
//       });
//
//       // Now load the study.json
//       loadStudy(studyViewerCopy, viewportTemplate, study.studyId + ".json");
//     });
//   });
// });


function RemoveAtab(tabContentId) {
    var DelStudyId = tabContentId.substring(2, tabContentId.length);
    var stacklist = cornerstone.StudyIDStackList.GetStackID(DelStudyId);
    if (stacklist !== undefined) {
        cornerstone.imageCache.removeStudyImagePromise(stacklist.stacks);//.removeImagePromise(); //如何获取到图像的ID remove? 20170306 删除对应studyID的所有缓存图像
        cornerstone.StudyIDStackList.RemoveStackIDList(DelStudyId); // 删除对应studyID的ImageID
    }
   $(this).parent().parent().remove(); //remove li of tab
    $(tabContentId).remove(); //remove respective tab content
    $('#tabs').remove(tabContentId);
   $('#tabs a:last').remove();

}
// Show tabs on click
$('#tabs a').click (function(e) {
   //alert("change tab");
  e.preventDefault();
  $(this).tab('show');

});



// Resize main
function resizeMain() {
  var height = $(window).height();
  $('#main').height(height - 50);
  $('#tabContent').height(height - 50 - 42);
}


// Call resize main on window resize
$(window).resize(function() {
    resizeMain();
});
resizeMain();


// Prevent scrolling on iOS
document.body.addEventListener('touchmove', function(e) {
  e.preventDefault();
});
