import Mock from 'mockjs'

const data = Mock.mock({
    "list|60": [
        {
            "id": '@increment(1)',
            "name": "@ctitle",
            "content": "@cparagraph",
            "createTime": "@date(yyyy-MM-dd hh:mm:ss)"
        }
    ]
})

Mock.mock(RegExp("/getoptions.*"), 'get', (options) => {
    //分页
    const {list}=data;
    const {url} = options;let current,pageNo,pageSize,start=0,end=list.length-1;
    if (url.indexOf('pageSize') > -1) {
        let params = url.split('?')[1].split('&')
        params.forEach(item => {
            if (item.indexOf('current') > -1) {
                current=item.split('=')[1]
            }
            if (item.indexOf('pageNo') > -1) {
                pageNo=item.split('=')[1]
            }
            if (item.indexOf('pageSize') > -1) {
                pageSize=item.split('=')[1]
            }
        })
        start=pageSize*(pageNo-1)
        end=start+(pageSize-1)+1;
    }
    let res=[]
    for (let i = start; i < end; i++) {
        res.push(list[i])
    }
    return {
        status: 200,
        message: '获取数据成功',
        payload: res,
        totalSize:60,
        current: 1,
        pageNo: 1,
        pageSize: 10
    }
})
