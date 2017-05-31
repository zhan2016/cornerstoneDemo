
function setupButtons(studyViewer) {
    // Get the button elements
    var buttons = $(studyViewer).find('button');
    var element = $(studyViewer).find('.viewport')[0];

    // Tool button event handlers that set the new active tool
    //光标事件
    $(buttons[0]).on('click touchstart', function() {
        disableAllTools();
        forEachViewport(function(element) {
            // alert('启动光标选择');
            cornerstoneTools.SelectElement.activate(element, 1);

        });
    });
    // WW/WL
    $(buttons[1]).on('click touchstart', function() {
        disableAllTools();
        forEachViewport(function(element) {
            cornerstoneTools.wwwc.activate(element, 1);
            cornerstoneTools.wwwcTouchDrag.activate(element);
        });
    });
    //预置窗宽窗位 zwj 20170322
    $("#wwfei").on("click", function () {
        var selectedViewport = cornerstoneTools.GetSelectetEnume();
        if (selectedViewport.length >= 1)
        {
            selectedViewport.forEach(function (element) {
                var viewport = cornerstone.getViewport(element);
                // Toggle invert
                viewport.voi.windowWidth = 900;
                viewport.voi.windowCenter = 1500;
                cornerstone.setViewport(element, viewport);

            })
        }

    })
    // WW/WL 预置床宽窗位设置
    $(buttons[2]).on('click touchstart', function() {
        disableAllTools();
        forEachViewport(function(element) {
            cornerstoneTools.wwwc.activate(element, 1);
            cornerstoneTools.wwwcTouchDrag.activate(element);
        });
    });

    // Invert
    $(buttons[3]).on('click touchstart', function() {
        disableAllTools();
        //仅对当前选中的列表生效 zwj 20170405
        var selectedViewport = cornerstoneTools.GetSelectetEnume();
        if (selectedViewport.length >= 1)
        {
            selectedViewport.forEach(function (element) {
                var viewport = cornerstone.getViewport(element);
                // Toggle invert
                if (viewport.invert === true) {
                    viewport.invert = false;
                } else {
                    viewport.invert = true;
                }
                cornerstone.setViewport(element, viewport);

            })
        }
        /*forEachViewport(function(element) {
            var viewport = cornerstone.getViewport(element);
            // Toggle invert
            if (viewport.invert === true) {
                viewport.invert = false;
            } else {
                viewport.invert = true;
            }
            cornerstone.setViewport(element, viewport);
        });*/
    });

    // Zoom
    $(buttons[4]).on('click touchstart', function() {
        disableAllTools();
        forEachViewport(function(element) {
            cornerstoneTools.zoom.activate(element, 5); // 5 is right mouse button and left mouse button
            cornerstoneTools.zoomTouchDrag.activate(element);
        });
    });

    // Pan
    $(buttons[5]).on('click touchstart', function() {
        disableAllTools();
        forEachViewport(function(element) {
            cornerstoneTools.pan.activate(element, 3); // 3 is middle mouse button and left mouse button
            cornerstoneTools.panTouchDrag.activate(element);
        });
    });

    // Stack scroll
    $(buttons[6]).on('click touchstart', function() {
        disableAllTools();
        forEachViewport(function(element) {
            cornerstoneTools.stackScroll.activate(element, 1);
            cornerstoneTools.stackScrollTouchDrag.activate(element);
        });
    });

    // Length measurement
    $(buttons[7]).on('click touchstart', function() {
        disableAllTools();
        forEachViewport(function(element) {
            cornerstoneTools.length.activate(element, 1);
            cornerstoneTools.lengthTouch.activate(element);
        });
    });

    // Angle measurement
    $(buttons[8]).on('click touchstart', function() {
        disableAllTools();
        forEachViewport(function(element) {
            cornerstoneTools.angle.activate(element, 1);
            cornerstoneTools.angleTouch.activate(element);
        });
    });

    // Pixel probe
    $(buttons[9]).on('click touchstart', function() {
        disableAllTools();
        forEachViewport(function(element) {
            cornerstoneTools.probe.activate(element, 1);
            cornerstoneTools.probeTouch.activate(element);
        });
    });

    // Elliptical ROI
    $(buttons[10]).on('click touchstart', function() {
        disableAllTools();
        forEachViewport(function(element) {
            cornerstoneTools.ellipticalRoi.activate(element, 1);
            cornerstoneTools.rectangleRoiTouch.activate(element);
        });
    });

    // Rectangle ROI
    $(buttons[11]).on('click touchstart', function() {
        disableAllTools();
        forEachViewport(function (element) {
            cornerstoneTools.rectangleRoi.activate(element, 1);
            cornerstoneTools.rectangleRoiTouch.activate(element);
        });
    });

    // Play clip
    $(buttons[12]).on('click touchstart', function() {
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
    $(buttons[13]).on('click touchstart', function() {
        forEachViewport(function(element) {
            cornerstoneTools.stopClip(element);
        });
    });
    //左旋转
    $(buttons[15]).on('click touchstart', function() {
        disableAllTools();
        forEachViewport(function(element) {
            var viewport = cornerstone.getViewport(element);
            //左旋90度
            viewport.rotation-=90;
            cornerstone.setViewport(element, viewport);
        });
    });
    //右旋转
    $(buttons[16]).on('click touchstart', function() {
        disableAllTools();
        forEachViewport(function(element) {
            var viewport = cornerstone.getViewport(element);
            //左旋90度
            viewport.rotation+=90;
            cornerstone.setViewport(element, viewport);
        });
    });
    //上下反转
    $(buttons[17]).on('click touchstart', function() {
        disableAllTools();
        forEachViewport(function(element) {
            var viewport = cornerstone.getViewport(element);
            viewport.vflip = !viewport.vflip;
            cornerstone.setViewport(element, viewport);
        });
    });
    //左右反转
    $(buttons[18]).on('click touchstart', function() {
        disableAllTools();
        forEachViewport(function(element) {
            var viewport = cornerstone.getViewport(element);
            viewport.hflip = !viewport.hflip;
            cornerstone.setViewport(element, viewport);
        });
    });
    //放大镜
    $(buttons[19]).on('click touchstart', function() {
        disableAllTools();
        forEachViewport(function(element) {
            //配置放大镜参数
            var config = {
                magnifySize: parseInt("225", 10),
                magnificationLevel: parseInt("2", 10)
            };

            cornerstoneTools.magnify.setConfiguration(config);

            cornerstoneTools.magnify.activate(element, 1);
            cornerstoneTools.magnifyTouchDrag.activate(element);
        });
    });
    //保存图像
    $(buttons[20]).on('click touchstart', function() {
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
    $(buttons[21]).on('click touchstart', function() {
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
    $(buttons[22]).on('click touchstart', function() {
        disableAllTools();
        var selectedViewport = cornerstoneTools.GetSelectetEnume();
        if (selectedViewport.length >= 1)
        {
            selectedViewport.forEach(function (element) {
                var ee = cornerstone.getEnabledElement(element);
                var Dataset = ee.image.data; // 获取dataset zwj 20170313
                var NewWin = window.open("templates/DicomHeader.html");
                NewWin.datasetInfo = Dataset;

            })
        }
    });



   //恢复视图状态
    $(buttons[23]).on('click touchstart', function() {
        disableAllTools();
        forEachViewport(function(element) {
            var enabledElement = cornerstone.getEnabledElement(element);
            var toolStateManager = cornerstoneTools.getElementToolStateManager(element);
            enabledElement.viewport = cornerstone.internal.getDefaultViewport(enabledElement.canvas, enabledElement.image);
            // Note that this only works on ImageId-specific tool state managers (for now)
            toolStateManager.RestoreAll(element);
            cornerstone.updateImage(element);
        });
    });

    //定位线工具 要求layout里面存在定位片
    $(buttons[24]).on('click touchstart', function() {
        disableAllTools();
        var synchronizer = new cornerstoneTools.Synchronizer("CornerstoneNewImage", cornerstoneTools.updateImageSynchronizer);
         cornerstoneTools.referenceLines.InitData(synchronizer);

        forEachViewport(function(element) {
            var enabledElement = cornerstone.getEnabledElement(element);
            var ImageType = enabledElement.image.data.string('x00080008');
            if (ImageType.search(/LOCALIZER/i) === -1)
            {
            }
            else
            {
                //alert('找到定位片');
                // Add the enabled elements to the synchronization context
                synchronizer.add(element);
                // enable reference Lines tool
                cornerstoneTools.referenceLines.tool.enable(element, synchronizer);
                cornerstoneTools.referenceLines.AddScount(element);
            }

        });
        //只添加选中的序列作为非定位片
        var selectedViewport = cornerstoneTools.GetSelectetEnume();
        if (selectedViewport.length >= 1)
        {
            selectedViewport.forEach(function (element) {
                var toolData = cornerstoneTools.getToolState(element, 'stack');
                var stackData = toolData.data[0];
                var ImageIndexs = stackData.imageIds;
                var axialImageIds = ImageIndexs;

                var axialStack = {
                    currentImageIdIndex : 0,
                    imageIds: axialImageIds
                };
                // axialImageIds.forEach(
                //     function (e) {
                //         cornerstone.loadAndCacheImage(e);
                //
                //     }
                // );
                //cornerstoneTools.addStackStateManager(element, ['stack', 'referenceLines']);
                //cornerstoneTools.addStackStateManager(element,['stack', 'referenceLines']);
                //cornerstoneTools.clearToolState(element, 'stack');
                cornerstoneTools.addToolState(element, 'stack', axialStack);
                // Enable all tools we want to use with this element
                cornerstoneTools.SelectElement.activate(element, 1); // 选择工具是默认的
                cornerstoneTools.zoom.activate(element, 4);
                cornerstoneTools.stackScrollWheel.activate(element);

                // enable reference Lines tool
                synchronizer.add(element);
                cornerstoneTools.referenceLines.tool.enable(element, synchronizer);
                cornerstoneTools.referenceLines.AddReference(element);
            })
        }
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