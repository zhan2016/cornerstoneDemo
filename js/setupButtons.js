
function setupButtons(studyViewer) {
    // Get the button elements
    var buttons = $(studyViewer).find('button');

    // Tool button event handlers that set the new active tool

    // WW/WL
    $(buttons[0]).on('click touchstart', function() {
        disableAllTools();
        forEachViewport(function(element) {
            cornerstoneTools.wwwc.activate(element, 1);
            cornerstoneTools.wwwcTouchDrag.activate(element);
        });
    });
    // WW/WL 预置床宽窗位设置
    $(buttons[1]).on('click touchstart', function() {
        disableAllTools();
        forEachViewport(function(element) {
            cornerstoneTools.wwwc.activate(element, 1);
            cornerstoneTools.wwwcTouchDrag.activate(element);
        });
    });

    // Invert
    $(buttons[2]).on('click touchstart', function() {
        disableAllTools();
        forEachViewport(function(element) {
            var viewport = cornerstone.getViewport(element);
            // Toggle invert
            if (viewport.invert === true) {
                viewport.invert = false;
            } else {
                viewport.invert = true;
            }
            cornerstone.setViewport(element, viewport);
        });
    });

    // Zoom
    $(buttons[3]).on('click touchstart', function() {
        disableAllTools();
        forEachViewport(function(element) {
            cornerstoneTools.zoom.activate(element, 5); // 5 is right mouse button and left mouse button
            cornerstoneTools.zoomTouchDrag.activate(element);
        });
    });

    // Pan
    $(buttons[4]).on('click touchstart', function() {
        disableAllTools();
        forEachViewport(function(element) {
            cornerstoneTools.pan.activate(element, 3); // 3 is middle mouse button and left mouse button
            cornerstoneTools.panTouchDrag.activate(element);
        });
    });

    // Stack scroll
    $(buttons[5]).on('click touchstart', function() {
        disableAllTools();
        forEachViewport(function(element) {
            cornerstoneTools.stackScroll.activate(element, 1);
            cornerstoneTools.stackScrollTouchDrag.activate(element);
        });
    });

    // Length measurement
    $(buttons[6]).on('click touchstart', function() {
        disableAllTools();
        forEachViewport(function(element) {
            cornerstoneTools.length.activate(element, 1);
        });
    });

    // Angle measurement
    $(buttons[7]).on('click touchstart', function() {
        disableAllTools();
        forEachViewport(function(element) {
            cornerstoneTools.angle.activate(element, 1);
        });
    });

    // Pixel probe
    $(buttons[8]).on('click touchstart', function() {
        disableAllTools();
        forEachViewport(function(element) {
            cornerstoneTools.probe.activate(element, 1);
        });
    });

    // Elliptical ROI
    $(buttons[9]).on('click touchstart', function() {
        disableAllTools();
        forEachViewport(function(element) {
            cornerstoneTools.ellipticalRoi.activate(element, 1);
        });
    });

    // Rectangle ROI
    $(buttons[10]).on('click touchstart', function() {
        disableAllTools();
        forEachViewport(function (element) {
            cornerstoneTools.rectangleRoi.activate(element, 1);
        });
    });

    // Play clip
    $(buttons[11]).on('click touchstart', function() {
        forEachViewport(function(element) {
          var stackState = cornerstoneTools.getToolState(element, 'stack');
          var frameRate = stackState.data[0].frameRate;
          // Play at a default 10 FPS if the framerate is not specified
          if (frameRate === undefined) {
            frameRate = 10;
          }
          cornerstoneTools.playClip(element, frameRate);
        });
    });

    // Stop clip
    $(buttons[12]).on('click touchstart', function() {
        forEachViewport(function(element) {
            cornerstoneTools.stopClip(element);
        });
    });
    //左旋转
    $(buttons[14]).on('click touchstart', function() {
        disableAllTools();
        forEachViewport(function(element) {
            var viewport = cornerstone.getViewport(element);
            //左旋90度
            viewport.rotation-=90;
            cornerstone.setViewport(element, viewport);
        });
    });
    //右旋转
    $(buttons[15]).on('click touchstart', function() {
        disableAllTools();
        forEachViewport(function(element) {
            var viewport = cornerstone.getViewport(element);
            //左旋90度
            viewport.rotation+=90;
            cornerstone.setViewport(element, viewport);
        });
    });
    //上下反转
    $(buttons[16]).on('click touchstart', function() {
        disableAllTools();
        forEachViewport(function(element) {
            var viewport = cornerstone.getViewport(element);
            viewport.vflip = !viewport.vflip;
            cornerstone.setViewport(element, viewport);
        });
    });
    //左右反转
    $(buttons[17]).on('click touchstart', function() {
        disableAllTools();
        forEachViewport(function(element) {
            var viewport = cornerstone.getViewport(element);
            viewport.hflip = !viewport.hflip;
            cornerstone.setViewport(element, viewport);
        });
    });
    //放大镜
    $(buttons[18]).on('click touchstart', function() {
        disableAllTools();
        forEachViewport(function(element) {
            //配置放大镜参数
            var config = {
                magnifySize: parseInt("100", 10),
                magnificationLevel: parseInt("3", 10)
            };

            cornerstoneTools.magnify.setConfiguration(config);

            cornerstoneTools.magnify.activate(element, 1);
            cornerstoneTools.magnifyTouchDrag.activate(element);
        });
    });
    //保存图像
    $(buttons[19]).on('click touchstart', function() {
        disableAllTools();
        // show Modal

        forEachViewport(function(element) {
            $('#myModal').modal('show');
            $('#CloseModal').click(function () {
                var FilePath = document.getElementById('FilePath').value;
                cornerstoneTools.saveAs(element, FilePath);
                //alert(FilePath);
            });
        });
    });
    //注释
    $(buttons[20]).on('click touchstart', function() {
        disableAllTools();
        // show Modal

        forEachViewport(function(element) {
            function getTextCallback(doneChangingTextCallback) {
                var annotationDialog  = $('#myModal');
                var getTextInput = annotationDialog.find('#FilePath');
                var confirm = annotationDialog.find('#CloseModal');

                annotationDialog.modal('show');

                confirm.off('click');
                confirm.on('click', function() {
                    closeHandler();
                });

                annotationDialog .off("keydown");
                annotationDialog .on('keydown', keyPressHandler);

                function keyPressHandler(e) {
                    // If Enter is pressed, close the dialog
                    if (e.which === 13) {
                        closeHandler();
                    }
                }

                function closeHandler() {
                    annotationDialog.modal('hide');
                    doneChangingTextCallback(getTextInput.val());
                    // Reset the text value
                    getTextInput.val("");
                }
            }

            // Define a callback to edit your text annotation
            // This could be used, e.g. to open a modal
            function changeTextCallback(data, eventData, doneChangingTextCallback) {
                var relabelDialog = $('#myModal');
                var getTextInput = relabelDialog.find('#FilePath');
                var confirm = relabelDialog.find('#CloseModal');
                //var remove = relabelDialog.find('.relabelRemove');

                getTextInput.val(data.annotationText);
                relabelDialog.modal('show');

                confirm.off('click');
                confirm.on('click', function() {
                    relabelDialog.get(0).close();
                    doneChangingTextCallback(data, getTextInput.val());
                });

                // If the remove button is clicked, delete this marker
                /*remove.off('click');
                remove.on('click', function() {
                    relabelDialog.get(0).close();
                    doneChangingTextCallback(data, undefined, true);
                });*/

                relabelDialog.off("keydown");
                relabelDialog.on('keydown', keyPressHandler);

                function keyPressHandler(e) {
                    // If Enter is pressed, close the dialog
                    if (e.which === 13) {
                        closeHandler();
                    }
                }

                function closeHandler() {
                    relabelDialog.get(0).close();
                    doneChangingTextCallback(data, getTextInput.val());
                    // Reset the text value
                    getTextInput.val("");
                }

            }

            var config = {
                getTextCallback : getTextCallback,
                changeTextCallback : changeTextCallback,
                drawHandles : false,
                drawHandlesOnHover : true,
                arrowFirst : true
            }

            cornerstoneTools.arrowAnnotate.setConfiguration(config);

            // Enable all tools we want to use with this element
            cornerstoneTools.arrowAnnotate.activate(element, 1);
            cornerstoneTools.arrowAnnotateTouch.activate(element);

        });
    });
    //dicom 头信息浏览
    $(buttons[21]).on('click touchstart', function() {
        var newWin = window.open();
        var DicomHeadertemplate;
        loadTemplate("templates/DicomHeader.html", function(element) {
            DicomHeadertemplate = element;
        });
        //var html = $('#dicomInfo').html();
        $(newWin.document.body).html(DicomHeadertemplate.clone());

    });

    // Tooltips
    $(buttons[0]).tooltip();
    $(buttons[1]).tooltip();
    $(buttons[2]).tooltip();
    $(buttons[3]).tooltip();
    $(buttons[4]).tooltip();
    $(buttons[5]).tooltip();
    $(buttons[6]).tooltip();
    $(buttons[7]).tooltip();
    $(buttons[8]).tooltip();
    $(buttons[9]).tooltip();
    $(buttons[10]).tooltip();
    $(buttons[11]).tooltip();
    $(buttons[12]).tooltip();
    $(buttons[13]).tooltip();
    $(buttons[14]).tooltip();
};