;
(function ($, window, document, undefined) {
    $.fn.citys = function (parameter) {
        var defaults = {
            maxText: 7, //字数最大值
            code: 0, //地区编码
            areaName: '', //地区名称
            dataUrl: 'http://passer-by.com/data_location/list.json', //默认值
            dataTown: 'http://passer-by.com/data_location/town/',
            mainUl: 'citylist', //列表所在UL
            mainTabUl: 'citytab', //列表TAB
            otherUl: 'otherul', //其它栏目显示
            arrother: [], //其它栏目地区编码以数组排列显示

        };
        var options = $.extend({}, defaults, parameter);
        return this.each(function () {
            var $this = $(this);
            var format = {
                province: function () {
                    var $ul = $this.find("#" + options.mainUl);
                    $ul.empty();
                    $this.find("#list_b1").show();
                    $this.find("#list_b2").hide();
                    $this.find("#list_b3").hide();
                    $this.find("#list_b4").hide();
                    $.ajax({
                        url: options.dataUrl,
                        dataType: 'json',
                        success: function (data) {
                            for (i in data) {
                                if (!(i % 1e4)) {
                                    $ul.append('<li classtable="1" Title="' + data[i] + '" value="' + i + '">' + data[i].substring(0, options.maxText) + '</li>');
                                }

                            }

                            var $li = $this.find("#" + options.mainUl).find("li");
                            $li.click(function () {
                                format.liclick($(this));
                            });
                        }
                    });
                },
                city: function (value, html) {
                    $this.find("#list_b1").show();
                    $this.find("#list_b2").show();
                    $this.find("#list_b2").html(html).attr("value", value);
                    $this.find("#list_b3").hide();
                    $this.find("#list_b4").hide();
                    this.cityList(value);
                },
                cityList: function (value) {
                    var $ul = $this.find("#" + options.mainUl);
                    $ul.empty();
                    $.ajax({
                        url: options.dataUrl,
                        dataType: 'json',
                        success: function (data) {

                            for (i in data) {
                                var p = i - parseInt(value);
                                if ((i % 1e4)) {
                                    if (parseInt(value) && p > 0 && p < 1e4) {
                                        if (!(i % 100)) {
                                            $ul.append('<li classtable="2" Title="' + data[i] + '" value="' + i + '">' + data[i].substring(0, options.maxText) + '</li>');
                                        }

                                    }
                                }
                            }
                            var $li = $this.find("#" + options.mainUl).find("li");
                            $li.click(function () {
                                format.liclick($(this));
                            });
                        }
                    });
                },
                area: function (value, html) {
                    $this.find("#list_b1").show();
                    $this.find("#list_b2").show();
                    $this.find("#list_b3").html(html).attr("value", value);
                    $this.find("#list_b3").show();
                    $this.find("#list_b4").hide();
                    this.areaList(value);
                },
                areaList: function (value) {
                    var $ul = $this.find("#" + options.mainUl);
                    $ul.empty();
                    $.ajax({
                        url: options.dataUrl,
                        dataType: 'json',
                        success: function (data) {
                            var ie = 0;
                            for (i in data) {
                                if ((i % 1e4)) {
                                    // var p = i - parseInt(id);
                                    var c = i - parseInt(value);
                                    //if(options.city&&c>0&&c<100){
                                    if (parseInt(value) && c > 0 && c < 100) {
                                        if ((i % 100)) {
                                            $ul.append('<li classtable="3" Title="' + data[i] + '" value="' + i + '">' + data[i].substring(0, options.maxText) + '</li>');

                                        }
                                    }

                                }
                            }

                            var $li = $this.find("#" + options.mainUl).find("li");
                            $li.click(function () {
                                format.liclick($(this));
                            });
                        }
                    });

                },
                twons: function (value, html) {
                    $this.find("#list_b1").show();
                    $this.find("#list_b2").show();
                    $this.find("#list_b4").html(html).attr("value", value);
                    $this.find("#list_b3").show();
                    $this.find("#list_b4").show();
                    this.twonsList(value);
                },
                twonsList: function (value) {
                    var $ul = $this.find("#" + options.mainUl);
                    $ul.empty();
                    $.ajax({
                        url: options.dataTown + value + '.json',
                        dataType: 'json',
                        success: function (data) {
                            if (value % 1e4 && value < 7e6) {
                                for (i in data) {
                                    $ul.append('<li classtable="4" Title="' + data[i] + '" value="' + i + '">' + data[i].substring(0, options.maxText) + '</li>');

                                }
                            }

                        }
                    });
                },

                Municipality: function (value, html) {
                    //直辖市
                    value = value.substring(0, 2) + "0100";
                    $this.find("#list_b1").show();
                    $this.find("#list_b2").show().html("直辖市").attr("value", 0);
                    $this.find("#list_b3").html(html).attr("value", value);
                    $this.find("#list_b3").show();
                    $this.find("#list_b4").hide();
                    this.areaList(value);
                },
                liclick: function ($thisli) {
                    var thisvalue = $thisli.attr("value");
                    var thisclasstable = $thisli.attr("classtable");
                    var thistext = $thisli.html();
                    switch (thisclasstable) {
                        case "1":
                            //如果是直辖市
                            if (thisvalue == "110000" || thisvalue == "120000" || thisvalue == "500000" || thisvalue == "310000") {
                                this.Municipality(thisvalue, thistext);
                            } else {
                                //普通省份
                                this.city(thisvalue, thistext);
                            }
                            break;
                        case "2":
                            this.area(thisvalue, thistext);

                            break;
                        case "3":
                            this.twons(thisvalue, thistext);

                            break;
                        case "0":
                            $this.find("#list_b1").show();
                            $this.find("#list_b2").hide();
                            $this.find("#list_b3").hide();
                            $this.find("#list_b4").hide();
                            this.codeToList(thisvalue);

                            break;
                        default:
                            break;
                    }


                },
                codeToList: function (code) {
                    if (!(code % 1e4)) {
                        if (code == "110000" || code == "120000" || code == "500000" || code == "310000") { //省

                            $this.find("#list_b1").show();
                            $this.find("#list_b2").show().html("直辖市");
                            $this.find("#list_b3").show();
                            this.codeToNameShowTab("list_b3", code);
                            $this.find("#list_b4").hide();
                            code = code.substring(0, 2) + "0100";
                            this.areaList(code);
                        } else {
                            $this.find("#list_b1").show();
                            var $nowtab = $this.find("#list_b2");
                            $nowtab.show();
                            this.codeToNameShowTab("list_b2", code);
                            $this.find("#list_b3").hide();
                            $this.find("#list_b4").hide();
                            this.cityList(code);
                        }
                        //如何判断直辖市
                    } else {
                        if (!(code % 100)) {
                            //市
                            var province_code;
                            province_code = code - code % 1e4;
                            $this.find("#list_b1").show();
                            $this.find("#list_b2").show();
                            format.codeToNameShowTab("list_b2", province_code);
                            $this.find("#list_b3").show();
                            this.codeToNameShowTab("list_b3", code);
                            $this.find("#list_b4").hide();
                            this.areaList(code);
                        } else {
                            //县
                            var province_code;
                            var city_code;
                            province_code = code - code % 1e4;
                            city_code = code - (code % 1e4 ? code % 1e2 : code);
                            $this.find("#list_b1").show();
                            $this.find("#list_b2").show();
                            format.codeToNameShowTab("list_b2", province_code);
                            $this.find("#list_b3").show();
                            this.codeToNameShowTab("list_b3", city_code);
                            $this.find("#list_b4").show();
                            this.codeToNameShowTab("list_b4", code);
                            this.twonsList(code);

                        }
                    }
                },

                nameToList: function () {
                    //地方名称输入地方代码输出
                    var $ul = $this.find("#" + options.mainUl);
                    $ul.empty();
                    $.ajax({
                        url: options.dataUrl,
                        dataType: 'json',
                        success: function (data) {
                            var ie = 0;
                            for (i in data) {

                                if (data[i].match(options.areaName) != null) {
                                    $ul.append('<li classtable="0" Title="' + data[i] + '" value="' + i + '">' + data[i].substring(0, options.maxText) + '</li>');

                                }
                            }
                            var $li = $this.find("#" + options.mainUl).find("li");
                            $li.click(function () {
                                format.liclick($(this));
                            });
                        }
                    });
                },
                codeToNameShowTab: function (tab_Id, code) {
                    var $tab;
                    $tab = $this.find("#" + tab_Id);
                    $tab.html("");
                    $.getJSON(options.dataUrl, function (data) {
                        for (i in data) {
                            if (i == code) {
                                $tab.append(data[i].substring(0, options.maxText)).attr("value", i);

                            }
                        }
                    });

                },
            };
            //有没有带参数

            if (options.code) {
                format.codeToList(options.code);
            } else {
                if (options.areaName) {

                    format.nameToList();
                } else {
                    format.province();
                }
            }


            //显示otherul.li
            var $other = $this.find("#" + options.otherUl);
            var $liclick_other = $other.find("li");
            $("#other_show1,#other_show2,#other_show3,#other_show4,#other_show5,#other_show6").hide();
            //$("#other_show1").show().html(options.arrother.length);
            if (options.arrother.length > 0) {
                $.each(options.arrother, function (key, val) {
                    $("#other_show" + (parseInt(key) + 1)).show();
                    format.codeToNameShowTab("other_show" + (parseInt(key) + 1), val);
                });
            }


            //点击otherul.li
            $liclick_other.click(function () {
                var code = $(this).attr('value');
                format.codeToList(code);
            });

            $this.find("#" + options.mainTabUl + " li").click(function () {
                var html = $(this).html();
                var value = $(this).attr("value");
                var select = $(this).attr("titleselect");
                // alert("级别是："+select+" 值是："+value+" 名称是："+html);
                switch (select) {
                    case "1":
                        format.province();
                        break;
                    case "2":
                        if (value == "0") {
                            format.province();
                        } else {
                            format.city(value, html);
                        }

                        break;
                    case "3":
                        format.area(value, html);
                    default:
                }
            });

            $this.find("#findButton").click(function () {
                if (!$("#findText").val() == "") {
                    $this.find("#list_b1").show();
                    $this.find("#list_b2").hide();
                    $this.find("#list_b3").hide();
                    $this.find("#list_b4").hide();
                    options.areaName = $("#findText").val();
                    format.nameToList();
                };
            });


        });
    };
})(jQuery, window, document);
