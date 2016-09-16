citys.js 
===
![](https://raw.githubusercontent.com/wwwalexzengnet/tabCitys/master/img/donghua.gif)

### 如何使用citys插件

默认进入

```javascript

    <script type="text/javascript">
     $(function() {
            $(".allmap1").citys({
                arrother: [440300, 445281, 441900, 330100],
            });
        });
    </script>
    
```

输入地区代码直接查询到该地区

```javascript
 <script type="text/javascript">
     $(function() {
            $(".allmap1").citys({
                code:330100,
                arrother: [440300, 445281, 441900, 330100],
            });
        });
    </script>
```

直接进入查询地区名称包含有“海”字的。

```javascript
<script type="text/javascript">
     $(function() {
            $(".allmap1").citys({
                areaName: '海',
                arrother: [440300, 445281, 441900, 330100],
            });
        });
    </script>
```

